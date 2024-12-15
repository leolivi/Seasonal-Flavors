import { authConfig } from "@/auth";
import { dataFetch, dataFetchWithToken } from "@/utils/data-fetch";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import CreateRecipeFormWrapper from "@/components/create-recipe-form-wrapper/create-recipe-form-wrapper";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { Typography } from "@/components/ui/typography";
import ScrollButton from "@/components/scroll-button/scroll-button";
import Link from "next/link";

async function getRecipeDetail(recipeId: number) {
  try {
    const response = await dataFetch(
      `${process.env.BACKEND_URL}/api/recipe?id=${recipeId}`,
    );
    console.log("API Response:", response);

    if (!response || response.length === 0) {
      throw new Error("Recipe not found");
    }

    return Array.isArray(response) ? response[0] : response;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}

async function getCurrentUser() {
  const session = await getServerSession(authConfig);

  if (!session || !session.accessToken) {
    return null;
  }

  const user = await dataFetchWithToken(
    `${process.env.BACKEND_URL}/api/user`,
    session.accessToken,
  );

  console.log("Session:", session);
  console.log("User data:", user);

  return user;
}

export default async function EditRecipePage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const data = await getRecipeDetail(id);
  const user = await getCurrentUser();

  if (!data || !user) {
    return notFound();
  }

  console.log("Recipe data:", data);
  console.log("User:", user);

  return user.id === data.user_id ? (
    <div className="px-4 pb-16 pt-8 min-[640px]:p-8 min-[640px]:pb-24">
      <ScrollButton />
      <div className="mt-8 w-fit cursor-pointer">
        <Link href={"/my-recipes"}>
          <button aria-label="Go back">
            {" "}
            <ArrowLeft />
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center px-2 min-[640px]:px-6">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1>Rezept bearbeiten</h1>
        </Typography>
      </div>
      <div className="flex justify-center">
        <CreateRecipeFormWrapper data={data} />
      </div>
    </div>
  ) : (
    notFound()
  );
}
