<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'id','role',
    ];

    public function getUsers()
    {
        return $this->hasMany('App\Models\User');
    }

    public function getPermissions()
    {
        return $this->belongsToMany('App\Models\Permission', 'permission_role');
    }
}
