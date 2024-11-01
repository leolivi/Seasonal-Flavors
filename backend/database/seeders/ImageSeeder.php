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
                'imageSrc' => 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'imageAlt' => 'A bowl of creamy butternut squash soup topped with seeds',
            ],
            [
                'title' => 'Lentil Shepherd’s Pie',
                'imageSrc' => 'https://images.unsplash.com/photo-1601000937971-d464714b9e6f?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'imageAlt' => 'Vegetarian shepherd’s pie with lentils and mashed potatoes',
            ],
            [
                'title' => 'Creamy Spinach Pasta',
                'imageSrc' => 'https://images.unsplash.com/photo-1567608285969-48e4bbe0d399?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'imageAlt' => 'Pasta with a creamy spinach sauce and fresh herbs',
            ],
            [
                'title' => 'Stuffed Bell Peppers',
                'imageSrc' => 'https://images.unsplash.com/photo-1592119747782-d8c12c2ea267?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'imageAlt' => 'Stuffed bell peppers filled with a quinoa and vegetable mix',
            ],
            [
                'title' => 'Pumpkin Risotto',
                'imageSrc' => 'https://images.unsplash.com/photo-1612700722193-f0410adb8949?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'imageAlt' => 'Pumpkin risotto garnished with sage',
            ],
            [
                'title' => 'Chickpea Salad Sandwich',
                'imageSrc' => 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=3085&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'imageAlt' => 'Chickpea salad sandwich on whole-grain bread',
            ],
            [
                'title' => 'Sweet Potato Tacos',
                'imageSrc' => 'https://images.unsplash.com/photo-1585443835125-d85820a16e89?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'imageAlt' => 'Sweet potato tacos with black beans, avocado, and cilantro',
            ],
            [
                'title' => 'Zucchini Noodles with Pesto',
                'imageSrc' => 'https://images.unsplash.com/photo-1645775372267-c0299feab469?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'imageAlt' => 'Zucchini noodles with fresh pesto sauce',
            ],
            [
                'title' => 'Coconut Curry with Tofu',
                'imageSrc' => 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=3084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                'imageAlt' => 'Coconut curry with tofu and vegetables',
            ],
            [
                'title' => 'Baked Ratatouille',
                'imageSrc' => 'https://images.unsplash.com/photo-1652622550740-f90d03edfbf0?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
