<?php

use App\Http\Controllers\consoleController;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


// * -> php artisan insert-notes-random

// Insertar 10 usuarios aleatorios
Artisan::command('insert-notes-random', function () {
    try {

        // Creamos
        $class = new consoleController();
        $class->generarNotasAleatorias(50);

        $this->info('Éxito, las notas se generaron correctamente.');

        //! - Error
    } catch (Exception $e) {
        $this->error($e->getMessage());
    }
})->describe('Inserta n notas aleatorias a la tabla notas.');
