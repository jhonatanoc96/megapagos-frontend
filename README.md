# FRONTEND PRUEBA DE INGRESO

# Versiones:
Node JS: 22.13.1 \
Next: 15.1

# Funcionamiento
Las páginas principales utilizan Server Side Rendering. \
Las peticiones HTTP son enviadas al backend mediante Server Actions. \
La información entre componentes es compartida utilizando variables de entorno. 

# Dirección de despliegue (Vercel) (NO Funcional)
Actualmente el despliegue en Vercel se comunica correctamente con el backend, \
sin embargo, la información compartida entre componentes utilizando variables de entorno \
solo aplica localmente, una vez desplegado no existe comunicación entre si y esto \
impide el correcto funcionamiento.
https://megapagos-frontend.vercel.app \

# Instrucciones para despliegue local:
Ejecutar los siguientes comandos en el terminal \
git clone https://github.com/jhonatanoc96/megapagos-frontend.git \
npm install \
npm run dev

# Nota:
En el archivo app/lib/constants/server-url.constant.ts se configura la URL para conectarse con el backend.