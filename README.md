# LOTERÍA_FRONTEND - Gestión de Sorteos y Venta de Billetes

Este proyecto implementa el *frontend* de gestión de loterías, **billetes** y **clientes** utilizando **Angular (Standalone Components)**. Consume la API RESTful de la aplicación *backend* desarrollada con Java + Spring Boot.

---

## 1. Instrucciones de Arranque

Para levantar el proyecto localmente, es fundamental que el **backend de la API esté operativo** y respondiendo a los *endpoints* definidos.

### 1.1. Prerrequisitos

* **Node.js y npm**
* **Angular CLI**

### 1.2. Instalación y Ejecución

1.  **Clonar el Repositorio:**
    ```bash
    git clone https://github.com/cristianxO/loteria_frontend.git
    cd loteria-frontend
    ```
2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```
3.  **Iniciar la Aplicación:**
    ```bash
    ng serve
    ```
    La aplicación estará disponible en `http://localhost:4200/`.

---

## 2. Estructura y Estándares de Código

El proyecto sigue una arquitectura limpia, modularizada por funcionalidad y construida con el enfoque **Standalone Components** de Angular.

### 2.1. Estructura de Módulos

* `src/app/core`: Contiene los **servicios**  y las **interfaces/modelos** de datos.
* `src/app/features`: Contiene la lógica de las vistas de negocio, organizada por módulos:
    * `sorteos`: Vistas clave como listado, creación de sorteos, creación de billetes, y venta.
    * `clientes`: Gestión de clientes.

### 2.2. Buenas Prácticas Aplicadas

* **Angular Standalone:** Uso de la arquitectura sin módulos (`@NgModule`) para mejorar el rendimiento y la simplicidad.

---

## 3. Módulos y Funcionalidades

Las funcionalidades clave implementadas en el *frontend* se agrupan bajo rutas específicas, como se detalla a continuación:

### 3.1. Módulo de Sorteos y Venta (`/sorteos`)

| Funcionalidad | Componente Principal | Ruta |
| :--- | :--- | :--- |
| **Listado de Sorteos** | `lista-sorteos` | `/sorteos` |
| **Crear Sorteo** | `crear-sorteo` | `/sorteos/crear` |
| **Crear Billetes** | `BilletesViewComponent` | `/sorteos/billetes` |
| **Venta de Billetes** | `VentaViewComponent` | `/sorteos/vender` |

### 3.2. Módulo de Clientes (`/clientes`)

| Funcionalidad | Componente Principal | Ruta |
| :--- | :--- | :--- |
| **Registrar Cliente** | `registrar-cliente` | `/clientes/registrar` |
| **Historial Cliente** | `historial-cliente` | `/clientes/historial` |