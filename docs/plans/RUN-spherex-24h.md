# RUN spherex-24h: plan pe milestone-uri (v1, PROPUNERE)

Scris sâmbătă 14 nov 2026; secțiunea 7 actualizată 18:32 EET. Stare: PROPUNERE, de judecat cu echipa.
Termen oficial: duminică 15 nov, 23:59 ora locală. Ținta internă: predare duminică 17:00, restul e rezervă.
Nu am rulat /ultraplan-local (ar fi costat 30 până la 40 de minute din ceas); planul e făcut direct, din cele 10 note de cercetare.

## 1. Cadru

**Scop.** Un tool web public în care oricine introduce RA/Dec și vede cerul SPHEREx schimbându-se în timp „ca un filmuleț”, construit ca o lecție: elevul vede o stea mișcându-se, o măsoară și ajunge la distanță și viteză, pe date reale NASA.

**Ce nu facem.** Conturi, clasamente cu backend, date personale (lucrăm cu minori: zero login). Pipeline-ul complet pe 4 misiuni cu potrivire de PSF. Un index al întregului cer. Tutor AI. Mai mult lucru la globul 3D existent.

**Criterii de acceptare (testele finale).**
1. Tastezi coordonatele din challenge pentru WISE 0855 (`08h55m10.831s -07d14m42.53s`): aplicația răspunde cu cadre SPHEREx reale, spune că obiectul s-a mutat circa 2 arcmin spre vest și îl arată la 4 până la 5 microni.
2. Fiecare din cele cinci ținte pornește ca filmuleț dintr-un click, în sub 2 secunde.
3. O coordonată oarecare dă prima trecere în sub 15 secunde sau un mesaj clar „fără acoperire”.
4. Un link copiat reproduce aceeași vedere într-o fereastră incognito, fără login.
5. Trei oameni din afara echipei termină prima misiune în sub 3 minute, fără ajutor.
6. Fiecare cadru își arată data, intervalul de lungimi de undă, numărul de expuneri și fișierele sursă.
7. Formularul e complet: video de cel mult 30 s, linkuri publice, licență OSI în repo, date NASA listate, câmpul SI completat.

## 2. MTP

**Linia (EN, pentru predare):** „Find the next Tombaugh.”
**Sub ea:** „Planet X was once found by a 24-year-old with no degree, blinking two photographs. We give every student the same method and NASA's newest sky.”

De ce: Clyde Tombaugh a găsit Pluto (căutat sub numele „Planet X”) în 1930, la 24 de ani, comparând două plăci la un blink comparator; a intrat la universitate abia după. Challenge-ul se numește „Planet X”, cere exact metoda lui și pomenește descoperirea lui Pluto. Surse de citat: Britannica (născut 4 feb 1906, descoperire 18 feb 1930, universitate după) și arhiva Lowell Observatory. „Fără facultate la momentul descoperirii” e dedus din aceste date: verificați formularea înainte de pitch.

Rafinări față de varianta voastră:
- Scopul se spune din partea elevului (descoperire), iar „talent hunting” devine rezultatul pentru instituții. Juriul notează impactul asupra utilizatorului.
- Pâlnia are nevoie de un semnal măsurabil: precizia măsurătorii elevului față de valoarea reală („ai măsurat 10,1 arcsec/an, valoarea reală e 10,4”). Avem valorile reale pentru toate cele cinci ținte.
- Patru trepte: Privește, Măsoară, Vânează, Raportează. Fiecare e un ecran, nu un slide.
- Onestitate: nu promitem că elevii găsesc Planeta X. Promitem că învață metoda care a găsit Pluto și mii de pitice brune (challenge-ul însuși citează backyardworlds.org).
- În pitch: „astronomie”, nu „astrologie”.

## 3. Produsul, pe scurt

Lanțul de măsurare, pe date reale: **poziție, apoi mișcare, apoi distanță, apoi viteză**.
- Privește: filmulețul pe treceri (nucleul cerut de challenge).
- Măsoară: click pe obiect în două epoci, aplicația dă arcsec/an și compară cu valoarea reală.
- Derivă: distanța din paralaxă, viteza din v = 4,74 x mișcare x distanță (dacă testul de paralaxă iese, vezi 7).
- Vânează: orice coordonată, obiectele cunoscute etichetate, raport de candidat partajabil.

