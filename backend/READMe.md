# Seasonal Flavors - Backend

This is the backend for the **Seasonal Flavors** web application project, which provides an API to manage seasonal recipes, user profiles, and recipe uploads. It is built using **Laravel** and **SQLite**.

## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Features](#features)
- [License](#license)

## Installation

### Prerequisites

- **PHP** (version 8.0 or higher)
- **Composer**
- **SQLite** (database)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/leolivi/Seasonal-Flavors.git
   cd Seasonal-Flavors/backend
   ```

2. Install dependencies:

   ```
   composer install
   ```

3. Modify .env file:
   If you prefer to use another database driver such as MySQL or PostgreSQL, you can update your .env configuration file to use the appropriate database.

4. Run the migrations to set up the SQLite database:

   ```
   php artisan migrate
   ```

5. Start the Laravel development server:

   ```
   php artisan serve
   ```

6. The server will be running at http://localhost:8000

## API Endpoints

The backend provides several API endpoints to manage users, recipes, uploads, and more. Below are some examples of the key endpoints:

**Authentication**
_POST_ /api/register: Register a new user.
_POST_ /api/login: Log in a user.

**Recipes**
_GET_ /api/recipes: Fetch a list of all recipes.
_POST_ /api/recipe: Create a new recipe.
_PATCH_ /api/recipe/{id}: Update an existing recipe.
_DELETE_ /api/recipe/{id}: Delete a recipe.

and many more...

## Technologies

- Laravel: PHP web framework for building APIs and web applications.
- SQLite: Lightweight, file-based relational database.

## Project Structure

```
backend/
├── _docs/             # Documentation (mermaid, bruno)
├── app/               # Application logic (models, controllers)
├── config/            # Configuration files
├── database/          # Migrations, seeders, and SQLite database
├── public/            # Static assets (images, CSS, JavaScript)
├── routes/            # API route definitions
```

## Features

- **User Authentication**: Register, log in, and manage user sessions.
- **Recipe Management**: Create, update, delete, and browse recipes.
- **Uploads**: Handle profile and recipe image uploads.
- **Favorites & Tags**: Add favorites and tags to recipes.
- **SQLite Database**: Lightweight and easy to set up.

## License

The code in this repository is licensed under the MIT License.

However, all visual assets, including but not limited to logos, branding, designs, and trademarks, are the exclusive property of [your name or company name] and may not be used, copied, distributed, or modified without prior written permission.
