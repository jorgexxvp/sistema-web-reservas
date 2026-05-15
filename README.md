# Sanbella Web - Sistema de Reservas 🎫

Aplicación web moderna para gestión de reservas, reserva de servicios y administración de usuarios. Construida con **React**, **TypeScript**, **Tailwind CSS** y **Vite**, siguiendo los principios de **Clean Architecture**.

## 🚀 Características

- ✅ Autenticación y gestión de usuarios
- ✅ Reserva de servicios y maestros
- ✅ Dashboard administrativo
- ✅ Gestión de permisos y roles
- ✅ Interfaz moderna y responsiva
- ✅ State management con Zustand
- ✅ API REST con proxy CORS

## 📋 Requisitos Previos

- **Node.js** 18+ 
- **pnpm** 8+ ([Instalar pnpm](https://pnpm.io/installation))
- **Git**

## 🛠️ Tech Stack

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 18+ | UI Framework |
| **TypeScript** | 5+ | Type Safety |
| **Vite** | 5+ | Build Tool |
| **Tailwind CSS** | 3+ | Styling |
| **Zustand** | Latest | State Management |
| **pnpm** | 8+ | Package Manager |

## 📁 Estructura del Proyecto
src/ ├── core/ # Lógica de negocio central │ └── application/ # Use Cases y servicios │ ├── AuthUseCase.ts │ ├── MasterUseCase.ts │ ├── ServiceUseCase.ts │ └── UserUseCase.ts │ ├── domain/ # Entidades y interfaces │ ├── models/ # Modelos de datos │ │ ├── Auth.ts │ │ ├── Master.ts │ │ ├── Service.ts │ │ └── User.ts │ └── repositories/ # Interfaces de repositorios │ ├── AuthRepository.ts │ ├── MasterRepository.ts │ ├── ServiceRepository.ts │ └── UserRepository.ts │ ├── infrastructure/ # Implementaciones de APIs │ ├── api/ │ │ └── Api.ts # Configuración HTTP cliente │ └── services/ # Servicios de API │ ├── AuthApi.ts │ ├── MasterApi.ts │ ├── ServiceApi.ts │ └── UserApi.ts │ └── presentation/ # Capa de presentación (UI) ├── assets/ │ ├── image/ │ └── svg/ ├── components/ # Componentes reutilizables │ ├── CustomButton/ │ ├── Header/ │ ├── InputText/ │ ├── Layout/ │ ├── Modal/ │ ├── Sidebar/ │ ├── SkeletonTable/ │ ├── StatCard/ │ ├── Table/ │ └── TimeSlotSlider/ ├── features/ # Módulos por feature │ └── Admin/ │ ├── Dashboard/ # Secciones de la feature │ │ ├── components/ │ │ ├── pages/ │ │ └── index.ts │ ├── pages/ │ └── index.ts ├── hooks/ # Custom React Hooks │ ├── useMasterHook.tsx │ ├── useServiceHook.tsx │ └── useUserHook.tsx ├── zustand/ # Global State Management │ ├── useLoginStore.tsx │ ├── useMasterStore.tsx │ └── useSidebarStore.tsx ├── toolbox/ # Utilidades y constantes │ ├── constants/ │ │ ├── data.ts │ │ ├── environment.ts │ │ ├── responseType.ts │ │ ├── routes.ts │ │ ├── schemas.tsx │ │ └── theme.ts │ ├── interface/ │ ├── utils/ │ └── index.ts ├── routes/ # Configuración de rutas └── App.tsx

index.ts # Entry point vite.config.ts # Configuración de Vite tailwind.config.ts # Configuración de Tailwind tsconfig.json # Configuración de TypeScript