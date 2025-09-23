# 📌 Rättningsrapport – fed24d-case-af-jobtech-team-9-1

## 🎯 Uppgiftens Krav:
# Skapa en egen Platsbanken för ert drömscenario 

Dokumentation om Arbetsförmedlingens öppna data finns på https://jobtechdev.se. All öppna data från arbetsförmedlingen och andra offentliga organisationen går även att hitta direkt på dataportal.se. 
I detta dokument ges två förslag på användningsfall som vi tror är lämpliga för studenter som vill utveckla en applikation på riktig data. All data som är öppna data får vem som helst använda utan att fråga myndigheten om lov, så ingen är begränsad till de exempel vi ger.

Läs först igenom kom-igång hjälpen 

-  [Övergripande dokumentation API:etJobSearch](https://data.arbetsformedlingen.se/data/platsannonser/)
-  [Kom-igång guide](https://gitlab.com/arbetsformedlingen/job-ads/jobsearch/jobsearch-api/-/blob/main/docs/GettingStartedJobSearchSE.md)

## Prova att utforska datan med vår interaktiva tjänst 

Görs genom att öppna Swagger-sidan för API:et (för att enkelt testa olika endpoints i API:et och läsa dokumentation för respektive endpoint): [Search job ads (jobtechdev.se)](https://jobsearch.api.jobtechdev.se/)

## Uppgift 

Använd endpoint **/search** för att söka bland befintliga annonser. 
Det går även bra att använda historiska annonser om ni vill jämföra aktuella annonser med hur det har sett ut tidigare. Detta api finns här: [Historical job ads (jobtechdev.se)](https://historical.api.jobtechdev.se/)

Om möjligt, använd en grafisk presentation av era resultat genom t.ex. stapeldiagram eller linjegrafer.

**Observera**
Er slutprodukt ska ej innehålla Arbetsförmedlingens logga eller färger. Anpassa gärna efter eget tycke och smak så att ni har en färgpalett och en god tanke bakom. 

## Betygskriterier 

### Need-to-have (G) 
- Ni har hämtat data på ett strukturerat sätt med hjälp av antingen fetch eller axios. 
- Ni har skapat en tjänst som ni använder för att hämta data. 
- Ni använder react-koncept vi har pratat om för att göra datan tillgänglig (context, state, routing et.c.). 
- Ni använder den syntax, namngivningsstandard samt skrivsätt som vi har lärt er.  
- Ni använder designsystemet för presentation. 

### Nice-to-have (Extra bonus) 
- Styled components (som drar nytta av designsystemet) 
- Grafisk presentation av datat 
- Användning av custom hook där det finns möjlighet
- Använd endpoint /complete för att lägga till autocomplete-funktion och få förslag på begrepp vid fritextsökning

## 🔍 ESLint-varningar:
- C:\Work\AssignmentCorrector\backend\repos\fed24d-case-af-jobtech-team-9-1\src\hooks\useKeyboardNavigation.ts - no-unused-vars - 'item' is defined but never used.
- C:\Work\AssignmentCorrector\backend\repos\fed24d-case-af-jobtech-team-9-1\src\reducers\JobReducer.ts - no-unused-vars - 'SET_JOBS' is defined but never used.,no-unused-vars - 'SET_OFFSET' is defined but never used.,no-unused-vars - 'SET_SEARCH' is defined but never used.
- C:\Work\AssignmentCorrector\backend\repos\fed24d-case-af-jobtech-team-9-1\src\services\jobServices.ts - no-console - Unexpected console statement.

## 🏆 **Betyg: VG**
📌 **Motivering:** Uppgiften uppfyller alla G‑krav: data hämtas strukturerat via fetch i tydligt uppdelade tjänster (jobServices, suggestionService), React‑koncept används korrekt (context + reducer för global state, routing, state), och designsystemet används genomgående för presentation. Dessutom har ni implementerat flera Nice‑to‑have: styled components (för förslagslistan), en custom hook (useKeyboardNavigation) och autocomplete via endpointen /complete. Koden är överlag välstrukturerad med tydliga typer (TS) och en bra mappstruktur.

💡 **Förbättringsförslag:**  
- React Router-importer: importera från "react-router-dom" i en webapp (RouterProvider, Link, useParams, createBrowserRouter). Nu importeras flera från "react-router" vilket kan ge oväntat beteende.
- Undvik ankare i ankare: ni wrappar DigiLink och Link runt varandra på flera ställen (t.ex. i JobList och JobDetails). Använd antingen Link (för intern navigering) eller DigiLinkInternal – inte båda samtidigt.
- useEffect-dependencies i JobDetails: er effect saknar dependency-array och körs varje render (dubbelt i StrictMode). Lägg till [id] och hantera loading/cleanup för att undvika dubbla nätverksanrop.
- Fel- och laddhantering: lägg till try/catch i komponenterna och visa felmeddelanden (t.ex. med DigiNotification). Just nu kastas fel i services men fångas inte i UI.
- Bygg URL med URLSearchParams: encodeURIComponent/URLSearchParams för q/offset/limit; undvik manuellt strängbygge och hantera tomma queries. Centralisera LIMIT så samma värde används i både komponent och service.
- Paginering: sätt disabled-logik korrekt (föregående/ nästa). Utnyttja API:ets total och offset för att räkna ut sista sidan; visa gärna totalt antal träffar.
- Debounce och avbrytning av requests: debounce på autocomplete och abortera på snabba inmatningar (AbortController) för bättre UX och mindre nätverkstrafik.
- Konsekvent prop-namngivning till designkomponenter: håll er till samma stil (afHref/afVariation snarare än af-href/af-variation) enligt React-wrapperns dokumentation för att undvika oförutsägbart beteende.
- SEO/branding: uppdatera titel (index.html) och favicon så de matchar appen (just nu Vite default). Detta är småsaker men lyfter helheten.
- Extra bonus: lägg gärna till en enkel graf (t.ex. antal annonser per kommun/yrkesområde) för att visualisera data över tid eller per kategori.

## 👥 Gruppbidrag

| Deltagare | Antal commits | Commit % | Uppgiftskomplettering | Totalt bidrag |
| --------- | -------------- | -------- | ---------------------- | ------------- |
| David Kjellstrand | 30 | 62.5% | 0.5 | 0.55 |
| NicoleSilfverling | 18 | 37.5% | 0.5 | 0.45 |


### 📊 Förklaring
- **Antal commits**: Antalet commits som personen har gjort
- **Commit %**: Procentuell andel av totala commits
- **Uppgiftskomplettering**: Poäng baserad på mappning av README-krav mot kodbidrag 
- **Totalt bidrag**: Viktad bedömning av personens totala bidrag (40% commits, 60% uppgiftskomplettering)
