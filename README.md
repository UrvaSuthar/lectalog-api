# Lectalog API

A Node.js API built with Express and TypeScript for the Lectalog application.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Supabase account and project

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/UrvaSuthar/lectalog-api.git
cd lectalog-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```env
# Copy the contents from .env.example
cp .env.example .env
```

4. Update the `.env` file with your Supabase credentials and other configuration.

## Development

To run the development server:
```bash
npm run dev
```

## Building for Production

To build the project:
```bash
npm run build
```

To start the production server:
```bash
npm start
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Add other environment variables as needed
```

## Project Structure

```
src/
├── index.ts          # Application entry point
├── routes/           # API routes
├── controllers/      # Route controllers
├── services/         # Business logic
├── models/          # Data models
└── utils/           # Utility functions
```

## API Documentation

API documentation will be added as the project grows.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 