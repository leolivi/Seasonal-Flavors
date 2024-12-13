import Checkbox from "../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export function SeasonCheckbox({
  control,
  tags,
}: {
  control: any;
  tags: { id: string; name: string }[];
}) {
  return (
    <FormField
      control={control}
      name="tags"
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">Saison</FormLabel>
            <FormDescription>
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
                name="tags"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        id={checkboxId}
                        checked={field.value?.includes(season.id)}
                        onCheckedChange={(checked) => {
                          const updatedSeasons = checked
                            ? [...field.value, season.id]
                            : field.value.filter(
                                (id: string) => id !== season.id,
                              );

                          field.onChange(updatedSeasons);
                        }}
                      />
                    </FormControl>
                    <FormLabel htmlFor={checkboxId} className="font-normal">
                      {season.name}
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
