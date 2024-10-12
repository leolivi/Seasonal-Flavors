<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

// faker: https://fakerphp.github.io/formatters/text-and-paragraphs/

class DatabaseSeeder extends Seeder {
  function run() {
    $user1 = User::create([
      "username" => "yua",
      'email' => 'yua@miau.com',
      'password' => 'password'
    ]);

    $this->call([
      RecipeSeeder::class,
      TagSeeder::class,
  ]);
  }
}
