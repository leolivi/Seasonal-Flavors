<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password as PasswordRules;

class MailController {
    /*
    @return JsonResponse
    @desc Handle forgot password request
    */
    public function sendResetLinkEmail(Request $request): JsonResponse {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return response()->json([
            'status' => $status === Password::RESET_LINK_SENT,
            'message' => __($status)
        ]);
    }

    /*
    @return JsonResponse
    @desc Handle the password reset process
    */
    public function resetPassword(Request $request): JsonResponse {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', PasswordRules::defaults()],
        ]);

        $tokenData = \DB::table('password_reset_tokens')
        ->where('email', $request->email)
        ->first();

        if (!$tokenData || now()->diffInMinutes($tokenData->created_at) > 60) {
            return response()->json(['message' => 'Token abgelaufen oder ungültig'], 400);
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->password = $password;
                $user->setRememberToken(Str::random(60));
                $user->save();

                event(new PasswordReset($user));
                $user->tokens()->delete();
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            return response()->json([
                'status' => false,
                'message' => __($status),
            ], 400);
        }

        return response()->json([
            'status' => $status === Password::PASSWORD_RESET,
            'message' => __($status)
        ]);

    }
}
