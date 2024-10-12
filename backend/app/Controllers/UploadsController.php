<?php

namespace App\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class UploadsController {

    /*
    @return string|bool
    @desc Uploads a file
    */
    function create (Request $request): string|bool {
        $user = \Auth::user();
        // $request->validate(['file' => ['required', 'max:2048']]); // nur bis zu zwei MB

        $request->validate([
            'file' => ['required', 'file', 'max:2048', 'mimes:jpeg,jpg,png,gif,JPG'], // max 2MB
            'type' => [Rule::in(['profile', 'recipe'])], // Ensure 'type' is either 'profile' or 'recipe'
            'recipe_id' => ['required_if:type,recipe', 'exists:recipes,id'] // recipe_id is required only if type is 'recipe'
        ]);

        // upload file
        $file = $request->file('file'); // 'file' = name des inputs
        $filePath = \Storage::putFileAs(
            'uploads/' . $user->id,
            $file,
            // save original file name
            $file->getClientOriginalName(),
        );

        // Save the uploaded file path in the Image model
        $image = new Image([
            'file_path' => $filePath,
        ]);

        if ($request->input('type') === 'recipe') {
            // assign to recipe
            $image->recipe_id = $request->input('recipe_id');
        } else {
            // asign to user
            $image->user_id = $user->id;
        }

        $image->save();

        return $filePath;
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

        if ($image) {
            $image->delete();
        } else {
            return abort(404, 'Image not found in database');
        }
            
        return $filename;
    }

}