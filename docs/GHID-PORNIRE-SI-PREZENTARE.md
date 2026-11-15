# SPHEREx Sky Navigator — ghid de pornire și prezentare

Acest ghid explică ce face proiectul, cum îl pornești pe calculator și cum îl poți prezenta unei persoane care îl vede pentru prima dată. Comenzile sunt pentru versiunea din acest repository.

> **Notă (15 noiembrie 2026):** interfața implicită este acum navigatorul simplu, iar prima vizită deschide introducerea despre Sistemul Solar (o poți relua cu `/?intro=1`). Pașii din acest ghid descriu interfața completă: activeaz-o din **Settings → Expert layout**. Traseul demo recomandat și corespondența butoanelor sunt în [demo-checklist.md](demo-checklist.md#before-judging-simple-layout-15-nov-2026).

## 1. Ce face proiectul

Aplicația permite explorarea cerului în infraroșu și vizualizarea observațiilor SPHEREx pentru o regiune aleasă.

Are trei funcții principale:

| Funcție | Ce poți face |
| --- | --- |
| Navigatorul cerului | Deplasezi harta, faci zoom, cauți obiecte sau coordonate și explorezi lungimile de undă SPHEREx. |
| Slideshow SPHEREx | Alegi o zonă, cauți expunerile disponibile în arhiva IRSA și răsfoiești imaginile direct în aplicație. |
| Challenge săptămânal | Revizitezi aceeași zonă din jurul galaxiei M101, cu până la 12 imagini pregătite în cache și un contor al produselor nou găsite în arhivă. |

**Pe scurt, pentru o prezentare:**

> „Proiectul este un navigator al cerului în infraroșu. Alegem o regiune, căutăm observațiile SPHEREx disponibile în arhiva NASA/IPAC IRSA și le afișăm ca slideshow, împreună cu datele observațiilor. Challenge-ul săptămânal ne aduce înapoi în aceeași regiune și pregătește imaginile în avans, ca să putem urmări mai ușor observațiile adăugate.”

Interfața aplicației este în engleză; numele butoanelor din acest ghid sunt cele afișate în aplicație.

## 2. Ce trebuie instalat

Pentru pornirea completă prin Docker ai nevoie de:

- Repository-ul proiectului, descărcat sau clonat pe calculator.
- Docker și Docker Compose. Pe macOS sau Windows poți folosi Docker Desktop, pornit înainte de comenzile de mai jos.
- Un browser cu WebGL activ pentru navigatorul cerului.
- Conexiune la internet pentru prima construire a containerelor și pentru accesul la arhivele astronomice.

Pentru această variantă nu trebuie să instalezi separat Node.js sau Python: containerele includ mediile necesare. Configurația actuală folosește date publice și nu cere o cheie API.

## 3. Pornire pas cu pas cu Docker

### Pasul 1 — Deschide terminalul în folderul proiectului

Intră în folderul care conține `package.json` și `compose.yaml`:

```bash
cd Planet-X-SPHEREx-NASA
```

Dacă terminalul este deja în acel folder, nu mai executa această comandă. Folderul părinte `nasa` nu este rădăcina aplicației.

### Pasul 2 — Verifică Docker

```bash
docker --version
docker compose version
docker info
```

Primele două comenzi arată versiunile instalate. A treia verifică dacă motorul Docker rulează. Dacă apare o eroare de conectare, pornește Docker Desktop și așteaptă să fie gata.

### Pasul 3 — Construiește și pornește aplicația

Din rădăcina proiectului:

```bash
docker compose up --build -d
```

Această comandă pornește două servicii:

| Serviciu | Rol | Adresă locală |
| --- | --- | --- |
| `web` | Interfața Next.js și rutele API folosite de browser | `http://127.0.0.1:3000` |
| `comparison` | Căutări IRSA, procesarea imaginilor, cache și challenge | `http://127.0.0.1:8000` |

La prima pornire se descarcă dependențele și se construiesc imaginile Docker. `-d` lasă serviciile să ruleze în fundal, după închiderea terminalului.

### Pasul 4 — Verifică starea serviciilor

```bash
docker compose ps
```

Ambele servicii trebuie să fie pornite. Verificările de sănătate pot apărea inițial ca `starting`, apoi ca `healthy`.

Pentru a vedea mesajele de pornire:

```bash
docker compose logs --tail=50 web comparison
```

### Pasul 5 — Deschide aplicația

- [Navigatorul cerului](http://127.0.0.1:3000)
- [Slideshow pentru M101](http://127.0.0.1:3000/compare?ra=210.80227&dec=54.34895&size=6)
- [Challenge-ul săptămânal](http://127.0.0.1:3000/compare?challenge=weekly)

Poți folosi și `http://localhost:3000`. Dacă ai pornit separat un server de dezvoltare, consultă secțiunea de depanare despre diferența dintre `localhost` și `127.0.0.1`.

Pagina poate fi disponibilă înainte ca IRSA să răspundă sau ca toate imaginile challenge-ului să fie pregătite. Prima pregătire depinde de rețea și de arhivă; imaginile deja disponibile apar progresiv.

### Pasul 6 — Verifică legătura cu serviciul Python

Deschide în browser:

```text
http://127.0.0.1:3000/api/comparison/health
```

Sau, în terminal:

```bash
curl http://127.0.0.1:3000/api/comparison/health
```

`"ok": true` confirmă că serviciul răspunde. Câmpul `irsa` descrie separat ultimul răspuns cunoscut de la arhivă; poate fi `null` înainte de primul răspuns înregistrat. Un serviciu pornit nu garantează că IRSA este disponibil în acel moment.

## 4. Cum folosești aplicația

### Explorează cerul

1. Deschide navigatorul.
2. Trage cu mouse-ul pentru a schimba direcția privirii.
3. Folosește rotița mouse-ului sau gestul de zoom pentru a apropia imaginea.
4. Caută un obiect, de exemplu `M101`, ori alege o destinație din **Explore a place**.
5. Deschide panoul Telescope și schimbă canalul spectral SPHEREx.

Coordonatele RA/Dec se actualizează odată cu poziția privirii. `RA` și `Dec` sunt coordonate pe cer, exprimate aici în grade, în sistemul ICRS.

### Deschide un slideshow pentru o zonă aleasă

1. Apasă **Compare images** în navigator.
2. Poziționează pătratul de selecție pe zona dorită.
3. Reglează **Square width**, între 0,5 și 30 de minute de arc.
4. Apasă **Find images**.
5. Așteaptă rezultatele din colecțiile `spherex_dr1` și `spherex_qr3`. Rezultatele disponibile pot apărea înainte de terminarea întregii căutări.
6. Folosește **Previous**, **Next** sau **Play/Pause**. Poți folosi și săgețile tastaturii când viewerul are focus, ori scroll deasupra imaginii.
7. Schimbă **Interval** pentru viteza redării automate.
8. Verifică data observației, detectorul și intervalul spectral afișate sub imagine.

Filtrele permit restrângerea inventarului după detector, lungime de undă, data observației și tipul produsului. **View image** deschide un anumit rezultat în viewer. Pentru inventare mari, rezultatele se încarcă în pagini de 100; **Next** poate cere pagina următoare la sfârșitul cadrelor deja încărcate.

Imaginile se afișează în aplicație. Linkul **Original FITS** oferă separat fișierul științific original.

### Participă la challenge-ul săptămânal

1. Apasă **Weekly sky challenge** din lista de locuri recomandate sau deschide linkul direct din secțiunea de pornire.
2. Citește regiunea și perioada challenge-ului. În versiunea actuală urmărim aceeași zonă de 6′ din jurul galaxiei M101.
3. Verifică indicatorul **images cached**. Poți răsfoi cadrele disponibile chiar dacă pregătirea continuă.
4. Urmărește slideshow-ul și compară pozițiile surselor, ținând cont de datele observațiilor.
5. Folosește **Browse all … exposures** pentru inventarul complet al acelei regiuni.

O săptămână nouă începe luni la 00:00 UTC. Serviciul verifică arhiva la intervale de șase ore cât timp rulează; răspunsurile lente sau erorile IRSA pot întârzia verificarea și pregătirea imaginilor.

Challenge-ul pregătește până la 12 cadre din același interval de detector, preferând D3, distribuite între datele observațiilor. Un cadru indisponibil sau care acoperă prea puțin din regiune poate fi înlocuit cu alt candidat.

**Cum se interpretează contorul:** prima verificare reușită stabilește baza de comparație. În continuare, **newly found … this week** numără produsele pe care aplicația le-a văzut pentru prima dată în acea săptămână. Acestea pot fi observații realizate mai demult. O nouă publicare în arhivă nu garantează observații noi pentru M101.

## 5. De unde vin imaginile și ce se întâmplă în fundal

Navigatorul și slideshow-ul folosesc două trasee de date:

```text
Navigator:
Browser → imagini de hartă HiPS de la NASA/IPAC IRSA

Slideshow:
Browser → Next.js → serviciul Python → căutare de metadate în IRSA
                                   → descărcare de cutout FITS
                                   → procesare cu Astropy → PNG → browser

Challenge:
Serviciul Python → verificări periodice → PNG-uri pregătite în cache
Browser → Next.js → PNG-urile existente în cache
```

Căutarea slideshow-ului folosește API-ul SIA al IRSA pentru DR1 și QR3. Este echivalentă ca selecție de poziție și colecții cu ideea unui apel `Irsa.query_sia(...)`; implementarea proiectului face cererea HTTP direct, fără să apeleze acea funcție Python.

Răspunsul inițial conține metadate și adresele fișierelor. Serviciul descarcă apoi decupajele FITS necesare, citește extensia `IMAGE` și produce imagini PNG pe o grilă comună, cu nordul sus și estul în stânga. Astfel, browserul poate afișa cadrele fără un viewer FITS extern.

În slideshow-ul obișnuit se încarcă imaginea curentă și se pregătește următoarea. Pentru challenge, pregătirea se face în fundal înainte de vizită, iar deschiderea paginii folosește cadrele deja pregătite.

**Limita interpretării:** contrastul este ajustat pentru fiecare cadru. Diferențele vizuale de luminozitate, lungime de undă sau acoperire nu demonstrează singure o schimbare astronomică. Proiectul oferă inspecție vizuală; suprapunerea, scăderea imaginilor și detectarea automată a obiectelor în mișcare nu sunt implementate în această etapă. Selecțiile A/B păstrează metadate pentru o comparație ulterioară.

## 6. Unde se păstrează cache-ul

În varianta Docker, datele persistente sunt în volumul Compose `comparison-metadata`, montat în container la `/data`.

| Date | Locație în container | Limită configurată implicit |
| --- | --- | --- |
| Inventare și căutări SQLite | `/data/inventory.sqlite3` | 32 MiB în Compose; 256 MiB implicit în serviciu |
| PNG-uri pentru slideshow obișnuit | `/data/previews/` | 128 MiB |
| Starea challenge-ului și baza de comparație | `/data/challenge/weekly-challenge.json` | Manifestul challenge-ului |
| PNG-uri pentru challenge | `/data/challenge/images/` | 16 MiB; cadrele curente sunt protejate de evacuare |

Cache-ul păstrează PNG-urile rezultate, nu o copie permanentă a tuturor fișierelor FITS. Restartarea containerelor păstrează volumul. Imaginile pregătite pot fi reutilizate și după expirarea căutării de metadate care le-a produs.

## 7. Oprire, repornire și actualizare

Toate comenzile de mai jos se execută din rădăcina proiectului.

Oprire temporară:

```bash
docker compose stop
```

Pornire din nou, folosind containerele existente:

```bash
docker compose start
```

Aplicarea modificărilor din cod, cu reconstruirea imaginilor:

```bash
docker compose up --build -d
```

Oprirea și eliminarea containerelor, păstrând volumul de cache:

```bash
docker compose down
```

După `down`, pornește din nou cu `docker compose up -d`. Nu adăuga opțiunea `-v` dacă vrei să păstrezi cache-ul și istoricul challenge-ului: acea opțiune elimină și volumele proiectului.

Pentru a urmări logurile în timp real:

```bash
docker compose logs -f --tail=50 web comparison
```

`Ctrl+C` închide urmărirea logurilor; containerele pornite cu `-d` continuă să ruleze. Când calculatorul sau serviciul Python este oprit, nu se fac verificări periodice ale arhivei.

## 8. Dezvoltare: interfață locală, serviciu Python în Docker

Această variantă este utilă când modifici interfața și vrei actualizări automate în browser. Ai nevoie și de Node.js, minimum versiunea 20.9, cu npm.

Din rădăcina proiectului, oprește serviciul web Docker dacă rulează deja:

```bash
docker compose stop web
docker compose up --build -d comparison
npm ci
npm run dev
```

Deschide adresa afișată de Next.js în terminal, de regulă `http://localhost:3000`. Serviciul Python continuă să ruleze pe `http://127.0.0.1:8000`, iar Next.js folosește această adresă implicit.

Păstrează terminalul cu `npm run dev` deschis. `Ctrl+C` oprește serverul de dezvoltare. Pentru revenirea la varianta completă Docker, oprește întâi acest server și execută `docker compose up --build -d`.

Pornirea doar a interfeței cu npm, fără serviciul `comparison`, permite accesul la navigator, dar căutările SPHEREx, conversia FITS și challenge-ul au nevoie de serviciul Python.

## 9. Probleme frecvente

| Simptom | Ce verifici sau faci |
| --- | --- |
| Docker nu se poate conecta la daemon | Pornește Docker Desktop și verifică `docker info`. |
| Portul 3000 sau 8000 este ocupat | Verifică alte terminale sau proiecte care folosesc aceleași porturi. Oprește instanța pe care ai pornit-o anterior; evită două servere web pentru aceeași demonstrație. |
| `localhost:3000` și `127.0.0.1:3000` arată versiuni diferite | Un server local poate asculta pe IPv6, iar Docker pe IPv4. Pentru varianta Docker folosește `127.0.0.1:3000` și oprește serverul npm separat. |
| Harta nu se încarcă | Verifică internetul, suportul WebGL și mesajele aplicației; imaginile hărții vin de la IRSA. |
| Pagina se deschide, dar serviciul de imagini nu răspunde | Verifică `docker compose ps`, logurile `comparison` și `/api/comparison/health`. |
| `Archive unavailable` | Arhiva nu a putut fi verificată. Mesajul nu înseamnă că regiunea nu are observații. Reîncearcă mai târziu; rezultatele deja păstrate rămân disponibile. |
| O singură imagine eșuează, inclusiv cu HTTP 503 | Apasă **Retry image** sau treci la altă expunere. Fișierul respectiv poate fi temporar indisponibil la IRSA. |
| Challenge-ul arată mai puțin de 12 imagini | Pregătirea poate fi în curs sau pot exista mai puține cadre utilizabile. Pagina își actualizează periodic starea. |
| Contorul de produse noi este 0 | Poate fi prima verificare, începutul unei săptămâni noi sau lipsa unor produse nou descoperite în acea regiune. Verifică data ultimei verificări. |
| O căutare pare să aștepte foarte mult | IRSA poate răspunde lent. Configurația Compose limitează cererea la 60 s, execuția căutării la 180 s și așteptarea în coadă la 60 s. Rezultatele deja obținute rămân disponibile. |
| Apare `Method Not Allowed` | Verifică dacă folosești instanța actuală a aplicației și configurația corectă a serviciilor. Crearea căutării folosește POST; pentru diagnostic consultă logurile ambelor servicii. |

Valorile efective ale limitelor de timp sunt afișate în `/api/comparison/health`, la `timeouts`; `null` înseamnă limită dezactivată. Valorile implicite ale serviciului, când nu sunt suprascrise de Compose, sunt 25 s pentru cererea IRSA, 120 s pentru execuția căutării și 30 s pentru așteptarea în coadă.

## 10. Cum prezinți proiectul în 2–3 minute

Pregătește demonstrația din timp: pornește serviciile și verifică dacă există imagini în cache-ul challenge-ului. Numărul de observații găsite depinde de datele disponibile și de răspunsul arhivei.

1. **Arată navigatorul:** „Putem explora cerul în infraroșu, căuta un obiect și vedea coordonatele regiunii spre care privim.”
2. **Alege M101:** folosește căutarea sau destinația recomandată și arată schimbarea canalului spectral SPHEREx.
3. **Arată slideshow-ul:** deschide linkul M101 din secțiunea 3, schimbă câteva cadre și indică data observației și detectorul.
4. **Explică proveniența:** „Aplicația cere metadatele de la IRSA, descarcă decupajele FITS necesare și le transformă în imagini afișabile în browser.”
5. **Arată challenge-ul:** „Revenim în fiecare săptămână la aceeași zonă. Serviciul verifică periodic arhiva și pregătește imaginile în cache, iar utilizatorii pot explora setul disponibil imediat.”
6. **Precizează stadiul actual:** „Putem inspecta vizual observațiile; confirmarea unei schimbări cere verificarea datelor, iar analiza automată și suprapunerile sunt etape viitoare.”

## 11. Verificări pentru dezvoltatori

Cu dependențele npm instalate, din rădăcina proiectului:

```bash
npm test
npm run typecheck
npm run build
npm run test:production
```

Ultima comandă folosește buildul produs de comanda precedentă și simulează răspunsurile serviciilor externe. Aceste verificări nu confirmă disponibilitatea IRSA în timp real.

Pentru testele Python poți crea un mediu separat, de exemplu cu Python 3.12, din rădăcina proiectului, pe macOS/Linux:

```bash
python3.12 -m venv services/comparison/.venv
services/comparison/.venv/bin/python -m pip install -r services/comparison/requirements.txt
cd services/comparison
.venv/bin/python -m unittest discover -s tests -p 'test_*.py'
```

Testele Python trebuie executate din `services/comparison`, deoarece importurile serviciului sunt relative la acel folder.

## 12. Unde găsești implementarea

| Locație | Conținut |
| --- | --- |
| `src/components/sky/` și `src/components/hud/` | Navigatorul și panourile sale |
| `src/components/comparison/Slideshow.tsx` | Viewerul și navigarea între imagini |
| `src/components/comparison/WeeklyChallenge.tsx` | Interfața challenge-ului |
| `src/app/api/comparison/` | Legătura dintre browser și serviciul Python |
| `services/comparison/inventory.py` și `jobs.py` | Interogarea arhivei, inventarele și căutările în fundal |
| `services/comparison/previews.py` | Conversia FITS în PNG și cache-ul imaginilor |
| `services/comparison/challenges.py` | Regiunea M101, calendarul challenge-ului și pregătirea cadrelor |
| `compose.yaml` | Servicii, porturi, volume și configurație de rulare |

Pentru detalii suplimentare:

- [README-ul proiectului](../README.md)
- [Implementarea și verificarea slideshow-ului](comparison-slideshow-review.md)
- [Implementarea și verificarea challenge-ului](weekly-challenge-review.md)
- [Sursele imaginilor și traseul datelor](image-sources-and-pipeline.md)

