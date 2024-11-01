import ScrollButton from "@/components/scroll-button/scroll-button";

interface recipeData {
  id: number;
  title: string;
  cooking_time: number;
  prep_time: number;
  servings: number;
  steps: string;
  ingredients: string[];
}

async function getRecipe(id: number) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/recipe?id=${id}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default async function Recipe(id: number) {
  const data: recipeData[] = await getRecipe(id);

  console.log(data);

  return (
    <div className="bg-sfwhite">
      <ScrollButton />
      <h1 className="text-sfblack">Hallo</h1>
    </div>
  );
}
