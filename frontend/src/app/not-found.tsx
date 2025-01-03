import Image from "next/image";
import NotFoundImage from "@/assets/images/404-image.png";
import { Typography } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <div className="flex justify-center">
        <Image src={NotFoundImage} alt="404 Image" width={300} height={100} />
      </div>
      <Typography variant="heading3" className="mt-8 text-sfblack">
        <h1 className="font-figtreeRegular">
          Oh nein! Diese Seite ist verbrannt...
        </h1>
      </Typography>
      <Typography variant="small" className="font-figtreeRegular text-sfblack">
        <p>
          Der Toast braucht so lange. Du starrst den Toaster an und tippst mit
          den Füßen. Deine Wäsche ist im Trockner und es hat gerade geklingelt.
          Vielleicht nimmst du sie heraus. Schließlich hast du ja Zeit. Du
          nimmst deine Wäsche heraus. Du faltest deine Unterwäsche. Du denkst
          daran, deine Socken zu falten. Du denkst an deinen Toast! Es ist zu
          spät. Er ist knusprig verbrannt.
        </p>
      </Typography>
    </div>
  );
}
