# Real Estate Document Management System

A modern web application for managing real estate documents and items.

## Features

- CRUD operations for items
- Soft delete functionality
- Advanced filtering and searching
- Document and image upload
- Responsive design
- Modern UI with Angular Material and TailwindCSS

## Prerequisites

- Node.js (v14+)
- npm (v6+)
- Angular CLI (v15+)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd real-estate-doc
```

2. Install dependencies:
```bash
npm install
```

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
real-estate-doc/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── guards/
│   │   ├── features/
│   │   │   └── items/
│   │   │       ├── components/
│   │   │       ├── services/
│   │   │       └── models/
│   │   └── shared/
│   │       └── components/
│   ├── assets/
│   └── environments/
├── package.json
└── angular.json
```

## Technologies Used

- Angular 17
- RxJS
- Angular Material
- TailwindCSS
- TypeScript
- Angular CLI

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
