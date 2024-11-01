// import ScrollButton from "@/components/scroll-button/scroll-button";
import dataFetch from "@/utils/data-fetch";

interface RecipeData {
  id: number;
  title: string;
  cooking_time: number;
  prep_time: number;
  servings: number;
  steps: string;
  ingredients: string[];
  user_id: string;
}

// Fetch specific recipe details from the API
async function getRecipeDetail(id: number) {
  const response = await dataFetch(`http://127.0.0.1:8000/api/recipe?id=${id}`);
  return Array.isArray(response) ? response[0] : response;
}

export default async function Recipe({ params }: { params: { id: number } }) {
  const data: RecipeData = await getRecipeDetail(params.id);

  console.log("Fetched Data:", data);

  return (
    <div className="bg-sfwhite">
      {/* <ScrollButton /> */}
      <h1 className="text-sfblack">Title: {data.title}</h1>
      <p className="text-sfblack">Recipe ID: {data.id}</p>
      <p className="text-sfblack">Cooking Time: {data.cooking_time} mins</p>
      <p className="text-sfblack">Created by: {data.user_id}</p>
    </div>
  );
}
