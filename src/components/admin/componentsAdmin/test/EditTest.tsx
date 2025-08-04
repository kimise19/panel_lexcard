import { Alert, Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { FC, useState, useEffect } from "react";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import { Subcategory} from "../../../models/Category";
import { Test} from "../../../models/modelsadmin/Tets";
import { updateTestById } from "../../../services/servicesadmin/TestService";
import { allSubcategory } from "../../../services/servicesadmin/SubcategoryService";
import CustomModal from "../../../utils/CustomModal";

interface EditTestModalProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isOpen: boolean) => void;
  selectedTest: Test;
  setSelectedTest: (subcategory: Test) => void;
  refreshTest: () => void;
}

const EditTestModal: FC<EditTestModalProps> = ({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedTest,
  setSelectedTest,
  refreshTest,
}) => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await allSubcategory();
        setSubcategories(response.items);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Error al obtener las categorías");
        }
      }
    };

    fetchCategories();
  }, []);

  const handleUpdateCategory = async () => {
    try {
      const updatedTest = await updateTestById(
        String(selectedTest.id),
        selectedTest
      );
      setSelectedTest(updatedTest);
      setSuccessMessage("Categoría actualizada correctamente");
      setIsEditModalOpen(false);
      setErrorMessage(null);
      refreshTest();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocurrió un error desconocido");
      }
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setErrorMessage(null);
  };

  return (
    <>
      <Modal show={isEditModalOpen} onClose={handleCloseModal} dismissible>
        <Modal.Header>Editar Categoría</Modal.Header>
        <Modal.Body>
          <form className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name" value="Nombre" />
              <TextInput
                id="name"
                placeholder="Nombre de la categoría"
                value={selectedTest?.name || ""}
                onChange={(e) =>
                  setSelectedTest({
                    ...selectedTest,
                    name: e.target.value || "",
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="description" value="Descripción" />
              <TextInput
                id="description"
                placeholder="Descripción de la categoría"
                value={selectedTest?.description || ""}
                onChange={(e) =>
                  setSelectedTest({
                    ...selectedTest,
                    description: e.target.value || "",
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="category" value="Categoría" />
              <Select
                id="category"
                value={selectedTest?.subcategoryId || ""}
                onChange={(e) =>
                  setSelectedTest({
                    ...selectedTest,
                    subcategoryId: Number(e.target.value), // Convertir a número
                  })
                }
              >
                <option value="">Seleccione una categoría</option>
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
          <Button color="success" onClick={handleUpdateCategory}>
            Actualizar
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

export default EditTestModal;