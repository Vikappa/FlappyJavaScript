// Una volta messo un elemento html dentro un oggetto Js puoi modificare le sue caratteristiche CSS da qua. Javascript è un mondo meraviglioso
//Un processo simile avviene quando dai a un oggetto.valore = oggettodue.valore per cui se modifico oggettodue.valore oggetto.valore si va a prendere la stessa porzione di memoria

const bird = document.getElementById("bird")
const speedInput = document.getElementById("speed");
const diffInput = document.getElementById("diff");
let inGame = true //aka not gameover
const scoreDiv = document.getElementById("Score"); // <p> punteggio
const classeCSSSfondoAnimato1 = document.getElementById("background1")
const classeCSSSfondoAnimato2 = document.getElementById("background2")
const divMain = document.getElementById("mainscreen") // importo il div main per targettarlo col listener del salto
const pTag = document.getElementById("tagP")
const devInfo = document.getElementById("dev_info")

let punteggio = 0;

let gravity = 0; // variabile per accumulare gli up and down dell'uccellino tra un frame e l'altro

var posX = 0; // Posizione orizzontale di bird
var posY = 0; // Posizione verticale di bird

let contaframe = 0 // Conto i frame per fare in modo che alcuni metodi si attivino ogni N multipli del framerate base che è di 25 millisecondi


function sequenza_endgame() {
    //fermo animazione di sfondo
    classeCSSSfondoAnimato1.style.animation = 'none';
    classeCSSSfondoAnimato2.style.animation = 'none';

    // cleannare l'interval lo resetta fermando l'esecuzione del main method
    clearInterval(intervalMainMethod);

    // creo, riempio e metto nel div le scritte gameover, con un #id css per modificarli tramite il foglio di stile
    var gameOverH2 = document.createElement("h2");
    var finalScore = document.createElement("h3");
    gameOverH2.id = "gameoverScreen";
    finalScore.id = "finalScoreH2"
    gameOverH2.textContent = "Game Over";
    finalScore.textContent = "Punteggio: " + Math.round(punteggio);
    divMain.appendChild(gameOverH2);
    divMain.appendChild(finalScore);
}

function checkCollisione(bird, tubo) {
    let birdX = bird.offsetLeft; // Posizione orizzontale di bird
    let birdY = bird.offsetTop; // Posizione verticale di bird 
    //tieni a mente che l'angolo X=0 Y=0 del main è in alto a sinistra
    let angoloTopLeftTubo = tubo.offsetTop
    let angoloBottomLeftTubo = tubo.offsetTop + tubo.height
    let angoloTopLeft2 = tubo.offsetLeft
    let angoloTopRightTubo = tubo.offsetLeft + tubo.width

    //ho messo dei +30 nei parametri di confronto degli scontri per prevenire la comprenetrazione del disegno, visto che il bird non ha un area ma solo una coordinata cardine X Y
    if (birdY <= angoloBottomLeftTubo && birdY + 30 >= angoloTopLeftTubo &&
        birdX + 30 >= angoloTopLeft2 && birdX <= angoloTopRightTubo)
        sequenza_endgame()
}

// Metodo per creare i tubi ostacolo
function tubo(numeroSegmenti) {
    let canvaTubo = document.createElement("canvas");
    canvaTubo.style.position = "absolute";

    let ctx = canvaTubo.getContext("2d"); //per modificare un elemento canvas bisogna creare una variabile per il suo context e fare drawImage su quello


    const imgColloDaHtml = document.getElementById("colloHtml"); //importo le immagini del tubo dai <img> dell'html 
    const imgTopDaHtml = document.getElementById("topHtml");


    canvaTubo.height = imgTopDaHtml.offsetHeight + numeroSegmenti * imgColloDaHtml.offsetHeight;
    canvaTubo.width = imgTopDaHtml.offsetWidth;

    // Disegna nel contesto del canvas di ritorno
    ctx.drawImage(imgTopDaHtml, 0, 0);
    for (let index = numeroSegmenti; index >= 0; index--) {
        ctx.drawImage(imgColloDaHtml, 2, imgTopDaHtml.offsetHeight + index * imgColloDaHtml.offsetHeight);
    }

    return canvaTubo;
}

