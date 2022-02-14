<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ActiveUserController;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('logout', [ActiveUserController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {

    return response()->json([
        'api_status' => '200',
        'user' => $request->user(),
        'message' => 'Authenticated',
    ]);

});
