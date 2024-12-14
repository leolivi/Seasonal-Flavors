<?php

namespace App\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Storage;
use Str;

class UploadsController {

    /*
    @return Image[]
    @desc fetch images for a recipe or user
    */
    // function index(Request $request) {
	// 	$recipeId = $request->query('recipe_id');
    //     $userId = $request->query('user_id');

    //     $query = Image::query();

    //     // Filter by recipe_id
    //     if ($recipeId !== null) {
    //         if ($recipeId === 'null') {
    //             // Explicitly check for images where recipe_id is null
    //             $query->whereNull('recipe_id');
    //         } else {
    //             $query->where('recipe_id', $recipeId);
    //         }
    //     }

    //     // Filter by user_id
    //     if ($userId) {
    //         $query->where('user_id', $userId);
    //     }

    //     return $query->get();
	// }

    function index(Request $request) {
        $query = Image::query();
    
        if ($request->has('recipe_id')) {
            $query->where('recipe_id', $request->query('recipe_id'));
        }
    
        $images = $query->get();
    
        $imagesWithUrls = $images->map(function ($image) {
            if (filter_var($image->file_path, FILTER_VALIDATE_URL)) {
                // Externe URL unverändert zurückgeben
                return [
                    'id' => $image->id,
                    'file_path' => $image->file_path,
                    'alt_text' => $image->alt_text,
                ];
            }
    
            // Für lokale Pfade das "uploads/"-Präfix hinzufügen
            return [
                'id' => $image->id,
                'file_path' => url('uploads/' . $image->file_path),
                'alt_text' => $image->alt_text,
            ];
        });
    
        return response()->json($imagesWithUrls, 200);
    }

    /*
    @return string|bool
    @desc Uploads a file
    */
    function create(Request $request): string|bool {
        $user = \Auth::user();
    
        try {
            $validated = $request->validate([
                'file' => ['required', 'file', 'max:2048', 'mimes:jpeg,jpg,png,gif,JPG'],
                'type' => ['required', Rule::in(['profile', 'recipe'])],
                'recipe_id' => ['required_if:type,recipe', 'exists:recipes,id'],
                'alt_text' => ['string', 'max:255'],
            ]);
    
            $file = $request->file('file');
            $originalFilename = $file->getClientOriginalName();
            $filename = pathinfo($originalFilename, PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
    
            $uniqueFilename = $filename . '_' . Str::random(16) . '.' . $extension;
            $filePath = $user->id . '/' . $uniqueFilename; 
    
            Storage::putFileAs(
                'uploads/' . $user->id,
                $file,
                $uniqueFilename
            );
    
            $image = new Image([
                'file_path' => $filePath, 
                'alt_text' => $request->post('alt_text', ''),
                'user_id' => $user->id,
            ]);
    
            if ($request->input('type') === 'recipe') {
                $image->recipe_id = $request->input('recipe_id');
            }
    
            $image->save();
    
            return $filePath;
    
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'There was an error in the upload. Please ensure that the image is max. 8MB.',
            ], 400);
        }
    }
    
    
    

    /*
    @return string|Response
    @desc Deletes a file
    */
    function destroy(Request $request): string|Response {
        $user = \Auth::user();
        $filename = $request->input('filename');
        $path = 'uploads/' . $user->id . '/' . $filename;
      
        // check if file exists
        if (!\Storage::exists($path)) {
            return abort(404, 'File does not exist');
        }

        // delete file path (in folder structure)
        \Storage::delete($path);

        // delete file in database
        $image = Image::where('file_path', $path) 
                  ->where(function($query) use ($user) {
                      $query->where('user_id', $user->id)
                            ->orWhereNotNull('recipe_id');
                  })
                  ->first();

        // error handling
        if ($image) {
            $image->delete();
        } else {
            return abort(404, 'Image not found in database');
        }
            
        return $filename;
    }

}