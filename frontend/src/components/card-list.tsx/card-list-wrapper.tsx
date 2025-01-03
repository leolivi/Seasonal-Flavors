"use client";
import { Recipe } from "@/services/recipe/recipeService";
import { CardList } from "@/components/card-list.tsx/card-list";
import { LayoutOptionType } from "@/utils/layout-options";
import { useState, useEffect } from "react";
import { RegisterBanner } from "../banner/register-banner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useFavoritesStore } from "@/stores/useFavoritesStore";

interface CardListWrapperProps {
  cardData?: Recipe[];
  showDetail?: boolean;
  showEdit?: boolean;
  showBookmark?: boolean;
  style?: LayoutOptionType;
  children?: React.ReactNode;
  className?: string;
  isInFavoriteView?: boolean;
  onShowFavorites?: (favorites: Recipe[]) => void;
}

const CardListWrapper = ({
  cardData = [],
  showDetail,
  showBookmark,
  showEdit,
  style,
  children,
  className,
  isInFavoriteView = false,
  onShowFavorites,
}: CardListWrapperProps) => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [showRegisterBanner, setShowRegisterBanner] = useState(false);
  const { toast } = useToast();
  const { loadFavorites, toggleFavorite } = useFavoritesStore();

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      loadFavorites(session.accessToken);
    }
  }, [status, session, loadFavorites]);

  const handleBookmarkClick = async (e: React.MouseEvent, recipeId: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === "unauthenticated") {
      setShowRegisterBanner(true);
      return;
    }

    const recipe = cardData.find((e) => e.id === recipeId);
    if (recipe) {
      await toggleFavorite(recipe, toast, isInFavoriteView, onShowFavorites);
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
    <div className={className}>
      {children}
      {cardData.length > 0 && (
        <CardList
          onBookmarkClick={handleBookmarkClick}
          onEditClick={(e, id) => handleEditClick(e, id)}
          showEdit={showEdit}
          cardData={cardData}
          showDetail={showDetail}
          showBookmark={showBookmark}
          style={style}
        />
      )}

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
            onClose={handleCloseBanner}
          />
        </div>
      )}
    </div>
  );
};

export default CardListWrapper;
