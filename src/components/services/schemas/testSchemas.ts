// GraphQL queries and mutations for Test operations

export const GET_ALL_TESTS = `
  query GetAllTests($pagination: PaginationInput, $search: String) {
    tests(pagination: $pagination, search: $search) {
      edges {
        node {
          id
          name
          description
          subcategoryId
          subcategory {
            id
            name
            description
          }
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

export const GET_TEST_BY_ID = `
  query GetTestById($id: Int!) {
    test(id: $id) {
      id
      name
      description
      subcategoryId
      subcategory {
        id
        name
        description
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TEST = `
  mutation CreateTest($input: CreateTestInput!) {
    createTest(input: $input) {
      id
      name
      description
      subcategoryId
      subcategory {
        id
        name
        description
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TEST = `
  mutation UpdateTest($input: UpdateTestInput!) {
    updateTest(input: $input) {
      id
      name
      description
      subcategoryId
      subcategory {
        id
        name
        description
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TEST = `
  mutation DeleteTest($id: Int!) {
    deleteTest(id: $id)
  }
`;
