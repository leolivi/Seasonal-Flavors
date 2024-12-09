<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  function up() {
    // create a Images Schema
    Schema::create('images', function (Blueprint $table) {
      $table->id();
      $table->string('file_path');
      $table->string('alt_text')->nullable();
      $table->foreignId('recipe_id')->nullable()->constrained()->onDelete('cascade');
      $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
      $table->timestamps();
    });
  }

  function down() {
    Schema::dropIfExists('images');
  }
};