function tuboSottosopra(numeroSegmenti) {
    let canvaTubo = document.createElement("canvas");
    canvaTubo.style.position = "absolute";

    let ctx = canvaTubo.getContext("2d"); //per modificare un elemento canvas bisogna creare una variabile per il suo context e fare drawImage su quello


    const imgColloDaHtml = document.getElementById("colloHtml"); //importo le immagini del tubo dai <img> dell'html 
    const imgTopDaHtml = document.getElementById("topHtml");


    canvaTubo.height = imgTopDaHtml.offsetHeight + numeroSegmenti * imgColloDaHtml.offsetHeight;
    canvaTubo.width = imgTopDaHtml.offsetWidth;

    // Disegna nel contesto del canvas di ritorno
    ctx.drawImage(imgTopDaHtml, 0, 0);
    for (let index = numeroSegmenti; index >= 0; index--) {
        ctx.drawImage(imgColloDaHtml, 2, imgTopDaHtml.offsetHeight + index * imgColloDaHtml.offsetHeight);
    }

    canvaTubo.style.transform = "rotate(180deg)";

    return canvaTubo;
}

const tubi = []

//metodi azionati dall'interazione dell'utente
function tocco_utente() {
    console.log("Salto azionato")
    gravity -= (15 - diffValue)
}

function mobile() {
    tocco_utente()
    console.log("Tocco su schermo rilevato!");
}

function barra_spaziatrice(event) {
    // Funzione da eseguire quando l'utente preme la barra spaziatrice
    if (event.code === "Space") {
        console.log("Barra spaziatrice premuta!");
        tocco_utente()
    }
}

//speedValue e diffValue sono due parametri numerici che devono ereditare il valore degli input presi dai listener per modificare l'esecuzione del metodo principale mainMethod()
let speedValue
let diffValue

// var boolean per controllare che il dispositivo sia un pc o un mobile. 
//mi servirà a inizio esecuzione gioco prima del ciclo principale per modificare l'invito a premere barra spaziatrice o toccare lo schermo
let isMobile = false;

// Verifica se l'utente sta navigando da un dispositivo mobile LOL
if (window.innerWidth < 650) {
    isMobile = true;
    console.log("User agent mobile")
};

// I listener si impostano una sola volta sugli oggetti Js a cui ho fatto prendere in input gli <input type="range"> per aggiornare speedValue e diffValue
speedInput.addEventListener("input", function () {
    speedValue = speedInput.value;
    console.log("Valore di speed:", speedValue);
});

diffInput.addEventListener("input", function () {
    diffValue = diffInput.value;
    console.log("Valore di diff:", diffValue);
});

// Aggiungi un listener per il tocco su schermo
if (isMobile) {
    divMain.addEventListener("touchstart", mobile); //aggiungo a divMain un listener che aziona il metodo mobile()
    pTag.textContent = "Tocca il quadrato di gioco per saltare!"
} else {
    // Aggiungi un listener per la pressione della barra spaziatrice
    document.addEventListener("keydown", barra_spaziatrice);
}

bird.style.left = "100px"; // Imposta la posizione orizzontale a 100 pixel
bird.style.top = "50px";  // Imposta la posizione verticale a 50 pixel



// Esegui la funzione mainMethod ogni 1000 millisecondi (1 secondo)
let currentSpeed = parseInt(speedInput.value, 10)// variabile per conservare il valore di speed in ogni iterazione del ciclo principale
console.log("CurrentSpeed iniziale: " + parseInt(speedInput.value))

// In JavaScript non esiste il multithreading, una sorta di multithread può essere realizzata con i metodi con intervallo di secondi.
// Devo creare un oggetto "interval" ma poi per modificare l'esecuzione del metodo principale uso setInterval(mainMethod, milliseconde)
let intervalMainMethod = setInterval(mainMethod, 25);


posX = bird.offsetLeft; // Posizione orizzontale di bird
posY = bird.offsetTop; // Posizione verticale di bird


