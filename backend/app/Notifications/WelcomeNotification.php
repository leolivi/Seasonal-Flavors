<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WelcomeNotification extends Notification
{
    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Willkommen bei Seasonal Flavors')
            ->greeting('Hallo ' . $notifiable->username . '!')
            ->line('Willkommen bei unserer App! Wir freuen uns, dich dabei zu haben.')
            ->action('Jetzt einloggen', env('FRONTEND_URL'))
            ->line('Viel Spass beim Kochen!');
    }
} 