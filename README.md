# DevHub

DevHub är javascript-verktyg jag använder regelbundet samlade i samma gränssnitt: textmanipulering, diff-jämförelse och färgverktyg.

1. Klona eller ladda ner projektet.
2. Öppna `index.html` i webbläsaren.
3. Använd verktygen direkt, ingen installation krävs.
4. Senaste versionen finns på https://github.com/day4125/devhub

## Innehåll

### 📝 Textmanipulator

- Rensa text (tar bort mjuka bindestreck, radbrytningar och extra mellanrum)
- Konvertera till versaler eller gemener
- Konvertera siffror `0-9` till upphöjt eller nedsänkt format
- Konvertera bokstäver `a-z` till upphöjt eller nedsänkt format (där tecken finns)
- Extrahera e-postadresser
- Extrahera URL:er (inklusive `www.`-adresser)
- Snabbkopiera innehållet i textfältet

### 🔍 Diff Checker

- Jämför två textfält ord för ord
- Markerar tillagd text och borttagen text
- Visar tydlig legend för diff-resultat

### 🎨 Färgväljare + färgkonverterare

- Välj färg med inbyggd color picker
- Visar aktuell hex-kod och låter dig kopiera den
- Dynamisk kontrast på etiketttext för bättre läsbarhet
- Konverterar mellan `HEX`, `RGB` och `HSL`
- Kopiera/klistra in i konverteraren via knappar

## Gränssnitt och beteende

- Flikbaserat sidofält för att växla mellan verktyg
- Ljust/mörkt tema med sparad inställning i `localStorage`

## Teknik

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Inga externa bibliotek
- Inga nätverksanrop
- Fungerar helt offline

## Noteringar

- Urklippsfunktioner använder `navigator.clipboard` och kräver en webbläsarmiljö som tillåter clipboard-API.
- All data behandlas lokalt i webbläsaren.
