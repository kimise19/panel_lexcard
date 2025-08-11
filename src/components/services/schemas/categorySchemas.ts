// Category Management GraphQL Schemas

export const GET_CATEGORIES_QUERY = `
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

export const CREATE_CATEGORY_MUTATION = `
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

export const UPDATE_CATEGORY_MUTATION = `
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

export const DELETE_CATEGORY_MUTATION = `
  mutation DeleteCategory($id: Int!) {
    deleteCategory(id: $id)
  }
`;
