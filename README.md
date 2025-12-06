# 🛡️ LinguaSec Academy

![Version](https://img.shields.io/badge/version-1.1.0-neon_cyan) ![Status](https://img.shields.io/badge/status-OPERATIONAL-neon_green) ![Security](https://img.shields.io/badge/security-MAXIMUM-neon_purple)
[![Deploy](https://img.shields.io/badge/Live_View-Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://lingua-sec-academy.vercel.app/)

> **"Dominio del Idioma. Seguridad Total."**

**LinguaSec Academy** es una aplicación web de vanguardia diseñada para evaluar competencias lingüísticas bajo una interfaz inmersiva de **Ciberseguridad**. Combina pruebas de nivelación precisas con una experiencia de usuario gamificada estilo "Consola Hacker".

---

## ⚡ Características Principales

### 🌐 Evaluación Multilingüe
- **Idiomas Soportados**: Inglés (🇺🇸), Japonés (🇯🇵) y Coreano (🇰🇷).
- **Progresión Dinámica**: 10 preguntas que avanzan en dificultad (Básico A1 -> Avanzado C2).
- **Lógica MCER**: Algoritmo interno que calcula el nivel Marco Común Europeo de Referencia basado en el puntaje.
- **Nuevos Modos de Aprendizaje y Gamificación**:
    - **Skill Tree (Árbol de Habilidades)**: Dashboard interactivo estilo videojuego/IDE que visualiza el progreso del usuario. Incluye estados "Bloqueado", "Activo" y "Completado" en una línea de tiempo vertical.
    - **Modo Parcheo (Protocolo de Revisión)**: Sistema de feedback inmediato donde el usuario "parchea" sus vulnerabilidades (errores). Explica pedagógicamente el *porqué* de cada respuesta correcta.
    - **Modo Terminal**: Lecciones interactivas vía línea de comandos (CLI).
    - **Novela Visual (Scenario)**: Simulaciones de negocios y cultura.
    - **Audio Intercept**: Lecciones de escucha usando `Web Speech API`.

### 🎨 Experiencia Cyberpunk (UI/UX)
- **Estética Hacker**: Fondo oscuro profundo (`#0a0a0a`), tipografía `JetBrains Mono` y paleta de colores neón (Cyan, Purple, Green, Red).
- **Feedback Visual**:
    - Respuestas Correctas: Iluminación **Verde Neón** intenso.
    - Respuestas Incorrectas: Alerta **Roja Neón**.
- **Animaciones**: Efectos de **Glitch** en títulos, barras de progreso dinámicas y transiciones suaves (`fade-in-up`).

### 🔊 Efectos de Sonido Tácticos
- **Audio Sintetizado**: Sistema basado en **Web Audio API** para generar efectos de sonido en tiempo real sin assets externos.
- **Feedback Auditivo**:
    - *Hover*: Sonido de alta frecuencia "Tech Blip".
    - *Click*: Sonido percusivo de confirmación mecánica.
- **Control Global**: Botón persistente de **Mute** (🔊/🔇) para operaciones sigilosas.

### 👁️ Sistema de Proctoring (Anti-Trampas)
- **Vigilancia Activa**: Detección de anomalías mediante `visibilitychange` (cambio de pestaña o minimizado).
- **Protocolo de 3 Strikes**:
    1.  **Advertencia 1 y 2**: Modal de **ALERTA ROJA** bloqueante.
    2.  **Strike 3**: Terminación inmediata de la prueba (Score 0) y marcaje como **INTRUSO**.

### ⚖️ Cumplimiento Legal (LFPDPPP)
- **Consentimiento Obligatorio**: Bloqueo de inicio de prueba hasta la aceptación explícita de términos.
- **Transparencia**: Acceso a "Términos de Servicio" simulados mediante modal integrado.

### 🔐 Simulación de Seguridad & Certificación Visual
- **Protocolo de Validación**: Secuencia simulada: Identidad -> Interpol -> NOM-151 -> Acceso Concedido.
- **Certificados de Alta Fidelidad**:
    - Renderizado visual mediante `html2canvas` para soporte total de caracteres asiáticos (CJK) y estilos CSS complejos.
    - Generación de PDF (`jspdf`) con bordes decorativos, firma digital y fecha de emisión.

---

## 🏗️ Arquitectura del Software

El proyecto sigue los principios de **Clean Architecture** para garantizar escalabilidad y mantenibilidad.

### 📂 Estructura de Directorios

```bash
src/
├── components/         # UI Pura (Presentational Components)
│   ├── MissionDashboard.jsx    # Skill Tree & Roadmap Visualizer
│   ├── CertificateTemplate.jsx # Plantilla visual oculta para certificados
│   ├── QuizQuestionView.jsx    # Vista de preguntas
│   ├── QuizResultUI.jsx        # Resultados y orquestación de certificado
│   ├── SecurityWarningModal.jsx # Alerta de Proctoring
│   ├── TermsModal.jsx          # Modal legal
│   └── LanguageCard.jsx        # Tarjetas de selección
├── context/            # Estado Global
│   └── SoundContext.jsx        # Gestión de Mute
├── domain/             # Reglas de Negocio
│   └── evaluation.js           # Lógica MCER
├── hooks/              # Lógica de Aplicación
│   ├── useQuiz.js              # Máquina de estados del Quiz y Proctoring
│   └── useSoundEffects.js      # Sintetizador de audio
├── services/           # Servicios Externos
│   └── certificateService.js   # Generación de PDF (html2canvas + jspdf)
├── utils/              # Utilidades
│   └── sm2.js                  # Algoritmo de Repetición Espaciada (SuperMemo 2)
└── data/               # Fuentes de Datos
    └── quizData.js             # Banco de preguntas
```

---

## 🏗️ Arquitectura del Sistema

El siguiente diagrama ilustra el flujo de datos y los niveles de seguridad implementados:

```mermaid
graph TD
    %% Nodos Principales
    User([👤 Usuario Final])
    
    subgraph Frontier [🖥️ Frontend (PWA / React)]
        UI[Interfaz Gráfica\n(Tailwind + Framer)]
        Logic{⚙️ Lógica de Seguridad}
        Luhn[💳 Validación Luhn]
        Proctor[👁️ Anti-Cheat / Proctoring]
    end
    
    subgraph Backend [☁️ Supabase BaaS]
        Auth[🔐 Authentication\n(JWT / RLS)]
        DB[(🗄️ Database\nPostgreSQL)]
    end
    
    subgraph Compliance [⚖️ Trazabilidad]
        Logs[(📜 Audit Logs\nForensic Trail)]
    end

    %% Relaciones
    User ==>|Interacción| UI
    UI -->|Eventos| Logic
    
    Logic -->|Verificación Financiera| Luhn
    Logic -->|Monitoreo| Proctor
    
    Luhn -->|Request Seguro| Auth
    Proctor -->|Violación| Auth
    
    Auth ==>|Validación de Identidad| DB
    DB -.->|Registro Automático| Logs

    %% Estilos Cyberpunk
    style User fill:#000,stroke:#fff,stroke-width:2px,color:#fff
    style Frontier fill:#0a0a0a,stroke:#bd00ff,stroke-width:2px,color:#fff
    style Backend fill:#0a0a0a,stroke:#00f3ff,stroke-width:2px,color:#fff
    style Compliance fill:#0a0a0a,stroke:#ff003c,stroke-width:2px,color:#fff
    
    style DB fill:#111,stroke:#00f3ff,stroke-width:2px,shape:cylinder,color:#00f3ff
    style Logs fill:#111,stroke:#ff003c,stroke-width:2px,shape:cylinder,color:#ff003c
    
    style Logic fill:#222,stroke:#fff,color:#fff
    style Luhn fill:#222,stroke:#bd00ff,color:#bd00ff
    style Proctor fill:#222,stroke:#ff003c,color:#ff003c
```

## 🚀 Instalación y Despliegue

Requisitos previos: `Node.js` (v16 o superior).

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/KimJesus22/LinguaSec-Academy.git
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
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Audio**: [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) (Síntesis de voz)
- **PDF & Captura**: [html2canvas](https://html2canvas.hertzen.com/) + [jspdf](https://github.com/parallax/jsPDF)
- **Fuentes**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) & [Open Sans](https://fonts.google.com/specimen/Open+Sans)

---

© 2025 LinguaSec Academy // SECURE LEARNING ENVIRONMENT
