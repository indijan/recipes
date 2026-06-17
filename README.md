# iPhone Shortcut + AI recept demo

Egyszeru Next.js (App Router + TypeScript) demo projekt, ahol az iPhone Shortcut JSON payloadot kuld a backendnek, a webapp pedig OpenAI-val 3 receptotletet general.

## Gyors inditas

```bash
cp .env.local.example .env.local
# add meg az OPENAI_API_KEY erteket
npm run dev
```

Nyisd meg: `http://localhost:3000`

## API endpoint

- `POST /api/recipe-session`
- `Content-Type: application/json`
- pelda body:

```json
{
  "mealType": "vacsora",
  "ingredients": "tojas, sajt, paradicsom, rizs",
  "allergies": "mogyoro",
  "diet": "gyerekbarat",
  "source": "ios-shortcut-demo"
}
```

- pelda valasz:

```json
{
  "success": true,
  "sessionId": "abc123",
  "url": "http://localhost:3000/recipe/abc123"
}
```

## Fontos demo megjegyzes

- A session tarolas in-memory `Map`, ujrainditas utan torlodik.
- Ez tudatosan demo celra keszult, adatbazis nelkul.
