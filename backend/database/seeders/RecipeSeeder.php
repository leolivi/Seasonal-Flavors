<?php

namespace Database\Seeders;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder {
    public function run() {

        // Create default recipes for testing reasons
        // assign to default testing user
        $user = User::where('email', 'yua@miau.com')->firstOrFail();

        Recipe::updateOrCreate(
            ['title' => 'Spaghetti Carbonara'], 
            [
                'cooking_time' => 20,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => '1. Boil pasta. 2. Cook bacon. 3. Mix with egg and cheese. 4. Serve.',
                'ingredients' => 'Spaghetti, Eggs, Parmesan, Bacon, Salt, Pepper',
                'user_id' => $user->id,
            ]
        );
      
        Recipe::updateOrCreate(
            ['title' => 'Chicken Curry'], 
            [
                'cooking_time' => 40,
                'prep_time' => 15,
                'servings' => 4,
                'steps' => '1. Cook chicken. 2. Add spices. 3. Simmer with coconut milk. 4. Serve with rice.',
                'ingredients' => 'Chicken, Curry Powder, Coconut Milk, Rice, Salt, Pepper, Onion',
                'user_id' => $user->id,
            ]
        );
      
        Recipe::updateOrCreate(
            ['title' => 'Chocolate Cake'], 
            [
                'cooking_time' => 50,
                'prep_time' => 20,
                'servings' => 8,
                'steps' => '1. Mix ingredients. 2. Bake. 3. Let cool. 4. Serve with icing.',
                'ingredients' => 'Flour, Sugar, Cocoa, Eggs, Butter, Baking Powder, Vanilla Extract',
                'user_id' => $user->id,
            ]
        );
        
    }
}

