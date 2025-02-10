/*
  @desc Core data interfaces for the application
*/

// User data interface
export interface UserData {
  id: number;
  username: string;
  email: string;
  imageSrc?: string;
  accessToken?: string;
}

// Recipe data interface
export interface RecipeData {
  id: number;
  title: string;
  cooking_time: number;
  prep_time: number;
  servings: number;
  steps: string;
  ingredients: string;
  user_id: string;
  image_id?: number;
  imageSrc?: string;
  imageAlt?: string;
  season?: string | number[];
}

// Image data interface
export interface ImageData {
  id: number;
  file_path: string;
  alt_text: string;
}

// Tag data interface
export interface TagData {
  name: string;
  id: number;
}
