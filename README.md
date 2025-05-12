# 🕷️ Spider Session Editor - Extensión de Chrome

Esta extensión permite editar de forma visual y dinámica el objeto `session` almacenado en el `localStorage` del sitio activo en tu navegador.  
Ideal para debugging, QA, o edición avanzada de sesiones web sin abrir la consola.

---

## ⚙️ Instrucciones de instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/jovanesDev/spider.git
cd spider
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Generar el build de la extensión

```bash
npm run build
```

Esto creará una carpeta `dist/` lista para cargar en Chrome.

---

## 🧱 Cargar la extensión en Chrome

1. Abrí `chrome://extensions/` en tu navegador Chrome.
2. Activá el **Modo desarrollador** (Developer mode) en la parte superior derecha.
3. Hacé clic en **"Load unpacked"**.
4. Seleccioná la carpeta `dist/` generada por el build.

¡Listo! Tu extensión ya está funcionando.

---

## 🧩 Características principales

- Edición visual de todos los campos de `session`.
- Soporte para tokens JWT con decodificación y recodificación.
- Switch para valores booleanos.
- Edición de arrays y arrays de objetos con formularios amigables.
- Sincronización directa con el tab activo.

---

## 🛠️ Requisitos

- Node.js v16+
- Navegador Chrome v88+

---

## 🖼️ Ícono

La extensión usa el siguiente ícono:

![Spider Icon](./public/icon.png)

---

## 📄 Licencia

MIT
