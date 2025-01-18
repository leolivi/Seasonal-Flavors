<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  function up() {
    // create a User Schema
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('username', 100)->unique();
      $table->string('email', 255)->unique();
      $table->string('password');
      $table->rememberToken();
      $table->timestamps();
    });
  }

  function down() {
    Schema::dropIfExists('users');
  }
};
