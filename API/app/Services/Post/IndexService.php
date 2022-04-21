<?php
//This is Service file. You should write your logic in here
namespace App\Services\Post;

use App\Models\Post;

use App\Http\Resources\Post\PostResource;

class IndexService
{
    //Function to return all posts from database
    function handle()
    {

        $posts = PostResource::collection(Post::all());

        return $posts;
    }
}

?>
