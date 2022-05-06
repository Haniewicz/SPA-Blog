<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Including required controllers
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ActiveUserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;

//Routes available for everyone
Route::get('posts', [PostController::class, 'index']); //Route to return all posts
Route::get('posts/{id}', [PostController::class, 'show']); //Route to return 1 specific post
Route::post('posts/delete', [PostController::class, 'destroy']);

Route::get('categories', [CategoryController::class, 'index']); //Route to return all categories

//Guest routes
Route::post('login', [AuthController::class, 'login']); //Route to login user
Route::post('register', [AuthController::class, 'register']); //Route to register user

//Authenticated user routes
Route::post('logout', [ActiveUserController::class, 'logout'])->middleware('auth:sanctum'); //route to logout user
Route::get('me', [ActiveUserController::class, 'show'])->middleware('auth:sanctum'); //Route to return logged user data
Route::post('check_permissions', [ActiveUserController::class, 'check_permissions'])->middleware('auth:sanctum'); //Route to check if user has specific permission
