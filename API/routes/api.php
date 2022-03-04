<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ActiveUserController;

//Guest routes
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

//Authenticated user routes
Route::post('logout', [ActiveUserController::class, 'logout'])->middleware('auth:sanctum');
Route::get('me', [ActiveUserController::class, 'show'])->middleware('auth:sanctum');
Route::post('check_permissions', [ActiveUserController::class, 'check_permissions'])->middleware('auth:sanctum');
