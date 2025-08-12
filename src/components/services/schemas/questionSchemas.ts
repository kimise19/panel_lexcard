// Question Management GraphQL Schemas

export const GET_QUESTIONS_QUERY = `
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

export const CREATE_QUESTION_MUTATION = `
  mutation CreateQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
      question
      options
      answers
      correct
      justification
      type
      testId
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_QUESTION_MUTATION = `
  mutation UpdateQuestion($id: Int!, $input: UpdateQuestionInput!) {
    updateQuestion(id: $id, input: $input) {
      id
      question
      options
      answers
      correct
      justification
      type
      testId
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_QUESTION_MUTATION = `
  mutation DeleteQuestion($id: Int!) {
    deleteQuestion(id: $id)
  }
`;
