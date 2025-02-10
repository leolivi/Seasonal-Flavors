import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import NotFoundImage from "@/assets/images/404-image.png";

/*
  @return array|Response
  @desc Displays the not found page
*/
export default function NotFound() {
  // return the not found page
  return (
    <div className="px-4 pb-8 text-center min-[640px]:px-8">
      <div className="flex justify-center">
        <Image src={NotFoundImage} alt="404 Image" width={300} height={100} />
      </div>
      <Typography variant="heading3" className="mt-8 text-sfblack">
        <h1
          className="font-figtreeRegular"
          aria-label="Diese Seite ist nicht erreichbar"
          tabIndex={0}
        >
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