## 4. Decizii de luat în M0 (recomandarea mea între paranteze)

- D1. Repo și stack (păstrăm Next.js + TypeScript și repo-ul existent ca înveliș; globul 3D rămâne ușa de intrare, înghețat; nucleul nou nu depinde de el. Alternativa curată: SPA Vite + o funcție server; costă 1 până la 2 ore de mutare).
- D2. Nucleul (filmuleț SPHEREx pe treceri, stivuit pe grup de benzi; nu blink pe fiecare expunere, care pâlpâie cu lungimea de undă).
- D3. Date (cele cinci ținte precalculate ca fișiere statice + cale live: o rută server mică pentru căutarea IRSA, apoi citire directă din S3 pe intervale de octeți, din browser).
- D4. Educație (misiuni peste viewer, fără conturi; progresul și raportul stau în link).
- D5. Demo (video de 30 s; slide-uri doar pentru pitch-ul local, dacă există).
- D6. Deploy (Vercel, URL public din seara asta).
- D7. Ce 2 până la 3 idei din meniul de la 6 intră.

## 5. Milestone-uri

| # | Ce | Până când | Gata înseamnă |
|---|---|---|---|
| M0 | Decizii, benzi, contracte, deploy public | sâm 19:00 | D1 până la D7 luate; URL public care se încarcă; licență Apache-2.0 în repo; ciornă de proiect creată pe site-ul Space Apps |
| M1 | Cele cinci ținte ca filmuleț, pe date reale | sâm 23:00 | Testele 2 și 6 trec pe URL-ul public; WISE 0855 se vede la D5+D6; Barnard apare cu miezul saturat marcat |
| M2 | Orice coordonată + „obiectul s-a mutat” | cod dum 03:00, verificat în browser dum 09:00 | Testele 1, 3 și 4 trec |
| M3 | Misiunile (lanțul de măsurare) + raportul de misiune | dum 10:00 | Testul 5 trece pe misiunea 1; misiunile 2 și 3 jucabile |
| M4 | Stratul „wow” ales (D7) + pagina de dovezi | dum 13:00 | Ideile alese merg pe cele cinci ținte; tabelul măsurat față de prezis e în aplicație |
| M5 | Povestea: video, pagina de proiect, README | ciornă salvată sâm 23:30; video dum 15:00 | Testul 7 trece |
| M6 | Îngheț și predare | funcții dum 13:00, cod dum 15:30, predare dum 17:00 | Formular salvat; verificat incognito și pe telefon |

**Puncte de control.** Sâm 23:00: dacă M1 nu e pe URL public, tăiem din M4. Dum 09:00: dacă calea live nu merge, coordonatele oarecare primesc varianta „decenii” din HiPS (2MASS, WISE, SPHEREx), care merge oriunde fără pipeline. Dum 13:00: nimic nou nu mai intră.

**Ordinea de tăiere (primul cade primul).** Traducerea RO, sonificarea, spectrul pe loc, zborul 3D la stea, modul diferență, misiunile 4 și 5 (variabilele). Nu se taie niciodată: cele cinci ținte pe date reale, câmpul RA/Dec, WISE 0855 corect, videoul de 30 s, formularul.

## 6. Meniul de idei ambițioase (de judecat cu echipa)

