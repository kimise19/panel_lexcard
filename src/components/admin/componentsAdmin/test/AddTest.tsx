import {
  Alert,
  Button,
  Label,
  Modal,
  TextInput,
  Select,
} from "flowbite-react";
import { FC, useState, useEffect } from "react";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import {Subcategory} from "../../../models/Category";
import{Test,InitialTestStateTest} from "../../../models/modelsadmin/Tets";

import { createTest } from "../../../services/servicesadmin/TestService";
import { allSubcategory } from "../../../services/servicesadmin/SubcategoryService";
import CustomModal from "../../../utils/CustomModal";

interface AddCategoryModalProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isOpen: boolean) => void;
  refreshCategories: () => void;
}

const AddTestModal: FC<AddCategoryModalProps> = ({
  isAddModalOpen,
  setIsAddModalOpen,
  refreshCategories,
}) => {
  const [newTest, setNewTest] = useState<Test>(
    InitialTestStateTest
  );
  const [categories, setCategories] = useState<Subcategory[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await allSubcategory();
        setCategories(response.items); // Extraer la propiedad items
      } catch {
        setErrorMessage("Error al obtener las categorías");
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      console.log("New Test:", newTest); // Verificar el valor de newCategory
      await createTest(newTest);
      setSuccessMessage("Categoría agregada correctamente");
      setIsAddModalOpen(false);
      setErrorMessage(null);
      refreshCategories();
      setNewTest(InitialTestStateTest);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocurrió un error desconocido");
      }
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setErrorMessage(null);
    setNewTest(InitialTestStateTest);
  };

  return (
    <>
      <Modal show={isAddModalOpen} onClose={handleCloseModal} dismissible>
        <Modal.Header>Agregar Tets</Modal.Header>
        <Modal.Body>
          <form className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name" value="Nombre" />
              <TextInput
                id="name"
                placeholder="Nombre de la categoría"
                value={newTest.name}
                onChange={(e) =>
                  setNewTest({ ...newTest, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="description" value="Descripción" />
              <TextInput
                id="description"
                placeholder="Descripción de la categoría"
                value={newTest.description}
                onChange={(e) =>
                  setNewTest({
                    ...newTest,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="category" value="Categoría" />
              <Select
                id="category"
                value={newTest.subcategoryId}
                onChange={(e) =>
                  setNewTest({
                    ...newTest,
                    subcategoryId: Number(e.target.value), // Convertir a número
                  })
                }
              >
                <option value="">Seleccione una Subcategoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
          </form>
          {errorMessage && (
            <div className="mt-4">
              <Alert
                color="failure"
                icon={HiInformationCircle}
                onDismiss={() => setErrorMessage(null)}
                rounded
              >
                <span className="font-medium">Error:</span> {errorMessage}
              </Alert>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={handleAddCategory}>
            Agregar
          </Button>
          <Button color="failure" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <CustomModal
        show={!!successMessage}
        onClose={() => setSuccessMessage("")}
        icon={HiCheckCircle}
        message={successMessage}
        iconColor="text-green-500"
      />
    </>
  );
};

export default AddTestModal;