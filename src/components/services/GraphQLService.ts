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
  image?: string;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
  image?: string;
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
  const result = await graphqlRequest<{ createCategory: CategoryGraphQL }>(
    CREATE_CATEGORY_MUTATION,
    { input }
  );
  return result.createCategory;
};

export const updateCategoryGraphQL = async (
  id: number,
  input: UpdateCategoryInput
): Promise<CategoryGraphQL> => {
  const result = await graphqlRequest<{ updateCategory: CategoryGraphQL }>(
    UPDATE_CATEGORY_MUTATION,
    { id, input }
  );
  return result.updateCategory;
};

export const deleteCategoryGraphQL = async (id: number): Promise<void> => {
  await graphqlRequest<{ deleteCategory: boolean }>(DELETE_CATEGORY_MUTATION, { id });
};
