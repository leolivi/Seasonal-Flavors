<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

// faker: https://fakerphp.github.io/formatters/text-and-paragraphs/

class DatabaseSeeder extends Seeder {
  function run() {
    // Create a default user for testing reasons
    User::create([
      "username" => "yua",
      'email' => 'yua@miau.com',
      'password' => 'password'
    ]);

    $this->call([
      // Create recipes for testing reasons
      RecipeSeeder::class,
      // default tags, will also be used in productive environment!
      TagSeeder::class,
  ]);
  }
}
