# Seasonal Flavors - Frontend

This is the frontend for the **Seasonal Flavors** project, a web application that helps users explore recipes based on seasonal ingredients. It is built using **Next.js**, **React**, and **TypeScript**.

## Table of Contents 📖

- [Installation](#installation-🛠️)
- [Scripts](#scripts-🎬)
- [Dependencies](#dependencies-🔗)
- [Project Structure](#project-structure-📂)
- [Testing](#testing-🧪)
- [Features](#features-🎀)
- [License](#license-📜)

## Installation 🛠️

### Prerequisites

- **Node.js** (version 14.x or higher)
- **npm** or **yarn**

### Steps

1. **Clone the repository:**

   ```
   git clone https://github.com/leolivi/Seasonal-Flavors.git
   cd Seasonal-Flavors/frontend
   ```

2. **Install dependencies:**

   ```
   npm install
   # or
   yarn install

   ```

3. **Environment variables:**

   Adjust the .env.example file in the frontend folder to your needs.

   ❗️ For this school project, the .env. file is already set up - will be deleted later ❗️

4. **Start the development server:**

   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to http://localhost:3000

## Scripts 🎬

- `dev`: Starts the development server.
- `build`: Builds the production version of the application.
- `start`: Starts the production server.
- `lint`: Runs ESLint on the codebase.
- `test`: Runs the test suite using Jest.

## Dependencies 🔗

### Main Dependencies

- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **React DOM**: The entry point to the DOM and server renderers for React.
- **TypeScript**: Type-safe JavaScript.
- **TailwindCSS**: Utility-first CSS framework.
- **React Hook Form**: Library for managing forms.
- **Zustand**: State management library.
- **NextAuth.js**: Authentication for Next.js applications.
- **zod**: A TypeScript-first schema declaration and validation library.
- **framer-motion**: Library for animations in React.
- **tiptap**: Rich text editor for React.
- **react-icons**: A library of popular icons for React applications.
- **clsx**: A utility for constructing className strings conditionally.
- **react-use**: A library of React hooks.
- **@shadcn/ui**: A library of UI components for React.
- **gray-matter**: A library for parsing and processing Markdown files.
- **markdown-to-jsx**: A library for converting Markdown to JSX.
- **lucide-react**: A library of icons for React applications.
- **tailwind-scrollbar**: A library for adding scrollbars to TailwindCSS.
- **tailwindcss-animate**: A library for adding animations to TailwindCSS.

### Dev Dependencies

- **Jest**: Unit Testing Library.
- **Testing Library**: Tools for testing React components.
- **Prettier**: Code formatter with TailwindCSS plugin.
- **ESLint**: Linting tool for JavaScript and TypeScript.
- **ts-jest**: TypeScript preprocessor with Jest.
- **ts-node**: TypeScript execution environment for node.
- **typescript**: TypeScript compiler.

## Project structure 📂

```
Seasonal-Flavors/
├── frontend/
│   ├── src/               # Source code
│   │   ├── app/             # Next.js pages
│   │   ├── assets/          # Static files like images
│   │   ├── components/      # Reusable React components
│   │   ├── data/            # Data files
│   │   ├── hooks/           # Custom React hooks
│   │   ├── layouts/         # Header and Footer
│   │   ├── providers/       # React providers
│   │   ├── services/        # API services
│   │   ├── stores/          # Zustand stores
│   │   ├── types/           # TypeScript types
│   │   ├── validations/     # Validation functions
│   ├── .env.local         # Environment variables
│   ├── package.json       # Project dependencies and scripts
│   ├── jest.config.js     # Jest configuration
│   ├── tailwind.config.ts # TailwindCSS configuration
│   ├── next.config.js     # Next.js configuration
│   └── README.md          # Project description and instructions
```

## Testing 🧪

To run the tests, use the following command:

```
npm run test
# or
yarn test
```

❗️ frontend folder must be the root folder to run the tests ❗️

## Features 🎀

- **Seasonal Recipes**: Display recipes based on the current season.
- **Recipe Details**: View detailed information about a recipe.
- **User Authentication**: Sign-up and log in to create recipes, share them and save favorite recipes.
- **Unit Testing**: Unit testing for the frontend to ensure the code is working as expected.
- **Mobile Responsive**: Fully responsive design.

## License 📜

The code in this repository is licensed under the MIT License.

However, all visual assets, including but not limited to logos, branding, designs, and trademarks,
are the exclusive property of Seasonal Flavors and may not be used, copied, distributed,
or modified without prior written permission.
