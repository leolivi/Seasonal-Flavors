"use client";

import { LoginForm } from "@/components/forms/login-form";
import { RegisterForm } from "@/components/forms/register-form";
import { SessionForm } from "@/utils/enum";
import { SessionLoader } from "@/components/auth-session/auth-session";
import { Suspense } from "react";
import { Typography } from "@/components/ui/typography";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

/*
  @desc Displays the session content
*/
const SessionContent = () => {
  // retrieve the search params
  const searchParams = useSearchParams();

  // retrieve the initial form
  const initialForm =
    searchParams.get("form") === "register"
      ? SessionForm.REGISTER
      : SessionForm.LOGIN;

  // retrieve the form
  const [form, setForm] = useState<SessionForm>(initialForm);

  // return the session page
  return (
    <div className="flex flex-col items-center px-4 pb-8 min-[640px]:px-8">
      {/* heading */}
      <h1 className="h-0 opacity-0" aria-label="Login" tabIndex={0}>
        {form === SessionForm.LOGIN ? SessionForm.LOGIN : SessionForm.REGISTER}
      </h1>
      <Typography variant="heading2">
        <p className="py-8 text-sfblack">
          {form === SessionForm.LOGIN
            ? SessionForm.LOGIN
            : SessionForm.REGISTER}
        </p>
      </Typography>
      {/* session form */}
      <div className="w-full min-[640px]:w-[500px]">
        {form === SessionForm.LOGIN ? (
          <LoginForm setForm={setForm} />
        ) : (
          <RegisterForm setForm={setForm} />
        )}
      </div>
    </div>
  );
};

/*
  @return array|Response
  @desc Displays the session page
*/
export default function Session() {
  // return the session page
  return (
    <Suspense fallback={<SessionLoader />}>
      <SessionContent />
    </Suspense>
  );
}
