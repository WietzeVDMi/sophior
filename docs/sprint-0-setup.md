# Sprint 0 — Setup & Fundament

**Status:** ⏳ Bezig
**Duur:** 1–2 dagen
**Branch:** `feature/sprint-0-setup`

← [Terug naar Project Plan](../PROJECT-PLAN.md) | Volgende: [Sprint 1 →](sprint-1-brand.md)

---

## Doel

Werkende Dockerized dev-omgeving, GitHub gekoppeld, Dawn thema als basis.

---

## Docker setup

**Dockerfile:**
```dockerfile
FROM node:20-slim
RUN npm install -g @shopify/cli @shopify/theme
WORKDIR /app
```

**docker-compose.yml:**
```yaml
services:
  shopify:
    build: .
    volumes:
      - ./theme:/app
      - shopify_auth:/root/.local/share/shopify
    ports:
      - "9292:9292"
      - "9393:9393"
    env_file: .env
    working_dir: /app
    command: shopify theme dev --store sophior.myshopify.com --host 0.0.0.0

volumes:
  shopify_auth:
```

**.env.example:**
```
SHOPIFY_CLI_PARTNERS_TOKEN=
```

> `.env` nooit in git. `.env.example` wel.

---

## Taken

### GitHub setup
- [x] SSH verbinding bevestigd (`Hi WietzeVDMi! You've successfully authenticated`)
- [ ] Repository clonen: `git clone git@github.com:WietzeVDMi/sophior.git`
- [ ] Branches aanmaken: `main`, `develop`

### Docker setup
- [ ] `Dockerfile` aanmaken (Node 20 slim + Shopify CLI)
- [ ] `docker-compose.yml` aanmaken met volume mounts + poortkoppeling
- [ ] `.env` aanmaken met `SHOPIFY_CLI_PARTNERS_TOKEN`
- [ ] `.env.example` aanmaken (geen secrets, wel in git)
- [ ] `.gitignore` instellen: `.env`, `node_modules`, `.DS_Store`, `.shopify`

### Shopify setup
- [ ] Dawn thema in `theme/` initialiseren:
  ```bash
  docker compose run --rm shopify shopify theme init --path theme
  ```
- [ ] `docker compose up` testen — preview op localhost:9292 bevestigen
- [ ] Staging thema aanmaken in Shopify Admin (separaat van live thema)
- [ ] Shopify Partners token ophalen (Admin → Apps → Manage private apps of Partners dashboard)

---

## Mappenstructuur na Sprint 0

```
sophior/
├── Dockerfile
├── docker-compose.yml
├── .env                  ← niet in git
├── .env.example          ← wel in git
├── .gitignore
├── PROJECT-PLAN.md
├── docs/
│   └── sprint-*.md
└── theme/               ← Dawn thema (gemount in container)
    ├── assets/
    ├── config/
    ├── layout/
    ├── locales/
    ├── sections/
    ├── snippets/
    └── templates/
```

---

## Deliverable

`docker compose up` → werkende Dawn preview op `localhost:9292`, gekoppeld aan GitHub repo `WietzeVDMi/sophior`.
