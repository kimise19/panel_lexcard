// GraphQL client service for authentication and user management
import { getStorageItem } from "../utils/StorageUtils";
import {
  // Auth schemas
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  GET_PROFILE_QUERY,
  RESET_PASSWORD_MUTATION,
  CHANGE_PASSWORD_MUTATION,
  CHANGE_PASSWORD_WITH_TOKEN_MUTATION,
  VERIFY_EMAIL_MUTATION,
  LOGOUT_MUTATION,
  // Category schemas
  GET_CATEGORIES_QUERY,
  CREATE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
  // Subcategory schemas
  GET_SUBCATEGORIES_QUERY,
  CREATE_SUBCATEGORY_MUTATION,
  UPDATE_SUBCATEGORY_MUTATION,
  DELETE_SUBCATEGORY_MUTATION,
  // Question schemas
  GET_QUESTIONS_QUERY,
  CREATE_QUESTION_MUTATION,
  UPDATE_QUESTION_MUTATION,
  DELETE_QUESTION_MUTATION
} from './schemas';
import {
  // Auth types
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  AuthPayload,
  Profile,
  // Common types
  PaginationInput,
  // Category types
  CategoryGraphQL,
  CategoryConnection,
  CreateCategoryInput,
  UpdateCategoryInput,
  // Subcategory types
  SubcategoryGraphQL,
  SubcategoryConnection,
  CreateSubcategoryInput,
  UpdateSubcategoryInput,
  // Question types
  QuestionGraphQL,
  QuestionConnection,
  CreateQuestionInput,
  UpdateQuestionInput
} from './types';

// Get base URL from environment variables
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
const GRAPHQL_ENDPOINT = `${baseUrl}/graphql`;

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    extensions?: Record<string, unknown>;
  }>;
}

// Helper function to make GraphQL requests
const graphqlRequest = async <T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> => {
  const token = getStorageItem("authToken");
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add authorization header if token exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers,
    credentials: "include",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  if (!result.data) {
    throw new Error("No data received from GraphQL server");
  }

  return result.data;
};

// Helper function for multipart form data requests (for file uploads)
// Follows GraphQL multipart request specification
const multipartGraphQLRequest = async <T>(
  query: string,
  variables?: Record<string, unknown>,
  files?: Record<string, File>
): Promise<T> => {
  const token = getStorageItem("authToken");
  
  const formData = new FormData();
  
  // Prepare operations (GraphQL query and variables with null for files)
  const operations = {
    query,
    variables: variables || {}
  };
  
  formData.append('operations', JSON.stringify(operations));

  // Add file map for GraphQL multipart specification
  if (files && Object.keys(files).length > 0) {
    const map: Record<string, string[]> = {};
    let fileIndex = 0;
    
    Object.keys(files).forEach(key => {
      map[fileIndex.toString()] = [`variables.${key}`];
      formData.append(fileIndex.toString(), files[key]);
      fileIndex++;
    });
    
    formData.append('map', JSON.stringify(map));
  }

  const headers: Record<string, string> = {};

  // Add authorization header if token exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  // Add Apollo preflight header for GraphQL multipart
  headers["Apollo-Require-Preflight"] = "true";

  // Note: Don't set Content-Type for FormData, let the browser set it with boundary

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers,
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  if (!result.data) {
    throw new Error("No data received from GraphQL server");
  }

  return result.data;
};

// Service functions
export const loginGraphQL = async (email: string, password: string): Promise<AuthPayload> => {
  const input: LoginInput = { email, password };
  const result = await graphqlRequest<{ login: AuthPayload }>(LOGIN_MUTATION, { input });
  return result.login;
};

export const registerGraphQL = async (userData: RegisterInput): Promise<AuthPayload> => {
  const result = await graphqlRequest<{ register: AuthPayload }>(REGISTER_MUTATION, { input: userData });
  return result.register;
};

export const getProfileGraphQL = async (): Promise<Profile> => {
  const result = await graphqlRequest<{ me: Profile }>(GET_PROFILE_QUERY);
  return result.me;
};

export const logoutGraphQL = async (): Promise<void> => {
  await graphqlRequest<{ logout: boolean }>(LOGOUT_MUTATION);
};

export const resetPasswordGraphQL = async (email: string): Promise<void> => {
  const input: ResetPasswordInput = { email };
  await graphqlRequest<{ resetPassword: boolean }>(RESET_PASSWORD_MUTATION, { input });
};

export const changePasswordGraphQL = async (newPassword: string): Promise<void> => {
  await graphqlRequest<{ changePassword: boolean }>(CHANGE_PASSWORD_MUTATION, { newPassword });
};

export const changePasswordWithTokenGraphQL = async (
  token: string,
  newPassword: string
): Promise<void> => {
  await graphqlRequest<{ changePasswordWithToken: boolean }>(
    CHANGE_PASSWORD_WITH_TOKEN_MUTATION,
    { token, newPassword }
  );
};

export const verifyEmailGraphQL = async (token: string): Promise<void> => {
  await graphqlRequest<{ verifyEmail: boolean }>(VERIFY_EMAIL_MUTATION, { token });
};

