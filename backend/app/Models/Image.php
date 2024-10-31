<?php

namespace App\Models;

use Config\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use WendellAdriel\Lift\Attributes\Column;
use Illuminate\Http\Request;
use Laravel\Sanctum\HasApiTokens;

class Image extends Model {
  use HasApiTokens; 

  #[Column]
  public string $file_path;

  #[Column]
  public string $alt_text;

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