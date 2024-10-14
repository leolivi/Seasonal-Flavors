<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        // create a Tags Schema
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('category');
            $table->timestamps();
        });

         // create a Pivot Table for Tags (Recipes X Tags)
        Schema::create('recipe_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recipe_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
          });
    }

    public function down() {
        Schema::dropIfExists('tags');
        Schema::dropIfExists('recipe_tag');
    }
};
