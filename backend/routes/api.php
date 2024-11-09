<?php
use Illuminate\Support\Facades\Route;
// use Illuminate\Http\Request;

use App\Controllers\UserController;
use App\Controllers\AuthController;
use App\Controllers\RecipeController;
use App\Controllers\UploadsController;
use App\Controllers\TagsController;
use App\Controllers\MailController;

// register a user
Route::post('/user', [UserController::class, 'create']);
// get owner of recipe
Route::get('/user/{id}', [UserController::class, 'showUserById']);
// login a user
Route::post('/auth/login', [AuthController::class, 'login']);
// show recipes
Route::get('/recipe', [RecipeController::class, 'read']);
Route::get('/images', [UploadsController::class, 'index']);
// show tags
Route::get('/tags', [TagsController::class, 'index']);
Route::get('/recipes/{recipe}/tags', [TagsController::class, 'showTags']);

// Forgot password
Route::get('/forgot-password', [MailController::class, 'showForgotPasswordForm']);
Route::post('/forgot-password', [MailController::class, 'sendResetLinkEmail']);
Route::get('/reset-password/{token}', [MailController::class, 'showResetPasswordForm']);
Route::post('/reset-password', [MailController::class, 'resetPassword']);


Route::middleware(['auth:sanctum'])->group(function () {
    // User erstellen etc. 
    Route::get('/user', [UserController::class, 'show']);
    Route::patch('/user', [UserController::class, 'update']);
    Route::delete('/user', [UserController::class, 'destroy']);
    
    // Logout
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
    // Rezepte erstellen etc.
    Route::post('/recipe', [RecipeController::class, 'create']);
    Route::patch('/recipe/{recipe}', [RecipeController::class, 'update']);
    Route::delete('/recipe/{recipe}', [RecipeController::class, 'destroy']);
    
    // Tags
    Route::post('/recipes/{recipe}/tags', [TagsController::class, 'attachTags']);
    Route::delete('/recipes/{recipe}/tags', [TagsController::class, 'detachTags']);

    // Favoriten erstellen etc.
    Route::post('/recipes/{recipe}/favorite', [RecipeController::class, 'favorite']);
    Route::get('/user/{user}/favorites', [UserController::class, 'favorites']);
    Route::delete('/recipes/{recipe}/favorite', [RecipeController::class, 'unfavorite']);

    // uploads
    Route::post('/uploads', [UploadsController::class, 'create']);
    Route::delete('/uploads', [UploadsController::class, 'destroy']);
});