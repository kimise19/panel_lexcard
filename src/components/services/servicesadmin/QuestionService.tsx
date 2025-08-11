import {APIQuestion} from "../../models/modelsadmin/Question";
import { 
  createQuestionGraphQL, 
  updateQuestionGraphQL, 
  deleteQuestionGraphQL,
  getQuestionsGraphQL
} from '../GraphQLService';
import {
  CreateQuestionInput,
  UpdateQuestionInput,
  QuestionConnection,
  QuestionGraphQL,
  PaginationInput,
  QuestionType
} from '../types';

// Función para convertir QuestionGraphQL a APIQuestion para el admin
const convertGraphQLQuestionToAPIQuestion = (graphqlQuestion: QuestionGraphQL): APIQuestion => {
  // Convertir correct array a índice para compatibilidad con el modelo existente
  let correctIndex = 0;
  if (graphqlQuestion.correct.length > 0 && graphqlQuestion.options.length > 0) {
    correctIndex = graphqlQuestion.options.findIndex(option => 
      graphqlQuestion.correct.includes(option)
    );
    if (correctIndex === -1) correctIndex = 0;
  }

  return {
    id: graphqlQuestion.id,
    question: graphqlQuestion.question,
    options: graphqlQuestion.options,
    answers: graphqlQuestion.answers,
    correct: correctIndex,
    justification: graphqlQuestion.justification,
    score: graphqlQuestion.score,
    createdAt: graphqlQuestion.createdAt,
    updatedAt: graphqlQuestion.updatedAt,
    testId: graphqlQuestion.testId,
    test: {
      id: 0, // Placeholder - would need to be populated if needed
      name: "",
      description: "",
      createdAt: "",
      updatedAt: "",
      subcategoryId: 0
    }
  };
};

// Función para convertir APIQuestion a CreateQuestionInput
const convertAPIQuestionToCreateInput = (apiQuestion: APIQuestion): CreateQuestionInput => {
  // Convertir correct index a array de strings para GraphQL
  const options = Array.isArray(apiQuestion.options) ? 
    apiQuestion.options : 
    (typeof apiQuestion.options === 'string' ? JSON.parse(apiQuestion.options) : []);
  
  const answers = Array.isArray(apiQuestion.answers) ? 
    apiQuestion.answers : 
    (typeof apiQuestion.answers === 'string' ? JSON.parse(apiQuestion.answers) : []);

  const correctOptions = typeof apiQuestion.correct === 'number' && options[apiQuestion.correct] ? 
    [options[apiQuestion.correct]] : 
    [];

  return {
    question: apiQuestion.question,
    options,
    answers,
    correct: correctOptions,
    justification: apiQuestion.justification,
    score: apiQuestion.score,
    testId: apiQuestion.testId,
    type: QuestionType.MULTIPLE_CHOICE // Default type, puede ser configurado
  };
};

export const allQuestion = async (
    pageSize: number = 10,
    search: string = ""
): Promise<{ items: APIQuestion[]; totalPages: number; totalItems: number }> => {
    try {
        const pagination: PaginationInput = {
            first: pageSize,
        };

        const result: QuestionConnection = await getQuestionsGraphQL(pagination, search);
        
        const questions = result.edges.map(edge => convertGraphQLQuestionToAPIQuestion(edge.node));
        
        // Calcular total de páginas basado en totalCount y pageSize
        const totalPages = Math.ceil(result.totalCount / pageSize);
        
        return {
            items: questions,
            totalPages,
            totalItems: result.totalCount
        };
    } catch (error) {
        console.error("Error fetching questions:", error);
        throw new Error(
            error instanceof Error ? error.message : "Error al obtener las preguntas"
        );
    }
};

export const createQuestion = async (question: APIQuestion): Promise<APIQuestion> => {
    try {
        const input = convertAPIQuestionToCreateInput(question);
        const result = await createQuestionGraphQL(input);
        
        return convertGraphQLQuestionToAPIQuestion(result);
    } catch (error) {
        console.error("Error creating question:", error);
        throw new Error(
            error instanceof Error ? error.message : "No se pudo crear la pregunta"
        );
    }
};

export const updateQuestionById = async (questionId: string, question: APIQuestion): Promise<APIQuestion> => {
    try {
        const input: UpdateQuestionInput = {
            question: question.question,
            options: Array.isArray(question.options) ? 
                question.options : 
                (typeof question.options === 'string' ? JSON.parse(question.options) : []),
            answers: Array.isArray(question.answers) ? 
                question.answers : 
                (typeof question.answers === 'string' ? JSON.parse(question.answers) : []),
            correct: typeof question.correct === 'number' && Array.isArray(question.options) ? 
                [question.options[question.correct]] : 
                [],
            justification: question.justification,
            score: question.score,
            testId: question.testId,
            type: QuestionType.MULTIPLE_CHOICE
        };

        const result = await updateQuestionGraphQL(parseInt(questionId), input);
        
        return convertGraphQLQuestionToAPIQuestion(result);
    } catch (error) {
        console.error("Error updating question:", error);
        throw new Error(
            error instanceof Error ? error.message : "No se pudo actualizar la pregunta"
        );
    }
};

export const deleteQuestionById = async (questionId: string): Promise<void> => {
    try {
        await deleteQuestionGraphQL(parseInt(questionId));
    } catch (error) {
        console.error("Error deleting question:", error);
        throw new Error(
            error instanceof Error ? error.message : "No se pudo eliminar la pregunta"
        );
    }
};