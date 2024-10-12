<?php

namespace App\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class MailController {
    /*
    @return view
    @desc Show the forgot password form
    */
    public function showForgotPasswordForm() {
      return view('auth.forgot-password');
    }

    /*
    @return Response
    @desc Handle the sending of the password reset link
    */
    public function sendResetLinkEmail(Request $request) {
      $request->validate(['email' => 'required|email']);

      $status = Password::sendResetLink(
        $request->only('email')
      );

      return $status === Password::RESET_LINK_SENT
        ? back()->with(['status' => __($status)])
        : back()->withErrors(['email' => __($status)]);
    }

    /*
    @return view
    @desc Show the password reset form with token
    */
    public function showResetPasswordForm(string $token){
      return view('auth.reset-password', ['token' => $token]);
    }

    /*
    @return Response
    @desc Handle the password reset process
    */
    public function resetPassword(Request $request){
      $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:8|confirmed',
      ]);

      $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function (User $user, string $password) {
          $user->forceFill([
            'password' => Hash::make($password)
          ])->setRememberToken(Str::random(60));

          $user->save();

          event(new PasswordReset($user));
        }
      );

      return $status === Password::PASSWORD_RESET
        ? redirect()->route('login')->with('status', __($status))
        : back()->withErrors(['email' => [__($status)]]);
  }
}
