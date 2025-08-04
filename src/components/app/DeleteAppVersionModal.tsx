import { Alert, Button, Modal } from "flowbite-react";
import { FC, useState } from "react";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import { AppVersion } from "../models/AppVersion";
// import { deleteAppVersionById } from "../services/AppService";
import CustomModal from "../utils/CustomModal";

interface DeleteAppVersionModalProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  selectedAppVersion: AppVersion | null;
  refreshAppVersions: () => void;
}

const DeleteAppVersionModal: FC<DeleteAppVersionModalProps> = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedAppVersion,
  refreshAppVersions,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDeleteAppVersion = async () => {
    try {
      if (selectedAppVersion?.id) {
        // Simulate deletion process
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSuccessMessage("Versión eliminada correctamente");
        setIsDeleteModalOpen(false);
        setErrorMessage(null);
        refreshAppVersions();
      }
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
          Eliminar Versión
        </Modal.Header>
        <Modal.Body className="dark:bg-gray-800 dark:text-white">
          ¿Está seguro de que desea eliminar la versión{" "}
          {selectedAppVersion?.platform}?
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
          <Button color="failure" onClick={handleDeleteAppVersion}>
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

export default DeleteAppVersionModal;
