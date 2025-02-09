<?php

namespace Database\Seeders;

use App\Models\Recipe;
use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder {
    /*
    @desc Create default tags -> will also be used in productive environment!
    */
    public function run() {
        $seasons = ['spring', 'summer', 'autumn', 'winter', 'all_year'];
        foreach ($seasons as $season) {
            Tag::updateOrCreate(
                ['name' => $season], 
                ['category' => 'season']
            );
        }
    }
    
}

