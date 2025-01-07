<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use WendellAdriel\Lift\Attributes\Column;
use Laravel\Sanctum\HasApiTokens;

class Image extends Model {
  use HasApiTokens; 

  protected $fillable = ['file_path', 'alt_text', 'user_id', 'recipe_id']; // Mass assignment

  protected $casts = [
    'file_path' => 'string',
    'alt_text' => 'string',
  ];

  /*
  @return BelongsTo
  @desc 1:1 relationship between image and recipe
  */
  public function recipe(): BelongsTo {
    return $this->belongsTo(Recipe::class);
  }

  /*
  @return BelongsTo
  @desc 1:1 relationship between image and recipe
  */
  public function user(): BelongsTo {
    return $this->belongsTo(User::class);
  }
}