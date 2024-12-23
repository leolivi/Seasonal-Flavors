<?php

namespace App\Controllers;

use App\Models\Image;
use Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Storage;
use Str;

class UploadsController {

    /*
    @return Image[]|JsonResponse
    @desc fetch images for a recipe or user
    */
    function index(Request $request): Image|JsonResponse {
        $query = Image::query();
    
        if ($request->has('recipe_id')) {
            $query->where('recipe_id', $request->query('recipe_id'));
        }
    
        $images = $query->get();
    
        $imagesWithUrls = $images->map(function ($image) {
            if (filter_var($image->file_path, FILTER_VALIDATE_URL)) {
                return [
                    'id' => $image->id,
                    'file_path' => $image->file_path,
                    'alt_text' => $image->alt_text,
                ];
            }
    
            return [
                'id' => $image->id,
                'file_path' => url('uploads/' . $image->file_path),
                'alt_text' => $image->alt_text,
            ];
        });
    
        return response()->json($imagesWithUrls, 200);
    }

    /*
    @return string|JsonResponse
    @desc Uploads a file
    */
    function create(Request $request): string|JsonResponse {
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
    @return JsonResponse
    @desc Deletes a file
    */
    function destroy(Request $request, $id): JsonResponse {
        $user = Auth::user();
        
        $image = Image::where('id', $id)
            ->where(function($query) use ($user) {
                $query->where('user_id', $user->id)
                      ->orWhereHas('recipe', function($q) use ($user) {
                          $q->where('user_id', $user->id);
                      });
            })
            ->firstOrFail();
    
        $storagePath = 'uploads/' . $image->file_path;
        
        if (Storage::exists($storagePath)) {
            Storage::delete($storagePath);
        }
    
        $image->delete();
    
        return response()->json([
            'message' => 'Bild erfolgreich gelöscht',
            'id' => $id
        ], 200);
    }

}