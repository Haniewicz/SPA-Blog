<?php
//This is Service file. You should write your logic in here
namespace App\Services\Post;

Use App\Models\Post;

class DestroyService
{
    function handle($request)
    {
        $post = Post::find($request[0]);
        $post->delete();
    }
}

?>
