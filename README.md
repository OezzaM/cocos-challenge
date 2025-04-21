
# Cocos Challenge

> Solución al Challenge para Backend de Cocos utilizando NestJS.

## Instalación

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/OezzaM/cocos-challenge.git
   ```

2. **Instalar dependencias**:

   ```bash
   cd cocos-challenge
   npm install
   ```

3. **Configurar variables de entorno**:

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   SV_PORT=
   PGHOST=
   PGDATABASE=
   PGUSER=
   PGPASSWORD=
   PORT=
   ```

4. **Iniciar la aplicación**:

   Para iniciar la aplicación en desarrollo:

   ```bash
   npm run start:dev
   ```

5. **Ejecutar pruebas**:

   Para ejecutar las pruebas unitarias, usa el siguiente comando:

   ```bash
   npm run test
   ```


## Pruebas

Este proyecto utiliza **Jest** para las pruebas unitarias y de integración. Las pruebas están ubicadas en la carpeta `test/` y cubren los casos de uso más comunes, como la creación de órdenes, validaciones y errores esperados.

Para ejecutar las pruebas:

```bash
npm run test
```

## Tecnologías

- **NestJS**.
- **PostgreSQL**.
- **Jest**.
- **TypeORM**.

## Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
