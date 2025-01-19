"use client";

import { LoginForm } from "@/components/forms/login-form";
import { RegisterForm } from "@/components/forms/register-form";
import { Typography } from "@/components/ui/typography";
import { SessionForm } from "@/utils/enum";
import { useState } from "react";

export default function Session() {
  const [form, setForm] = useState<SessionForm>(SessionForm.LOGIN);

  return (
    <div className="flex flex-col items-center">
      <h1 className="h-0 opacity-0">
        {form === SessionForm.LOGIN ? SessionForm.LOGIN : SessionForm.REGISTER}
      </h1>
      <Typography variant="body">
        <p className="py-8 text-sfblack">
          {form === SessionForm.LOGIN
            ? SessionForm.LOGIN
            : SessionForm.REGISTER}
        </p>
      </Typography>
      {form === SessionForm.LOGIN ? (
        <LoginForm setForm={setForm} />
      ) : (
        <RegisterForm setForm={setForm} />
      )}
    </div>
  );
}
