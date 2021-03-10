<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use Auth;
use App\Models\User;
use Validator;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login()
    {
        $credentials = request([
            'email',
            'password'
        ]);
        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function register(UserRequest $request)
    {
        // $validator = Validator::make(request(['name', 'email', 'password']), [
        //     'name' => 'required|string|min:6|max:32',
        //     'email' => 'required|string|email|unique:users',
        //     'password' => 'required|string|min:6|max:12',
        // ]);
        // if ($validator->fails()) {
        //     $response = [
        //         'message' => $validator->errors(),
        //         'status' => 500
        //     ];

        //     // return $response;
        //     return response()->json($validator->errors()->toJson(), 400);
        // }

        $user = User::create([
            'name' => request('name'),
            'email' => request('email'),
            'password' => bcrypt(request('password'))
        ]);

        return response()->json([
            'success' => true,
        ], 200);
    }

    public function me()
    {
        return response()->json(auth('api')->user());
    }

    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }
}
