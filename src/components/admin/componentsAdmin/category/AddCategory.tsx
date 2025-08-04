import {
  Alert,
  Button,
  Label,
  Modal,
  TextInput,
  FileInput,
} from "flowbite-react";
import { FC, useState } from "react";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import {
  Categorie,
  InitialCategoryStateCategory,
} from "../../../models/modelsadmin/Category";
import { createCategory } from "../../../services/servicesadmin/CategoryService";
import CustomModal from "../../../utils/CustomModal";

interface AddCategoryModalProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isOpen: boolean) => void;
  refreshCategories: () => void;
}

const AddCategoryModal: FC<AddCategoryModalProps> = ({
  isAddModalOpen,
  setIsAddModalOpen,
  refreshCategories,
}) => {
  const [newCategory, setNewCategory] = useState<Categorie>(
    InitialCategoryStateCategory
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddCategory = async () => {
    try {
      console.log("New Category:", newCategory); // Verificar el valor de newCategory
      await createCategory(newCategory);
      setSuccessMessage("Categoría agregada correctamente");
      setIsAddModalOpen(false);
      setErrorMessage(null);
      refreshCategories();
      setNewCategory(InitialCategoryStateCategory);
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
    setNewCategory(InitialCategoryStateCategory);
  };

  return (
    <>
      <Modal show={isAddModalOpen} onClose={handleCloseModal} dismissible>
        <Modal.Header>Agregar Categoría</Modal.Header>
        <Modal.Body>
          <form className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name" value="Nombre" />
              <TextInput
                id="name"
                placeholder="Nombre de la categoría"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="description" value="Descripción" />
              <TextInput
                id="description"
                placeholder="Descripción de la categoría"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="image" value="Imagen" />
              <FileInput
                helperText="PNG, JPG, JPEG hasta 5MB"
                multiple
                id="image"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setNewCategory({
                      ...newCategory,
                      image: e.target.files[0],
                    });
                  }
                }}
              />
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

export default AddCategoryModal;
