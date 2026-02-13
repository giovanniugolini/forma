# Backend Development - Forma

## Stato Attuale
**Repository:** forma
**Branch:** main
**Data ultimo aggiornamento:** 13 Febbraio 2026

---

## Architettura
```
forma (fullstack)
    ├── upstream: matematica-fisica (per sync demo)
    └── origin: forma (questo repo)

matematica-fisica (frontend puro)
    └── GitHub Pages
```

**Per sincronizzare demo da matematica-fisica:**
```bash
git fetch upstream
git merge upstream/main
```

---

## ✅ Completato

### Setup Supabase Locale
- [x] Supabase CLI installato (`npx supabase`)
- [x] Stack Docker locale funzionante
- [x] Configurazione in `supabase/config.toml`

### Schema Database (migrazione 00001)
- [x] Tabella `profiles` (estende auth.users)
- [x] Tabella `artifacts` (lezioni, demo, quiz, percorsi)
- [x] Tabella `quiz_results`
- [x] Tabella `favorites`
- [x] Tabella `path_items`
- [x] Row Level Security policies
- [x] Trigger auto-create profile
- [x] Trigger updated_at

### Client Frontend
- [x] Client Supabase (`src/lib/supabase/client.ts`)
- [x] Tipi TypeScript (`src/lib/supabase/types.ts`)
- [x] Hook `useAuth` funzionante
- [x] Pagina test auth (`/auth-test`) - verificata

### CRUD Artifacts (Punto 1)
- [x] Hook `useArtifacts` (lista, filtri, paginazione)
- [x] Hook `useArtifact` (singolo artifact)
- [x] Hook `useCreateArtifact`
- [x] Hook `useUpdateArtifact`
- [x] Hook `useDeleteArtifact`
- [x] Hook `usePublishArtifact`

### Sistema Preferiti (Punto 2)
- [x] Hook `useFavorite` (toggle)
- [x] Hook `useUserFavorites` (lista)
- [x] Hook `useFavoriteCount`
- [x] Componente `FavoriteButton`
- [x] Pagina test `/artifacts-test`

### Dashboard Utente (Punto 3)
- [x] Pagina `/dashboard`
- [x] Sezione profilo
- [x] Sezione statistiche
- [x] Lista preferiti
- [x] Lista contenuti propri
- [x] Placeholder cronologia quiz

---

## 🔄 In Corso

### Sistema Quiz (Punto 4)
- [x] Tipi quiz (`src/types/quiz.ts`)
- [ ] Componente `QuestionCard`
- [ ] Componente `QuizRunner`
- [ ] Componente `ResultsView`
- [ ] Hook `useQuizResults`
- [ ] Pagina test quiz
- [ ] Integrazione Dashboard

---

## 📋 Prossimi Passi

### Punto 5 - Commenti
- [ ] Migrazione: tabella `comments`
- [ ] Hook `useComments`
- [ ] Componente `CommentSection`

### Miglioramenti UI
- [ ] Sistemare stili Tailwind
- [ ] Tema coerente
- [ ] Navigazione principale

---

## 📁 Struttura File Backend
```
src/
├── lib/
│   └── supabase/
│       ├── client.ts      ✅
│       ├── types.ts       ✅
│       └── index.ts       ✅
├── hooks/
│   ├── useAuth.ts         ✅
│   ├── useArtifacts.ts    ✅
│   └── useFavorites.ts    ✅
├── components/
│   ├── ui/
│   │   └── FavoriteButton.tsx  ✅
│   └── quiz/              🔄
│       ├── QuestionCard.tsx
│       ├── QuizRunner.tsx
│       └── ResultsView.tsx
├── types/
│   └── quiz.ts            ✅
└── pages/
    ├── AuthTest.tsx       ✅
    ├── ArtifactsTest.tsx  ✅
    └── Dashboard.tsx      ✅

supabase/
├── config.toml            ✅
└── migrations/
    └── 00001_initial_schema.sql  ✅
```

---

## 🔗 URL Sviluppo Locale

| Servizio | URL |
|----------|-----|
| Frontend | http://localhost:3000/matematica-fisica/ |
| Dashboard | http://localhost:3000/matematica-fisica/\#/dashboard |
| Auth Test | http://localhost:3000/matematica-fisica/\#/auth-test |
| Artifacts Test | http://localhost:3000/matematica-fisica/\#/artifacts-test |
| Supabase Studio | http://127.0.0.1:54323 |
| Mailpit | http://127.0.0.1:54324 |
| API REST | http://127.0.0.1:54321/rest/v1 |

---

## 🗒️ Note

- Sincronizzare periodicamente le demo da `upstream/main`
- Prima di sviluppare su matematica-fisica, assicurarsi che forma sia aggiornato
