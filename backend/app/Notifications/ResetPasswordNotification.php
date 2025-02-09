<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification {
    private $token;

    public function __construct($token){
        $this->token = $token;
    }

    public function via($notifiable){
        return ['mail'];
    }

    /*
    @return MailMessage
    @desc Send a reset password email
    */
    public function toMail($notifiable){
        $url = env('FRONTEND_URL') . '/reset-password?token=' . $this->token . '&email=' . $notifiable->email;

        return (new MailMessage)
            ->subject('Seasonal Flavors: Passwort zurücksetzen')
            ->line('Du erhältst diese E-Mail, weil du dein Passwort zurücksetzen möchtest.')
            ->action('Password zurücksetzen', $url)
            ->line('Wenn du kein Passwort zurücksetzen möchtest, ignoriere diese E-Mail.');
    }
} 