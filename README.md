# Full-stack login page

## Come ottenere questo risultato
Questa cartella contiene una pagina di login, il cui funzionamento è basato su:
- **HTML** e **CSS** per la realizzazione della pagina web;
- **JavaScript** e, più in particolare, **Node.js** per la realizzazione del web server;
- **MariaDB** per il database.

HTML e CSS non richiedono installazione.\
Potete scaricare Node.js da [qui](https://nodejs.org/).\
Dovreste avere MariaDB già installato. Digita `mariadb --version` in un terminale: se non ottieni errori, è già installato. Altrimenti, puoi scaricarlo [qui](https://mariadb.org/).

Puoi seguire [questa guida](https://codeshack.io/basic-login-system-nodejs-express-mysql/) per ottenere un risultato simile a quello presente in questa cartella.\
Principali modifiche rispetto alla guida sopra indicata:
- si utilizza MariaDB anziché MySQL
- nel file login.js [sono stati eliminati dei moduli deprecati](https://stackoverflow.com/questions/66525078/bodyparser-is-deprecated)
- il file login.js [è stato modificato](https://mariadb.com/kb/en/getting-started-with-the-nodejs-connector/) per essere utilizzato con MariaDB anziché MySQL
- è stata impostata una password per l'utente root di MariaDB, altrimenti non era consentito accedere al database. Per cambiare la password, da dentro MariaDB esegui questa istruzione: `ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';`, sostituendo 'password' con una password.

Le istruzioni per installare i moduli richiesti dal web server e le istruzioni per l'avvio del server si trovano nella guida sopra indicata.

## Possibili migliorie
Questo è un web server molto semplice. Ad esempio, sarebbe interessante:
- [DONE] consentire la registrazione al sito web, attraverso la pagina '/register'
- pubblicare il sito in modo da renderlo disponibile a chiunque su internet. Ad esempio, vale la pena imparare a utilizzare [Heroku](https://www.heroku.com/)
- Postgres https://stackabuse.com/using-postgresql-with-nodejs-and-node-postgres/