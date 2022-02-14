<?php

namespace App\Http\Controllers;

//including required things that are already in laravel
use Illuminate\Http\Request;

//including services
use App\Services\ActiveUser\LogoutService;

class ActiveUserController extends Controller
{
    //Logout function that do logic inside LogoutService
    public function logout(Request $request, LogoutService $logoutService)
    {
        return response()->json($logoutService->handle($request)); //Return received response to frontend in JSON format
    }
}
