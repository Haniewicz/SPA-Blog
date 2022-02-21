<?php
//This is Service file. You should write your logic in here
namespace App\Services\Auth;

use Session;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class LoginService
{
    //Function used to login user.
    function handle($data)
    {
        if (Auth::attempt(['name'=>$data['name'], 'password' =>$data['password']]))
        {
            $success = true;
            $token = auth()->user()->createToken('auth_token')->plainTextToken;
            $user = Auth::user();
            $message = "Logowanie powiodło się!";
        }else{
            $success = false;
            $message = "Nazwa użytkownika lub hasło jest niepoprawne!";
            $token = "";
            $user = "";
        }

        // response
        $response = [
            'success' => $success,
            'message' => $message,
            'token' => $token,
            'user' => $user,
        ];

        return $response;
    }
}

?>
