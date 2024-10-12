<?php

namespace Database\Seeders;

use App\Models\Recipe;
use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder {
    public function run() {
        $seasons = ['spring', 'summer', 'autumn', 'winter', 'all_year'];
        foreach ($seasons as $season) {
            Tag::updateOrCreate(
                ['name' => $season], 
                ['category' => 'season']
            );
        }
        $this->attachTagsToRecipes();
    }

    private function attachTagsToRecipes() {
        $springTag = Tag::where('name', 'spring')->first();
        $summerTag = Tag::where('name', 'summer')->first();
        $autumnTag = Tag::where('name', 'autumn')->first();
        $winterTag = Tag::where('name', 'winter')->first();
        $allYearTag = Tag::where('name', 'all_year')->first();

        Recipe::where('title', 'Spaghetti Carbonara')->first()->tags()->attach($allYearTag->id);
        Recipe::where('title', 'Chicken Curry')->first()->tags()->attach($autumnTag->id);
        Recipe::where('title', 'Chocolate Cake')->first()->tags()->attach([$winterTag->id, $springTag->id]);
    }
}

