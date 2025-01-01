<?php

namespace App\Models;

use Config\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use WendellAdriel\Lift\Attributes\Column;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use WendellAdriel\Lift\Attributes\Hidden;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Support\Facades\Hash;

class User extends Model implements CanResetPasswordContract, AuthenticatableContract
{
    use HasApiTokens;
    use Notifiable;
    use CanResetPassword;
    use Authenticatable;

    #[Column]
    public string $username;

    #[Column]
    public string $email;

    #[Column] #[Hidden]
    public string $password;

    #[Column]
    public ?string $remember_token = null;

    protected $guarded = [];

    /*
    @return HasMany|Recipe
    @desc Defines a one-to-many relationship between a User and Recipes
    */
    function recipes(): HasMany|Recipe {
        return $this->hasMany(Recipe::class);
    }

    /*
    @return BelongsToMany|Recipe
    @desc Defines a many-to-many relationship between Users and Favorites
    */
    public function favoriteRecipes(): BelongsToMany|Recipe {
        return $this->belongsToMany(Recipe::class, 'favorites', 'user_id', 'recipe_id')->withTimestamps();
    }

    /*
    @return HasOne
    @desc 1:1 relationship between user and image
    */
    public function image(): HasMany {
        return $this->hasMany(Image::class);
    }

    
    /*
    @return array
    @desc Validates the request for creating/updating a User
    */
    static function validate(Request $request) {
        $post = $request->method == 'POST'; 
        $user = \Auth::user();
    
        return $request->validate([
            'username' => [$post ? 'required' : 'sometimes', 'min:2', 'max:99', 'unique:users,username,' . ($user ? $user->id : '')],
            'email' => [$post ? 'required' : 'sometimes', 'email', 'unique:users,email,' . ($user ? $user->id : '')],
            'password' => [$post ? 'required' : 'sometimes', 'min:8', 'regex:/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&])(?!.*\s)/']
        ]);
    }

    /*
    @desc Automatically hashes the password before saving the User model
    */
    static function booted() {
        self::saving(function (User $user) {
            if ($user->isDirty('password')) {
                $plain = $user->getAttribute('password');
                $user->setAttribute('password', \Hash::make($plain));
            }
        });
    }

    /*
    @return string
    @desc Returns the email address for password reset
    */
    public function getEmailForPasswordReset() {
        return $this->email;
    }

    /*
    @return void
    @desc Sends a password reset notification
    */
    public function sendPasswordResetNotification($token) {
        $this->notify(new \App\Notifications\ResetPasswordNotification($token));
    }
}
