<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

//TODO - Modelo notas
class Nota extends Model
{
    // Tabla
    protected $table = 'notas';

    // Usar datos de prueba
    use HasFactory;

    // Mostrar
    protected $fillable = [
        'nombre',
        'mensaje',
        'created_at',
    ];

    // Ocultos
    protected $hidden = [
        'updated_at',
    ];
}
