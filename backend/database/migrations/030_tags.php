<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /*
  @desc Create the tags and recipe_tag tables
  */
  function up() {
    Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('category');
            $table->timestamps();
        });

    /*
    @desc Create the recipe_tag table
    */
    Schema::create('recipe_tag', function (Blueprint $table) {
      $table->id();
      $table->foreignId('recipe_id')->constrained()->cascadeOnDelete();
      $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
      $table->timestamps();
    });
    }

  /*
  @desc Drop the tags and recipe_tag tables
  */
  function down() {
    Schema::dropIfExists('tags');
    Schema::dropIfExists('recipe_tag');
  }
};
