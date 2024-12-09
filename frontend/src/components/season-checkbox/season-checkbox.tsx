import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Checkbox from "../ui/checkbox";

interface SeasonCheckboxProps {
  control: any;
  tags: { id: string; name: string }[];
}

export function SeasonCheckbox({ control, tags: items }: SeasonCheckboxProps) {
  return (
    <FormField
      control={control}
      name="seasons"
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">Saison</FormLabel>
            <FormDescription>
              Wähle die Jahreszeiten aus, in denen die Zutaten des Rezeptes in
              Saison sind.
            </FormDescription>
          </div>
          {items.map((item) => {
            const checkboxId = `season-${item.id}`;
            return (
              <div key={item.id} className="flex items-center space-x-3">
                <FormControl>
                  <Checkbox
                    id={checkboxId}
                    checked={field.value?.includes(item.name) ?? false}
                    onCheckedChange={(checked) => {
                      const newValue = checked
                        ? [...(field.value || []), item.name]
                        : (field.value || []).filter(
                            (val: string) => val !== item.name,
                          );
                      field.onChange(newValue);
                    }}
                  />
                </FormControl>
                <FormLabel htmlFor={checkboxId} className="font-normal">
                  {item.name}
                </FormLabel>
              </div>
            );
          })}
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
