<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /*
  @desc Create the images table
  */
  function up() {
    Schema::create('images', function (Blueprint $table) {
      $table->id();
      $table->string('file_path');
      $table->string('alt_text')->nullable();
      $table->foreignId('recipe_id')->nullable()->constrained()->cascadeOnDelete();
      $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();
      $table->timestamps();
    });
  }

  /*
  @desc Drop the images table
  */
  function down() {
    Schema::dropIfExists('images');
  }
};