| Idee | Ce vede juriul | Cost | Risc | Părerea mea |
|---|---|---|---|---|
| A. Cubul spațiu-timp | Cadrele stivuite pe axa timpului, în 3D: stelele fixe sunt coloane drepte, cea care se mișcă e o linie înclinată | 4 până la 6 h | mediu | DA, semnătura vizuală; nimeni nu o are |
| B. Măsoară distanța cu paralaxa | Elevul mută un singur glisor până când modelul trece prin cele cinci puncte măsurate și obține distanța până la Epsilon Indi B, apoi viteza | 3 h | mic (testul a ieșit, vezi 7) | DA, doar pe Epsilon Indi B și doar în varianta cu un glisor (mișcarea proprie luată din Gaia). Afirmația onestă: 3,3 ± 0,3 pc față de 3,64 pc la Gaia |
| C. Target lock + look-uri de senzor | Reticul care urmărește obiectul între epoci, dâră, telemetrie, paletă termică (în stilul gods-eye-view) | 2 până la 3 h | mic | DA |
| D. Context din alte telescoape: WISE 2010 (și 2MASS 1998) | Un comutator „unde era în 2010”, oprit implicit și etichetat clar ca alt telescop. Barnard sare circa 4,7 arcmin față de 1998, WISE 0855 circa 2 arcmin față de 2010 | 2 până la 3 h | mic | POATE, doar ca strat opțional. Filmulețul principal rămâne exclusiv SPHEREx (mai 2025 până în oct 2026): challenge-ul cere imagini SPHEREx în timp și pomenește alte telescoape doar la „overlay” (considerația 5) |
| E. Raport de misiune + certificat partajabil | Pâlnia făcută concret: elevul trimite linkul profesorului | 2 h | mic | DA |
| F. Notebook „fă-o în Python” | Treapta universitară: aceleași cadre, din scripturile noastre | 1 h | mic | DA |
| G. Zbor 3D până la stea | După ce măsori distanța, camera zboară până acolo, printre stelele vecine | 3 până la 4 h | mediu | POATE, după A până la C |
| H. Spectru pe loc + temperatură | Click pe o sursă, apare spectrul în 102 benzi (challenge-ul dă „extra kudos”) | 4 până la 5 h | mediu | POATE |
| I. Muntele de semnal | Luminozitatea ca relief 3D: obiectul iese din zgomot pe măsură ce aduni expuneri; o stea saturată devine un platou | 3 h | mic | DA, cel mai ieftin 3D și predă stivuirea |
| J. Prinde un asteroid | Mișcare vizibilă în zile, cu urma prezisă de JPL | 3 până la 4 h | mare | POATE |
| K. SPHEREx pictând cerul | Amprentele expunerilor apar pe glob în timp | 3 h | mediu | POATE |
| L. Sonificare | Curba de lumină se aude (accesibilitate) | 1 până la 2 h | mic | POATE |
| M. Română + engleză | Impact local | 2 h | mic | dacă rămâne timp |
| N. Detecție automată de candidați | Aplicația propune, elevul verifică | 6+ h | mare | NU acum; pe slide ca pas următor |
| O. Tutor AI | | | | NU (cost, regulile SI) |

## 7. Ce rulează și ce e gata (orele sunt cele reale ale fișierelor; estimările din v1 erau cu circa 20 de minute înainte)

| Worker | Ce produce | Unde |
|---|---|---|
| Asset-uri misiuni (Opus), GATA 18:24 | Cadre reale pe treceri pentru cele cinci ținte (WISE 0855, Epsilon Indi B, Barnard, RW Aur, R Dra): 455 de fișiere, 26 MB, manifest `mission-manifest/1` (grilă 121 x 121, 3 arcsec/pixel, nord sus), stive pe treceri + expuneri individuale în float32, planșe de control. Reverificat de orchestrator: `check_missions.py` trece 269 de verificări; planșele pentru WISE 0855, Epsilon Indi B și Barnard privite și consistente. De știut: WISE 0855 se vede doar în grupul `d5d6`; numele vin din SIMBAD, UI-ul are nevoie de aliasuri | `pipeline/`, `assets/missions/` |
| Test paralaxă (Opus), GATA 18:17 | Epsilon Indi B: cu mișcarea proprie fixată la Gaia, paralaxa iese 306 ± 28 mas (10,9 sigma), adică 3,27 ± 0,30 pc și 72,5 ± 6,6 km/s (Gaia: 3,64 pc, 81 km/s). Totul potrivit doar din SPHEREx: 330 ± 70 mas (4,7 sigma, marginal). Merge doar după corecția cu 3 stele de referință; pozițiile brute dau un răspuns greșit cu 60% și aparent sigur (o deplasare sezonieră a cadrului imită paralaxa). WISE 0855 și Barnard: nemăsurabil (0,7 până la 1,1 sigma și 0,4 sigma). Metoda a fost scrisă înainte de orice potrivire și nu a fost schimbată | `docs/research/13-parallax-distance-feasibility.md`, date gata de produs în `experiments/exp13_parallax_epsindb.json` |
| Catalog obiecte rapide (Sonnet), GATA 18:11 | `movers.json`: 23.073 de obiecte din SIMBAD cu mișcare de cel puțin 300 mas/an (1,4 MB, 554 KB gzip) și `movers-pm500.json` (5.282 de obiecte, 326 KB). Verificat: WISE 0855 propagat la 2010,5 cade la 0,43 arcsec de coordonatele din challenge | `assets/`, `pipeline/movers/` |
| Repo-uri grafică și experiență (Sonnet), GATA 18:17 | Top 10 de adoptat (toate MIT, ISC, Zlib sau BSD): `@react-three/postprocessing`, `@react-three/drei`, `motion`, `uPlot`, `driver.js`, `d3-scale-chromatic`, `nuqs`, `next-intl`, `html-to-image` + `qrcode.react`, shadcn/ui. Capcane de licență: Remotion (nu e OSI), Shepherd.js și Intro.js (AGPL), Stellarium Web Engine (AGPL). `@react-three/fiber` 9.8.2 cere React sub 19.4. Estimări revizuite: cubul spațiu-timp circa 6 h, muntele de semnal circa 3 h. Idee nouă: misiunile ca „documente de scenă” (scenariu de cameră și epocă), refolosite la filmarea demo-ului | `docs/research/11-repos-graphics-experience.md` |
| Repo-uri știință și fizică (Sonnet), GATA 18:15 | Top 10, răspunsul la „legile fizicii” (nu ne trebuie un catalog: misiunile cer circa 10 formule, toate deja în astropy și astronomy-engine), fișa de formule. De reținut: astronomy-engine (MIT) pentru poziția Pământului în browser; cutout-urile unWISE și Legacy Survey au CORS deschis, deci fundalul WISE 2010 se poate lua direct din browser; glosarul OpenStax e CC BY-NC-SA, incompatibil cu un repo Apache-2.0, deci scriem glosarul nostru | `docs/research/12-repos-science-physics.md` |

