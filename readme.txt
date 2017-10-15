//READ-ME - PICCOLA SPIEGAZIONE DEL PROGETTO E DELLE FUNZIONALITA'

/////////////////////////////////////////////////
//  METAL UP - READY FOR NEW ARCADE ADVENTURE? //
//                                             //
//  GABRIELE SERRA - 502651                    //
/////////////////////////////////////////////////

-IMPORTANTE
I tasti share naturalmente sono scritti da facebook/twitter e come è prevedibile (?!) non vengono validati!
Il resto del codice è validato al 100%, quindi se in fase di validazione si ha qualche errore controllare se provenga dai tasti share.
E' possibile per riprova commentare le inclusioni degli script twitter.js e facebook.js, e nel wrapper.html il contenuto dei li share.

-DESCRIZIONE GENERALE ED IDEA
Il progetto è nato come rivisitazione del famosissimo Metal Slug prodotto dalla SNK dalla metà degli anni 90 in poi. Il gioco originale consiste nell'utilizzo di un personaggio che attraversando degli scenari sconfigge le forze ribelli composte naturalmente da soldati armati e vari personaggi paranormali. 
L'idea era quella di creare un semplice gioco arcade fruibile da chiunque, senza grandi difficoltà in modo da permettere di giocare senza annoiarsi ma allo stesso tempo di stabilire record e gareggiare con altri utenti.
L'idea di utilizzare l'ambientazione ed i personaggi di Metal Slug regala al gioco un tocco di stile vintage e rievoca nello stesso utente ricordi del gioco originale spingendolo quindi ad essere incuriosito (naturalmente per gli utenti che hanno giocato!).
Il gioco è standalone e quindi può essere utilizzato da dispositivi mobili, e volendo potrebbe essere riscritto servendosi della logica alla base o scaricato per i dispositivi che supportano javascript come linguaggio per la scrittura di app (Windows Phone ad esempio).

-SITO WEB, CLASSIFICA E PAGINE VARIE
Come completamento al gioco è stato strutturato un sito web che ospita il gioco stesso e tramite il quale è possibile registrarsi/loggare e vedere la classifica. Tutto è stato sviluppato in modo da rimanere in tema arcade ma rimanendo nell'ambito del moderno. Il font utilizzato all'interno di tutto il progetto è quello originale del gioco. 
La classifica ha varie possibilità di costruzione, con 2 scelte a mutua esclusione e una opzione aggiuntiva. E' infatti possibile vedere la classifica completa oppure quella che contiene solo i propri punteggi. 
L'opzione aggiuntiva permette di contare solamente l'high score di ogni utente.
La registrazione è permessa a tutti e il login è effettuabile da qualunque pagina, così come il logout.
Se la password viene dimenticata è possibile cliccare sul link Forget? in fondo alla finestra di login. In questo modo è possibile ricevere per email una nuova password che consente di accedere nuovamente. Questa password dovrebbe essere cambiata al primo accesso.
--COMPONENTI E PAGINE PRINCIPALI DEL SITO WEB
-*INDEX: Pagina principale del sito in cui è presente slider con varie immagini accattivanti graficamente
-*SIGNUP: Pagina di registrazione al servizio
-*ABOUT: Piccola guida al gioco e alle varie features
-*SCORE: Pagina che contiene la classifica del gioco

-BACKGROUND AMBIENTAZIONE E PERSONAGGI
L'ambientazione ed il background sono rielaborazioni di mappe originali del gioco. In origine le mappe erano disposte in modo da consentire i movimenti del personaggio in 2D e con uno scorrimento orizzontale.
Qui invece lo scorrimento diventa verticale e infinito, con i movimenti del personaggio sempre in 2D gestendo le coordinate sugli assi X e Y.
L'unico nemico (al momento) è impersonato dal soldato ribelle che possiede il pugnale. 
L'animazione proviene dal gioco originale ed è stata rielaborata per permettere una corretta orientazione destra-sinistra e per riuscire a eseguirla totalmente nel tempo in cui è presente in gioco. Per una scelta puramente di gioco appare un soldato per volta da destra o da sinistra con una accelerazione random verso il centro della mappa in asse X e verso il basso con gravità costante in asse Y. 
Il giocatore che viene colpito dal soldato ribelle finisce la propria partita.
Il personaggio principale invece è il famosissimo Marco Rossi, soldato statunitense con origini italiane.
L'animazione è stata completamente ricreata da 0 per adattarla allo scorrimento verticale e al salto.
Il personaggio non possiede armi nè sistemi di difesa.
Gli effetti audio e la colonna sonora provengono dal gioco originale.

