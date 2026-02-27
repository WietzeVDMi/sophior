# Sprint 0 — Setup & Fundament

**Status:** ✅ Bijna klaar — alleen Shopify auth + staging thema nog
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
- [x] Repository gekoppeld: `git@github.com:WietzeVDMi/sophior.git`
- [x] Branches aangemaakt: `main`, `develop`

### Docker setup
- [x] `Dockerfile` aangemaakt (Node 20 slim + Shopify CLI)
- [x] `docker-compose.yml` aangemaakt met volume mounts + poortkoppeling
- [x] `.env` aangemaakt (leeg — token nog in te vullen)
- [x] `.env.example` aangemaakt (in git)
- [x] `.gitignore` ingesteld: `.env`, `node_modules`, `.DS_Store`, `.shopify`

### Shopify setup
- [x] Dawn thema gecloned in `theme/` (shallow clone van `Shopify/dawn`)
- [ ] `docker compose up` testen — preview op localhost:9292 bevestigen ← **jij**
- [ ] Staging thema aanmaken in Shopify Admin (separaat van live thema) ← **jij**
- [ ] Shopify Partners token ophalen + invullen in `.env` ← **jij**

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
