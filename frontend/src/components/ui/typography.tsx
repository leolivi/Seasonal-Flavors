import React, { ElementType } from "react";

type Variant =
  | "teaserL"
  | "teaserS"
  | "heading1"
  | "heading2"
  | "heading3"
  | "body"
  | "small"
  | "xs"
  | "xxs"
  | "btnL"
  | "btnS";

interface TypographyProps {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
}

const tags: Record<Variant, ElementType> = {
  teaserL: "div",
  teaserS: "div",
  heading1: "div",
  heading2: "div",
  heading3: "div",
  body: "div",
  small: "div",
  xs: "small",
  xxs: "small",
  btnL: "div",
  btnS: "div",
};

// Define the classes based on your Tailwind fontSize configuration
const sizes: Record<Variant, string> = {
  // Teaser big
  teaserL:
    "min-[0px]:text-[48px] min-[0px]:leading-snug min-[640px]:text-[64px] min-[1024px]:text-[88px] min-[1280px]:text-[128px]",
  // Teaser small
  teaserS:
    "min-[0px]:text-[25px] min-[0px]:leading-snug min-[640px]:text-[38px] min-[640px]:leading-[1.1] min-[1024px]:text-[54px] min-[1280px]:text-[80px] min-[1280px]:leading-normal",
  // Heading 1:
  heading1:
    "min-[0px]:text-[48px] min-[640px]:text-[54px] min-[1024px]:text-[58px] min-[1280px]:text-[64px]",
  // Heading 2:
  heading2:
    "min-[0px]:text-[30px] min-[640px]:text-[35px] min-[1024px]:text-[38px] min-[1280px]:text-[40px]",
  // Heading 3:
  heading3:
    "min-[0px]:text-[25px] min-[640px]:text-[30px] min-[1024px]:text-[33px] min-[1280px]:text-[35px]",
  //   body text
  body: "min-[0px]:text-[18px] min-[640px]:text-[20px] min-[1024px]:text-[25px] min-[1280px]:text-[28px]",
  //   small
  small:
    "min-[0px]:text-[15px] min-[640px]:text-[16px] min-[1024px]:text-[18px] min-[1280px]:text-[20px]",
  //   extra-small
  xs: "min-[0px]:text-[15px] min-[640px]:text-[16px] min-[1024px]:text-[18px] min-[1280px]:text-[20px]",
  //   extra-extra-small
  xxs: "text-[14px]",
  //   Button lagrge
  btnL: "min-[0px]:text-[22px] min-[640px]:text-[28px] min-[1024px]:text-[30px] min-[1280px]:text-[32px]",
  //   Button small
  btnS: "min-[0px]:text-[18px] min-[640px]:text-[20px] min-[1024px]:text-[22px] min-[1280px]:text-[25px]",
};

// component can be used for responsive typography according to design
export const Typography = ({
  variant,
  children,
  className,
  as,
}: TypographyProps) => {
  const sizeClasses = sizes[variant];
  const Tag = as || tags[variant];

  return <Tag className={`${sizeClasses} ${className}`}>{children}</Tag>;
};
