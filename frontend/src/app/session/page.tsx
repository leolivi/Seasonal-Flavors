"use client";

import { LoginForm } from "@/components/forms/login-form";
import { RegisterForm } from "@/components/forms/register-form";
import { Typography } from "@/components/ui/typography";
import { SessionForm } from "@/utils/enum";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Session() {
  const searchParams = useSearchParams();
  const initialForm =
    searchParams.get("form") === "register"
      ? SessionForm.REGISTER
      : SessionForm.LOGIN;

  const [form, setForm] = useState<SessionForm>(initialForm);

  return (
    <div className="flex flex-col items-center px-4 pb-8 min-[640px]:px-8">
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
      <div className="w-full min-[640px]:w-[500px]">
        {form === SessionForm.LOGIN ? (
          <LoginForm setForm={setForm} />
        ) : (
          <RegisterForm setForm={setForm} />
        )}
      </div>
    </div>
  );
}
