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
  seasons,
}: {
  control: any;
  seasons: { id: string; name: string }[];
}) {
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
          {seasons.map((season) => {
            const checkboxId = `season-${season.id}`;
            return (
              <FormField
                key={season.id}
                control={control}
                name="seasons"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        id={checkboxId}
                        checked={field.value?.includes(season.name)}
                        onCheckedChange={(checked) => {
                          console.log("Before Update:", field.value);
                          const updatedSeasons = checked
                            ? [...field.value, season.name]
                            : field.value.filter(
                                (name: string) => name !== season.name,
                              );

                          field.onChange(updatedSeasons);
                          console.log("After Update:", updatedSeasons);
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
