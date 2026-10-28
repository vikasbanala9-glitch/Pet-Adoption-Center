# CareConnect

A minimal pet adoption center prototype with separate Angular and Express projects.

## Requirements

- Node.js 20.19+ (or 22.12+)
- npm

## Start the backend

```powershell
cd backend
npm run dev
```

The REST API is at http://127.0.0.1:3000. Available routes:

- `GET /api/health` — service status
- `GET /api/pets` — available pets
- `POST /api/adoptions` — submit interest with `{ "petId": 1, "name": "Jamie", "email": "jamie@example.com" }`

## Start the frontend

In a second terminal:

```powershell
cd frontend
npm start
```

Open http://localhost:4200. The Angular app loads pets and submits adoption interest through the API at `http://127.0.0.1:3000`.


