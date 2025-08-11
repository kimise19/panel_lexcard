// Subcategory Management GraphQL Schemas

export const GET_SUBCATEGORIES_QUERY = `
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

export const CREATE_SUBCATEGORY_MUTATION = `
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

export const UPDATE_SUBCATEGORY_MUTATION = `
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

export const DELETE_SUBCATEGORY_MUTATION = `
  mutation DeleteSubcategory($id: Int!) {
    deleteSubcategory(id: $id)
  }
`;
