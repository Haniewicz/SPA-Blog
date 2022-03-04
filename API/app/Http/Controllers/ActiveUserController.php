<?php

namespace App\Http\Controllers;

//including required things that are already in laravel
use Illuminate\Http\Request;

//including services
use App\Services\ActiveUser\LogoutService;
use App\Services\ActiveUser\UserDataService;
use App\Services\ActiveUser\CheckPermissionsService;

class ActiveUserController extends Controller
{
    //Logout function that do logic inside LogoutService
    public function logout(Request $request, LogoutService $logoutService)
    {
        return response()->json($logoutService->handle($request)); //Return received response to frontend in JSON format
    }

    //Function that return user data selectioned in UserDataService
    public function show(Request $request, UserDataService $userDataService)
    {
        return response()->json($userDataService->handle($request)); //Return received response to frontend in JSON format
    }

    public function check_permissions(Request $request, CheckPermissionsService $checkPermissionsService)
    {
        return response()->json($checkPermissionsService->handle($request));
    }
}
