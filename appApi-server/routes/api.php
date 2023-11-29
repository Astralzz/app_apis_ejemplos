<?php

use App\Http\Controllers\NotaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//TODO - Notas
Route::prefix('notas')->group(function () {
    // * GET - Lista completa
    Route::prefix('get')->group(function () {
        // http://127.0.0.1:8000/api/notas/get/lista/n/n
        Route::get('lista/{inicio}/{fin}', [NotaController::class, 'getLista']);
    });
    // * OTROS - Acciones en general
    Route::prefix('opc')->group(function () {
        // http://127.0.0.1:8000/api/notas/opc/registrar
        Route::post('registrar', [NotaController::class, 'registro']);
        // http://127.0.0.1:8000/api/notas/opc/eliminar/n
        Route::delete('eliminar/{id}', [NotaController::class, 'eliminar']);
    });
});
