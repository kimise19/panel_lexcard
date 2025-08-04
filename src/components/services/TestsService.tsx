import {TestResponse} from '../models/Tets';
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


export const getAllTests = async (): Promise<TestResponse> => {
    try {
        const response = await fetch(`${baseUrl}/api/tests`);
        if(!response.ok){
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "La respuesta de la red no fue satisfactoria");
        }
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.error('Error fetching subcategory details:', error);
        throw error;
    }
};