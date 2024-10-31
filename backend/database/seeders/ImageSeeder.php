<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Database\Seeder;

class ImageSeeder extends Seeder {
    public function run() {
        // Create images with file paths as external links
        $images = [
            [
                'title' => 'Butternut Squash Soup',
                'imageSrc' => 'https://images.unsplash.com/photo-1604147706281-6546b208940e?q=80&w=2832&auto=format&fit=crop',
                'imageAlt' => 'A bowl of creamy butternut squash soup topped with seeds',
            ],
            [
                'title' => 'Lentil Shepherd’s Pie',
                'imageSrc' => 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2832&auto=format&fit=crop',
                'imageAlt' => 'Vegetarian shepherd’s pie with lentils and mashed potatoes',
            ],
            [
                'title' => 'Creamy Spinach Pasta',
                'imageSrc' => 'https://images.unsplash.com/photo-1617630949478-315a997d2553?q=80&w=2832&auto=format&fit=crop',
                'imageAlt' => 'Pasta with a creamy spinach sauce and fresh herbs',
            ],
            [
                'title' => 'Stuffed Bell Peppers',
                'imageSrc' => 'https://images.unsplash.com/photo-1612800138564-7c99a62a57cf?q=80&w=2832&auto=format&fit=crop',
                'imageAlt' => 'Stuffed bell peppers filled with a quinoa and vegetable mix',
            ],
            [
                'title' => 'Pumpkin Risotto',
                'imageSrc' => 'https://images.unsplash.com/photo-1590502593731-f9f158f68a4c?q=80&w=2832&auto=format&fit=crop',
                'imageAlt' => 'Pumpkin risotto garnished with sage',
            ],
            [
                'title' => 'Chickpea Salad Sandwich',
                'imageSrc' => 'https://images.unsplash.com/photo-1552566626-4e1a20f06457?q=80&w=2832&auto=format&fit=crop',
                'imageAlt' => 'Chickpea salad sandwich on whole-grain bread',
            ],
            [
                'title' => 'Sweet Potato Tacos',
                'imageSrc' => 'https://images.unsplash.com/photo-1585238347015-86f2f9f9d3d7?q=80&w=2832&auto=format&fit=crop',
                'imageAlt' => 'Sweet potato tacos with black beans, avocado, and cilantro',
            ],
            [
                'title' => 'Zucchini Noodles with Pesto',
                'imageSrc' => 'https://images.unsplash.com/photo-1604917881210-b7d875b7cb0a?q=80&w=2832&auto=format&fit=crop',
                'imageAlt' => 'Zucchini noodles with fresh pesto sauce',
            ],
            [
                'title' => 'Coconut Curry with Tofu',
                'imageSrc' => 'https://images.unsplash.com/photo-1582913722473-7d4c3e69e6ae?q=80&w=2832&auto=format&fit=crop',
                'imageAlt' => 'Coconut curry with tofu and vegetables',
            ],
            [
                'title' => 'Baked Ratatouille',
                'imageSrc' => 'https://images.unsplash.com/photo-1571091718769-39d6cc0d65fb?q=80&w=2832&auto=format&fit=crop',
                'imageAlt' => 'Baked ratatouille with fresh summer vegetables',
            ],
        ];

        
        foreach ($images as $imageData) {
            $recipe = Recipe::where('title', $imageData['title'])->first();
            $user = User::where('email', 'yua@miau.com')->firstOrFail();
            if ($recipe) {
                Image::updateOrCreate(
                    ['file_path' => $imageData['imageSrc']],
                    [
                        'file_path' => $imageData['imageSrc'],
                        'alt_text' => $imageData['imageAlt'] ?? null,
                        'recipe_id' => $recipe->id,
                        'user_id' => $user->id,
                    ]
                );
            }
        }
    }
}
