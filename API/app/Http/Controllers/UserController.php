<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Session;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

class UserController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->all();
        $check = User::create([
            'name' => $data['name'],
            'password' => Hash::make($data['password']),
            'email' => $data['email'],
        ]);

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
        return response()->json($response);
    }

    /**
     * Login
     */
    public function login(LoginRequest $request)
    {
        $data = $request->all();
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
        return response()->json($response);
    }

    /**
     * Logout
     */
    public function logout(Request $request)
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
        return response()->json($response);
    }
}
