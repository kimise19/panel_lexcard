import { Alert, Button, Modal } from "flowbite-react";
import { FC, useState } from "react";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import {APIQuestion} from "../../../models/modelsadmin/Question"; 
import {  deleteQuestionById } from "../../../services/servicesadmin/QuestionService";
import CustomModal from "../../../utils/CustomModal";

interface DeleteQuestionModalProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
  selectedQuestion: APIQuestion;
  refreshQuestion: () => void;
}

const DeleteQuestionModal: FC<DeleteQuestionModalProps> = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedQuestion,
  refreshQuestion,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = async () => {
    try {
      await  deleteQuestionById(String(selectedQuestion.id));
      setSuccessMessage("Pregunta eliminada correctamente");
      setIsDeleteModalOpen(false);
      setErrorMessage(null);
      refreshQuestion();
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
          {selectedQuestion?.question}?
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

export default DeleteQuestionModal;
