<?php
//This is Service file. You should write your logic in here
namespace App\Services\Post;

use App\Models\Post;

use App\Http\Resources\Post\PostResource;

class ShowService
{
    //Function to return selected one post from database
    function handle($request)
    {
        $post = new PostResource(Post::where('id', $request->id)->first());

        return $post;
    }
}

?>
