# Echipa: începeți de aici

**Starea cea mai nouă a proiectului și lista cu ce mai trebuie făcut sunt în `docs/RAPORT-COMPLET.md`.** Unde documentul de față spune altceva despre lucrările în curs, are dreptate raportul.

Document pentru cei patru colegi care nu au văzut încă codul. Scopul: în zece minute rulați tot, în douăzeci înțelegeți cum e făcut, apoi luați un task fără să întrebați pe nimeni.

Echipa: The Sopranos, București. Provocarea: „Planet X and SPHEREx" (NASA Space Apps Challenge 2026). Termen oficial: **duminică 15 noiembrie, 23:59, ora locală**. Ținta internă: **predare duminică 17:00**, restul e rezervă.

**Instantaneu de pe 14 noiembrie 2026, în jur de 19:40 (EET).** Documentul va fi reîmprospătat când workerii în curs termină. Până atunci, ce e marcat „în lucru, încă nu este în repo” (`packages/spherex-index/`, `pipeline/index/`, `assets/index/`, `design/`, ramurile locale `wip/live-path` și `wip/missions`) nu poate fi găsit încă pe GitHub.

Legendă pentru comenzi: **rulat azi** înseamnă că cel care a scris documentul a rulat comanda pe 14 noiembrie 2026 și a văzut rezultatul. **din scripturile pachetului** înseamnă că e copiată din `package.json` sau din README, dar nu a fost rulată din nou la scrierea documentului (folderele `web/` și `video/` erau în lucru în acel moment).

Cuvinte astronomice, definite o singură dată:

- **RA/Dec**: coordonatele unui punct pe cer (ca longitudinea și latitudinea), în grade.
- **Expunere**: o fotografie SPHEREx, de circa 113 secunde, într-o singură bandă de lungimi de undă.
- **Detector D1 până la D6**: cele șase senzori ai telescopului; fiecare vede alte lungimi de undă (D1 cel mai albastru, D6 cel mai roșu, în infraroșu).
- **Trecere** (în cod: „pass"): un grup de expuneri făcute în aceeași perioadă de cel mult 20 de zile; un obiect se vede la fel în toate expunerile unei treceri, deci le adunăm într-o singură imagine („stivă").
- **Mișcare proprie**: cât se mută o stea pe cer într-un an, în arcsecunde pe an. **Paralaxă**: mica oscilație anuală a poziției unei stele apropiate, din care se calculează distanța.

---

## 1. Ce există azi și unde

Totul e pe ramura `wip/spherex-time-viewer`. Un asistent de programare cu IA a lucrat, sub îndrumarea șefului echipei, de sâmbătă; restul echipei nu a văzut codul până acum. Detalii despre ce a făcut IA și ce a făcut echipa: [docs/PROCESS.md](PROCESS.md), secțiunea „How AI was used".

