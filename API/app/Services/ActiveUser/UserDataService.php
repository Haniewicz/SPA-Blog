<?php
//This is Service file. You should write your logic in here
namespace App\Services\ActiveUser;

use Illuminate\Support\Facades\Auth;


class UserDataService
{
    function handle()
    {
        $user = [
            'id' => Auth::User()->id,
            'name' => Auth::User()->name,
            'email' => Auth::User()->email,
            'role' => Auth::User()->getRole->role,
            'permissions' => Auth::User()->getRole->getPermissions->where('permission', '*')->first(),
            'registered_at' => Auth::User()->created_at,
        ];

        return [
            'api_status' => '200',
            'user' => $user,
            'message' => 'Authenticated',
        ];
    }
}

?>
