# TUTORIAL

## PARA LA APP

## PARA EL SERVIDOR

1. Actualizar .env

        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=puerto
        DB_DATABASE=nombre_bd
        DB_USERNAME=nombre_usuario
        DB_PASSWORD=contraseña

2. Migrar tablas

        php artisan migrate

3. Verificar ip de tu internet

    - Configuración
    - Red e internet
    - Wifi
    - Propiedades de tu internet

             ....
             Dirección IPv4: n.n.n.n
             ....

4. Correr servidor con la ip de tu internet

        php artisan serve --host direccion_ip --port n

    Ejemplo:

        php artisan serve --host 129.110.6.407 --port 8000

5. Crear n notas aleatorias (Opcional)

        php artisan insert-notes-random
