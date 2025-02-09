<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;


class Tag extends Model {
    protected $fillable = ['name', 'category'];

    protected $casts = [
        'name' => 'string',
        'category' => 'string',
    ];

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
        'name' => ['required', "min:1", "max:99", 'unique:tags,name'],
        'category' => ["min:1", "max:99"],
        ]);
    }
}
