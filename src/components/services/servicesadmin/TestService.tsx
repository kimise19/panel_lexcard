import { 
  getTestsGraphQL,
  getTestByIdGraphQL,
  createTestGraphQL,
  updateTestGraphQL,
  deleteTestGraphQL
} from '../GraphQLService';
import { 
  Test, 
  TestConnection,
  CreateTestInput, 
  UpdateTestInput 
} from '../types';

export const allTest = async (): Promise<Test[]> => {
  try {
    const connection: TestConnection = await getTestsGraphQL();
    return connection.edges.map(edge => edge.node);
  } catch (error) {
    console.error('Error fetching tests:', error);
    throw error;
  }
};

export const getTestById = async (id: number): Promise<Test> => {
  try {
    return await getTestByIdGraphQL(id);
  } catch (error) {
    console.error('Error fetching test by id:', error);
    throw error;
  }
};

export const createTest = async (input: CreateTestInput): Promise<Test> => {
  try {
    return await createTestGraphQL(input);
  } catch (error) {
    console.error('Error creating test:', error);
    throw error;
  }
};

export const updateTestById = async (input: UpdateTestInput): Promise<Test> => {
  try {
    return await updateTestGraphQL(input);
  } catch (error) {
    console.error('Error updating test:', error);
    throw error;
  }
};

export const deleteTestById = async (id: number): Promise<boolean> => {
  try {
    return await deleteTestGraphQL(id);
  } catch (error) {
    console.error('Error deleting test:', error);
    throw error;
  }
};