<?php

namespace App\Controllers;

use App\Models\Image;
use Auth;
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
    // TODO: fix return type
    function index(Request $request) {
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
    
    function update(Request $request) {
        $user = \Auth::user();
    
        try {
            $validated = $request->validate([
                'file' => ['required', 'file', 'max:2048', 'mimes:jpeg,jpg,png,gif,JPG'],
                'type' => ['required', Rule::in(['profile', 'recipe'])],
                'recipe_id' => ['required_if:type,recipe', 'exists:recipes,id'],
                'alt_text' => ['string', 'max:255'],
            ]);
    
            // Finde das existierende Bild basierend auf type und ID
            $existingImage = Image::query()
                ->when($request->input('type') === 'recipe', function ($query) use ($request) {
                    return $query->where('recipe_id', $request->input('recipe_id'));
                })
                ->when($request->input('type') === 'profile', function ($query) use ($user) {
                    return $query->where('user_id', $user->id)
                               ->whereNull('recipe_id');
                })
                ->first();
    
            // Lösche altes Bild falls vorhanden
            if ($existingImage) {
                Storage::delete('uploads/' . $existingImage->file_path);
            }
    
            // Verarbeite neues Bild
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
    
            // Update oder erstelle Bildeintrag
            if ($existingImage) {
                $existingImage->update([
                    'file_path' => $filePath,
                    'alt_text' => $request->post('alt_text', '')
                ]);
                $image = $existingImage;
            } else {
                $image = new Image([
                    'file_path' => $filePath,
                    'alt_text' => $request->post('alt_text', ''),
                    'user_id' => $user->id,
                ]);
    
                if ($request->input('type') === 'recipe') {
                    $image->recipe_id = $request->input('recipe_id');
                }
    
                $image->save();
            }
    
            return response()->json([
                'message' => 'Bild erfolgreich aktualisiert',
                'file_path' => url('uploads/' . $filePath)
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Fehler beim Aktualisieren des Bildes.',
            ], 400);
        }
    }
    
    /*
    @return string|Response
    @desc Deletes a file
    */
    // function destroy(Request $request): string|Response {
    //     $user = \Auth::user();
    //     $filename = $request->input('filename');
    //     $path = 'uploads/' . $user->id . '/' . $filename;
      
    //     // check if file exists
    //     if (!\Storage::exists($path)) {
    //         return abort(404, 'File does not exist');
    //     }

    //     // delete file path (in folder structure)
    //     \Storage::delete($path);

    //     // delete file in database
    //     $image = Image::where('file_path', $path) 
    //               ->where(function($query) use ($user) {
    //                   $query->where('user_id', $user->id)
    //                         ->orWhereNotNull('recipe_id');
    //               })
    //               ->first();

    //     // error handling
    //     if ($image) {
    //         $image->delete();
    //     } else {
    //         return abort(404, 'Image not found in database');
    //     }
            
    //     return $filename;
    // }

    function destroy(Request $request, $id) {
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