<?php

namespace App\Models;

use Config\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use WendellAdriel\Lift\Attributes\Column;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;
use WendellAdriel\Lift\Attributes\Hidden;


class User extends Model {
    use HasApiTokens; 

    #[Column]
    public string $username;

    #[Column]
    public string $email;

    #[Column] #[Hidden]
    public string $password;


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
    public function image(): HasOne {
        return $this->hasOne(Image::class);
    }

    
    /*
    @return array
    @desc Validates the request for creating/updating a User
    */
    static function validate(Request $request) {
        $post = $request->method == 'POST'; 
        return $request->validate([
            'username' => [$post ? 'required' : 'sometimes', 'min:2', 'max:99', 'unique:users,username'],
            'email' => [$post ? 'required' : 'sometimes', 'email', 'unique:users,email'],
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
}