Pornite 18:27 (rulează acum):

| Worker | Ce produce | Unde |
|---|---|---|
| Biblioteca TypeScript de citire S3 (Opus), GATA 18:45, reverificată de orchestrator (52 din 52 teste, `tsc` curat) | `fits`, `wcs` (TAN-SIP), `wave`, `s3`, `frame`, `stack`, `astrometry`, `sia`, `live`. Față de astropy: offset exact, 1,7e-11 px, 1,2e-10 arcsec, lungime de undă identică, pixeli identici la bit; cadrul reproiectat are corelație 1,000000 cu cel din Python. Live: o cutie din S3 în 1,4 până la 2,7 s, căutarea SIA în 2,2 până la 2,6 s. IRSA dă uneori 502 pe câte o colecție: ruta întoarce rezultat parțial cu steag. Rularea cap-coadă pe bucket-ul real, GATA 18:55 (55 din 55 teste): Epsilon Indi B și WISE 0855 ies identic cu varianta Python (aceleași treceri, corelație 1,000000, centroizi egali la 4 zecimale). Timpi: primul cadru la 4,6 s când lista vine repede, ultimul la 23 până la 32 s pentru circa 95 de cadre, 65 până la 73 MB transferați, 0 eșecuri pe S3. Grupuri: d1, d2, d3, d4, d5d6. RISC GĂSIT: serviciul IRSA care dă lista de expuneri a răspuns 502 minute în șir la fiecare rulare | `packages/spherex-core/` (copie de siguranță; intră în `web/src/lib/` la integrare) |
| Viewer v1 (Opus), GATA 18:46, reverificat de orchestrator (57 din 57 teste, `tsc` curat, `next build` trece, capturile privite) | Cele cinci ținte rulează ca film (stive pe treceri sau fiecare expunere), inele prezis și măsurat, caseta de coordonate în trei formate, bannerul „It moved” pe coordonatele din challenge (WISE 0855, în jurul lui 2010, acum la 134 arcsec spre vest), stare completă în URL, credite. Astryx 0.7.16 integrat. Coordonatele fără misiune statică arată deocamdată un mesaj cinstit, nu date. De reparat la design: text scris pentru ingineri, aspect implicit | `web/`, capturi în `web/docs/screens/`, rulează local pe `http://localhost:3100` |
| Video și design (Sonnet), GATA 18:38 | `brag` citit de mână (commit 669ab92): repo curat (MIT, fără hook-uri, fără rețea), dar varianta completă cere un al doilea pachet de skill-uri (Hyperframes), necitit, iar CLI-ul Hyperframes trimite telemetrie, își face singur update și descarcă Chrome. Verdict: NU se instalează; `brag-slim` rămâne doar material de citit. Remotion: sărit (licența nu acoperă clar o echipă informală de 5). Dovezi: 7 din 9 videouri ale câștigătorilor globali 2024 și 2025 au 29 până la 31 s, toate cu voce și subtitrări arse în imagine. Storyboard v1 în 9 cadre (secțiunea C3 din notă). Reguli de ținut: nimeni sub 18 ani în video (imagine sau voce), fără sigla NASA, „It moved” trebuie să spună față de ce an (2010). ffmpeg-ul de pe Mac nu are `subtitles` și `drawtext`: textul se randează în HTML | `docs/research/14-video-and-design-tooling.md` |
| Harness video (Opus), pornit 18:41 | Randare cadru cu cadru din scenele noastre HTML cu Playwright + ffmpeg (nicio unealtă nouă instalată), 1080p la 60 fps; scenele care nu depind de aplicație (plăcile din 1930, „Age 24”, tranziția spre un cadru SPHEREx real, cartonul final), sunet sintetizat de noi, captură exactă pe cadru a unei pagini vii (pentru aplicația reală, mai târziu); clip de probă de 10 până la 12 s pentru judecat diseară | `video/` |
| Nucleul misiunilor (Opus), GATA 18:52, reverificat de orchestrator (32 din 32 teste, `tsc` curat) | Click rotunjit la centroid (0,001 px pe Epsilon Indi B, 0,015 px pe WISE 0855, Barnard semnalat ca miez saturat), mișcare în limita a 0,0003 arcsec/an față de manifest, paralaxa reproduce 306,18 ± 28,08 mas (3,266 pc, 72,5 km/s), scor, raport în link fără date personale, scenarii și glosar. Descoperiri: potrivirea de referință a folosit toate cele 93 de expuneri (cele 5 medii dau 305,9 ± 35,2 mas); comparația cinstită e cu paralaxa Gaia a lui B (270,7 mas, 3,69 pc), deci diferența e 12%, nu 10%; și Barnard iese cu 13% mai lent (9,05 față de 10,39 arcsec/an), deci misiunea notată rămâne doar Epsilon Indi B | `packages/missions-core/` (intră în `web/src/lib/` la integrare) |

