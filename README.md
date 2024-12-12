# Vue 3 + TypeScript + Vite + Pinia

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.
Development Guidelines
In Vue components, related methods and business logic must include comments. For detailed comment guidelines, refer to the instructions below.
To facilitate future integration and prevent code conflicts between components, all module-related code should be written in the respective module directory. For detailed information, refer to the file structure below.
Use REM + Flexbox layout. The project already includes postcss-pxtorem, allowing you to write px in LESS files, which will be automatically compiled into rem.
Keys in JSON must use English letters or numbers.
Use yarn as the package manager.
## 项目结构
```shell
├── public/                           // Root directory for static resources, excluding those required to be accessed directly by the browser (e.g., favicon.ico)
└── src/
      ├── assets/                     // Static resources directory
      ├── components/                 // Common components directory
      ├── router/                     // Router configuration directory
      ├── store/                      // State management directory
      ├── style/                      // General CSS directory
      ├── utils/                      // Utility functions directory
      └── views/                      // Page components directory
      └── server/                     // API-related configurations (Axios pre-configured)
      └── directive/                  // Custom directives
      └── hooks/                      // Hooks configuration directory
      └── plugin/                     // Plugin configurations
    └── App.vue                       // Main entry point (modifications prohibited)
    └── main.ts                       // Global component registration prohibited
  
├── index.html
├── vite.config.js                    // Vite configuration file
├── postcss.config.js                 // PostCSS configuration file
├── webstorm.config.ts                // WebStorm configuration file (fixes "@" alias recognition issues)
├── .editorconfig                     // EditorConfig configuration file
├── .prettierrc                       // Prettier configuration file
├── .env                              // Environment variables configuration file

```
