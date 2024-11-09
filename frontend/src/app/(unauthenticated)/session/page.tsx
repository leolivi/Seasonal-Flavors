"use client";

import { LoginForm } from "@/components/forms/login-form";
import { RegisterForm } from "@/components/forms/register-form";
import { useState } from "react";

export enum SessionForm {
  LOGIN = "login",
  REGISTER = "register",
}

export default function Session() {
  const [form, setForm] = useState<SessionForm>(SessionForm.LOGIN);

  return (
    <div>
      <h1 className="opacity-0">
        {form === SessionForm.LOGIN ? SessionForm.LOGIN : SessionForm.REGISTER}
      </h1>
      <p className="text-sfblack">
        {form === SessionForm.LOGIN ? SessionForm.LOGIN : SessionForm.REGISTER}
      </p>
      {form === SessionForm.LOGIN ? (
        <LoginForm setForm={setForm} />
      ) : (
        <RegisterForm setForm={setForm} />
      )}
    </div>
  );
}
