<?php

namespace App\Models;

use Config\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use WendellAdriel\Lift\Attributes\Column;


class Tag extends Model {
    #[Column]
    public string $name;

    #[Column]
    public string $category;

    /*
    @return BelongsToMany
    @desc Defines a many-to-many relationship between Recipe and Tags
    */
    function recipes(): BelongsToMany {
    return $this->belongsToMany(Tag::class, 'recipe_tag')->withTimestamps();
    }

    /*
    @return array
    @desc Validates the request for creating/updating a Season
    */
    static function validate(Request $request): array {
        return $request->validate([
        'name' => ['required', "min:1", "max:99", 'unique:tags,name'], // name soll einzigartig sein
        'category' => ["min:1", "max:99"],
        ]);
    }
}
