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
import { Subcategory } from "../../../models/modelsadmin/Category";
import { CreateTestInput } from "../../../services/types";

import { createTest } from "../../../services/servicesadmin/TestService";
import { allSubcategory } from "../../../services/servicesadmin/SubcategoryService";
import CustomModal from "../../../utils/CustomModal";

interface AddTestModalProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isOpen: boolean) => void;
  refreshTests: () => void;
}

const AddTestModal: FC<AddTestModalProps> = ({
  isAddModalOpen,
  setIsAddModalOpen,
  refreshTests,
}) => {
  const [newTest, setNewTest] = useState<CreateTestInput>({
    name: "",
    description: "",
    subcategoryId: 0,
  });
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await allSubcategory();
        setSubcategories(response.items);
      } catch {
        setErrorMessage("Error al obtener las subcategorías");
      }
    };

    fetchSubcategories();
  }, []);

  const handleAddTest = async () => {
    try {
      console.log("New Test:", newTest);
      await createTest(newTest);
      setSuccessMessage("Test agregado correctamente");
      setIsAddModalOpen(false);
      setErrorMessage(null);
      refreshTests();
      setNewTest({
        name: "",
        description: "",
        subcategoryId: 0,
      });
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
    setNewTest({
      name: "",
      description: "",
      subcategoryId: 0,
    });
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
              <Label htmlFor="subcategory" value="Subcategoría" />
              <Select
                id="subcategory"
                value={newTest.subcategoryId}
                onChange={(e) =>
                  setNewTest({
                    ...newTest,
                    subcategoryId: Number(e.target.value),
                  })
                }
              >
                <option value="">Seleccione una Subcategoría</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
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
          <Button color="success" onClick={handleAddTest}>
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