| Design, fundație (Opus), pornit 18:50 | Temă Astryx proprie (fundal `#080B12`, accent infraroșu `#FF6A3D`, Inter + JetBrains Mono), `/watch` cu imaginea ca erou și axă reală de timp, pagina de start cu „Find the next Tombaugh.”, aspect pe telefon, text pentru elevi în loc de text pentru ingineri | `web/` (un singur worker scrie în `web/` la un moment dat: fără commit nu avem worktree-uri) |
| Index static al expunerilor (Opus), pornit 18:57 | Scoate arhiva IRSA din calea cererii: toate cele circa 1,63 milioane de imagini Level 2 într-un index static, împărțit pe bucăți (maxim 50 MB, maxim 1.000 de fișiere, maxim 10 cereri pe interogare), cu cititor TypeScript și constructor reluabil și incremental (răspunde și la „ușor de actualizat” din challenge). Verificare: egal cu arhiva la 30 de poziții și cu listele celor cinci ținte | `pipeline/index/`, `assets/index/`, `packages/spherex-index/` |
Nimic comis, nimic împins, nimic publicat. Ordinea în `web/`, pe rând: fundația de design, apoi calea live pentru orice coordonată (ruta server pentru căutarea SIA, pentru că IRSA nu trimite CORS, plus citirea din S3 în browser), apoi misiunile de măsurare, apoi scara de text pe toate stringurile și review adversarial pe tot diff-ul.

## 8. Benzi (5 oameni)

| Bandă | Ce deține | Milestone-uri |
|---|---|---|
| L1 Date și știință (Eduard + Claude) | asset-urile, cititorul S3, ruta de căutare, cifrele reale, pagina de dovezi | M1, M2, M4 |
| L2 Viewer | player-ul (redare, viteză, glisor, marcaje, diferență), linkuri, integrarea cu globul, deploy | M0, M1, M2 |
| L3 Misiuni și conținut | scenariile misiunilor, întrebările, textele (EN, apoi RO), testul cu oameni din afară | M3 |
| L4 3D și look | ideile A și C (și G dacă intră), identitatea vizuală | M4 |
| L5 Poveste și predare | MTP, scenariul și filmarea videoului, pagina de proiect, credite și licențe, câmpul SI, formularul | M0, M5, M6 |

