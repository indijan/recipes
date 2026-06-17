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
  "url": "http://localhost:3000/recipe?data=eyJtZWFsVHlwZSI6InZhY3NvcmEiLC4uLn0"
}
```

## Fontos demo megjegyzes

- Nincs kulon session tarolas: az endpoint a validalt JSON-t base64url formatumban a linkbe kodolja.
- A `/recipe` oldal a `data` query parameterbol dekodolja vissza a payloadot.
