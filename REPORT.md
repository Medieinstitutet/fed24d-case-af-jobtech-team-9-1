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
📌 **Motivering:** Uppfyller samtliga G‑krav: data hämtas strukturerat via fetch i separata tjänster (jobServices, suggestionService), React‑koncept används tydligt (context + reducer, state, routing), och designsystemet används konsekvent med egen färgpalett. Dessutom flera nice‑to‑have: styled‑components, custom hook för tangentnavigering, samt autocomplete via /complete. Kodbasen är typad med TypeScript och har god struktur.

💡 **Förbättringsförslag:**  
- Router och länkar: Använd react-router-dom för RouterProvider, createBrowserRouter och Link. Undvik att nästla <Link> och DigiLink (blir <a> i <a>) – använd antingen DigiLinkInternal (afHref) för interna länkar eller enbart Link och styla enligt designsystemet.
- Props till Digi-komponenter: Säkerställ konsekvent camelCase i React-wrappers (t.ex. afVariation i stället för af-variation, afHref i stället för af-href) så att typings och props fungerar korrekt.
- JobDetails useEffect: Lägg till beroendelista [id] och inför loading/error state. Nu kör effekten varje render initialt och refetch sker inte om id ändras.
- Laddning och tomvy: Skilj på "laddar" och "inga träffar" i JobList. Visa skeleton endast vid laddning och en tydlig tomvy när det saknas resultat.
- Paginering: Återaktivera disabled-logik (prev när offset=0, next när antal träffar < LIMIT) och/eller hämta totalantal för att beräkna sista sidan.
- Sanitera HTML: Vid dangerouslySetInnerHTML, överväg att sanera med t.ex. DOMPurify (om datakällan inte kan betraktas som helt betrodd).
- Rensa debug och metadata: Ta bort console.log i tjänster och uppdatera <title> från "Vite + React + TS" till appens namn.
- Stil och tillgänglighet: Undvik onödiga inline styles, nyttja design tokens/komponenter för spacing och storlekar, samt överväg ARIA-attribut/roler för förslagslistan (listbox/option) och aria-activedescendant.
- Validering/felhantering i tjänster: Lägg till try/catch och surfacea fel i UI via t.ex. en notifikation.
- Bonusförslag: Lägg till en grafisk presentation (diagram) över t.ex. antal annonser per ort/yrkesområde för extra mervärde.

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
