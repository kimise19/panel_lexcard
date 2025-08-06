import { Category } from "../models/Category";
import { APIQuestion } from "../models/Question";
import { SubcategoryDetail } from "../models/Subcategory";
import { Test } from "../models/Tets";
import { 
  getCategoriesGraphQL, 
  CategoryConnection, 
  CategoryGraphQL, 
  PaginationInput 
} from "./GraphQLService";

// Función para convertir CategoryGraphQL a Category
const convertGraphQLCategoryToCategory = (graphqlCategory: CategoryGraphQL): Category => {
  return {
    id: graphqlCategory.id,
    name: graphqlCategory.name,
    description: graphqlCategory.description || "",
    image: null, // GraphQL devuelve string, pero el modelo espera File|null
    createdAt: graphqlCategory.createdAt,
    updatedAt: graphqlCategory.updatedAt,
    subcategories: [] // Las subcategorías se cargan por separado
  };
};

// Obtener todas las categorías usando GraphQL
export const getAllCategories = async (
  pageSize: number = 10,
  search?: string
): Promise<{ items: Category[]; totalPages: number; totalItems: number }> => {
  try {
    const pagination: PaginationInput = {
      first: pageSize,
      // Si necesitas implementar paginación offset, puedes usar after con cursor
    };

    const result: CategoryConnection = await getCategoriesGraphQL(pagination, search);
    
    const categories = result.edges.map(edge => convertGraphQLCategoryToCategory(edge.node));
    
    // Calcular total de páginas basado en totalCount y pageSize
    const totalPages = Math.ceil(result.totalCount / pageSize);
    
    return {
      items: categories,
      totalPages,
      totalItems: result.totalCount
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(
      error instanceof Error ? error.message : "Error al obtener las categorías"
    );
  }
};

// Paso 1: Obtener detalles de la subcategoría con pruebas
export const getSubcategoryDetails = async (subcategoryId: number): Promise<SubcategoryDetail> => {
  console.log(`Fetching subcategory details for ID: ${subcategoryId}`);
  const response = await fetch(`/api/subcategories/${subcategoryId}`);
  
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      errorResponse.message || "La respuesta de la red no fue satisfactoria"
    );
  }
  
  const data: SubcategoryDetail = await response.json();
  console.log('Subcategory details:', data);
  return data;
};

// Paso 2: Obtener detalles de la prueba con preguntas
export const getTestDetails = async (testId: number): Promise<Test> => {
  console.log(`Fetching test details for ID: ${testId}`);
  const response = await fetch(`/api/tests/${testId}`);
  
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(
      errorResponse.message || "La respuesta de la red no fue satisfactoria"
    );
  }
  
  const data: Test = await response.json();
  console.log('Test details:', data);
  
  // Parsear campos JSON en string si es necesario
  if (data.questions && Array.isArray(data.questions)) {
    data.questions = data.questions.map(question => ({
      ...question,
      options: typeof question.options === 'string' ? JSON.parse(question.options) : question.options,
      answers: typeof question.answers === 'string' ? JSON.parse(question.answers) : question.answers
    }));
  }
  
  return data;
};

// Paso 3: Obtener todas las preguntas para una subcategoría a través de sus pruebas
export const getAllQuestionsForSubcategory = async (subcategoryId: number): Promise<APIQuestion[]> => {
  // Primero obtener detalles de la subcategoría que incluye IDs de pruebas
  const subcategoryDetails = await getSubcategoryDetails(subcategoryId);
  
  if (!subcategoryDetails.tests || subcategoryDetails.tests.length === 0) {
    console.log(`No tests found for subcategory ${subcategoryId}`);
    return [];
  }
  
  // Obtener cada prueba para obtener sus preguntas
  const allQuestions: APIQuestion[] = [];
  
  for (const test of subcategoryDetails.tests) {
    const testDetails = await getTestDetails(test.id);
    if (testDetails.questions && testDetails.questions.length > 0) {
      allQuestions.push(...testDetails.questions);
    }
  }
  
  console.log(`Found ${allQuestions.length} questions in ${subcategoryDetails.tests.length} tests`);
  return allQuestions;
};

// Mantener las otras funciones...

///////