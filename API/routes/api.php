<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('login', [UserController::class, 'login']);
Route::post('register', [UserController::class, 'register']);
Route::post('logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {

    return response()->json([
        'api_status' => '200',
        'user' => $request->user(),
        'message' => 'Authenticated',
    ]);

});
