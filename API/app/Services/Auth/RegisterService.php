<?php
//This is Service file. You should write your logic in here
namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterService
{
    //Function used to insert new user into database
    function handle($data)
    {
        //Inserting user into database
        $check = User::create([
            'name' => $data['name'],
            'password' => Hash::make($data['password']),
            'email' => $data['email'],
        ]);

        //Checking if insertion was successfull
        if($check == TRUE)
        {
            $success = true;
            $message = "Zarejestrowano pomyślnie!";
        }else{
            $success = false;
            $message = "Wystąpił błąd podczas rejestracji.";
        }

        // response
        $response = [
            'success' => $success,
            'message' => $message,
        ];

        return $response;
    }
}

?>
