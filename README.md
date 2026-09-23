# Tablature

### Tabs App

This app reads files in the `$lib/tabs/` folder and writes them to json during a `npm run index` call.  The data is then available to the app `onLoad` and filtered as needed on the front end.

1. Add tabs as md files in `$lib/tabs`
  - template is at: `$lib$/template.md`
2. `npm run index` will read the files and populate  the json object at `$lib/data/tabs.json`
3. Push to Github

```sh
# npm run index
npm run build # calls run index also

git add . && git commit -m "update" && git push
```
4. 2. Create directory structure in homelab
```
tablature/
├── app/          (cloned repo)
└── docker-compose.yml
```
5. Clone / Pull repo to `tablature/app` directory
```bash
git clone https://github.com/robertleroy/tablature.git app
# ~ or ~ #
git pull
```
6. docker-compose.yml
```yml
services:
  tablature:
    build: ./app
    ports:
      - "3003:3000"
    restart: unless-stopped
```
7. `docker compose up -d --build`

