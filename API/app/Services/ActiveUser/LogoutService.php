<?php
//This is Service file. You should write your logic in here
namespace App\Services\ActiveUser;

use Session;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class LogoutService
{
    function handle($request)
    {
        try {
            Session::flush();
            auth()->user()->tokens()->delete();
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            $success = true;
            $message = 'Successfully logged out';
        } catch (\Illuminate\Database\QueryException $ex) {
            $success = false;
            $message = $ex->getMessage();
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
