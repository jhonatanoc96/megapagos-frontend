## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

CREATE TABLE IF NOT EXISTS administradores (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );

CREATE TABLE IF NOT EXISTS proyectos (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      descripcion TEXT,
      administrador_id INTEGER,
      FOREIGN KEY (administrador_id) REFERENCES administradores(id)
    )

CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      rol VARCHAR(50) NOT NULL,
      administrador_id INTEGER,
      FOREIGN KEY (administrador_id) REFERENCES administradores(id)
    )


CREATE TABLE IF NOT EXISTS usuario_proyectos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    proyecto_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
    );# megapagos-frontend
# megapagos-frontend
