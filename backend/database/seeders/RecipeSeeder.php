<?php

namespace Database\Seeders;

use App\Models\Recipe;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder {
    public function run() {

        // Create default recipes for testing reasons
        // assign to default testing user
        $user = User::where('email', 'yua@miau.com')->firstOrFail();

        Recipe::updateOrCreate(
            ['title' => 'Butternut Squash Soup'], 
            [
                'cooking_time' => 35,
                'prep_time' => 15,
                'servings' => 4,
                'steps' => '1. Roast butternut squash. 2. Sauté onion and garlic. 3. Blend with vegetable broth and spices. 4. Garnish with pumpkin seeds.',
                'ingredients' => 'Butternut Squash, Onion, Garlic, Vegetable Broth, Coconut Milk, Pumpkin Seeds, Salt, Pepper',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Lentil Shepherd’s Pie'], 
            [
                'cooking_time' => 50,
                'prep_time' => 20,
                'servings' => 6,
                'steps' => '1. Sauté lentils with vegetables. 2. Prepare mashed potatoes. 3. Layer lentil mix and mashed potatoes in a baking dish. 4. Bake until golden.',
                'ingredients' => 'Lentils, Carrot, Onion, Garlic, Potatoes, Vegetable Broth, Thyme, Salt, Pepper',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Creamy Spinach Pasta'], 
            [
                'cooking_time' => 20,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => '1. Cook pasta. 2. Blend soaked cashews with spinach, garlic, and lemon juice. 3. Combine sauce with pasta. 4. Garnish with fresh herbs.',
                'ingredients' => 'Pasta, Spinach, Cashews, Garlic, Lemon Juice, Salt, Pepper',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Stuffed Bell Peppers'], 
            [
                'cooking_time' => 40,
                'prep_time' => 20,
                'servings' => 4,
                'steps' => '1. Prepare quinoa filling with vegetables and spices. 2. Stuff bell peppers. 3. Bake until peppers are tender. 4. Serve with fresh parsley.',
                'ingredients' => 'Bell Peppers, Quinoa, Black Beans, Corn, Onion, Garlic, Tomato, Cumin, Salt, Pepper, Parsley',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Pumpkin Risotto'], 
            [
                'cooking_time' => 35,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => '1. Sauté onion and garlic. 2. Add rice and pumpkin puree. 3. Gradually add vegetable broth, stirring until creamy. 4. Garnish with sage.',
                'ingredients' => 'Arborio Rice, Pumpkin Puree, Onion, Garlic, Vegetable Broth, Sage, Salt, Pepper',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Chickpea Salad Sandwich'], 
            [
                'cooking_time' => 10,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => '1. Mash chickpeas. 2. Mix with chopped veggies and  mayo. 3. Spread on bread. 4. Serve with fresh lettuce.',
                'ingredients' => 'Chickpeas, Celery, Carrot, Green Onion,  Mayo, Bread, Lettuce, Salt, Pepper',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Sweet Potato Tacos'], 
            [
                'cooking_time' => 30,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => '1. Roast sweet potatoes with spices. 2. Warm tortillas. 3. Fill tortillas with sweet potatoes, black beans, and toppings. 4. Garnish with cilantro and lime.',
                'ingredients' => 'Sweet Potatoes, Black Beans, Tortillas, Avocado, Cilantro, Lime, Cumin, Salt, Pepper',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Zucchini Noodles with Pesto'], 
            [
                'cooking_time' => 15,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => '1. Spiralize zucchini. 2. Blend basil, garlic, nuts, and olive oil for pesto. 3. Toss zucchini noodles with pesto. 4. Top with cherry tomatoes.',
                'ingredients' => 'Zucchini, Basil, Garlic, Pine Nuts, Olive Oil, Cherry Tomatoes, Salt, Pepper',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Coconut Curry with Tofu'], 
            [
                'cooking_time' => 30,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => '1. Sauté tofu with spices. 2. Add coconut milk and vegetables. 3. Simmer until vegetables are tender. 4. Serve with rice.',
                'ingredients' => 'Tofu, Coconut Milk, Red Curry Paste, Bell Peppers, Broccoli, Carrot, Rice, Salt, Pepper',
                'user_id' => $user->id,
            ]
        );
        
        Recipe::updateOrCreate(
            ['title' => 'Baked Ratatouille'], 
            [
                'cooking_time' => 40,
                'prep_time' => 20,
                'servings' => 4,
                'steps' => '1. Slice vegetables. 2. Arrange in a baking dish with herbs and olive oil. 3. Bake until tender. 4. Serve with fresh basil.',
                'ingredients' => 'Eggplant, Zucchini, Bell Peppers, Tomatoes, Olive Oil, Thyme, Basil, Salt, Pepper',
                'user_id' => $user->id,
            ]
        );

        Recipe::updateOrCreate(
            ['title' => 'Vegan Mushroom Stroganoff'], 
            [
                'cooking_time' => 25,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => '1. Sauté mushrooms, onion, and garlic. 2. Add cashew cream and vegetable broth. 3. Serve over cooked pasta. 4. Garnish with parsley.',
                'ingredients' => 'Mushrooms, Onion, Garlic, Cashew Cream, Vegetable Broth, Pasta, Parsley, Salt, Pepper',
                'user_id' => $user->id,
            ]
        );

        Recipe::updateOrCreate(
            ['title' => 'Vegan Pad Thai'], 
            [
                'cooking_time' => 20,
                'prep_time' => 15,
                'servings' => 4,
                'steps' => '1. Cook rice noodles. 2. Sauté tofu and vegetables. 3. Add tamarind sauce. 4. Toss noodles with sauce. 5. Garnish with peanuts and lime.',
                'ingredients' => 'Rice Noodles, Tofu, Bell Peppers, Carrot, Tamarind Paste, Soy Sauce, Peanuts, Lime, Garlic, Cilantro',
                'user_id' => $user->id,
            ]
        );

        Recipe::updateOrCreate(
            ['title' => 'Vegan Cauliflower Wings'], 
            [
                'cooking_time' => 30,
                'prep_time' => 15,
                'servings' => 4,
                'steps' => '1. Coat cauliflower florets in batter. 2. Bake until crispy. 3. Toss with buffalo sauce. 4. Serve with vegan ranch dip.',
                'ingredients' => 'Cauliflower, Flour, Plant-Based Milk, Buffalo Sauce, Vegan Ranch, Garlic Powder, Salt, Pepper',
                'user_id' => $user->id,
            ]
        );

        Recipe::updateOrCreate(
            ['title' => 'Vegan Chocolate Avocado Mousse'], 
            [
                'cooking_time' => 5,
                'prep_time' => 5,
                'servings' => 4,
                'steps' => '1. Blend avocado, cocoa powder, and maple syrup until smooth. 2. Chill in refrigerator. 3. Serve with fresh berries.',
                'ingredients' => 'Avocado, Cocoa Powder, Maple Syrup, Vanilla Extract, Berries',
                'user_id' => $user->id,
            ]
        );

        Recipe::updateOrCreate(
            ['title' => 'Vegan Mediterranean Bowl'], 
            [
                'cooking_time' => 20,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => '1. Cook quinoa. 2. Prepare roasted vegetables. 3. Add hummus and olives. 4. Drizzle with tahini dressing.',
                'ingredients' => 'Quinoa, Bell Peppers, Zucchini, Eggplant, Hummus, Olives, Tahini, Lemon Juice, Salt, Pepper',
                'user_id' => $user->id,
            ]
        );

        Recipe::updateOrCreate(
            ['title' => 'Vegan Banana Pancakes'], 
            [
                'cooking_time' => 15,
                'prep_time' => 10,
                'servings' => 4,
                'steps' => '1. Mix mashed bananas, flour, and plant-based milk. 2. Cook on a skillet until golden. 3. Serve with maple syrup and fresh fruit.',
                'ingredients' => 'Bananas, Flour, Plant-Based Milk, Maple Syrup, Fresh Fruit',
                'user_id' => $user->id,
            ]
        );

        $this->attachTagsToRecipes();
    }

    private function attachTagsToRecipes() {
        $springTag = Tag::where('name', 'spring')->first();
        $summerTag = Tag::where('name', 'summer')->first();
        $autumnTag = Tag::where('name', 'autumn')->first();
        $winterTag = Tag::where('name', 'winter')->first();
        $allYearTag = Tag::where('name', 'all_year')->first();
    
        Recipe::where('title', 'Butternut Squash Soup')->first()->tags()->attach($autumnTag->id);
        Recipe::where('title', 'Lentil Shepherd’s Pie')->first()->tags()->attach($winterTag->id);
        Recipe::where('title', 'Lentil Shepherd’s Pie')->first()->tags()->attach($autumnTag->id);
        Recipe::where('title', 'Creamy Spinach Pasta')->first()->tags()->attach($springTag->id);
        Recipe::where('title', 'Stuffed Bell Peppers')->first()->tags()->attach($summerTag->id);
        Recipe::where('title', 'Pumpkin Risotto')->first()->tags()->attach($autumnTag->id);
        Recipe::where('title', 'Chickpea Salad Sandwich')->first()->tags()->attach($springTag->id);
        Recipe::where('title', 'Sweet Potato Tacos')->first()->tags()->attach($winterTag->id);
        Recipe::where('title', 'Zucchini Noodles with Pesto')->first()->tags()->attach($summerTag->id);
        Recipe::where('title', 'Coconut Curry with Tofu')->first()->tags()->attach($allYearTag->id);
        Recipe::where('title', 'Baked Ratatouille')->first()->tags()->attach($summerTag->id);
        Recipe::where('title', 'Vegan Mushroom Stroganoff')->first()->tags()->attach($winterTag->id);
        Recipe::where('title', 'Vegan Pad Thai')->first()->tags()->attach($summerTag->id);
        Recipe::where('title', 'Vegan Cauliflower Wings')->first()->tags()->attach($allYearTag->id);
        Recipe::where('title', 'Vegan Chocolate Avocado Mousse')->first()->tags()->attach($allYearTag->id);
        Recipe::where('title', 'Vegan Mediterranean Bowl')->first()->tags()->attach($summerTag->id);
        Recipe::where('title', 'Vegan Banana Pancakes')->first()->tags()->attach($springTag->id);
    }
}

