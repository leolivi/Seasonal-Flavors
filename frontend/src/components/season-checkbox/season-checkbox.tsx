import { Control, FieldValues, Path } from "react-hook-form";
import Checkbox from "../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Typography } from "../ui/typography";

interface SeasonCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  tags: { id: number; name: string }[];
}

export function SeasonCheckbox<T extends FieldValues>({
  control,
  name,
  tags,
}: SeasonCheckboxProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="font-figtreeRegular text-base">
              Saison
            </FormLabel>
            <FormDescription className="font-figtreeRegular">
              Wähle die Jahreszeiten aus, in denen die Zutaten des Rezeptes in
              Saison sind.
            </FormDescription>
          </div>
          {tags.map((season) => {
            const checkboxId = `season-${season.id}`;
            return (
              <FormField
                key={season.id}
                control={control}
                name={name}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        id={checkboxId}
                        checked={field.value?.includes(season.id)}
                        onCheckedChange={(checked) => {
                          const updatedSeasons = checked
                            ? [...field.value, season.id]
                            : field.value.filter(
                                (id: number) => id !== season.id,
                              );

                          field.onChange(updatedSeasons);
                        }}
                        label={`${season.name}`}
                      />
                    </FormControl>

                    <FormLabel
                      htmlFor={checkboxId}
                      className="font-figtreeRegular text-2xl"
                      aria-label={`${season.name} als Saison auswählen`}
                    >
                      <Typography variant="body">{season.name}</Typography>
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
