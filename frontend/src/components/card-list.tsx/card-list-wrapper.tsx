"use client";
import { Recipe } from "@/services/recipe/recipeService";
import { CardList } from "@/components/card-list.tsx/card-list";
import { LayoutOptionType } from "@/utils/layout-options";
import { useState, useEffect } from "react";
import { RegisterBanner } from "../banner/register-banner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { handleFavoriteRecipe } from "@/services/user/favoriteCreate";
import { useToast } from "@/hooks/use-toast";
import { getUserFavorites } from "@/services/user/userService";

interface CardListWrapperProps {
  cardData: Recipe[];
  showDetail?: boolean;
  showEdit?: boolean;
  showBookmark?: boolean;
  style?: LayoutOptionType;
}

const CardListWrapper = ({
  cardData,
  showDetail,
  showBookmark,
  showEdit,
  style,
}: CardListWrapperProps) => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [showRegisterBanner, setShowRegisterBanner] = useState(false);
  const { toast } = useToast();
  const [userFavorites, setUserFavorites] = useState<number[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      if (
        status === "authenticated" &&
        session?.accessToken &&
        session.user?.id
      ) {
        const favorites = await getUserFavorites(
          session.user.id,
          session.accessToken,
        );
        setUserFavorites(favorites.map((f) => f.id));
      }
    };
    loadFavorites();
  }, [status, session]);

  const handleBookmarkClick = async (e: React.MouseEvent, recipeId: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === "unauthenticated") {
      setShowRegisterBanner(true);
    } else {
      const success = await handleFavoriteRecipe({
        recipeId,
        accessToken: session?.accessToken || "",
        toast,
        isFavorited: userFavorites.includes(recipeId),
      });

      if (success) {
        setUserFavorites((prev) =>
          prev.includes(recipeId)
            ? prev.filter((id) => id !== recipeId)
            : [...prev, recipeId],
        );
      }
    }
  };

  const handleEditClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (status === "authenticated") {
      router.push(`/recipes/edit/${id}`);
    }
  };

  const handleCloseBanner = () => {
    setShowRegisterBanner(false);
  };

  return (
    <div>
      <CardList
        onBookmarkClick={handleBookmarkClick}
        onEditClick={(e, id) => handleEditClick(e, id)}
        showEdit={showEdit}
        cardData={cardData}
        showDetail={showDetail}
        showBookmark={showBookmark}
        style={style}
      />

      {showRegisterBanner && (
        <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2">
          <RegisterBanner
            label="anmelden"
            showCloseBtn={true}
            onClose={handleCloseBanner}
          />
        </div>
      )}
    </div>
  );
};

export default CardListWrapper;