| Folder | Ce conține | Stare |
|---|---|---|
| rădăcina (`src/`, `package.json`, `README.md`) | **Globul 3D al echipei** („SPHEREx Sky Navigator"), făcut înainte; lucrul nou îi schimbă doar `.gitignore` și `tsconfig.json` (ca verificarea de tipuri să ignore folderele noi) | gata, înghețat |
| `pipeline/` | Programe Python care citesc date SPHEREx publice și produc fișiere statice pentru cele cinci ținte, plus catalogul de obiecte rapide | gata; verificat (269 de verificări) |
| `assets/` | Fișierele produse: `assets/missions/<țintă>/` (cadre, manifest) și `assets/movers.json` | gata (26 MB) |
| `packages/spherex-core/` | Biblioteca TypeScript care face în browser ce face `pipeline/`: citește pixeli din S3, îi proiectează pe o grilă, îi stivuiește | gata; 55 de teste |
| `packages/missions-core/` | Logica pură a misiunilor de măsurare: centroid, mișcare, paralaxă, scor, raport în link, texte | gata; 32 de teste; **conectarea la `web/` e în lucru, încă nu este în repo (ramura locală `wip/missions`: misiunile la `/mission/[id]` și `/report`)** (un worker a adăugat dependențe `file:` și un test de fum, nerevăzut) |
| `packages/spherex-index/` | Index static al tuturor imaginilor SPHEREx, ca să nu mai întrebăm arhiva IRSA la fiecare căutare | **în lucru, încă nu este în repo** (7 teste trec; constructorul `pipeline/index/` și datele din `assets/index/` nu sunt gata) |
| `web/` | Aplicația nouă (Next.js): pagina de start, `/watch` cu filmulețul, casetă de coordonate, bannerul „It moved" | funcționează pe cele cinci ținte; **designul e refăcut chiar acum** de un worker (cele trei machete din `design/` sunt în lucru, încă nu sunt în repo), care conectează și bibliotecile din `packages/` (în curs; niciun ecran nu le folosește încă, din câte se vede în cod) |
| `video/` | Unelte care randează videoclipul de 30 s din scene HTML (Playwright + ffmpeg) | **uneltele sunt gata** (ultima rulare a testelor, de către workerul video pe 14 noiembrie 2026: toate trec); **filmul nu e gata**: scenele 1, 2, de legătură și 9 sunt reale, scenele 3 până la 8 (cu aplicația) sunt cartonașe înlocuitoare |
| `docs/research/` | 13 note de cercetare publicate (01 până la 09 și 11 până la 14) și experimentele lor | gata; vezi [RESEARCH-INDEX.md](RESEARCH-INDEX.md) |
| `docs/plans/RUN-spherex-24h.md` | Planul pe milestone-uri, ideile, benzile (în română) | propunere, de judecat cu echipa |

Documentele noi, în ordinea în care merită citite:

1. [ARCHITECTURE.md](ARCHITECTURE.md): cum curg datele, ce face fiecare piesă, formatele fișierelor, API-ul bibliotecilor.
2. [DATA.md](DATA.md): toate sursele de date, termenii lor, cum se reconstruiește fiecare fișier produs.
3. [PROCESS.md](PROCESS.md): cum s-a construit, ora cu ora, ce am verificat și cum, ce a făcut IA.
4. [DEPENDENCIES.md](DEPENDENCIES.md): toate bibliotecile cu versiune și licență.
5. [SUBMISSION-CHECKLIST.md](SUBMISSION-CHECKLIST.md): ce cere formularul și ce lipsește.

---

## 2. Rulați totul în zece minute

Cerințe: **Node 20.9 sau mai nou** (testat cu v22.23.1), **npm** (testat cu 10.9.8), **git**, **uv** (rulează Python fără mediu virtual; testat cu 0.11.21). Pentru video, în plus, **ffmpeg** (testat cu 8.1.1). Nu sunt chei de API; toate serviciile folosite sunt publice.

### 2.1 Aduceți ramura (din scripturile pachetului, nerulat de documentul acesta)

```sh
git clone https://github.com/mirunazh/Planet-X-SPHEREx-NASA.git
cd Planet-X-SPHEREx-NASA
git switch wip/spherex-time-viewer
```

### 2.2 Testele bibliotecilor (rulat azi)

```sh
cd packages/spherex-core
npm install --ignore-scripts --legacy-peer-deps   # instalarea nu a fost rerulată azi; node_modules exista deja
npx vitest run          # rulat azi: 7 fișiere, 55 de teste trec
npx tsc --noEmit        # rulat azi: fără erori
cd ../missions-core
npm install --ignore-scripts --legacy-peer-deps
npx vitest run          # rulat azi: 7 fișiere, 32 de teste trec
npx tsc --noEmit        # rulat azi: fără erori
cd ../spherex-index
npm install --ignore-scripts --legacy-peer-deps
npx vitest run          # rulat azi: 1 fișier, 7 teste trec (pachet în lucru)
```

De ce `--legacy-peer-deps`: npm 10.9 se oprește cu eroarea `Cannot read properties of null (reading 'edgesOut')` când rezolvă dependențele opționale ale lui vitest 4. Fișierele `.npmrc` din `web/`, `spherex-core/` și `spherex-index/` o pun deja; `missions-core/` nu are `.npmrc`, deci dați mereu steagul.

Testele „live" lovesc rețeaua reală (un cadru din S3, o căutare la IRSA) și **nu** fac parte din rularea normală. Le puteți rula cu `npm run test:live` și `npm run test:e2e` în `packages/spherex-core` (din scripturile pachetului, nerulate azi; pot eșua dacă IRSA răspunde cu 502).

### 2.3 Verificarea fișierelor produse (rulat azi)

Din rădăcina repo-ului:

```sh
uv run --with numpy --with pillow python -I pipeline/check_missions.py
# rezultat azi: "269 checks passed, 0 failed"

uv run python -I pipeline/movers/check_movers.py assets/movers.json
# rezultat azi: toate liniile PASS (WISE 0855 la 0,43 arcsec de coordonatele din provocare)
```

### 2.4 Aplicația nouă (din scripturile pachetului, nerulat de documentul acesta)

```sh
cd web
npm install        # .npmrc pune deja legacy-peer-deps și ignore-scripts
npm run dev        # http://localhost:3100  (predev copiază assets/ în web/public/data)
npm test           # 57 de teste, conform verificării făcute de orchestrator la 18:46
npm run typecheck
npm run build      # build de producție
```

`web/` nu a fost rulat din nou de documentul acesta, pentru că un worker îi schimbă acum designul. Dacă ceva nu merge, întrebați înainte să reparați: comanda poate fi deja schimbată.

Adrese: `/` (pagina de start, cele cinci ținte, caseta de coordonate) și `/watch?m=wise0855` (filmulețul). Starea vederii e în URL (`m`, `ra`, `dec`, `g`, `mode`, `f`, `ov`, `z`, `cx`, `cy`, `fps`, `loop`); formatul exact e în [ARCHITECTURE.md](ARCHITECTURE.md).

Încercarea care contează cel mai mult: deschideți `http://localhost:3100`, tastați `08h55m10.831s -07d14m42.53s` (coordonatele din provocare pentru WISE 0855) și verificați că aplicația spune că obiectul s-a mutat, cu aproximativ 2 arcminute spre vest, față de 2010.

### 2.5 Refacerea fișierelor din `assets/` (din README-ul `pipeline/`, nerulat azi)

Doar dacă vreți să reconstruiți datele; fișierele sunt deja în repo. O construcție de la zero citește circa 400 de cadre (circa 300 MB) și durează câteva minute.

```sh
uv run --with astropy --with numpy --with scipy --with reproject --with matplotlib --with pillow \
  python -I -B pipeline/build_missions.py --data /calea/unui/director/de/cache
```

Directorul de cache trebuie să fie **în afara repo-ului**. Toate celelalte comenzi de reconstrucție sunt în [DATA.md](DATA.md).

### 2.6 Videoclipul (din scripturile pachetului, nerulat de documentul acesta; uneltele sunt gata, filmul nu)

```sh
cd video
npm install --ignore-scripts --legacy-peer-deps
npx playwright install chromium     # descarcă browserul folosit la randare
npm run render                      # randează out/proof.mp4 și out/timeline-30s.mp4
node test.mjs                       # verifică 1080p, 60 fps, cel mult 30 s, volum, determinism
```

---

## 3. Cele cinci benzi și primele taskuri

Împărțirea vine din planul `docs/plans/RUN-spherex-24h.md`, secțiunea 8. Fiecare bandă are 3 până la 5 taskuri concrete, fiecare cu un criteriu de gata. Dacă un task atinge fișierele altei benzi, scrieți-i colegului înainte.

Regulă pentru toate: **un task, o ramură, un pull request mic** (secțiunea 4).

### L1. Date și știință

Deține: fișierele din `assets/`, `pipeline/`, `packages/spherex-core/`, `packages/spherex-index/`, cifrele reale.

1. **Încărcare live pentru orice coordonată.** Conectați `packages/spherex-core` (funcția `buildLiveMission`) la ecranele din `web/` (în lucru, încă nu este în repo: ramura locală `wip/live-path`, în care orice coordonată scrisă merge live; un worker a început legătura de bază; verificați întâi ce există): lista de expuneri vine din index sau din SIA, pixelii din S3 direct din browser. Gata când: pe `/watch?ra=...&dec=...` pentru un punct fără misiune statică apar cadre reale sau mesajul „fără acoperire". Țintă din plan: prima trecere în sub 15 secunde.
2. **Terminați indexul static** (în lucru, încă nu este în repo: `pipeline/index/`, `assets/index/`, `packages/spherex-index/`). Gata când: indexul dă aceeași listă ca arhiva la 30 de poziții și pentru cele cinci ținte, și respectă limitele din plan (cel mult 50 MB total, 1.000 de fișiere, 10 cereri pe interogare). De ce există: serviciul SIA al IRSA a răspuns uneori cu eroarea 502 minute la rând.
3. **Textul oficial de recunoaștere (acknowledgement) SPHEREx/IRSA.** Manifestele au câmpul `credits.acknowledgement` gol (`null`), pentru că nota 03 nu conține textul. Luați-l de pe paginile IRSA/SPHEREx, citați sursa, puneți-l în `pipeline/build_missions.py` și reconstruiți manifestele. Gata când: `check_missions.py` trece și textul apare în aplicație.
4. **Pagina de dovezi**: tabelul „măsurat față de prezis" pentru cele cinci ținte, din `truth` din fiecare manifest. Gata când e vizibil în aplicație, cu sursa fiecărei valori.
5. (Opțional) **Cadru de referință Gaia** pentru paralaxă: nota 13, secțiunea 7, descrie ce nu s-a făcut. Nu e necesar pentru predare.

### L2. Viewer

Deține: `web/`, deploy-ul, integrarea cu globul.

1. **Ruta de server pentru căutarea IRSA.** Browserul nu poate apela direct IRSA (nu trimite antete CORS). `handleObservationsRequest` din `spherex-core` e o funcție pură gata făcută; trebuie înfășurată într-o rută Next.js (`web/src/app/api/...`). Gata când: ruta răspunde la `?ra=&dec=` și returnează `complete: false` cinstit dacă IRSA a picat parțial.
2. **Deploy public pe Vercel** (decizia D6 din plan). Gata când: un URL public se încarcă fără login, inclusiv în fereastră incognito și pe telefon. Atenție: dacă se păstrează și globul din rădăcină, CSP-ul lui permite doar IRSA și trebuie adăugat `https://nasa-irsa-spherex.s3.us-east-1.amazonaws.com`.
3. **Integrați `missions-core`** (misiunile) în `web/src/lib/` împreună cu L3. Gata când: pașii Privește, Măsoară, Vânează, Raportează merg pe Epsilon Indi B.
4. **Decizia globului:** devine pagina de intrare a noii aplicații sau rămâne separat? Vezi secțiunea 6.
5. **Verificare finală:** linkul copiat reproduce aceeași vedere în fereastră incognito (criteriul 4 din plan).

### L3. Misiuni și conținut

Deține: scenariile misiunilor, textele, testul cu oameni din afară. Cod: `packages/missions-core/src/content/`.

1. **Citiți și îmbunătățiți textele** din `packages/missions-core/src/content/missions.ts` și `glossary.ts` (scrise de IA, pentru elevi). Treceți-le prin pașii din secțiunea 5 (`harper-cli`, `no-ai-slop`, `humanizer` dacă le aveți). Gata când un elev de liceu le înțelege fără ajutor.
2. **Testul cu trei oameni din afara echipei** (criteriul 5): termină prima misiune în sub 3 minute, fără ajutor. Notați unde s-au blocat și trimiteți lui L2.
3. **Cinstea cifrelor.** Pe Epsilon Indi B afirmația permisă este: paralaxă 306 ± 28 mas, distanță 3,3 ± 0,3 pc, față de 3,64 pc la Gaia. Pentru WISE 0855 și Barnard **nu** se afirmă nicio paralaxă măsurată (rezultate negative păstrate). Verificați că niciun text din aplicație nu promite mai mult (nota 13, secțiunea 4).
4. **Misiunile 4 și 5** (RW Aurigae, R Draconis, variabilele) sunt jucabile ca vizionare; scenariile de măsurare sunt în ordinea de tăiere, deci ultimele care merită timp.
5. (Dacă rămâne timp) **Traducere în română**: prima din lista de tăiat, deci ultima prioritate.

### L4. 3D și aspect

Deține: ideile A, C, I din plan (secțiunea 6) și identitatea vizuală.

1. **Coordonare cu designul în curs.** Un worker refăcea `web/` la scrierea documentului (temă „Skyblink": fundal `#080B12`, accent infraroșu `#FF6A3D`). Întrebați înainte să atingeți `web/src/theme/` sau `globals.css`.
2. **Cubul spațiu-timp (ideea A):** cadrele stivuite pe axa timpului, în 3D; stelele fixe sunt coloane drepte, obiectul care se mișcă e o linie înclinată. Cost estimat 4 până la 6 ore (estimare, nemăsurată). Bibliotecile propuse în nota 11: `@react-three/fiber` 9.8.2 cere React sub 19.4 (verificat în notă).
3. **Muntele de semnal (ideea I):** luminozitatea ca relief 3D; cel mai ieftin element 3D (circa 3 ore, estimare).
4. **Reticul și paletă termică (ideea C):** reticul care urmărește obiectul între epoci, dâră, telemetrie.
5. Regulă de licență: bibliotecile noi trec prin [DEPENDENCIES.md](DEPENDENCIES.md); nu adăugați nimic cu licență AGPL sau non-OSI (lista capcanelor e în nota 11, secțiunea 6).

### L5. Poveste și predare

Deține: MTP-ul („Find the next Tombaugh."), videoclipul, pagina de proiect, creditele, câmpul „Use of Super Intelligence", formularul. Lista completă: [SUBMISSION-CHECKLIST.md](SUBMISSION-CHECKLIST.md).

1. **Creați ciorna proiectului** pe site-ul Space Apps și salvați-o (planul cere ciorna salvată sâmbătă 23:30).
2. **Videoclipul de cel mult 30 de secunde.** Scenele cu aplicația reală (s3 până la s8 în `video/shots.mjs`) sunt înlocuitoare; se filmează cu `video/capture.mjs` după ce designul e gata. Reguli: în limba engleză (sau subtitrări în engleză), **nimeni sub 18 ani în imagine sau în voce**, fără sigla NASA, „It moved" trebuie să spună față de ce an (2010).
3. **Descrierea proiectului și câmpul SI.** Folosiți textul adevărat din [PROCESS.md](PROCESS.md): ideea și direcția sunt ale echipei; cercetarea, planul detaliat și codul au fost scrise de un asistent IA. Regula FAQ: IA nu are voie să fie folosită ca să născocească ideea soluției.
4. **Lista de referințe și date**: toate bibliotecile și sursele de date, din [DEPENDENCIES.md](DEPENDENCIES.md) și [DATA.md](DATA.md).
5. **Pagina publică „Credits and licences"** în aplicație și bifa „Confirm All Work is Original" (decide șeful echipei, după ce citește lista).

---

## 4. Reguli de lucru

1. **Pornește de la `wip/spherex-time-viewer`**: `git switch wip/spherex-time-viewer && git pull && git switch -c lane-tema-scurta`.
2. **Pull request-uri mici, în `wip/spherex-time-viewer`.** Un task, câteva fișiere, descriere de trei rânduri: ce, de ce, cum ai verificat.
3. **Nimic nu intră în `main` fără acordul echipei.** Nu faceți push direct în `main`.
4. **Rulați testele înainte de push**: în folderul pe care l-ați atins, `npm test` și `npx tsc --noEmit` (sau `npm run typecheck`); pentru `assets/`, `check_missions.py`.
5. **Niciun secret în repo.** Nu există chei de API în proiect; dacă găsiți nevoia uneia, opriți-vă și întrebați. Înainte de push rulați `gitleaks` pe repo (a fost rulat pe Mac-ul celui care a construit proiectul; dacă nu îl aveți, cereți-i să o facă).
6. **Nu modificați fișierele generate de mână.** `assets/missions/**` se schimbă doar prin `pipeline/build_missions.py`.
7. **Text pentru utilizatori** (butoane, explicații, pagina de proiect): în engleză, fără cratimă lungă (em dash), fără limbaj de reclamă. Rulați `harper-cli lint`.
8. **Fără copiat cod de la alte echipe.** Formularul cere bifa „Confirm All Work is Original". Ideile se pot lua, codul doar din surse cu licență OSI, trecut în referințe.
9. **Spuneți adevărul despre rezultate.** Dacă ceva nu merge sau nu e măsurabil, scrieți asta (exemplu: paralaxa pentru WISE 0855).

---

## 5. Termene și milestone-uri

Din planul `docs/plans/RUN-spherex-24h.md`, secțiunea 5 (propunere, de judecat cu echipa). Orele sunt ale echipei.

| # | Ce | Până când |
|---|---|---|
| M0 | Decizii, benzi, contracte, deploy public, licență | sâmbătă 19:00 |
| M1 | Cele cinci ținte ca filmuleț, pe date reale, pe URL public | sâmbătă 23:00 |
| M2 | Orice coordonată + „obiectul s-a mutat" | cod duminică 03:00, verificat în browser duminică 09:00 |
| M3 | Misiunile (lanțul de măsurare) + raportul | duminică 10:00 |
| M4 | Stratul „wow" ales + pagina de dovezi | duminică 13:00 |
| M5 | Povestea: video, pagina de proiect, README | ciornă sâmbătă 23:30; video duminică 15:00 |
| M6 | Îngheț și predare | funcții 13:00, cod 15:30, **predare 17:00**, termen oficial 23:59 |

Puncte de control: sâmbătă 23:00, dacă M1 nu e pe URL public, tăiem din M4. Duminică 09:00, dacă calea live nu merge, coordonatele oarecare primesc varianta „decenii" din HiPS (2MASS, WISE, SPHEREx). Duminică 13:00 nu mai intră nimic nou.

Ordinea de tăiere (primul cade primul): traducerea RO, sonificarea, spectrul pe loc, zborul 3D la stea, modul diferență, misiunile 4 și 5. **Nu se taie niciodată:** cele cinci ținte pe date reale, câmpul RA/Dec, WISE 0855 corect, videoul de 30 s, formularul.

Formularul se poate retrimite de câte ori vrem până la termen; se evaluează doar ultima versiune salvată, și trebuie apăsat „Submit for Judging".

---

## 6. Decizii deschise pentru echipă

1. **Cine ia care bandă** (secțiunea 3).
2. **Există pitch local și când?** Dacă da, slide-uri (cel mult 7) pentru el; demo-ul global rămâne videoul de 30 s.
3. **Care cont face deploy-ul?** Planul spune Vercel; trebuie un cont al echipei, nu unul personal ascuns.
4. **Voce în videoclip sau doar subtitrări?** Dacă voce, **doar un coleg adult**. Subtitrările arse în imagine merg oricum.
5. **Numele produsului.** Linia de pitch propusă e „Find the next Tombaugh."; numele aplicației nu e ales (în cod: „spherex-time-viewer").
6. **Globul 3D devine pagina de intrare a aplicației noi?** Planul recomandă să rămână înghețat, iar nucleul nou să nu depindă de el.
7. **Licența.** `LICENSE` din repo este Apache-2.0, adăugată ca propunere; echipa o confirmă înainte de a ajunge în `main`.
8. **Datele de pe rețea.** Cine cere „FortiGuard Web Filter Classification" pentru site-ul public, ca rețeaua juriului să nu îl blocheze (sfat din ghidul de predare, nota 01).

---

## 7. Pe cine întrebați

- **Șeful echipei:** direcția, deciziile din secțiunea 6, formularul, ce se afirmă public.
- **Colegul care a lucrat cu asistentul IA din sâmbătă:** cum s-a construit fiecare piesă; sesiunile și brief-urile workerilor. Răspunsurile scrise sunt în [PROCESS.md](PROCESS.md).
- **Documentele:** „de unde vine numărul X?" se răspunde în [DATA.md](DATA.md) și în notele din `docs/research/`; „cum funcționează piesa Y?" în [ARCHITECTURE.md](ARCHITECTURE.md); „se poate folosi biblioteca Z?" în [DEPENDENCIES.md](DEPENDENCIES.md).
- **Provocarea însăși:** forumul Space Apps Connect (https://github.com/nasa/spaceapps), deschis până la sfârșitul hackathonului.
