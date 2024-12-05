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
  seasons: { id: string; label: string }[];
}

export function SeasonCheckbox({
  control,
  seasons: items,
}: SeasonCheckboxProps) {
  return (
    <FormField
      control={control}
      name="seasons"
      render={() => (
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
              <FormField
                key={item.id}
                control={control}
                name="seasons"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        id={checkboxId}
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([...field.value, item.id]);
                          } else {
                            field.onChange(
                              field.value?.filter(
                                (value: string) => value !== item.id,
                              ),
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel htmlFor={checkboxId} className="font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            );
          })}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
