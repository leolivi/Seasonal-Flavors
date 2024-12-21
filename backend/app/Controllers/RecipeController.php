<?php

namespace App\Controllers;

use App\Models\Recipe;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class RecipeController {
  /*
  @return Collection|Response
  @desc Loads all or filtered recipes based on the request parameters
  */
  function read(Request $request): Collection|Response {
    $query = Recipe::query();

    // filter by id
    $id = $request->input('id');
    if($id) $query->where('id', $id);

    // filter by user_id
    $user_id = $request->input('user_id');
    if($user_id) $query->where('user_id', $user_id);

    // filter by tags
    $tagIds = $request->input('tags');
    if ($tagIds) {
      $query->whereHas('tags', function($q) use ($tagIds) {
          $q->whereIn('name', $tagIds);
      });
    }

    // filter by title
    $title = $request->input('title');
    if($title) $query->where('title', 'LIKE', "%{$title}%");

    // order by
    $orderBy = $request->input('order_by', 'created_at'); // mit fallback defaults
    $orderDir = $request->input('order_dir', 'desc');
    $query->orderBy($orderBy, $orderDir);

    // limitation in results
    $limit = $request->input('limit');
    // paging
    $paging = $request->input('offset');
    if ($limit) $query ->limit($limit);
    if ($paging) $query->offset($paging);

    return $query->get();
  }

  /*
  @return Recipe|Response
  @desc Creates a new recipe
  */
  function create(Request $request): JsonResponse {
    // Konvertiere Schritte in JSON, falls notwendig
    if (is_array($request->input('steps'))) {
        $request->merge(['steps' => json_encode($request->input('steps'))]);
    }

    // Validierung
    $validatedData = $request->validate([
        'title' => ['required', 'string', 'max:255'], 
        'prep_time' => ['required', 'integer'],
        'cooking_time' => ['required', 'integer'],
        'servings' => ['required', 'integer'],
        'steps' => ['required', 'string'],
        'ingredients' => ['required', 'string'],
        'tags' => ['nullable', 'array'],
        'tags.*' => ['integer', 'exists:tags,id'],
         // 'image_id' => ['nullable', 'integer', 'exists:images,id'], // image_id must exist in images table if provided
    ]);

    // Erstelle das Rezept
    $recipe = Auth::user()->recipes()->create([
        'title' => $validatedData['title'],
        'prep_time' => $validatedData['prep_time'],
        'cooking_time' => $validatedData['cooking_time'],
        'servings' => $validatedData['servings'],
        'steps' => $validatedData['steps'],
        'ingredients' => $validatedData['ingredients'],
          // 'image_id' => $validatedData['image_id'] ?? null, // Use image_id if provided, or null
    ]);

    // Tags speichern
    if (isset($validatedData['tags'])) {
        $recipe->tags()->attach($validatedData['tags']);
    }

    // Antwort mit Tags
    return response()->json(['recipe' => $recipe->load('tags')], 201);
}


  /*
  @return Recipe|Response
  @desc Updates a recipe by fetching it's id
  */
  // function update(Request $request): Recipe|Response {
  //   $id = $request->input('id');
  //   $payload = Recipe::validate($request);
  //   $recipe = \Auth::user()->recipes()->findOrFail($id);
  //   $recipe->update($payload);

  //   return $recipe;
  // }

  function update(Request $request): Recipe|Response {
    $id = $request->input('id');
    
    // Extrahiere tags aus den Eingabedaten
    $tags = $request->input('tags', []);
    
    // Entferne tags aus dem Payload für das Recipe-Update
    $payload = $request->except('tags');
    
    // Validiere die Rezept-Daten
    $validatedData = $request->validate([
        'title' => ['sometimes', 'string', 'max:255'],
        'prep_time' => ['sometimes', 'integer'],
        'cooking_time' => ['sometimes', 'integer'],
        'servings' => ['sometimes', 'integer'],
        'steps' => ['sometimes', 'string'],
        'ingredients' => ['sometimes', 'string'],
    ]);

    $recipe = \Auth::user()->recipes()->findOrFail($id);
    
    // Update der Rezept-Attribute
    $recipe->update($validatedData);

    // Update der Tags-Beziehung separat
    if (!empty($tags)) {
        $recipe->tags()->sync($tags);
    }

    // Lade das aktualisierte Rezept mit Tags
    return $recipe->load('tags');
}

  /*
  @return Recipe|Response
  @desc Delete a recipe by fetching it's id
  */
  // function destroy(Request $request): Recipe|Response {
  //   $id = $request->input('id');
  //   $recipe = \Auth::user()->recipes()->findOrFail($id);
  //   $recipe->delete();
  //   return $recipe;
  // }

  public function destroy(Recipe $recipe)
  {
      if ($recipe->user_id !== Auth::user()->id) {
          return response()->json(['message' => 'Unauthorized'], 403);
      }
  
      $recipe->delete();
      return response()->json(['message' => 'Recipe deleted successfully']);
  }


  /*
  @return Response
  @desc Favorize a specific receipt (if not already done)
  */
  function favorite(Request $request, int $recipeId): JsonResponse|Response {
    $user = Auth::user();
    $recipe = Recipe::findOrFail($recipeId);

    if (!$recipe->favoritedByUsers()->where('user_id', $user->id)->exists()) {
        $recipe->favoritedByUsers()->attach($user->id);
        return response()->json(['message' => 'Rezept wurde zu den Favoriten hinzugefügt.'], 201);
        return $recipe;
    }

    return response()->json(['message' => 'Rezept ist bereits in den Favoriten.'], 200);
    return $recipe;
  }

  /*
  @return Response
  @desc removes a specific receipt from the user's favorites (if not already done)
  */
  function unfavorite(Request $request, int $recipeId): JsonResponse|Response {
      $user = Auth::user();
      $recipe = Recipe::findOrFail($recipeId);

      if ($recipe->favoritedByUsers()->where('user_id', $user->id)->exists()) {
          $recipe->favoritedByUsers()->detach($user->id);
          return response()->json(['message' => 'Rezept wurde aus den Favoriten entfernt.'], 200);
          return $recipe;
      }

      return response()->json(['message' => 'Rezept ist nicht in den Favoriten.'], 404);
      return $recipe;
  }

}
