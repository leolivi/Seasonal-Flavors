<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Response;

class AuthController {
    /*
    @return array|Response
    @desc Login the current user or show error code
    */
    function login(Request $request): array|Response{
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $email)->first();

        // if user does not exist
        if (!$user) { 
            return abort(404, 'no such user');
        }
        // if password does not match the user
        if (!\Hash::check($password, $user->password)) {
            return abort(404, 'wrong password');
        }

        // login with bearer token
        $token = $user->createToken('bearer');
        return [
            'token' => $token->plainTextToken,
            'user' => $user,
        ];
    }

    /*
        @return User
        @desc logout the current user
     */
    function logout(Request $request): User {
        $user = \Auth::user();
        $user->tokens()->delete();
        return $user;
    }
}