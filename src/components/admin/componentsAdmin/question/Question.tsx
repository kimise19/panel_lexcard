import { Breadcrumb, TextInput, Button, Table, Select } from "flowbite-react";
import { FC, useEffect, useState, useCallback } from "react";
import { HiArchive, HiPencil, HiPlus, HiTrash } from "react-icons/hi";
import { APIQuestion } from "../../../models/modelsadmin/Question"; 
import AddQuestionModal from "./AddQuestion";
import EditQuestionModal from "./EditQuestion";
import DeleteQuestionModal from "./DeleteQuestion";
import { allQuestion } from "../../../services/servicesadmin/QuestionService";

const QuestionComponent: FC = () => {
  const [questions, setQuestions] = useState<APIQuestion[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<APIQuestion | null>(null);

  const fetchQuestion = useCallback(async () => {
    try {
      const response = await allQuestion(pageSize, searchTerm);
      const testWithCategoryNames = response.items.map((question: APIQuestion) => ({
        ...question,
        subcategoryName: question.test ? question.test.name : "N/A",
      }));
      setQuestions(testWithCategoryNames);
    } catch (error) {
      console.error(error);
    }
  }, [pageSize, searchTerm]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  const handleEditQuestion = (question: APIQuestion) => {
    setSelectedQuestion(question);
    setIsEditModalOpen(true);
  };

  const handleDeleteQuestion = (question: APIQuestion) => {
    setSelectedQuestion(question);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="mx-4 mt-4">
        <Breadcrumb>
          <Breadcrumb.Item icon={HiArchive}>Agregar preguntas</Breadcrumb.Item>
          <Breadcrumb.Item>Preguntas</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="flex flex-col mx-4 mt-4 space-y-4">
        <div className="w-full flex justify-between items-center">
          <TextInput 
            placeholder="Buscar preguntas" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <Button className="text-gray-900 border-gray-200 bg-white  focus:ring-gray-300 enabled:hover:bg-gray-100 dark:text-white dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-gray-800 dark:enabled:hover:bg-gray-700" 
          size="mc"
          onClick={() => setIsAddModalOpen(true)}>
            <HiPlus className="mr-2 self-center" />
            Agregar Preguntas
          </Button>
        </div>

        <div className="w-full p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex justify-end items-center pb-2">
            <Select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Select>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Pregunta</Table.HeadCell>
              <Table.HeadCell>Índice Correcto</Table.HeadCell>
              <Table.HeadCell>Justificación</Table.HeadCell>
              <Table.HeadCell>Nombre del Test</Table.HeadCell>
              <Table.HeadCell>Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {questions.length === 0 ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <Table.Row key={`skeleton-${idx}`}>
                    <Table.Cell>
                      <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex space-x-2">
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                questions.map((question) => (
                  <Table.Row key={question.id}>
                    <Table.Cell>{question.question}</Table.Cell>
                    <Table.Cell>{question.correct}</Table.Cell>
                    <Table.Cell>{question.justification}</Table.Cell>
                    <Table.Cell>{question.test.name}</Table.Cell>
                    <Table.Cell>
                      <div className="flex space-x-2">
                        <Button color="success" onClick={() => handleEditQuestion(question)}>
                          <HiPencil />
                        </Button>
                        <Button color="failure" onClick={() => handleDeleteQuestion(question)}>
                          <HiTrash />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
      <AddQuestionModal
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        refreshQuestions={fetchQuestion}
      />
      {selectedQuestion && (
        <EditQuestionModal
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          refreshQuestion={fetchQuestion}
        />
      )}
      {selectedQuestion && (
        <DeleteQuestionModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedQuestion={selectedQuestion}
          refreshQuestion={fetchQuestion}
        />
      )}
    </>
  );
};

export default QuestionComponent;