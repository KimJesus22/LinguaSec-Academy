# 🛡️ LinguaSec Academy

![Version](https://img.shields.io/badge/version-1.0.0-neon_cyan) ![Status](https://img.shields.io/badge/status-OPERATIONAL-neon_green) ![Security](https://img.shields.io/badge/security-MAXIMUM-neon_purple)

> **"Dominio del Idioma. Seguridad Total."**

**LinguaSec Academy** es una aplicación web de vanguardia diseñada para evaluar competencias lingüísticas bajo una interfaz inmersiva de **Ciberseguridad**. Combina pruebas de nivelación precisas con una experiencia de usuario gamificada estilo "Consola Hacker".

---

## ⚡ Características Principales

### 🌐 Evaluación Multilingüe
- **Idiomas Soportados**: Inglés (🇺🇸), Japonés (🇯🇵) y Coreano (🇰🇷).
- **Progresión Dinámica**: 10 preguntas que avanzan en dificultad (Básico A1 -> Avanzado C2).
- **Lógica MCER**: Algoritmo interno que calcula el nivel Marco Común Europeo de Referencia basado en el puntaje.

### 🎨 Experiencia Cyberpunk (UI/UX)
- **Estética Hacker**: Fondo oscuro profundo (`#0a0a0a`), tipografía `JetBrains Mono` y paleta de colores neón (Cyan, Purple, Green, Red).
- **Feedback Visual**:
    - Respuestas Correctas: Iluminación **Verde Neón** intenso.
    - Respuestas Incorrectas: Alerta **Roja Neón**.
- **Animaciones**: Efectos de **Glitch** en títulos, barras de progreso dinámicas y transiciones suaves (`fade-in-up`).

### 🔐 Simulación de Seguridad & Certificación
- **Protocolo de Validación**: Antes de obtener resultados, el sistema ejecuta una secuencia simulada de seguridad:
    1.  Verificación de Identidad.
    2.  Consulta a bases de datos de **Interpol**.
    3.  Validación de firma digital **NOM-151**.
- **Certificados Oficiales**: Generación de documentos PDF profesionales al instante usando `jspdf`.
    - Incluye: Nombre del agente, Nivel obtenido, Fecha, Firma del "Director de Seguridad" y bordes tecnológicos.

---

## 🏗️ Arquitectura del Software

El proyecto sigue los principios de **Clean Architecture** para garantizar escalabilidad y mantenibilidad, separando la lógica de negocio de la interfaz de usuario.

### 📂 Estructura de Directorios

```bash
src/
├── components/         # UI Pura (Presentational Components)
│   ├── QuizQuestionView.jsx  # Vista de preguntas y opciones
│   └── QuizResultUI.jsx      # Vista de resultados y simulación de seguridad
├── domain/             # Reglas de Negocio (Framework Agnostic)
│   └── evaluation.js         # Lógica de cálculo MCER y mensajes motivacionales
├── hooks/              # Lógica de Aplicación (State Management)
│   └── useQuiz.js            # Custom Hook para manejar el flujo del quiz
├── services/           # Servicios Externos e Infraestructura
│   └── certificateService.js # Generación de PDF con jsPDF
└── data/               # Fuentes de Datos
    └── quizData.js           # Banco de preguntas por idioma
```

---

## 🚀 Instalación y Ejecución

Requisitos previos: `Node.js` (v16 o superior).

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/linguasec-academy.git
    cd linguasec-academy
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Ejecutar servidor de desarrollo**:
    ```bash
    npm run dev
    ```

4.  **Acceso**:
    Abrir `http://localhost:5173` en tu navegador.

---

## 🛠️ Tecnologías Utilizadas

- **Core**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) (Configuración personalizada con animaciones y colores extendidos).
- **Fuentes**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Google Fonts).
- **PDF**: [jspdf](https://github.com/parallax/jsPDF) para generación de documentos en el cliente.

---

## 📸 Capturas de Pantalla

*(Las capturas de pantalla se generan automáticamente en la carpeta de artefactos de documentación)*

- **Pantalla de Inicio**: Selección de idioma con tarjetas interactivas.
- **Quiz Activo**: Interfaz inmersiva con barra de progreso.
- **Resultados**: Dashbboard de nivelación con secuencia de seguridad activa.

---

© 2025 LinguaSec Academy // SECURE LEARNING ENVIRONMENT
