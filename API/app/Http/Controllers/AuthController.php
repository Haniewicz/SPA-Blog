<?php

namespace App\Http\Controllers;

//including required things that are already in laravel
use Illuminate\Http\Request;

//including FormRequests
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

//including Services
use App\Services\Auth\LoginService;
use App\Services\Auth\RegisterService;

class AuthController extends Controller
{
    //Login function that firstly validate inserted data inside RegisterRequest and then do logic inside RegisterService
    public function register(RegisterRequest $request, RegisterService $registerService)
    {
        $data = $request->all(); //Get data from request
        return response()->json($registerService->handle($data)); //Return data to frontend in JSON format
    }

    //Login function that firstly validate inserted data inside LoginRequest and then do logic inside LoginService
    public function login(LoginRequest $request, LoginService $loginService)
    {
        $data = $request->all(); //Get data from request
        return response()->json($loginService->handle($data)); //Return data to frontend in JSON format
    }
}
