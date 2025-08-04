import { getAllQuestionsForSubcategory } from '../services/CategoryService';
import { APIQuestion, Question } from '../models/Question';
import { Subcategory } from '../models/Subcategory';

// Get base URL from environment variables
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

// Helper function for image URLs
export const getImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) return '/default-category.webp';
  
  // If the image path already includes http(s), use it as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Remove leading slash if both baseUrl and imagePath have it
  const formattedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  // Combine base URL with image path
  return `${baseUrl}/${formattedPath}`;
};

// Load reviewed questions from localStorage
export const loadReviewedQuestionsFromStorage = () => {
  const savedReviewedQuestions = localStorage.getItem('reviewedQuestions');
  if (savedReviewedQuestions) {
    const reviewedQuestions = JSON.parse(savedReviewedQuestions);
    console.log('Loaded reviewed questions:', reviewedQuestions.length);
    return reviewedQuestions;
  }
  return [];
};

// Save a question as reviewed
export const saveReviewedQuestion = (question: string) => {
  const savedReviewedQuestions = localStorage.getItem('reviewedQuestions');
  const reviewedQuestions = savedReviewedQuestions ? JSON.parse(savedReviewedQuestions) : [];
  if (!reviewedQuestions.includes(question)) {
    reviewedQuestions.push(question);
    localStorage.setItem('reviewedQuestions', JSON.stringify(reviewedQuestions));
  }
};

// Get reviewed questions count for a subcategory
export const getReviewedQuestionsCount = (subcategory: Subcategory) => {
  if (!subcategory.questions) return "0/0";
  const reviewed = subcategory.questions.filter(question => question.reviewed).length;
  return `${reviewed}/${subcategory.questions.length}`;
};

// Convert API question format to our app's format with robust parsing
export const convertApiQuestion = (apiQuestion: APIQuestion): Question => {
  // Parse options and answers if they're strings
  let options: string[];
  
  if (typeof apiQuestion.options === 'string') {
    try {
      options = JSON.parse(apiQuestion.options);
    } catch {
      console.error('Error parsing options string:', apiQuestion.options);
      options = [];
    }
  } else {
    options = apiQuestion.options as string[];
  }
  
  // Make sure we have valid options before proceeding
  if (!Array.isArray(options) || options.length === 0) {
    console.warn('Invalid options for question:', apiQuestion.id);
    options = ['No options available'];
  }
  
  // Create our question object with properly parsed data
  return {
    id: apiQuestion.id,
    question: apiQuestion.question,
    answers: options, 
    correctAnswer: options[apiQuestion.correct] || '',
    explanation: apiQuestion.justification,
    reviewed: false
  };
};

// Fetch questions for a subcategory from API
export const fetchQuestionsBySubcategoryId = async (subcategoryId: number): Promise<Question[]> => {
  try {
    console.log(`Starting multi-step fetch for subcategory ID: ${subcategoryId}`);
    
    // Get all questions from all tests in this subcategory
    const apiQuestions = await getAllQuestionsForSubcategory(subcategoryId);
    console.log(`Received ${apiQuestions.length} questions from the multi-step API flow`);
    
    if (!Array.isArray(apiQuestions)) {
      console.error('Expected array but received:', apiQuestions);
      return [];
    }
    
    // Convert API questions to our app format
    const convertedQuestions = apiQuestions.map(q => convertApiQuestion(q));
    console.log(`Converted ${convertedQuestions.length} questions to app format`);
    
    return convertedQuestions;
  } catch (error) {
    console.error("Error in fetchQuestionsBySubcategoryId:", error);
    return []; // Return empty array on error
  }
};