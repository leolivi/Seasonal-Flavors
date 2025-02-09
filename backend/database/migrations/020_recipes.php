<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /*
  @desc Create the recipes table
  */
  function up() {
    Schema::create('recipes', function (Blueprint $table) {
        $table->id();
        $table->string('title', 100)->index();
        $table->integer('cooking_time');
        $table->integer('prep_time');
        $table->integer('servings');
        $table->json('steps');
        $table->text('ingredients');
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        $table->timestamps();
    });

    /*
    @desc Create the favorites table
    */
    Schema::create('favorites', function (Blueprint $table) {
      $table->id(); 
      $table->foreignId('user_id')->constrained()->cascadeOnDelete();
      $table->foreignId('recipe_id')->constrained()->cascadeOnDelete();
      $table->timestamps();
      $table->unique(['user_id', 'recipe_id']);
    });
  }

  /*
  @desc Drop the recipes and favorites tables
  */
  function down() {
    Schema::dropIfExists('recipes');
    Schema::dropIfExists('favorites');
  }
};