**Contracte între benzi (se fixează în M0, apoi lucrul merge în paralel).**
- `mission-manifest/1`: ce livrează L1 către L2 (grilă fixă 121 x 121 px la 3 arcsec/px, nord sus; pe grup de benzi: stive pe treceri și expuneri individuale ca float32, poziția prezisă și cea măsurată pe fiecare trecere, valorile reale pentru notare). Calea live produce aceeași formă, deci viewer-ul nu știe de unde vin cadrele.
- Scenariul de misiune (JSON): pași, întrebare, valoare reală, toleranță, explicație. L3 scrie, L2 redă.
- Starea în URL: `ra`, `dec`, grup de benzi, trecere, misiune, răspunsuri.

## 9. Ce împrumutăm

| Ce | De la cine | Cum |
|---|---|---|
| Citire S3 pe intervale de octeți, direct din browser | toate intrările serioase | validat de noi bit cu bit, 538 KB și 2,5 s pe cadru |
| Preseturi precalculate pentru start instant | slowsky, spherex-timelapse | misiunile noastre statice; ținta: sub 2 s (cel mai bun concurent 4,5 s, restul 25 până la 30 s) |
| Rută server mică pentru căutarea IRSA | slowsky, nosleepclub | o singură rută, cu validare și cache |
| Mișcare proprie propagată la data fiecărui cadru | slowsky, flipbook (doar pe preseturi) | o extindem la orice coordonată tastată; nimeni nu face asta |
| Potrivire pe lungime de undă | slowsky, nosleepclub | noi stivuim cadrele potrivite, nu le aruncăm |
| Normalizare la spectrul propriu al sursei | chronosphere | misiunea RW Aurigae |
| Culoare falsă din trei grupe de benzi | flipbook | „obiectele reci apar roșii” |
| Secțiune de validare cu cifre | nosleepclub | tabelul nostru măsurat față de prezis |
| Look-uri de senzor, casete de detecție, urmărire cu dâră, regizor de scene | gods-eye-view | ideile, portate în React Three Fiber |
| Stare în URL, viteză, diferență, Gaia cu mișcare proprie | WiseView | direct |
| Tutorial, apoi exersare pe obiecte cunoscute, apoi căutare reală | Backyard Worlds, Zooniverse | structura misiunilor |

**Licențe.** Ideile și arhitectura sunt libere. Cod se poate lua doar din repo-uri MIT (slowsky, gods-eye-view), cu nota de copyright păstrată și listat la referințe. spherex-timelapse nu are licență: din el, doar idei. Recomand să nu copiem cod de la rivali direcți: formularul are bifa „Confirm All Work is Original”. Acordul echipei noastre nu ține loc de licența lor.

## 10. Corecturi la documentele din repo-ul echipei

- IRSA nu trimite antete CORS pe TAP, SIA și cutout-uri; doar tile-urile HiPS și bucket-ul S3 le au. Căutarea trece printr-o rută server.
- CSP-ul de producție permite doar IRSA: trebuie adăugat `https://nasa-irsa-spherex.s3.us-east-1.amazonaws.com`.
- Repo-ul nu are fișier de licență: regulile cer o licență OSI.
- Coordonatele din challenge pentru WISE 0855 sunt poziția din 2010; în datele SPHEREx obiectul e la circa RA 133,7600, Dec -7,2422.
- Canalele goale ale cubului sunt 51 și 52 numărate de la 1 (50 și 51 de la 0, cum scrie README-ul: e corect).

## 11. Conformitate (banda L5)

- Câmpul „Use of Super Intelligence”: descrieți exact ce a făcut AI-ul. Ideea (pâlnia educațională) e a voastră; FAQ-ul cere ca SI să nu fie folosit pentru a veni cu ideea soluției.
- Bifa „Confirm All Work is Original”; toate bibliotecile și datele listate.
- Video de cel mult 30 s sau cel mult 7 slide-uri; depășirea scoate proiectul din jurizarea globală.
- Linkuri publice, fără login. Totul în engleză.
- Creditele NASA/IRSA cu textul lor oficial; „NASA does not endorse this project”.
