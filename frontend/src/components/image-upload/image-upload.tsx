// components/ImageUpload.tsx
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface ImageUploadProps {
  control: Control<any>;
  name: string;
  label: string;
}

export function ImageUpload({ control, name, label }: ImageUploadProps) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Input
              id={name}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                onChange(file);
              }}
              {...rest}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
