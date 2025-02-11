"use client";
import { setCookie } from "cookies-next";
import { Button } from "../button/button";
import { ButtonSize, ButtonStyle } from "@/utils/enum";

/*
  @desc Accept button for the cookie consent
*/
export default function AcceptButton() {
  // handle the accept button
  const handleAccept = () => {
    setCookie("cookieConsent", "true", { path: "/" });
    window.location.reload();
  };

  return (
    <Button
      onClick={handleAccept}
      label="Akzeptieren"
      size={ButtonSize.XS}
      style={ButtonStyle.OUTLINEGREEN}
    />
  );
}
