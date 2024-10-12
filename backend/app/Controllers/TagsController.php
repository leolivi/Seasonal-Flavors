<?php
namespace App\Controllers;

use App\Models\Recipe;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class TagsController {
	/*
    @return Collection
    @desc Gives back all tags
    */
	function index(Request $request) {
		return Tag::all();
	}
	
	/*
    @return Tag|Response
    @desc Create a tag (is done in Seeder)
    */
	function create (Request $request): Tag|Response {
		$payload = Tag::validate($request);
		$comment = \Auth::user()->comments()->create($payload);
		return $comment;
	}

    /*
    @return JsonResponse|Response
    @desc attach a specific tag to a certain recipe (if not already done)
    */
    function attachTags(Request $request, int $recipeId): JsonResponse|Response {
        $recipe = Recipe::findOrFail($recipeId);
        $tagIds = $request->input('tags');
        $recipe->tags()->sync($tagIds);
        
        return response()->json(['message' => 'Tags wurden erfolgreich aktualisiert.'], 201);
    }

    /*
    @return JsonResponse|Response
    @desc detaches a specific tag to a certain recipe (if not already done)
    */
    function detachTags(Request $request, int $recipeId): JsonResponse|Response {
        $recipe = Recipe::findOrFail($recipeId);
        $tagIds = $request->input('tags');
        $recipe->tags()->detach($tagIds);
    
        return response()->json(['message' => 'Tags wurden entfernt.'], 200);
    }

    /*
    @return JsonResponse
    @desc Show tags for a recipe
    */
    public function showTags(int $recipeId): JsonResponse {
        $recipe = Recipe::findOrFail($recipeId);
        $tags = $recipe->tags()->get();

        return response()->json($tags);
    }

    /*
    @return Tag|Response
    @desc Assigns Tags to a recipe
    */
    // function assign(Request $request): Tag|Response {
    //     $recipeId = $request->input('recipe_id');
    //     $tagIds = $request->input('tag_ids');
    //     $recipe = \Auth::user()->recipes()->findOrFail($recipeId);
    //     $recipe->tags()->sync($tagIds); 
    //     $recipe->save();
    //     return $recipe->fresh(); // fresh um sicherzugehen, immer aktuelle daten
    // }
}