import { ResetPasswordForm } from "@/components/forms/reset-password-form";
import { Typography } from "@/components/ui/typography";

/*
  @desc Displays the reset password page
*/
const ResetPasswordPage = () => {
  // return the reset password page
  return (
    <div className="flex flex-col items-center px-4 pb-8 min-[640px]:px-8">
      {/* heading */}
      <div className="w-full text-center min-[640px]:w-[500px]">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1 aria-label="Neues Passwort erstellen" tabIndex={0}>
            Neues Passwort erstellen
          </h1>
        </Typography>
        <Typography variant="small" className="mt-5 font-figtreeRegular">
          <p>Bitte gib dein neues Passwort ein und bestätige es.</p>
        </Typography>
      </div>
      {/* reset password form */}
      <div className="mt-10 w-full min-[640px]:w-[500px]">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
