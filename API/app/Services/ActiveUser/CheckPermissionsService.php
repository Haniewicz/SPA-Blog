<?php
//This is Service file. You should write your logic in here
namespace App\Services\ActiveUser;

use Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CheckPermissionsService
{
    function handle($request)
    {
        $status = true;
        //checking if user has specific permission or * permission(which means, he can do anything he want)
        foreach($request->all() as $permission)
        {
            if(!Auth::User()->getRole->getPermissions->where('permission', $permission)->count() > 0 && !Auth::User()->getRole->getPermissions->where('permission', '*')->count() > 0)
            {
                //If user has no permission then status is gonna be false
                $status = false;
            }
        }

        return $status;
    }
}

?>
