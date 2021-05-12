# Full-stack login page
Questo è il codice utile per creare una pagina di login *full-stack*.

Quando un utente inserisce username e password in tale pagina, la richiesta di login è inviata a un web server Node.js. Esso interroga un DBMS PostgreSQL per sapere se un utente con le credenziali date è registrato nel database. Se sì, restituisce un messaggio di benvenuto. Altrimenti, restituisce un messaggio di errore.

Questo progetto è pensato a scopo didattico, come primo esempio di un'applicazione *full-stack*, ovvero un'applicazione che coinvolge sia software di *front-end*, come HTML e CSS, sia software di *back-end*, come il web server Node.js e il DBMS PostgreSQL.

La guida consente di creare la pagina di login e di gestire il tutto in locale, ovvero tutto il software sopra citato è installato su un unico computer.

Utilizzando la piattforma Heroku, si procede poi alla messa online del progetto.

## Requisiti
Ho scritto questa lista di requisiti basandomi sul sitema operativo Windows.

### Editor di testo
Scaricare e installare un editor di testo, come [Visual Studio Code](https://code.visualstudio.com/).

### Node.js
Scaricare e installare [Node.js](https://nodejs.org).
1. dal sito web, scarica la versione "Current"
2. segui la procedura di installazione senza apportare modifiche
3. apri un terminale e invia i comandi `node -v` e poi `npm -v`: entrambi dovrebbero restituire delle informazioni rispettivamente riguardo a node e npm

### PostgreSQL
Scaricare e installare [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
1. seleziona la più recente versione per Windows x86-64
2. segui, senza modificare, la procedura di installazione. MA:
    - **Nota bene**: appuntati la password scelta per l'utente del database chiamato *postgres*.
    - **Nota bene**: appuntati la porta dove il server Postgre ascolterà le query. Lascia pure la porta di default, 5432
3. non modificare nient'altro durante la procedura di installazione. Al termine della procedura di installazione, deseleziona la casella 'stackBuilder'.
4. al termine della procedura di installazione, è necessario fare in modo che, digitando `psql -U postgres` in un terminale, sia possibile collegarsi al DBMS PostgreSQL come un utente di nome 'postgres'. Si fa così:
    1. nella barra di ricerca di Windows, digita 'PATH'
    2. clicca sul risultato 'Edit the system environment variables' o una traduzione di esso
    3. nella nuova schermata, clicca sul pulsante 'environment variables' in basso a destra
    4. nella nuova schermata, clicca sulla variabile chiamata 'Path'
    5. nella nuova schermata, clicca su 'browse...' o traduzione e seleziona questa cartella: `C:\Program Files\PostgreSQL\13\bin`. Il nome del percorso della cartella potrebbe leggermente variare a seconda del computer.
    6. prova ad aprire un terminale e a digitare `psql -U postgres` (**nota bene**: U maiuscola!). Inserendo la password scelta per l'utente 'postgres' durante la fase di installazione di PostgreSQl, dovresti aver fatto l'accesso al DBMS.

## Come usare il codice di questo repository [in locale]
1. scarica o clona il repository
2. apri l'editor di testo, posizionandolo nella cartella in cui è situato il codice di questo repository
3. apri un terminale in tale cartella e invia il comando: `npm install`. Questo comando ordina al gestore di pacchetti di Node.js ('npm' sta per 'node.js package manager') di installare tutte le dipendenze elencate nel file [package.json](package.json) [**TODO** attualmente forzi la versione di node.js e questo crea dei warning]
4. invia il comando `node index.js`. Questo comando avvia il web server Node.js, eseguendo il codice scritto nel file [index.js](index.js). Questo passaggio può non andare a buon fine per molteplici ragioni. Qui alcune:
    - non hai installato le dipendenze di Node.js. Soluzione: esegui il comando `npm install`
    - non hai creato un database di nome 'nodelogin' dentro al DBMS PostgreSQL. Soluzione: accedi al DBMS PostgreSQL con il comando `psql -U postgres` (inserisci la password dell'utente postgres quando richiesto). Poi esegui il comando `create database nodelogin;`. In questo modo avrai creare il database nodelogin nel tuo DMBS PostgreSQL locale.
    - la porta di ascolto di PostgreSQL indicata nel file index.js è diversa da quella da te scelta durante l'installazione di PostgreSQL. Soluzione: sostituisci opportunamente il numero di porta.
    - la password dell'utente postgres di PostgreSQL indicata nel file index.js è diversa da quella da te scelta durante l'installazione di PostgreSQL. Soluzione: sostituisci opportunamente la password.
    - problema con il server che non supporta SSL **TODO** per ora ho solo commentato le righe riguardanti SSL nella configurazione del dbms, ma credo che questo farà sì che il dbms di Heroku non funzionerà.
5. Se il web server è stato avviato correttamente, apri un browser e digita nella barra di ricerca: `localhost:3000`. Dovresti vedere la schermata di login.

## Come usare il codice di questo repository [in remoto]
**TODO**

## Possibili migliorie
Questo è un web server molto semplice. Ad esempio, sarebbe interessante:
- [DONE] consentire la registrazione al sito web, attraverso la pagina '/register'
- [DONE, ma da documentare] pubblicare il sito in modo da renderlo disponibile a chiunque su internet. Ad esempio, vale la pena imparare a utilizzare [Heroku](https://www.heroku.com/)

## Fonti
- https://codeshack.io/basic-login-system-nodejs-express-mysql/