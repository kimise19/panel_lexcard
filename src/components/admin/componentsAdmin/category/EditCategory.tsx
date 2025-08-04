import { Alert, Button, Label, Modal, TextInput, FileInput } from "flowbite-react";
import { FC, useState } from "react";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import { Categorie } from "../../../models/modelsadmin/Category";

import { updateCategoryById } from "../../../services/servicesadmin/CategoryService";
import CustomModal from "../../../utils/CustomModal";

interface EditCategoryModalProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isOpen: boolean) => void;
  selectedCategory: Categorie;
  setSelectedCategory: (category: Categorie) => void;
  refreshCategories: () => void;
}

const EditCategoryModal: FC<EditCategoryModalProps> = ({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedCategory,
  setSelectedCategory,
  refreshCategories,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdateCategory = async () => {
    try {
      const updatedCategory = await updateCategoryById(
        String(selectedCategory.id),
        selectedCategory
      );
      setSelectedCategory(updatedCategory);
      setSuccessMessage("Categoría actualizada correctamente");
      setIsEditModalOpen(false);
      setErrorMessage(null);
      refreshCategories();
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
                value={selectedCategory?.name || ""}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
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
                value={selectedCategory?.description || ""}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    description: e.target.value || "",
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
                    setSelectedCategory({
                      ...selectedCategory,
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

export default EditCategoryModal;
