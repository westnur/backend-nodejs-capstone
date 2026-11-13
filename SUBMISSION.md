# Final assignment – how to produce each submission

Replace `<BACKEND_URL>` with your running back-end address, for example `http://localhost:3060` or your deployment URL.

## Task 3 – inserted_items
```bash
cd secondChance-backend
cp .env.sample .env        # put your real MONGO_URL in .env
npm install
npm run import-data | tee inserted_items
```
Expected output contains: `Inserted documents: 16`

## Task 11 – mainpage
```bash
curl -s <BACKEND_URL>/api/secondchance/items | tee mainpage
```

## Task 12 – register
```bash
curl -s -X POST <BACKEND_URL>/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"secret123"}' | tee register
```

## Task 13 – login
```bash
curl -s -X POST <BACKEND_URL>/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"secret123"}' | tee login
```

## Task 14 – item_detail
```bash
curl -s <BACKEND_URL>/api/secondchance/items/1 | tee item_detail
```

## Task 15 – search_item
```bash
curl -s "<BACKEND_URL>/api/secondchance/search?category=Kitchen" | tee search_item
```

## Task 16 – CICD
Open the repository → **Actions** → the latest **CI/CD** run → expand every step and copy the log.

For each text task, paste **both the command and its output** into the answer box.
