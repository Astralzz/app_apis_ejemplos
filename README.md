# TUTORIAL

---

## PARA EL SERVIDOR

1. Instalar librerías de composer

        composer install

2. Actualizar .env

        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=puerto
        DB_DATABASE=nombre_bd
        DB_USERNAME=nombre_usuario
        DB_PASSWORD=contraseña

3. Migrar tablas

        php artisan migrate

4. Verificar ip de tu internet

    - Configuración
    - Red e internet
    - Wifi
    - Propiedades de tu internet

             ....
             Dirección IPv4: n.n.n.n
             ....

5. Correr servidor con la ip de tu internet

        php artisan serve --host direccion_ip --port n

    Ejemplo:

        php artisan serve --host 129.110.6.407 --port 8000

6. Crear n notas aleatorias (Opcional)

        php artisan insert-notes-random

---

## PARA LA APP

1. Descargar librerías de npm

        npm install

2. Conectarse al mismo internet donde esta montado el servidor
3. Descargar APK de la app o expo Go de play store
4. Abrir aplicación o abrir expo go
5. Si usaras expo go (Opcional)
   - iniciar el servidor desde consola

                npm start --reset-cache
  
   - Escanear QR de consola y entrar a la app

6. Abrir apk
7. En la seccion de api creada

   - Poner la misma ip y puerto con la que iniciaste el servidor

                n.n.n.n:n

        Ejemplo:

                20.154.7.107:8000

8. Probar y listo

---
