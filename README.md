# edu-apoyos-web

## Patrones utilizados

- **Clean Architecture por feature**: Separacion logica de negocio desacoplando la lógica de negocio del framework y del origen de datos.
- **Use Cases**: Cada acción de negocio se encapsula en una caso, evitando lógica de negocio en los componentes.
- **Dependency Injection por Providers**: Cada feature expone un `*.providers.ts` que enlaza la interfaz del dominio (`Service`) con su implementación concreta (`ImplService`), permitiendo sustituir la fuente de datos sin tocar el dominio ni los casos de uso.
- **Interceptor HTTP**: Centralizar el seteo de url de api.
- **Guards de ruta**: Validación de acceso a las distintas páginas de la aplicación.

## Instrucciones de ejecución

Requisitos: Docker y Docker Compose. El repositorio edu-apoyos-web debe estar clonado como carpeta hermana de este edu-apoyos-api, ya que alli se encuentra el `docker-compose.yml` que construye su imagen desde ahí.

Levantar todo el stack (SQL Server, API y Web):

**En ventana de comandos corre:** docker compose up --build

Esto levanta:

- **sqlserver**: SQL Server 2022 en `localhost:1433` (usuario `sa`, password `YourStrong!Passw0rd`).
- **api**: API .NET en `http://localhost:8080` 
- **web**: Frontend Angular (SSR) en `http://localhost:4000`.
Al levantar la aplicación se ejecutan las migraciones y la carga de datos seed automáticamente.


Para detener y eliminar los contenedores:

**En ventana de comandos corre:** docker compose down

Para reiniciar con la base de datos limpia (borra el volumen `sqlserver-data`):

**En ventana de comandos corre:**
docker compose down -v
docker compose up --build