//Ora inizia il cuore dell'esecuzione del gioco. il metodo intervalMainMethod continuerà a riprodurre mainmethod finchè non viene resettato
function mainMethod() {


    //check salute
    console.log(navigator.userAgent);
    console.log("Punteggio:" +
        parseInt(punteggio, 10) +
        " Datatype: " + typeof punteggio);

    // I valori di diffValue e speedValue vengono qui presi come interi dagli oggetti input range dell'html
    var valoreStringaSpeed = speedInput.value // Usa la proprietà .value per ottenere il valore come stringa
    var valoreInteroSpeed = parseInt(valoreStringaSpeed, 10)// Converte la stringa in un numero intero utilizzando parseInt

    var valoreStringaDiff = diffInput.value
    var valoreInteroDiff = parseInt(valoreStringaDiff, 10)


    //variabili intere da usare nel codice (speedValue e diffValue)
    speedValue = valoreInteroSpeed
    diffValue = valoreInteroDiff

    // check salute larghezza schermo
    // da fare

    //prima di iniziare le nuove iterazioni, controllo se devo modificare la velocità del metodo
    if (speedValue !== currentSpeed) {
        switch (speedValue) {
            case 1:
                console.log("Set velocità = 1  speedValue: " + speedValue + " dataType: " + typeof speedValue + " currentSpeed: " + currentSpeed + " dataType: " + typeof currentSpeed)
                classeCSSSfondoAnimato1.style.animationDuration = '3s'
                classeCSSSfondoAnimato2.style.animationDuration = '3s'
                break;
            case 2:
                console.log("Set velocità = 2 speedValue: " + speedValue + " dataType: " + typeof speedValue + " currentSpeed: " + currentSpeed + " dataType: " + typeof currentSpeed)
                classeCSSSfondoAnimato1.style.animationDuration = '2s'
                classeCSSSfondoAnimato2.style.animationDuration = '2s'
                break;
            case 3:
                console.log("Set velocità = 3 speedValue: " + speedValue + " dataType: " + typeof speedValue + " currentSpeed: " + currentSpeed + " dataType: " + typeof currentSpeed)
                classeCSSSfondoAnimato1.style.animationDuration = '1.8s'
                classeCSSSfondoAnimato2.style.animationDuration = '1.8z'
                break;
            case 4:
                console.log("Set velocità = 4 speedValue: " + speedValue + " dataType: " + typeof speedValue + " currentSpeed: " + currentSpeed + " dataType: " + typeof currentSpeed)
                classeCSSSfondoAnimato1.style.animationDuration = '1.4s'
                classeCSSSfondoAnimato2.style.animationDuration = '1.4s'
                break;
            case 5:
                console.log("Set velocità = 5 speedValue: " + speedValue + " dataType: " + typeof speedValue + " currentSpeed: " + currentSpeed + " dataType: " + typeof currentSpeed)
                classeCSSSfondoAnimato1.style.animationDuration = '1.2s'
                classeCSSSfondoAnimato2.style.animationDuration = '1.2s'
                break;
            case 6:
                console.log("Set velocità = 6 speedValue: " + speedValue + " dataType: " + typeof speedValue + " currentSpeed: " + currentSpeed + " dataType: " + typeof currentSpeed)
                classeCSSSfondoAnimato1.style.animationDuration = '1s'
                classeCSSSfondoAnimato2.style.animationDuration = '1s'
                break;
            case 7:
                console.log("Set velocità = 7 speedValue: " + speedValue + " dataType: " + typeof speedValue + " currentSpeed: " + currentSpeed + " dataType: " + typeof currentSpeed)
                classeCSSSfondoAnimato1.style.animationDuration = '1.1s'
                classeCSSSfondoAnimato2.style.animationDuration = '1.1s'
                break;
            case 8:
                console.log("Set velocità = 8 speedValue: " + speedValue + " dataType: " + typeof speedValue + " currentSpeed: " + currentSpeed + " dataType: " + typeof currentSpeed)
                classeCSSSfondoAnimato1.style.animationDuration = '1s'
                classeCSSSfondoAnimato2.style.animationDuration = '1s'
                break;
            case 9:
                console.log("Set velocità = 9 speedValue: " + speedValue + " dataType: " + typeof speedValue + " currentSpeed: " + currentSpeed + " dataType: " + typeof currentSpeed)
                classeCSSSfondoAnimato1.style.animationDuration = '0.8s'
                classeCSSSfondoAnimato2.style.animationDuration = '0.8s'
                break;
            case 10:
                console.log("Set velocità = 10 speedValue: " + speedValue + " dataType: " + typeof speedValue + " currentSpeed: " + currentSpeed + " dataType: " + typeof currentSpeed)
                classeCSSSfondoAnimato1.style.animationDuration = '0.5s'
                classeCSSSfondoAnimato2.style.animationDuration = '0.5s'
                break;
            default:
                console.log("Errore default")
                break;
        }

        //Check salute animazioni
        currentSpeed = speedValue // Per non iterare questo switch ad ogni iterazione del metodo principale
        console.log("Aggiorno currentSpeed speedValue: " + speedValue + " dataType: " + typeof speedValue + " currentSpeed: " + currentSpeed + " dataType: " + typeof currentSpeed)
        console.log("Animazione sfondo classeCSSSfondoAnimato1 e 2 " + window.getComputedStyle(classeCSSSfondoAnimato1) + " " + window.getComputedStyle(classeCSSSfondoAnimato2))
    }

    //aggiorna p punteggio a schermo
    scoreDiv.textContent = "Score: " + Math.round(punteggio);

    //aggiorna p X Y bird
    devInfo.textContent = "X:" + posX + "/Y:" + posY


    // Elaborazione punteggio
    contaframe++
    if (contaframe % 80 === 0) {
        punteggio += 0.5 * diffValue
    }


    //inizio elaborazione ostacoli
    if (contaframe % 50 === 0 && contaframe !== 0) {
        console.log('%cPosiziono tubo', 'color: red');

        let altezza_tubo_basso = Math.floor(Math.random() * 45) + 1; // Gemero un numero casuale di segmenti per fare in modo, lo lascio come variabile interna dell'oggetto tubo risultato del metodo

        const tuboDaPosizionare = tubo(altezza_tubo_basso) // Genero un tubo con altezza casuale
        const tuboDaAppendere = tuboSottosopra(457 - (altezza_tubo_basso + 413)) // Genero il tubo sottosopra con altezza relativa al tubo inferiore

        tubi.push(tuboDaPosizionare)
        tubi.push(tuboDaAppendere)

        divMain.appendChild(tuboDaPosizionare)
        divMain.appendChild(tuboDaAppendere)

        tuboDaPosizionare.style.top = (457 - tuboDaPosizionare.offsetHeight) + "px" // Misura della base da posizionare in base all'altezza
        tuboDaAppendere.style.top = 0 + "px" // Posizionamento esay peasy sul soffittoo
        tuboDaPosizionare.style.left = 457 + "px" // Posizionamento orizzontale appena fuori dal main
        tuboDaAppendere.style.left = 457 + "px"
    }

    //muovo i tub, verifico collisioni e accorcio l'array tubi

    for (let i = 0; i < tubi.length; i++) {
        tubi[i].style.left = tubi[i].offsetLeft - (1 + speedValue) + "px"
        checkCollisione(bird, tubi[i])
    }
    if (tubi.length > 10) {
        tubi.splice(0, 1)
    }

    console.log("Punteggio:" + parseInt(punteggio) + " dataType punteggio: " + typeof punteggio)
    console.log("SpeedValue" + speedValue + " dataType speedValue: " + typeof speedValue)
    console.log("DiffValue:" + diffValue + " dataType diffValue: " + typeof diffValue)


    // aggiungo difficoltà e gravity
    gravity += 0.1 * diffValue

    //metto un tetto agli sbalzi di gravity
    if (gravity > 10) {
        gravity = 10
    }

    if (gravity < -30) {
        gravity = -30
    }

    //rotazione di bird in base alla gravity
    console.log("Applico " + gravity + " gravity");
    bird.style.transform = "rotate(" + gravity * 1.5 + "deg)";

    //check schianto a terra
    if (posY > 393 || (posY + gravity) > 393) {
        console.log("Schianto a terra")
        sequenza_endgame()
    }

    //aggiorno la posizione di bird in base alla posizione attuale e applico gravity
    posY += gravity;
    bird.style.top = posY + "px"

}

document.getElementById("replay").addEventListener("click", function () {
    location.reload();
});
