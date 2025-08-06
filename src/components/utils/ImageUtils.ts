// Utility functions for handling image conversions between File and string

/**
 * Converts a File to a base64 string
 * @param file - The file to convert
 * @returns Promise that resolves to base64 string
 */
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Converts a base64 string to a File object
 * @param base64String - The base64 string to convert
 * @param filename - The filename for the resulting File
 * @returns File object
 */
export const convertBase64ToFile = (base64String: string, filename: string): File => {
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

/**
 * Gets image URL from string (handles both URLs and base64)
 * @param imageString - The image string from GraphQL
 * @returns URL that can be used in img src
 */
export const getImageUrlFromString = (imageString: string): string => {
  // If it's already a data URL (base64), return as is
  if (imageString.startsWith('data:')) {
    return imageString;
  }
  
  // If it's a relative URL, prepend base URL
  if (imageString.startsWith('/')) {
    const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
    return `${baseUrl}${imageString}`;
  }
  
  // If it's already a full URL, return as is
  return imageString;
};
