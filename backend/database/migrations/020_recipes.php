<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  function up() {
    // create a Recipes Schema
    Schema::create('recipes', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->integer('cooking_time');
        $table->integer('prep_time');
        $table->integer('servings');
        $table->text('steps');
        $table->text('ingredients');
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        $table->timestamps();
    });

    // create a Pivot Schema for Favorites (Recipes X User)
    Schema::create('favorites', function (Blueprint $table) {
      $table->id(); 
      $table->foreignId('user_id')->constrained()->cascadeOnDelete();
      $table->foreignId('recipe_id')->constrained()->cascadeOnDelete();
      $table->timestamps();
      $table->unique(['user_id', 'recipe_id']);
    });
  }

  function down() {
    Schema::dropIfExists('recipes');
    Schema::dropIfExists('favorites');
  }
};
