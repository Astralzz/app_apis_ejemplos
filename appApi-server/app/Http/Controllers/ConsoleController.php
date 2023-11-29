<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use InvalidArgumentException;
use Faker\Factory as Faker;
use App\Models\Nota;
use Exception;

//TODO - Inyección de datos desde consola
class consoleController extends Controller
{

    // * Generar cursos aleatorios
    public function generarNotasAleatorias(int $cantidad): void
    {
        try {

            // ? Consola
            $this->comprobarUsoConsola();

            // Ejecutamos
            $this->generarNotasByFaker($cantidad);

            // ! Error
        } catch (\Throwable $th) {
            throw new Exception($th->getMessage(), 1);
        }
    }

    //SECTION -  --------- DATOS PRIMARIOS ---------

    // * Generar cursos aleatorios
    private function generarNotasByFaker(int $cantidad): void
    {

        // Faker
        $faker = Faker::create();

        try {

            // Recorremos
            for ($i = 0; $i < $cantidad; $i++) {


                do {
                    // Creamos nombre único
                    $nombre = $faker->unique()->sentence;
                } while (Nota::where('nombre', $nombre)->exists());

                // Creamos nota
                $nuevoCurso = new Nota([
                    'nombre' => $faker->sentence,
                    'mensaje' => $faker->paragraph,
                ]);

                // Guardamos
                $nuevoCurso->save();
            }

            // ! Error
        } catch (\Exception $e) {
            throw new \Exception('Error al generar nota, ' . $e->getMessage());
        }
    }

    // * Comprobar que no se ejecuta en consola
    private function comprobarUsoConsola(): void
    {
        // ! No se ejecuta desde la terminal
        if (!app()->runningInConsole()) {
            throw new InvalidArgumentException("Este evento solo puede ser ejecutado desde la consola.");
        }
    }
}
