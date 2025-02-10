import { CardLayoutOptionType } from "@/utils/card-layout-options";
import { CardList } from "./card-list";
import { Recipe } from "@/services/recipe/recipeService";
import { RegisterBanner } from "../banner/register-banner";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useRecipes } from "@/hooks/use-recipes";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface CardListWrapperProps {
  cardData?: Recipe[];
  initialRecipes?: Recipe[];
  viewOptions: {
    showDetail?: boolean;
    showEdit?: boolean;
    showBookmark?: boolean;
    style?: CardLayoutOptionType;
  };
  className?: string;
  isInFavoriteView?: boolean;
  onShowFavorites?: (favorites: Recipe[]) => void;
  children?: React.ReactNode;
}

/*
  @desc Wrapper for the card list
*/
const CardListWrapper = ({
  cardData = [],
  initialRecipes = [],
  viewOptions,
  className,
  isInFavoriteView = false,
  onShowFavorites,
  children,
}: CardListWrapperProps) => {
  // get the session
  const { status, data: session } = useSession();

  // get the router and pathname
  const router = useRouter();
  const pathname = usePathname();

  // get the toast
  const { toast } = useToast();

  // get the favorites store
  const { loadFavorites, toggleFavorite } = useFavoritesStore();

  // get the recipes
  const { recipes, setRecipes, deleteRecipe } = useRecipes();
  const [showRegisterBanner, setShowRegisterBanner] = useState(false);

  // check if the page is the my recipes page or the recipes page
  const isMyRecipesPage = pathname === "/my-recipes";
  const isRecipesPage = pathname === "/recipes";
  const displayData = isMyRecipesPage ? recipes : cardData;

  // load the favorites
  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      loadFavorites(session.accessToken);
    }
  }, [status, session, loadFavorites]);

  // load the recipes
  useEffect(() => {
    if ((isMyRecipesPage || isRecipesPage) && initialRecipes.length > 0) {
      setRecipes(initialRecipes);
    }
  }, [initialRecipes, isMyRecipesPage, isRecipesPage, setRecipes]);

  // handle the bookmark click
  const handleBookmarkClick = async (e: React.MouseEvent, recipeId: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === "unauthenticated") {
      setShowRegisterBanner(true);
      return;
    }

    const recipe = displayData.find((r) => r.id === recipeId);
    // toggle favorize recipe
    if (recipe) {
      await toggleFavorite(recipe, toast, isInFavoriteView, onShowFavorites);
    }
  };

  // handle the edit click
  const handleEditClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (status === "authenticated") {
      router.push(`/recipes/edit/${id}`);
    }
  };

  // handlers
  const handlers = {
    onBookmarkClick: handleBookmarkClick,
    onEditClick: handleEditClick,
    deleteRecipe,
  };

  // render the card list
  return (
    <div className={className}>
      {children}
      {/* card list */}
      {displayData.length > 0 && (
        <CardList
          cardData={displayData}
          viewOptions={viewOptions}
          handlers={handlers}
        />
      )}
      {/* register banner */}
      {showRegisterBanner && (
        <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2">
          <RegisterBanner
            content={
              <>
                erstelle deine eigene
                <br />
                Rezeptesammlung!
              </>
            }
            label="anmelden"
            showCloseBtn={true}
            onClose={() => setShowRegisterBanner(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CardListWrapper;