-SCOPO DEL GIOCO, INIZIO E FINE PARTITA
La partita inizia con il primo click sulla tela di gioco, il personaggio inizierà a saltare toccando ogni volta la base e ripartendo. 
L'utente può disegnare una piattaforma cliccando e trascinando sulla tela di gioco.
L'inclinazione e la lunghezza della piattaforma sono a piacere (anche se c'è un limite superiore alla lunghezza per non consentire all'utente di ricoprirla completamente). La lunghezza determina il tipo di salto, meno la piattaforma è lunga e più è ampio il salto. Se si riesce a utilizzare il salto più ampio possibile sarà possibile ascoltare un effetto audio (OK!) che lo segnala.
Dopo il primo salto sulla piattaforma, il protagonista si sposta e quindi non è più abilitato a raggiungere la terra, in questo caso infatti la partita terminerà. La piattaforma può essere attraversata senza collisione se l'utente non ha completato il disegno della piattaforma stessa.
L'inclinazione della piattaforma stabilisce l'accelerazione sull'asse delle X, se il giocatore collide con il bordo del campo di gioco riceve la stessa accelerazione cambiata di segno, rimbalzando quindi e cambiando direzione (l'animazione del personaggio viene specchiata). 
Il punteggio ottenibile è pressochè illimitato (credo 2^53 ma questo potrebbe cambiare da interprete ad interprete) e lo scopo del gioco è proprio quello di conseguire il più alto punteggio possibile. 
La difficoltà del gioco non cambia avanzando col punteggio ma non è facile avanzare per troppo tempo sopravvivendo.
La partita finisce con un game over e questo avviene solamente in caso di collisione con un soldato ribelle oppure se il protagonista esce dal limite inferiore dello schermo superando così la linea di scorrimento.
Nel menù di game over è possibile inviare il punteggio al server in modo da scalare così la classifica del gioco
(solo per utenti registrati e loggati) e il protagonista intanto scende indietro fino a ritornare al punto d'inizio.

-DETTAGLI TECNICI VARI
L'accelerazione sull'asse Y ovvero i tipi di salto, in realtà sono solamente 3 e questo è stato scelto per semplificare il codice e per rendere discreta l'ampiezza del salto stesso.
La lunghezza della piattaforma inoltre determina anche un coefficente che verrà usato per moltiplicare l'inclinazione della piattaforma e per rendere quindi maggiore in valore assoluto l'accelerazione anche sull'asse delle X.
L'inclinazione della piattaforma è calcolata come coefficente angolare (slope) della retta tracciata. 
L'accelerazione sull'asse delle X quindi è veramente grande se la retta è quasi perpendicolare.
Proprio per questo motivo per smorzare l'accelerazione sull'asse delle X viene usata una funzione logaritmo naturale.
L'accelerazione in X inoltre viene ridotta ad ogni loop con una costante gravità uguale in modulo a quella dello scorrimento orizzontale e fatta convergere a 0.
Il personaggio principale non potrà MAI superare la quota di metà schermo. Per rendere naturale quindi lo scorrimento si sposta il personaggio fino alla coordinata di metà schermo, superata essa il personaggio si ferma e si fa scorrere l'immagine di background. 
Con un loop un po' più veloce della normale gravità, si rallenta il movimento del background e si riprende il normale movimento quando la quota del personaggio principale torna ad essere quella di metà schermo.
Per la gravità del personaggio principale e del soldato ribelle è stato usato un coefficente di 0.2 da sottrarre ad ogni
loop. Questa costante potrebbe essere aumentata/diminuita per cambiare la velocità e la difficoltà del gioco.
Il soldato ribelle appare solamente se lo score è aumentato di almeno 500 punti dall'ultima apparizione, e in modo random viene calcolata la sua accelerazione.
Le possibili animazioni dei personaggi sono scelte in base alla posizione all'interno del campo di gioco tramite
una funzione.

