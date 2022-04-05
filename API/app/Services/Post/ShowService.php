<?php
//This is Service file. You should write your logic in here
namespace App\Services\Post;

use App\Models\Post;

class ShowService
{
    function handle($request)
    {
        $post = Post::where('id', $request->id)->first();

        $response = [
            'title' => $post->title,
            'content' => $post->content,
            'category_id' => $post->category_id,
            'created_at' => $post->created_at,
        ];

        return $response;
    }
}

?>
