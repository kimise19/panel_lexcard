// GraphQL client service for authentication and user management
import { getStorageItem } from "../utils/StorageUtils";

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

// GraphQL Mutations and Queries
const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      user {
        id
        displayName
        email
        roles
        verified
      }
    }
  }
`;

const REGISTER_MUTATION = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      access_token
      user {
        id
        displayName
        email
        roles
        verified
      }
    }
  }
`;

const GET_PROFILE_QUERY = `
  query GetProfile {
    me {
      id
      displayName
      email
      roles
      verified
    }
  }
`;

const RESET_PASSWORD_MUTATION = `
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`;

const CHANGE_PASSWORD_MUTATION = `
  mutation ChangePassword($newPassword: String!) {
    changePassword(newPassword: $newPassword)
  }
`;

const CHANGE_PASSWORD_WITH_TOKEN_MUTATION = `
  mutation ChangePasswordWithToken($token: String!, $newPassword: String!) {
    changePasswordWithToken(token: $token, newPassword: $newPassword)
  }
`;

const VERIFY_EMAIL_MUTATION = `
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;

const LOGOUT_MUTATION = `
  mutation Logout {
    logout
  }
`;

// Types based on GraphQL schema
export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  displayName: string;
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  email: string;
}

export interface AuthPayload {
  access_token: string;
  user: {
    id: number;
    displayName: string;
    email: string;
    roles: string[];
    verified: boolean;
  };
}

export interface Profile {
  id: number;
  displayName: string;
  email: string;
  roles: string[];
  verified: boolean;
}

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

// Category Management GraphQL Operations
const GET_CATEGORIES_QUERY = `
  query GetCategories($pagination: PaginationInput, $search: String) {
    categories(pagination: $pagination, search: $search) {
      edges {
        node {
          id
          name
          description
          image
          createdAt
          updatedAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

const CREATE_CATEGORY_MUTATION = `
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_CATEGORY_MUTATION = `
  mutation UpdateCategory($id: Int!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;

const DELETE_CATEGORY_MUTATION = `
  mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
`;

// Subcategory Management GraphQL Operations
const GET_SUBCATEGORIES_QUERY = `
  query GetSubcategories($pagination: PaginationInput, $search: String) {
    subcategories(pagination: $pagination, search: $search) {
      edges {
        node {
          id
          name
          description
          categoryId
          createdAt
          updatedAt
          category {
            id
            name
            description
            image
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

const CREATE_SUBCATEGORY_MUTATION = `
  mutation CreateSubcategory($input: CreateSubcategoryInput!) {
    createSubcategory(input: $input) {
      id
      name
      description
      categoryId
      createdAt
      updatedAt
      category {
        id
        name
        description
        image
      }
    }
  }
`;

const UPDATE_SUBCATEGORY_MUTATION = `
  mutation UpdateSubcategory($id: Int!, $input: UpdateSubcategoryInput!) {
    updateSubcategory(id: $id, input: $input) {
      id
      name
      description
      categoryId
      createdAt
      updatedAt
      category {
        id
        name
        description
        image
      }
    }
  }
`;

const DELETE_SUBCATEGORY_MUTATION = `
  mutation DeleteSubcategory($id: Int!) {
    deleteSubcategory(id: $id)
  }
`;

// Question Management GraphQL Operations
const GET_QUESTIONS_QUERY = `
  query GetQuestions($pagination: PaginationInput, $search: String) {
    questions(pagination: $pagination, search: $search) {
      edges {
        node {
          id
          question
          options
          answers
          correct
          justification
          score
          type
          testId
          createdAt
          updatedAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

const CREATE_QUESTION_MUTATION = `
  mutation CreateQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
      question
      options
      answers
      correct
      justification
      score
      type
      testId
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_QUESTION_MUTATION = `
  mutation UpdateQuestion($id: Int!, $input: UpdateQuestionInput!) {
    updateQuestion(id: $id, input: $input) {
      id
      question
      options
      answers
      correct
      justification
      score
      type
      testId
      createdAt
      updatedAt
    }
  }
`;

const DELETE_QUESTION_MUTATION = `
  mutation DeleteQuestion($id: Int!) {
    deleteQuestion(id: $id)
  }
`;

// Category Types
export interface PaginationInput {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
}

export interface CategoryGraphQL {
  id: number;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryEdge {
  node: CategoryGraphQL;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface CategoryConnection {
  edges: CategoryEdge[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
  image?: File;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
  image?: File;
}

// Subcategory Types
export interface SubcategoryGraphQL {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    description?: string;
    image?: string;
  };
}

export interface SubcategoryEdge {
  node: SubcategoryGraphQL;
}

export interface SubcategoryConnection {
  edges: SubcategoryEdge[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface CreateSubcategoryInput {
  name: string;
  description?: string;
  categoryId: number;
}

export interface UpdateSubcategoryInput {
  name?: string;
  description?: string;
  categoryId?: number;
}

// Question Types
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SINGLE_CHOICE = 'SINGLE_CHOICE'
}

export interface QuestionGraphQL {
  id: number;
  question: string;
  options: string[];
  answers: string[];
  correct: string[];
  justification: string;
  score: number;
  type: QuestionType;
  testId: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionEdge {
  node: QuestionGraphQL;
}

export interface QuestionConnection {
  edges: QuestionEdge[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface CreateQuestionInput {
  question: string;
  options: string[];
  answers: string[];
  correct: string[];
  justification: string;
  score: number;
  type: QuestionType;
  testId: number;
}

export interface UpdateQuestionInput {
  question?: string;
  options?: string[];
  answers?: string[];
  correct?: string[];
  justification?: string;
  score?: number;
  type?: QuestionType;
  testId?: number;
}

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
