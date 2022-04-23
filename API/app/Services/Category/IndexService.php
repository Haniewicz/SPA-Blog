<?php
//This is Service file. You should write your logic in here
namespace App\Services\Category;

use App\Models\Category;
use App\Http\Resources\Category\CategoryResource;

class IndexService
{
    function handle()
    {
        $categories = CategoryResource::collection(Category::all());

        return $categories;
    }
}

?>
