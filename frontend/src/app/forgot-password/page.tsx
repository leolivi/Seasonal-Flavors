import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";
import { Typography } from "@/components/ui/typography";

/*
  @return array|Response
  @desc Displays the forgot password page
*/
const ForgotPasswordPage = async () => {
  // return the forgot password page
  return (
    <div className="flex flex-col items-center px-4 pb-8 min-[640px]:px-8">
      {/* heading */}
      <div className="w-full text-center min-[640px]:w-[500px]">
        <Typography variant="heading2" className="py-8 font-figtreeRegular">
          <h1 aria-label="Passwort zurücksetzen" tabIndex={0}>
            Passwort zurücksetzen
          </h1>
        </Typography>
        <Typography variant="small" className="font-figtreeRegular">
          <p>
            Bitte bestätige uns deine E-Mail-Adresse. Wir senden dir dann per
            E-Mail eine Anleitung, wie du dein Passwort zurücksetzen kannst.
          </p>
        </Typography>
      </div>
      {/* forgot password form */}
      <div className="mt-10 w-full min-[640px]:w-[500px]">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
