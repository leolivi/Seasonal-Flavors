"use client";

type ActionParams = {
  [key: string]: string | number | boolean | undefined;
};

export const trackAction = (
  actionName: string,
  actionParams: ActionParams = {},
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", actionName, {
      event_category: "user_action",
      action: actionName,
      ...actionParams,
    });
  }
};
