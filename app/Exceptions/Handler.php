<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Support\Responsable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Throwable
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    // public function render($request, Throwable $exception)
    // {
    //     return parent::render($request, $exception);
    // }

    public function render($request, Throwable $exception)
    {
        dd($exception);
        // API response
        if ($request->is('api/*')) {
            if ($exception instanceof AuthenticationException) {
                return $this->toResponse($request, 401, 'errors.MSG_4010', 401);
            }

            if ($exception instanceof Responsable) {
                return $exception->toResponse($request);
            }

            // validation exception
            if ($exception instanceof ValidationException) {
                $response = [
                    'error' => [
                        'code' => 422,
                        'message' => $exception->errors()
                    ]
                ];
                return response()->json($response, 422);
            }

            // HTTP Exception
            if ($this->isHttpException($exception)) {
                if ($exception->getStatusCode() == 400) {
                    return $this->toResponse($request, 400, 'errors.MSG_4000', $exception->getStatusCode());
                }

                if ($exception->getStatusCode() == 405) {
                    return $this->toResponse($request, 405, 'errors.MSG_4050', $exception->getStatusCode());
                }
            }

            return $this->toResponse($request, 500, 'errors.MSG_5001', 500);
        }

        if (!($exception instanceof ValidationException)) {
            if ($request->ajax() || $request->wantsJson()) {
                return response()->json(
                    $this->getJsonMessage($exception),
                    $this->getExceptionHTTPStatusCode($exception)
                );
            }
        }

        return parent::render($request, $exception);
    }

    protected function getExceptionHTTPStatusCode($e)
    {
        // Not all Exceptions have a http status code
        // We will give Error 500 if none found
        return method_exists($e, 'getStatusCode') ?
            $e->getStatusCode() : 500;
    }

    protected function toResponse($request, string $code, string $message, int $status)
    {
        return (new BaseException($code, $message, $status))->toResponse($request);
    }

    protected function getJsonMessage($e)
    {
        // You may add in the code, but it's duplication
        return [
            'status' => 'error',
            'message' => $e->getMessage(),
        ];
    }
}
