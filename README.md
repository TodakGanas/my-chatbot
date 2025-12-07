# OrangeAI

Bienvenue sur **OrangeAI**, une application de chatbot intelligente et minimaliste.

## 🚀 Introduction

OrangeAI est une interface de chat moderne conçue pour offrir une expérience utilisateur fluide et agréable. Propulsée par le modèle **Gemini 2.5 Flash** de Google et sécurisée par **Supabase**, l'application permet aux utilisateurs d'interagir avec une IA générative rapide et performante.

L'interface utilisateur est pensée pour être épurée, mettant en avant le contenu des conversations avec un thème visuel distinctif.

## 🛠 Installation et Démarrage

Pour lancer le projet localement, suivez ces étapes :

1.  **Prérequis** : Assurez-vous d'avoir Node.js installé.
2.  **Installation des dépendances** :
    ```bash
    npm install
    ```
3.  **Configuration (si nécessaire)** :
    Créez un fichier `.env.local` à la racine du projet et ajoutez vos clés API (Supabase, Google Gemini) :
    ```env
    NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
    NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_supabase
    GOOGLE_API_KEY=votre_cle_api_gemini
    ```
4.  **Démarrage du serveur de développement** :
    ```bash
    npm run dev
    ```
    Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗 Architecture et Choix Techniques

Le projet a été conçu avec une architecture robuste et moderne pour garantir performance, maintenabilité et évolutivité. Voici une explication de nos choix techniques :

### 1. Next.js 16 (App Router)
Nous avons choisi **Next.js 16** avec l'**App Router** comme framework principal.
- **Pourquoi ?** L'App Router permet d'utiliser les **React Server Components (RSC)** par défaut. Cela signifie que beaucoup de logique est exécutée sur le serveur, réduisant la taille du bundle JavaScript envoyé au client et améliorant les performances de chargement initial et le SEO.
- **Structure** : Le dossier `app/` contient les routes et les pages, tandis que `api/` gère les endpoints backend serverless.

### 2. Tailwind CSS v4
Pour le style, nous utilisons **Tailwind CSS**.
- **Pourquoi ?** C'est une approche "utility-first" qui permet de construire des interfaces rapidement sans quitter le HTML/JSX. La version 4 apporte des améliorations de performance et une configuration simplifiée. Cela facilite la création d'un design système cohérent et réactif.

### 3. Google Gemini (via `@google/genai`)
Le cœur de l'intelligence artificielle repose sur le modèle **Gemini 2.5 Flash**.
- **Pourquoi ?** Ce modèle offre un excellent équilibre entre rapidité et qualité de réponse, idéal pour une application de chat en temps réel.
- **Intégration** : L'intégration se fait via le SDK `@google/genai` côté serveur (`app/api/aiService.ts`), ce qui permet de garder les clés API sécurisées et de ne jamais les exposer au client.

### 4. Supabase (Auth & Base de données)
**Supabase** est utilisé pour l'authentification et la persistance des données.
- **Pourquoi ?** Supabase offre une alternative open-source à Firebase avec une base de données PostgreSQL puissante. Cela nous permet de gérer facilement les inscriptions/connexions utilisateurs et de sauvegarder l'historique des discussions de manière sécurisée et structurée.

### Structure des Dossiers
- **`app/`** : Cœur de l'application (Pages, Layouts, API Routes).
- **`app/components/`** : Composants UI réutilisables (ex: `ChatBubble`, `Sidebar`).
- **`app/api/`** : Logique backend (ex: appel à Gemini, gestion des tokens).
- **`lib/`** : Utilitaires et configurations partagés (ex: client Supabase).

---
