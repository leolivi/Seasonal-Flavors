<?php

namespace Database\Seeders;

use App\Models\Recipe;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder {
    /*
    @desc Create default recipes for testing reasons
    */
    public function run() {

        /*
        @desc Assign to default testing user
        */
        $user = User::where('email', 'yua@miau.com')->firstOrFail();

        /*
        @desc Create default recipes for testing reasons
        */
        Recipe::updateOrCreate(
            ['title' => 'Butternut-Kürbissuppe'], 
            [
                'cooking_time' => 35,
                'prep_time' => 15,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Butternut-Kürbis rösten.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. Zwiebel und Knoblauch anbraten.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Mit Gemüsebrühe und Gewürzen pürieren.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '4. Mit Kürbiskernen garnieren.']]]
                    ]
                ]),
                'ingredients' => 'Butternut-Kürbis, Zwiebel, Knoblauch, Gemüsebrühe, Kokosmilch, Kürbiskerne, Salz, Pfeffer',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Linsen-Shepherd\'s Pie'], 
            [
                'cooking_time' => 50,
                'prep_time' => 20,
                'servings' => 6,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Linsen mit Gemüse anbraten.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. Kartoffelpüree zubereiten.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Linsenmischung und Kartoffelpüree in einer Auflaufform schichten.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '4. Backen bis die Oberfläche goldbraun ist.']]]
                    ]
                ]),
                'ingredients' => 'Linsen, Karotte, Zwiebel, Knoblauch, Kartoffeln, Gemüsebrühe, Thymian, Salz, Pfeffer',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Cremige Spinat-Pasta'], 
            [
                'cooking_time' => 20,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Pasta kochen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. Eingeweichte Cashewkerne mit Spinat, Knoblauch und Zitronensaft pürieren.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Sauce mit Pasta vermischen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '4. Mit frischen Kräutern garnieren.']]]
                    ]
                ]),
                'ingredients' => 'Pasta, Spinat, Cashewkerne, Knoblauch, Zitronensaft, Salz, Pfeffer',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Gefüllte Paprikaschoten'], 
            [
                'cooking_time' => 40,
                'prep_time' => 20,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Quinoa-Füllung mit Gemüse und Gewürzen zubereiten.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. Paprikaschoten füllen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Backen, bis die Paprika zart sind.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '4. Mit frischer Petersilie servieren.']]]
                    ]
                ]),
                'ingredients' => 'Paprikaschoten, Quinoa, Schwarze Bohnen, Mais, Zwiebel, Knoblauch, Tomate, Kreuzkümmel, Salz, Pfeffer, Petersilie',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Kürbis-Risotto'], 
            [
                'cooking_time' => 35,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Zwiebel und Knoblauch anbraten.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. Reis und Kürbispüree hinzufügen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Nach und nach Gemüsebrühe hinzufügen und cremig rühren.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '4. Mit Salbei garnieren.']]]
                    ]
                ]),
                'ingredients' => 'Arborio-Reis, Kürbispüree, Zwiebel, Knoblauch, Gemüsebrühe, Salbei, Salz, Pfeffer',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Kichererbsen-Salat-Sandwich'], 
            [
                'cooking_time' => 10,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Kichererbsen zerdrücken.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. Mit gehacktem Gemüse und Mayonnaise mischen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Auf Brot verteilen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '4. Mit frischem Salat servieren.']]]
                    ]
                ]),
                'ingredients' => 'Kichererbsen, Sellerie, Karotte, Frühlingszwiebel, Mayonnaise, Brot, Salat, Salz, Pfeffer',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Süsskartoffel-Tacos'], 
            [
                'cooking_time' => 30,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Süßkartoffeln mit Gewürzen rösten.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. Tortillas erwärmen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Tortillas mit Süßkartoffeln, schwarzen Bohnen und Toppings füllen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '4. Mit Koriander und Limette garnieren.']]]
                    ]
                ]),
                'ingredients' => 'Süßkartoffeln, Schwarze Bohnen, Tortillas, Avocado, Koriander, Limette, Kreuzkümmel, Salz, Pfeffer',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Zucchini-Nudeln mit Pesto'], 
            [
                'cooking_time' => 15,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Zucchini in Nudeln schneiden.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. Basilikum, Knoblauch, Nüsse und Olivenöl für Pesto mixen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Zucchini-Nudeln mit Pesto vermischen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '4. Mit Kirschtomaten toppen.']]]
                    ]
                ]),
                'ingredients' => 'Zucchini, Basilikum, Knoblauch, Piniennüsse, Olivenöl, Kirschtomaten, Salz, Pfeffer',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Kokos-Curry mit Tofu'], 
            [
                'cooking_time' => 30,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Tofu mit Gewürzen anbraten.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. Kokosmilch und Gemüse hinzufügen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Köcheln, bis das Gemüse zart ist.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '4. Mit Reis servieren.']]]
                    ]
                ]),
                'ingredients' => 'Tofu, Kokosmilch, Rote Curry-Paste, Paprika, Brokkoli, Karotte, Reis, Salz, Pfeffer',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Gebackene Ratatouille'], 
            [
                'cooking_time' => 40,
                'prep_time' => 20,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Gemüse in Scheiben schneiden.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. In einer Auflaufform mit Kräutern und Olivenöl anrichten.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Backen, bis das Gemüse zart ist.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '4. Mit frischem Basilikum servieren.']]]
                    ]
                ]),
                'ingredients' => 'Aubergine, Zucchini, Paprika, Tomaten, Olivenöl, Thymian, Basilikum, Salz, Pfeffer',
                'user_id' => $user->id,
            ]
        );

        Recipe::updateOrCreate(
            ['title' => 'Veganer Pilz-Stroganoff'], 
            [
                'cooking_time' => 25,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Pilze, Zwiebel und Knoblauch anbraten.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. Cashew-Creme und Gemüsebrühe hinzufügen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Über gekochte Pasta servieren.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '4. Mit Petersilie garnieren.']]]
                    ]
                ]),
                'ingredients' => 'Pilze, Zwiebel, Knoblauch, Cashew-Creme, Gemüsebrühe, Pasta, Petersilie, Salz, Pfeffer',
                'user_id' => $user->id,
            ]
        );

        Recipe::updateOrCreate(
            ['title' => 'Veganes Pad Thai'], 
            [
                'cooking_time' => 20,
                'prep_time' => 15,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Reisnudeln kochen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. Tofu und Gemüse anbraten.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Tamarinden-Sauce hinzufügen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '4. Nudeln mit Sauce vermischen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '5. Mit Erdnüssen und Limette garnieren.']]]
                    ]
                ]),
                'ingredients' => 'Reisnudeln, Tofu, Paprika, Karotte, Tamarindenpaste, Sojasauce, Erdnüsse, Limette, Knoblauch, Koriander',
                'user_id' => $user->id,
            ]
        );

        Recipe::updateOrCreate(
            ['title' => 'Vegane Blumenkohl-Flügel'], 
            [
                'cooking_time' => 30,
                'prep_time' => 15,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Blumenkohlröschen in Teig wenden.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. Knusprig backen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Mit Buffalo-Sauce mischen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '4. Mit veganem Ranch-Dip servieren.']]]
                    ]
                ]),
                'ingredients' => 'Blumenkohl, Mehl, Pflanzliche Milch, Buffalo-Sauce, Veganer Ranch-Dip, Knoblauchpulver, Salz, Pfeffer',
                'user_id' => $user->id,
            ]
        );

        Recipe::updateOrCreate(
            ['title' => 'Vegane Schokoladen-Avocado-Mousse'], 
            [
                'cooking_time' => 5,
                'prep_time' => 5,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Avocado, Kakao-Pulver und Ahornsirup cremig mixen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. Im Kühlschrank kaltstellen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Mit frischen Beeren servieren.']]]
                    ]
                ]),
                'ingredients' => 'Avocado, Kakao-Pulver, Ahornsirup, Vanilleextrakt, Beeren',
                'user_id' => $user->id,
            ]
        );

        Recipe::updateOrCreate(
            ['title' => 'Vegane Mittelmeer-Bowl'], 
            [
                'cooking_time' => 20,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Quinoa kochen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. Gebratene Gemüsesorten zubereiten.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Hummus und Oliven hinzufügen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '4. Mit Tahini-Dressing beträufeln.']]]
                    ]
                ]),
                'ingredients' => 'Quinoa, Paprika, Zucchini, Aubergine, Hummus, Oliven, Tahini, Zitronensaft, Salz, Pfeffer',
                'user_id' => $user->id,
            ]
        );

        Recipe::updateOrCreate(
            ['title' => 'Vegane Bananen-Pfannkuchen'], 
            [
                'cooking_time' => 15,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => json_encode([
                    'type' => 'doc',
                    'content' => [
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '1. Zerdrückte Bananen, Mehl und pflanzliche Milch mischen.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '2. In der Pfanne goldbraun braten.']]],
                        ['type' => 'paragraph', 'content' => [['type' => 'text', 'text' => '3. Mit Ahornsirup und frischen Früchten servieren.']]]
                    ]
                ]),
                'ingredients' => 'Bananen, Mehl, Pflanzliche Milch, Ahornsirup, Frische Früchte',
                'user_id' => $user->id,
            ]
        );

        $this->attachTagsToRecipes();
    }

    /*
    @desc Attach tags to recipes
    */
    private function attachTagsToRecipes() {
        $springTag = Tag::where('name', 'spring')->first();
        $summerTag = Tag::where('name', 'summer')->first();
        $autumnTag = Tag::where('name', 'autumn')->first();
        $winterTag = Tag::where('name', 'winter')->first();
        $allYearTag = Tag::where('name', 'all_year')->first();
    
        Recipe::where('title', 'Butternut-Kürbissuppe')->first()->tags()->attach($autumnTag->id);
        Recipe::where('title', 'Linsen-Shepherd\'s Pie')->first()->tags()->attach($winterTag->id);
        Recipe::where('title', 'Linsen-Shepherd\'s Pie')->first()->tags()->attach($autumnTag->id);
        Recipe::where('title', 'Cremige Spinat-Pasta')->first()->tags()->attach($springTag->id);
        Recipe::where('title', 'Gefüllte Paprikaschoten')->first()->tags()->attach($summerTag->id);
        Recipe::where('title', 'Kürbis-Risotto')->first()->tags()->attach($autumnTag->id);
        Recipe::where('title', 'Kichererbsen-Salat-Sandwich')->first()->tags()->attach($springTag->id);
        Recipe::where('title', 'Süsskartoffel-Tacos')->first()->tags()->attach($winterTag->id);
        Recipe::where('title', 'Zucchini-Nudeln mit Pesto')->first()->tags()->attach($summerTag->id);
        Recipe::where('title', 'Kokos-Curry mit Tofu')->first()->tags()->attach($allYearTag->id);
        Recipe::where('title', 'Gebackene Ratatouille')->first()->tags()->attach($summerTag->id);
        Recipe::where('title', 'Veganer Pilz-Stroganoff')->first()->tags()->attach($winterTag->id);
        Recipe::where('title', 'Veganes Pad Thai')->first()->tags()->attach($summerTag->id);
        Recipe::where('title', 'Vegane Blumenkohl-Flügel')->first()->tags()->attach($allYearTag->id);
        Recipe::where('title', 'Vegane Schokoladen-Avocado-Mousse')->first()->tags()->attach($allYearTag->id);
        Recipe::where('title', 'Vegane Mittelmeer-Bowl')->first()->tags()->attach($summerTag->id);
        Recipe::where('title', 'Vegane Bananen-Pfannkuchen')->first()->tags()->attach($springTag->id);
    }
}

