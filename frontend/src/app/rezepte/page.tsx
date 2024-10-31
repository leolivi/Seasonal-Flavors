import ScrollButton from "@/components/scroll-button/scroll-button";
import CardListWrapper from "@/components/card-list-wrapper/card-list-wrapper";

const Rezepte = () => {
  return (
    <div className="m-4">
      <ScrollButton />
      <h1 className="h-0 opacity-0">Rezepte</h1>
      {/* insert Recipe filter bar */}
      <CardListWrapper />
    </div>
  );
};

export default Rezepte;
