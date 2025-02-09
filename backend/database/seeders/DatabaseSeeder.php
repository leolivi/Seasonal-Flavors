<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
  function run() {
    /*
    @desc Create a default user for testing reasons
    */
    User::create([
      "username" => "yua",
      'email' => 'yua@miau.com',
      'password' => 'Password12!'
    ]);

    $this->call([
      /*
      @desc Create default tags, will also be used in productive environment!
      */
      TagSeeder::class,
      /*
      @desc Create recipes for testing reasons
      */
      RecipeSeeder::class,
      /*
      @desc Create images for testing reasons
      */
      ImageSeeder::class
  ]);
  }
}
