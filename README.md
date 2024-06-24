# Kitchen Cache

## Description

Kitchen Cache is an online application designed to centralize all your kitchen management needs. With Kitchen Cache, you can:

- Log pantry tiems
- Search for and save recipes
- Keep track of your groceries

The frontend of this application was built using a React frontend and Tailwind CSS for designing. It uses Supabase for the database.

## Features

- **Pantry Management**: Add and remove items in your pantry, tracking their categories and expiration dates
- **Recipe Search and Save**: Find new recipes and save your favorites for access. You can also add original recipes to your saved page!
- **Grocery List**: Create and manage your grocery list, with the ability to strike through items as you shop.

## Installation and Setup

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git
- Supabase account and project

### Installation

1. Clone the Repository
   - `git clone https://github.com/reesedychiao/kitchen-cache.git`
   - `cd kitchen-cache`
2. Install Deoendencies: `npm install`
3. Set Up Supabase

   - Create a project on Supabase
   - Set up your database schema and tables as required (e.g., `Groceries`, `PantryItems`, `Recipes`).
   - Get your Supabase URL and anon key from the project settings.

4. Create Enironment Variables
   - Create a `.env.local` file in the root directory and add your Supabase URL and anon key:
   - `NEXT_PUBLIC_SUPABASE_URL=your-supabase-url`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key`

### Running the Application

1. Start the Development Server: `npm run dev`
2. Build for Production: `npm run build`

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Contact

For any feedback or questions, please contact dychiaoreese@gmail.com
