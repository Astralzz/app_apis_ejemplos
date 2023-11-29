<?php

namespace App\Http\Controllers;

use App\Models\Nota;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;


//TODO - Nota controller
class NotaController extends Controller
{
    // * Curso
    protected Nota $nota;

    // * Validaciones
    private $rules = [
        'nombre' => 'required|unique:notas,nombre|string|min:2|max:240',
        'mensaje' => 'string|min:2',
    ];

    // * Respuestas
    private $messages = [
        'nombre.required' => 'El campo nombre es requerido.',
        'nombre.unique' => 'El nombre proporcionado ya se encentra registrado.',
        'nombre.string' => 'El campo nombre debe ser una cadena de texto.',
        'nombre.min' => 'El campo nombre debe tener al menos 2 caracteres.',
        'nombre.max' => 'El campo nombre debe tener como máximo 240 caracteres.',
        'mensaje.required' => 'El campo mensaje es requerido.',
        'mensaje.string' => 'El campo mensaje debe ser una cadena de texto.',
        'mensaje.min' => 'El campo mensaje debe tener al menos 2 caracteres.',
    ];

    // * Constructor
    public function __construct(Nota $nota)
    {
        $this->nota = $nota;
    }

    // * Registro
    public function registro(Request $request)
    {
        try {

            // Validamos
            $request->validate($this->rules, $this->messages);

            // Creamos nota
            $this->nota->create([
                'nombre' => $request->input('nombre'),
                'mensaje' => $request->input('mensaje'),
            ]);

            // * Éxito
            return response()->json([
                'status' => true,
            ], 200);

            // ! - Errores
        } catch (ValidationException $e) {
            return $this->handleError($e, 401);
        } catch (QueryException $e) {
            return $this->handleError($e, 402);
        } catch (\Exception $e) {
            return $this->handleError($e, 500);
        }
    }

    // * Lista
    public function getLista($inicio, $fin)
    {
        try {
            // Obtenemos
            $lista = $this->nota
                ->orderBy('nombre', 'asc')
                ->skip($inicio - 1)
                ->take($fin - $inicio + 1)
                ->get();

            // * Éxito
            return response()->json([
                'status' => true,
                'data' => $lista
            ], 200);

            // ! Error
        } catch (QueryException $e) {
            return $this->handleError($e, 402);
        } catch (\Exception $e) {
            return $this->handleError($e, 500);
        }
    }

    // * Eliminar
    public function eliminar($id)
    {
        try {
            // Buscamos
            $nota = $this->nota->findOrFail($id);

            // Eliminamos
            $nota->delete();

            // * Éxito
            return response()->json([
                'status' => true,
            ], 200);

            // ! Error
        } catch (ModelNotFoundException $e) {
            return $this->handleError($e, 402);
        } catch (\Exception $e) {
            return $this->handleError($e, 500);
        }
    }


    //SECTION - Privado
    private function handleError(\Exception $e, int $statusCode)
    {

        // Tipo
        $errorType = 'unknown';

        // Mensaje
        $errorMessage = $e->getMessage();

        // ? De validación
        if ($e instanceof ValidationException) {
            $errorType = 'validation';
            // ? De Query
        } elseif ($e instanceof QueryException) {
            $errorType = 'query';
            // ? De no encontrado
        } elseif ($e instanceof ModelNotFoundException) {
            $errorType = 'model_not_found';
            $errorMessage = 'El recurso no fue encontrado.';
        }

        // Retornamos
        return response()->json([
            'status' => false,
            'error_type' => $errorType,
            'error' => $errorMessage
        ], $statusCode);
    }
}
