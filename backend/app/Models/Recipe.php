<?php

namespace App\Models;

use Config\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use WendellAdriel\Lift\Attributes\Column;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;

class Recipe extends Model {
  use HasApiTokens; 

  #[Column]
  public string $title;

  #[Column]
  public int $prep_time;

  #[Column]
  public int $cooking_time;

  #[Column]
  public int $servings;

  #[Column]
  public string $steps;

  #[Column]
  public string $ingredients;

  #[Column]
  public int $user_id;

  /*
  @return BelongsToMany
  @desc Defines a many-to-many relationship between Recipe and Tags
  */
  function tags(): BelongsToMany {
    return $this->belongsToMany(Tag::class, 'recipe_tag')->withTimestamps();
  }

  /*
  @return BelongsToMany
  @desc Defines a many-to-many relationship for favorited recipes by users
  */
  public function favoritedByUsers(): BelongsToMany {
    return $this->belongsToMany(User::class, 'favorites', 'recipe_id', 'user_id')->withTimestamps();
  }

  /*
  @return HasOne
  @desc 1:1 relationship between recipe and image
  */
  public function image(): HasOne {
    return $this->hasOne(Image::class);
  }

  /*
  @return array
  @desc Validates the request for creating/updating a Recipe
  */
  static function validate(Request $request): array {
    $post = $request->method == 'POST'; 
    return $request->validate([
      'title' => [$post ? 'required' : 'sometimes', 'min:1', 'max:255'],
      'prep_time' => [$post ? 'required' : 'sometimes', 'integer'],
      'cooking_time' => [$post ? 'required' : 'sometimes', 'integer'],
      'servings' => [$post ? 'required' : 'sometimes', 'integer'],
      'steps' => [$post ? 'required' : 'sometimes', 'json'],
      'ingredients' => [$post ? 'required' : 'sometimes', 'min:1', 'max:20000'], 
      'user_id' => [$post ? 'required' : 'sometimes', 'exists:users,id'],
      // 'tags' => [$post ? 'required' : 'sometimes', 'array'], 
    ]);
  }
}