// Category Service Functions
export const getCategoriesGraphQL = async (
  pagination?: PaginationInput,
  search?: string
): Promise<CategoryConnection> => {
  const result = await graphqlRequest<{ categories: CategoryConnection }>(
    GET_CATEGORIES_QUERY,
    { pagination, search }
  );
  return result.categories;
};

export const createCategoryGraphQL = async (
  input: CreateCategoryInput
): Promise<CategoryGraphQL> => {
  // Si hay un archivo, usar multipart siguiendo el patrón del script de prueba
  if (input.image) {
    // Preparar variables con image como null (será reemplazado por el mapeo)
    const variables = { 
      input: { 
        name: input.name, 
        description: input.description,
        image: null 
      } 
    };
    
    // Mapeo de archivos siguiendo el patrón: "0": ["variables.input.image"]
    const files = { 'input.image': input.image };
    
    const result = await multipartGraphQLRequest<{ createCategory: CategoryGraphQL }>(
      CREATE_CATEGORY_MUTATION,
      variables,
      files
    );
    return result.createCategory;
  } else {
    // Crear input sin el campo image si no hay archivo
    const inputWithoutFile = {
      name: input.name,
      description: input.description
    };
    
    const result = await graphqlRequest<{ createCategory: CategoryGraphQL }>(
      CREATE_CATEGORY_MUTATION,
      { input: inputWithoutFile }
    );
    return result.createCategory;
  }
};

export const updateCategoryGraphQL = async (
  id: number,
  input: UpdateCategoryInput
): Promise<CategoryGraphQL> => {
  // Si hay un archivo, usar multipart siguiendo el patrón del script de prueba
  if (input.image) {
    // Preparar variables con image como null (será reemplazado por el mapeo)
    const inputForGraphQL: Record<string, unknown> = {};
    if (input.name !== undefined) inputForGraphQL.name = input.name;
    if (input.description !== undefined) inputForGraphQL.description = input.description;
    inputForGraphQL.image = null;
    
    const variables = { id, input: inputForGraphQL };
    const files = { 'input.image': input.image };
    
    const result = await multipartGraphQLRequest<{ updateCategory: CategoryGraphQL }>(
      UPDATE_CATEGORY_MUTATION,
      variables,
      files
    );
    return result.updateCategory;
  } else {
    // Crear input sin el campo image si no hay archivo
    const inputWithoutFile: Partial<UpdateCategoryInput> = {};
    if (input.name !== undefined) inputWithoutFile.name = input.name;
    if (input.description !== undefined) inputWithoutFile.description = input.description;
    
    const result = await graphqlRequest<{ updateCategory: CategoryGraphQL }>(
      UPDATE_CATEGORY_MUTATION,
      { id, input: inputWithoutFile }
    );
    return result.updateCategory;
  }
};

export const deleteCategoryGraphQL = async (id: number): Promise<void> => {
  await graphqlRequest<{ deleteCategory: boolean }>(DELETE_CATEGORY_MUTATION, { id });
};

// Subcategory Service Functions
export const getSubcategoriesGraphQL = async (
  pagination?: PaginationInput,
  search?: string
): Promise<SubcategoryConnection> => {
  const result = await graphqlRequest<{ subcategories: SubcategoryConnection }>(
    GET_SUBCATEGORIES_QUERY,
    { pagination, search }
  );
  return result.subcategories;
};

export const createSubcategoryGraphQL = async (
  input: CreateSubcategoryInput
): Promise<SubcategoryGraphQL> => {
  const result = await graphqlRequest<{ createSubcategory: SubcategoryGraphQL }>(
    CREATE_SUBCATEGORY_MUTATION,
    { input }
  );
  return result.createSubcategory;
};

export const updateSubcategoryGraphQL = async (
  id: number,
  input: UpdateSubcategoryInput
): Promise<SubcategoryGraphQL> => {
  const result = await graphqlRequest<{ updateSubcategory: SubcategoryGraphQL }>(
    UPDATE_SUBCATEGORY_MUTATION,
    { id, input }
  );
  return result.updateSubcategory;
};

export const deleteSubcategoryGraphQL = async (id: number): Promise<void> => {
  await graphqlRequest<{ deleteSubcategory: boolean }>(DELETE_SUBCATEGORY_MUTATION, { id });
};

// Question Service Functions
export const getQuestionsGraphQL = async (
  pagination?: PaginationInput,
  search?: string
): Promise<QuestionConnection> => {
  const result = await graphqlRequest<{ questions: QuestionConnection }>(
    GET_QUESTIONS_QUERY,
    { pagination, search }
  );
  return result.questions;
};

export const createQuestionGraphQL = async (
  input: CreateQuestionInput
): Promise<QuestionGraphQL> => {
  const result = await graphqlRequest<{ createQuestion: QuestionGraphQL }>(
    CREATE_QUESTION_MUTATION,
    { input }
  );
  return result.createQuestion;
};

export const updateQuestionGraphQL = async (
  id: number,
  input: UpdateQuestionInput
): Promise<QuestionGraphQL> => {
  const result = await graphqlRequest<{ updateQuestion: QuestionGraphQL }>(
    UPDATE_QUESTION_MUTATION,
    { id, input }
  );
  return result.updateQuestion;
};

export const deleteQuestionGraphQL = async (id: number): Promise<void> => {
  await graphqlRequest<{ deleteQuestion: boolean }>(DELETE_QUESTION_MUTATION, { id });
};