-PROGRAMMAZIONE E SCELTE
Per realizzare il gioco è stato scelto l'approccio ad oggetti che rende il codice più chiaro e manutenibile.
Sono stati realizzati vari oggetti con metodi e attributi e quando possibile si è cercato di utilizzare l'approccio dell'information hiding. 
Le proprietà di un oggetto infatti sono quasi tutte nascoste al metodo che alloca l'oggetto stesso e accessibili tramite funzioni getter/setter.
Tutte le richieste al server sia da parte del sito web sia da parte del gioco sono fatte in maniera asincrona (AJAX).
La risposta del server nella quasi totalità dei casi è un oggetto JSON.
Lo standard più utilizzato per i nomi dei metodi/variabili è quello del lower camel case, mentre si è preferito scegliere il nome completamente maiuscolo per i costruttori di classe e completamente minuscolo per l'oggetto istanziato.
--COMPONENTI PRINCIPALI DEL CODICE
-*AUDIO: Gestore dell'audio del gioco
-*CLOCK: Contiene le funzioni chiamate tramite la pagina index.html e permette di definire l'oggetto game per iniziare a giocare
-*GAME: Oggetto principale che definisce tutti gli altri oggetti e che si occupa della gestione dell'intero gioco
-*MENU: Contiene l'oggetto menù atto a mostrare/nascondere i vari menù di gioco e il punteggio stesso
-*PAD: Contiene l'oggetto piattaforma con i suoi attributi e i vari metodi correlati
-*PLAYER: Contiene l'oggetto giocatore principale con i suoi attributi e i vari metodi correlati
-*SKETCHER: Oggetto che si occupa della grafica del gioco, delle animazioni e di tutto quello che riguarda la presentazione
-*SOLDIER: Contiene l'oggetto soldato nemico con i suoi attributi e i vari metodi correlati
-*UTILITY: Non contiene un oggetto, bensì due funzioni che si occupano di comunicare al browser il corretto refresh e di animare/stoppare il flusso di gioco. La funzione per animare chiama in callback quella principale dell'oggetto game.
Per i vari errori è stato deciso di creare un paragrafo p da riempire con l'oggetto message ritornato dallo script PHP.
Nel gioco invece è stato scelto di usare una semplice alert data la semplicità e la scarsità di spazio nella canvas (soprattutto se eseguito da smartphone/tablet).
Per poter recuperare la password è necessario inserire il proprio indirizzo mail e attendere la risposta del server. Per questa funzionalità è necessario settare il server in modo da configurare il servizio STMP
            
-ULTIME NOTE
Il codice del gioco è completamente commentato e nei punti meno chiari anche istruzione per istruzione, gli attributi e i vari metodi sono stati chiamati in modo da rendere chiaro il loro scopo anche se non sempre è stato possibile farlo in modo efficiente.
I file audio utilizzati e le immagini sono state quasi tutte compresse e interlacciate utilizzando lo standard JPG o PNG e i file audio MP3
con qualità bassa per permettere un caricamento veloce anche con connessioni lente.
I file più onerosi sono la traccia audio musicale che supera 1MB data la lunghezza della traccia, le immagini dello slider che per rimanere di una qualità accettabile superano quasi tutte 1MB e le immagini riguardanti il personaggio del gioco e lo sfondo del gioco stesso. E' stato deciso infatti di cercare di fornire la massima qualità possibile almeno nel gioco cercando di ottenere un buon compromesso qualità/tempo di download. Proprio per questo è stato deciso di creare una piccola immagine che viene caricata per prima e sparisce appena finito il caricamento.
