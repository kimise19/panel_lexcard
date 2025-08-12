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
import { Test } from "../../../services/types";
import { APIQuestion, InitialQuestionStateQuestion } from "../../../models/modelsadmin/Question";

import { createQuestion } from "../../../services/servicesadmin/QuestionService";
import { allTest } from "../../../services/servicesadmin/TestService";
import CustomModal from "../../../utils/CustomModal";

interface AddQuestionModalProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isOpen: boolean) => void;
  refreshQuestions: () => void;
}

const AddQuestionModal: FC<AddQuestionModalProps> = ({
  isAddModalOpen,
  setIsAddModalOpen,
  refreshQuestions,
}) => {
  const [newQuestion, setNewQuestion] = useState<APIQuestion>(
    InitialQuestionStateQuestion
  );
  const [tests, setTests] = useState<Test[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const testsData = await allTest();
        setTests(testsData);
      } catch (error) {
        console.error("Error fetching tests:", error);
        setErrorMessage("Error al obtener los tests");
      }
    };

    fetchTests();
  }, []);

  const handleAddQuestion = async () => {
    try {
      console.log("New Question:", newQuestion); // Verificar el valor de newQuestion
      await createQuestion(newQuestion);
      setSuccessMessage("Pregunta agregada correctamente");
      setIsAddModalOpen(false);
      setErrorMessage(null);
      refreshQuestions();
      setNewQuestion(InitialQuestionStateQuestion);
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
    setNewQuestion(InitialQuestionStateQuestion);
  };

  return (
    <>
      <Modal show={isAddModalOpen} onClose={handleCloseModal} dismissible>
        <Modal.Header>Agregar Pregunta</Modal.Header>
        <Modal.Body>
          <form className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="question" value="Pregunta" />
              <TextInput
                id="question"
                placeholder="Escribe la pregunta"
                value={newQuestion.question}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, question: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="options" value="Opciones (separadas por comas)" />
              <TextInput
                id="options"
                placeholder="Opción 1, Opción 2, Opción 3, Opción 4"
                value={Array.isArray(newQuestion.options) ? newQuestion.options.join(", ") : ""}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
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
                value={Array.isArray(newQuestion.answers) ? newQuestion.answers.join(", ") : ""}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
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
                value={newQuestion.correct.toString()}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
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
                value={newQuestion.justification}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    justification: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="testId" value="ID del Test" />
              <Select
                id="testId"
                value={newQuestion.testId.toString()}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
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
          <Button color="success" onClick={handleAddQuestion}>
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

export default AddQuestionModal;