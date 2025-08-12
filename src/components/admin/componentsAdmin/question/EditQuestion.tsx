import { Alert, Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { FC, useState, useEffect } from "react";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import { Test } from "../../../services/types";
import { APIQuestion } from "../../../models/modelsadmin/Question";
import { updateQuestionById } from "../../../services/servicesadmin/QuestionService";
import { allTest } from "../../../services/servicesadmin/TestService";
import CustomModal from "../../../utils/CustomModal";

interface EditQuestionModalProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isOpen: boolean) => void;
  selectedQuestion: APIQuestion;
  setSelectedQuestion: (question: APIQuestion) => void;
  refreshQuestion: () => void;
}

const EditQuestionModal: FC<EditQuestionModalProps> = ({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedQuestion,
  setSelectedQuestion,
  refreshQuestion,
}) => {
  const [tests, setTests] = useState<Test[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const testsData = await allTest();
        setTests(testsData);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Error al obtener los tests");
        }
      }
    };

    fetchTests();
  }, []);

  const handleUpdateQuestion = async () => {
    try {
      const updatedQuestion = await updateQuestionById(
        String(selectedQuestion.id),
        selectedQuestion
      );
      setSelectedQuestion(updatedQuestion);
      setSuccessMessage("Pregunta actualizada correctamente");
      setIsEditModalOpen(false);
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

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setErrorMessage(null);
  };

  return (
    <>
      <Modal show={isEditModalOpen} onClose={handleCloseModal} dismissible>
        <Modal.Header>Editar Pregunta</Modal.Header>
        <Modal.Body>
          <form className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="question" value="Pregunta" />
              <TextInput
                id="question"
                placeholder="Escribe la pregunta"
                value={selectedQuestion?.question || ""}
                onChange={(e) =>
                  setSelectedQuestion({
                    ...selectedQuestion,
                    question: e.target.value || "",
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="options" value="Opciones (separadas por comas)" />
              <TextInput
                id="options"
                placeholder="Opción 1, Opción 2, Opción 3, Opción 4"
                value={Array.isArray(selectedQuestion?.options) ? selectedQuestion.options.join(", ") : ""}
                onChange={(e) =>
                  setSelectedQuestion({
                    ...selectedQuestion,
                    options: e.target.value.split(",").map(opt => opt.trim()),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="answers" value="Respuestas (separadas por comas)" />
              <TextInput
                id="answers"
                placeholder="A, B, C, D"
                value={Array.isArray(selectedQuestion?.answers) ? selectedQuestion.answers.join(", ") : ""}
                onChange={(e) =>
                  setSelectedQuestion({
                    ...selectedQuestion,
                    answers: e.target.value.split(",").map(ans => ans.trim()),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="correct" value="Índice de la respuesta correcta" />
              <TextInput
                id="correct"
                type="number"
                placeholder="Índice de la respuesta correcta"
                value={selectedQuestion?.correct?.toString() || ""}
                onChange={(e) =>
                  setSelectedQuestion({
                    ...selectedQuestion,
                    correct: parseInt(e.target.value, 10),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="justification" value="Justificación" />
              <TextInput
                id="justification"
                placeholder="Justificación de la respuesta correcta"
                value={selectedQuestion?.justification || ""}
                onChange={(e) =>
                  setSelectedQuestion({
                    ...selectedQuestion,
                    justification: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="testId" value="ID del Test" />
              <Select
                id="testId"
                value={selectedQuestion?.testId?.toString() || ""}
                onChange={(e) =>
                  setSelectedQuestion({
                    ...selectedQuestion,
                    testId: parseInt(e.target.value, 10),
                  })
                }
              >
                <option value="">Seleccione un Test</option>
                {tests.map((test) => (
                  <option key={test.id} value={test.id}>
                    {test.name}
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
          <Button color="success" onClick={handleUpdateQuestion}>
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

export default EditQuestionModal;