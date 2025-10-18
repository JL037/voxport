````markdown
#  VoxPort Library

> **Part of the VoxPort Ecosystem** — the open toolkit powering [VoxPort Studio], a decentralized podcast platform built on the [AT Protocol](https://atproto.com).

---

##  Overview

**VoxPort** is an open-source **TypeScript library** that helps developers build podcast and audio-series applications on top of the **AT Protocol** (the same decentralized framework that powers [Bluesky](https://bsky.app)).

It provides clean abstractions for:
- Defining and validating **Lexicons** (`app.voxport.series.*`, `app.voxport.episode.*`)
- Interacting with **XRPC endpoints** via a simplified TypeScript client
- Handling **blob uploads** for audio files (Cloudflare R2 / S3 compatible)
- Managing **RSS feed generation** from ATProto records
- Bootstrapping a minimal **PDS (Personal Data Server)** for testing and local development

VoxPort’s goal is to make it easy for creators and developers to build open, creator-owned podcasting tools while staying fully aligned with the AT Protocol.

---

##  Features

 **Lexicon-first design** — clean, strongly typed definitions for `app.voxport.*` records  
 **XRPC utilities** — wrapper around `@atproto/api`’s `XrpcClient` with better ergonomics  
 **Blob + media helpers** — for podcast audio storage in S3/R2-compatible backends  
 **RSS generator** — turns ATProto podcast data into valid RSS XML feeds  
 **TypeScript-first** — all modules fully typed and ESM-ready  

---

##  Example Usage

```ts
import { createClient } from "voxport";

const client = createClient("https://pds.voxport.app");

await client.call("app.voxport.series.create", {
  name: "The Open Source Era",
  description: "Exploring how open collaboration changes audio publishing",
});
````

---

##  Installation

```bash
pnpm add voxport
# or
npm install voxport
```

You’ll also need the ATProto SDK if not already included:

```bash
pnpm add @atproto/api
```

---

##  Architecture

```
voxport/
├── packages/
│ ├── auth/ # Authentication helpers for ATProto integration
│ ├── lexicons/ # ATProto Lexicon definitions (app.voxport.series., app.voxport.episode.)
│ ├── pds-kit/ # Minimal toolkit for working with or simulating a Personal Data Server (PDS)
│ ├── rss/ # Feed generation utilities (RSS XML from ATProto records)
│ ├── storage/ # S3 / R2 abstractions for handling audio blobs
│ └── utils/ # Shared TypeScript helpers, types, and validators
│
├── LICENSE # Business Source License 1.1 (BUSL → Apache 2.0)
├── package.json # Root package definition and scripts
├── pnpm-workspace.yaml # pnpm workspace configuration
├── turbo.json # Turborepo build + dev pipeline
├── tsconfig.json # Shared TypeScript config
└── README.md # Project documentation
```
---

###  Package Details

| Package | Purpose |
|----------|----------|
| **`auth/`** | Shared authentication utilities for ATProto and VoxPort Studio integration. Includes DID, JWT, and session helpers. |
| **`lexicons/`** | Defines VoxPort’s ATProto Lexicons — `app.voxport.series.*`, `app.voxport.episode.*`, and others. Acts as the protocol schema layer. |
| **`pds-kit/`** | Lightweight PDS toolkit for developers. Provides utilities and stubs to simulate or connect to an ATProto-compatible Personal Data Server (PDS). |
| **`rss/`** | Converts VoxPort episode and series records into valid RSS XML feeds. Fully compliant with the standard RSS 2.0 spec. |
| **`storage/`** | Abstractions for managing audio blobs and media uploads across Cloudflare R2, AWS S3, or other compatible storage. |
| **`utils/`** | Common TypeScript helpers and validators used throughout the library (string normalization, ID generation, schema checks, etc.). |

---
### Layers

* **Library (this repo)** – open-source SDK for interacting with ATProto podcast data.
* **PDS (apps/pds)** – your personal data server implementation for testing and publishing records.
* **Studio (apps/web + api)** – the production platform built on this library.

---

##  Roadmap

| Stage | Focus                                     | Status        |
| ----- | ----------------------------------------- | ------------- |
| 1️⃣   | Lexicon definitions (`series`, `episode`) |  In progress |
| 2️⃣   | XRPC client + record CRUD helpers         |  Building   |
| 3️⃣   | PDS test harness + blob upload flow       |  Next       |
| 4️⃣   | RSS generator + validators                |  Planned    |
| 5️⃣   | Docs + developer examples                 |  Planned    |

---

##  Development Setup

```bash
# clone and install
git clone https://github.com/voxport/voxport-lib.git
cd voxport
pnpm install

# build
pnpm build

# test
pnpm test
```

This package is written in **TypeScript** and built using **tsup** and **turbo** for monorepo support.

---

##  Contributing

VoxPort is in **early experimental** stages — feedback, issues, and PRs are very welcome.

If you’re familiar with the **AT Protocol**, **PDS services**, or **lexicon definitions**, I’d especially appreciate input on:

* Lexicon naming conventions
* Record schema alignment
* Firehose event handling

Join the discussion in the ATProto “Touchers” Discord or open an issue on GitHub.

---

##  License

Licensed under the **Business Source License 1.1** until **2027-01-01**,
after which it will convert to the **Apache License 2.0**.

See the [LICENSE](./LICENSE) file for details.

---

##  Resources

* [AT Protocol Documentation](https://atproto.com)
* [Bluesky Developer Portal](https://docs.bsky.app)
* [@atproto/api on npm](https://www.npmjs.com/package/@atproto/api)
* [VoxPort Studio (Preview)](https://voxport.studio)

---

© 2025 Jared Lemler — VoxPort Ecosystem
*"Building the open podcast protocol layer for ATProto."*


