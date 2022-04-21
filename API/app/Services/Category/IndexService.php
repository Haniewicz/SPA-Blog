<?php
//This is Service file. You should write your logic in here
namespace App\Services\Category;

use App\Models\Category;

class IndexService
{
    function handle()
    {
        return Category::all();
    }
}

?>
