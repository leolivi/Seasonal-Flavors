<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Storage;

class UserController {
  use Notifiable;

  /*
  @return User
  @desc GET: Returns the currently authenticated user
  */
  function show(Request $request): User {
    return \Auth::user();
  }

  /*
  @return JsonResponse
  @desc GET: Returns the owner of a specific recipe id
  */
  public function showUserById($id): JsonResponse {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json($user);
    }

  /*
  @return Collection
  @desc GET: Returns all favorite recipes of the user
  */
  public function favorites($userId): Collection {
    $user = User::findOrFail($userId);
    $favorites = $user->favoriteRecipes;

    return $favorites;
  }

  /*
  @return User
  @desc POST: Creates a new user
  */
  function create (Request $request): User {
    $payload = User::validate($request);
    $payload['username'] = strip_tags($payload['username']);
    $payload['email'] = filter_var($payload['email'], FILTER_SANITIZE_EMAIL);
    $user = User::create($payload);
    
    $user->notify(new \App\Notifications\WelcomeNotification());
    
    return $user;
  }
  
  /*
  @return User
  @desc PATCH: Updates the currently authenticated user
  */
  function update(Request $request): User {
    $user = \Auth::user();
    $payload = User::validate($request);
    $user->update($payload);
    return $user;
  }

  /*
  @return User
  @desc DELETE: Deletes the currently authenticated user
  */
  function destroy(Request $request): JsonResponse {
    $user = \Auth::user();

    $images = \App\Models\Image::where('user_id', $user->id)->get();

    foreach ($images as $image) {
        $storagePath = 'uploads/' . $image->file_path;

        if (Storage::exists($storagePath)) {
            Storage::delete($storagePath);
        }

        $image->delete();
    }

    $user->recipes()->each(function ($recipe) {
        $recipe->delete();
    });

    $user->delete();

    return response()->json(['message' => 'Benutzer und alle zugehörigen Bilder wurden gelöscht'], 200);
  }


}
