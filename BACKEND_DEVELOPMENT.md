# Backend Development - Forma

## Stato Attuale
**Repository:** forma
**Branch:** main
**Data ultimo aggiornamento:** 14 Febbraio 2026

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
- [x] Sezione statistiche (4 card)
- [x] Lista preferiti
- [x] Lista contenuti propri
- [x] Cronologia quiz con statistiche

### Sistema Quiz (Punto 4)
- [x] Tipi quiz (`src/types/quiz.ts`) - già esistenti
- [x] Hook `useQuiz` - già esistente
- [x] Componenti Quiz UI - già esistenti
- [x] Demo quiz (QuizAlgebra, QuizVettori) - già esistenti
- [x] Hook `useQuizResults` per salvataggio su Supabase
- [x] Hook `useQuizStats` per statistiche
- [x] Integrazione salvataggio in QuizAlgebraDemo
- [x] Integrazione Dashboard con cronologia

### Fix e Configurazioni
- [x] Tailwind config con content paths
- [x] CSS con direttive @tailwind
- [x] File .env.local per variabili Supabase

---

## 🔄 Da Testare

- [ ] Verifica salvataggio quiz su Supabase
- [ ] Verifica cronologia quiz in Dashboard

---

## 📋 Roadmap Prossime Fasi

### Fase 5 - Miglioramenti Dashboard
- [ ] Layout più moderno e responsive
- [ ] Card con icone e colori più accattivanti
- [ ] Grafici statistiche (chart.js o recharts)
- [ ] Navigazione migliorata
- [ ] Dark mode (opzionale)

### Fase 6 - Sistema Ricerca e Hashtag
- [ ] Migrazione: campo `tags` in artifacts
- [ ] Componente barra di ricerca
- [ ] Filtri per categoria, materia, livello
- [ ] Sistema hashtag (#algebra, #cinematica, ecc.)
- [ ] Pagina "Esplora" con risultati ricerca

### Fase 7 - Creazione Quiz Utente
- [ ] Editor quiz (UI per creare domande)
- [ ] Salvataggio quiz come artifact
- [ ] Preview quiz prima della pubblicazione
- [ ] Pubblicazione e condivisione
- [ ] Visibilità: pubblico / privato / gruppo

### Fase 8 - Sistema Gruppi/Classi
- [ ] Migrazione: tabella `groups` e `group_members`
- [ ] Creazione gruppo/classe (per docenti)
- [ ] Invito studenti (codice o link)
- [ ] Condivisione quiz con gruppo
- [ ] Dashboard docente con risultati classe

### Fase 9 - Commenti e Interazioni
- [ ] Migrazione: tabella `comments`
- [ ] Componente `CommentSection`
- [ ] Like/dislike su commenti
- [ ] Notifiche (opzionale)

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
│   ├── useFavorites.ts    ✅
│   ├── useQuiz.ts         ✅
│   └── useQuizResults.ts  ✅
├── components/
│   ├── ui/
│   │   ├── FavoriteButton.tsx  ✅
│   │   └── Quiz.tsx            ✅
│   └── quiz/              (componenti aggiuntivi)
├── types/
│   └── quiz.ts            ✅
├── utils/
│   └── quiz/
│       ├── generators.ts  ✅
│       └── scoring.ts     ✅
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
| Quiz Algebra | http://localhost:3000/matematica-fisica/\#/quiz-algebra |
| Supabase Studio | http://127.0.0.1:54323 |
| Mailpit | http://127.0.0.1:54324 |

---

## 🗒️ Note

- Sincronizzare periodicamente le demo da `upstream/main`
- Testare salvataggio quiz prima di procedere con Fase 5
- La Dashboard necessita di miglioramenti UI significativi
