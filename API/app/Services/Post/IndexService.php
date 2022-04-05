<?php
//This is Service file. You should write your logic in here
namespace App\Services\Post;

use App\Models\Post;

class IndexService
{
    function handle()
    {
        return Post::all();
    }
}

?>
