<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /*
  @desc Create the users table
  */
  function up() {
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('username', 100)->unique();
      $table->string('email', 255)->unique();
      $table->string('password');
      $table->rememberToken();
      $table->timestamps();
    });
  }

  /*
  @desc Drop the users table
  */
  function down() {
    Schema::dropIfExists('users');
  }
};
