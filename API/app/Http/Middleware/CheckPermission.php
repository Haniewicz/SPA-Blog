<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, $permission)
    {
        //checking if user has specific permission or * permission(which means, he can do anything he want)
        if(Auth::User()->getRole->getPermissions->where('permission', $permission)->count() > 0 || Auth::User()->getRole->getPermissions->where('permission', '*')->count() > 0)
        {
            return $next($request);
        }
        //If user has no permission then api returns status 401 which
        return [
            'api_status' => '403',
            'message' => 'Unauthorized',
        ];
    }
}
