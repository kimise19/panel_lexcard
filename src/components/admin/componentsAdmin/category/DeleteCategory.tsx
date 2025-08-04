import { Alert, Button, Modal } from "flowbite-react";
import { FC, useState } from "react";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import { Categorie} from "../../../models/modelsadmin/Category"; 
import { deleteCategoryById } from "../../../services/servicesadmin/CategoryService";
import CustomModal from "../../../utils/CustomModal";

interface DeleteCategoryModalProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  selectedCategory: Categorie;
  refreshCategories: () => void;
}

const DeleteCategoryModal: FC<DeleteCategoryModalProps> = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedCategory,
  refreshCategories,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = async () => {
    try {
      await deleteCategoryById(String(selectedCategory.id));
      setSuccessMessage("Categoría eliminada correctamente");
      setIsDeleteModalOpen(false);
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

  return (
    <>
      <Modal
        show={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setErrorMessage(null);
        }}
        dismissible
      >
        <Modal.Header className="dark:bg-gray-800 dark:text-white">
          Eliminar Categoría
        </Modal.Header>
        <Modal.Body className="dark:bg-gray-800 dark:text-white">
          ¿Está seguro de que desea eliminar la categoría{" "}
          {selectedCategory?.name}?
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
          <Button color="failure" onClick={handleDelete}>
            Eliminar
          </Button>
          <Button
            color="gray"
            onClick={() => {
              setIsDeleteModalOpen(false);
              setErrorMessage(null);
            }}
          >
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

export default DeleteCategoryModal;
