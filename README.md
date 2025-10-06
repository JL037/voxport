# VoxPort

**An open, AT Protocol–native podcast hosting and discovery platform.**
Built with **TypeScript** end-to-end, **Next.js** for the web interface, and **NestJS (Fastify)** for a modular, scalable backend.

VoxPort empowers creators to **own their content**, **self-host**, or **federate** through the [AT Protocol](https://atproto.com) ecosystem — no gatekeepers, no lock-in.

---

## Mission

> To make podcast publishing and discovery truly open, decentralized, and creator-controlled.

VoxPort is designed as a composable platform for:

* **Creators** – Publish episodes you control and distribute anywhere.
* **Listeners** – Discover content across the AT Protocol social graph.
*  **Developers** – Extend and integrate with ATProto feeds using familiar web tools.

---

## Tech Stack

| Layer                       | Technology                                             | Purpose                                                                            |
| --------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| **Frontend**                | **Next.js (TypeScript)**                               | Server-side rendered web UI for creators and listeners                             |
| **Backend**                 | **NestJS (Fastify Adapter)**                           | Structured, modular API server with dependency injection, guards, and interceptors |
| **Database**                | **PostgreSQL + Prisma**                                | Type-safe ORM with schema-first migrations and great developer experience          |
| **Future Analytics Module** | **Kysely (optional)**                                  | Typed SQL builder for advanced analytics and reporting                             |
| **Validation / Models**     | **Zod (shared)**                                       | Shared schema definitions between frontend and backend                             |
| **Storage**                 | **S3-compatible (MinIO locally, R2/S3 in production)** | Audio and cover image assets                                                       |
| **Protocol**                | **ATProto / Bluesky SDK**                              | Federated identity, publishing, and social discovery                               |
| **Infra**                   | **Docker + Turbo + pnpm**                              | Monorepo tooling, containerized dev setup, and CI/CD                               |
| **License Model**           | **Apache 2.0 + Commercial Dual License**               | Open-source core with optional commercial redistribution rights                    |

---

## Architecture Overview

```
voxport/
├─ apps/
│  ├─ backend/     # NestJS (Fastify) API server
│  └─ frontend/    # Next.js web app
├─ packages/
│  ├─ shared/      # Zod schemas, types, constants
│  ├─ lexicons/    # ATProto lexicon schemas
│  └─ config/      # Shared ESLint/Tailwind/Turbo configs
├─ infra/
│  ├─ docker/      # PostgreSQL, Redis, MinIO containers
│  └─ migrations/  # Database migrations
├─ LICENSE
├─ LICENSE-COMMERCIAL
└─ README.md
```

---

## Getting Started (Local Dev)

### 1. Clone and install dependencies

```bash
git clone https://github.com/JL037/voxport.git
cd voxport
pnpm install
```

### 2. Start local infrastructure

```bash
docker compose -f infra/docker/docker-compose.yml up -d
```

This runs:

* PostgreSQL → main database
* Redis → caching / background jobs
* MinIO → local S3-compatible file storage

### 3. Configure environment

Copy `.env.example` to `.env` and adjust for your environment:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/voxport"
S3_ENDPOINT="http://localhost:9000"
S3_ACCESS_KEY="minio"
S3_SECRET_KEY="minio123"
S3_BUCKET="voxport"
```

### 4. Initialize Prisma

```bash
pnpm prisma migrate dev --name init
```

### 5. Start the dev servers

```bash
# Backend (NestJS)
cd apps/backend
pnpm start:dev

# Frontend (Next.js)
cd ../frontend
pnpm dev
```

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend → [http://localhost:4000/api/health](http://localhost:4000/api/health)

---

## Data Model (Initial)

```prisma
model Series {
  id          String   @id @default(uuid())
  title       String
  description String?
  ownerDid    String
  episodes    Episode[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Episode {
  id          String   @id @default(uuid())
  seriesId    String
  title       String
  audioUrl    String
  coverUrl    String?
  durationSec Int
  publishedAt DateTime @default(now())
  atpCid      String?
  Series      Series   @relation(fields: [seriesId], references: [id])
}
```

---

## Architecture Principles

### Backend (NestJS)

* Fastify adapter for high-performance HTTP.
* **Thin controllers:** controllers orchestrate; logic lives in `services/`.
* **Zod DTOs:** shared validation schemas in `packages/shared`.
* **Hexagonal architecture:** core logic independent of Nest — easy to port if you ever move to Fastify, Hono, or tRPC.
* **Repositories:** Prisma/Kysely implementations behind a clean interface.

### Frontend (Next.js)

* **App Router** for modern file-based routing and layouts.
* **React Query + Suspense** for async data.
* **Zod schemas** for shared typing with the backend.
* **Server actions / API routes** for SSR and secure operations.

---

## Scaling Strategy

|  **Phase**  | **Focus**                              | **Notes**                                                       |
| :---------: | :------------------------------------- | :-------------------------------------------------------------- |
|   **MVP**   | Creator dashboard + episode publishing | Next.js (frontend) + NestJS/Prisma (backend)                    |
| **Phase 2** | ATProto federation + feed discovery    | Integrate `@atproto/api` for publishing records                 |
| **Phase 3** | Analytics & reports                    | Add **Kysely** module for advanced SQL (CTEs, window functions) |
| **Phase 4** | Federation tooling                     | Add ATProto AppView/Relay for indexing                          |
| **Phase 5** | Managed SaaS & self-hosting            | Deploy via Docker / Fly.io / Render                             |


## License

VoxPort is **dual-licensed**:

* **Open Source:** [Apache License 2.0](LICENSE)
  Free for open-source, personal, or research use.

* **Commercial:** [VoxPort Commercial License](LICENSE-COMMERCIAL)
  Required for proprietary redistribution, white-label hosting, or closed-source integration.
  Contact via GitHub: [@JL037](https://github.com/JL037) • [Project Issues](https://github.com/JL037/voxport/issues)

> The dual-license model keeps VoxPort open and interoperable while enabling ethical, sustainable commercial hosting.

---

## Contributing

We welcome community input!
By contributing, you agree your work is released under the same dual-license model (Apache 2.0 + VoxPort Commercial License).

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for:

* Branch naming conventions
* Code formatting / linting
* Pull request process
* Contributor license agreement notice

---

## Roadmap Highlights

* [x] Repo setup + monorepo tooling (Turbo, pnpm)
* [x] Dockerized infra (Postgres, Redis, MinIO)
* [x] Dual-license governance (Apache 2.0 + Commercial)
* [ ] Series & Episode modules
* [ ] File upload + playback
* [ ] ATProto record publishing
* [ ] Analytics (Kysely)
* [ ] Web player & sharing features
* [ ] Federation & discovery indexing
* [ ] Public deployment templates (Fly.io, Render)

---

## Links

* **GitHub Repo:** [https://github.com/JL037/voxport](https://github.com/JL037/voxport)
* **AT Protocol Docs:** [https://atproto.com](https://atproto.com)
* **Bluesky Social:** [https://bsky.app](https://bsky.app)

---

### Summary

VoxPort combines **Next.js**, **NestJS**, and **Prisma** for the fastest path to a real, federated podcast platform — with room to evolve into a full analytics and hosting service powered by **Kysely** and **ATProto**.

The structure is designed to:

* Scale cleanly (shared types, modular architecture)
* Stay contributor-friendly (predictable Nest layout)
* Keep your **future flexibility** (easy swap to lighter frameworks if needed)

> **Own your voice. Publish on the open web.**
