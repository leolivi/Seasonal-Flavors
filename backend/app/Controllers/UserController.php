<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;

class UserController {
  // necessary for mails controller to work? 
// @TODO: test later...
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
    $user = User::create($payload);
    
    \Mail::raw(
      'welcome to our app',
      fn($mail) => $mail->to($user->email)->subject('welcome')
    );
    
    return $user;
  }


  /*
  @return User
  @desc DELETE: Deletes the currently authenticated user
  */
  function destroy(Request $request): User {
    $user = \Auth::user();
    $user->delete();
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
}
