let bird = document.getElementById("bird")
let speedInput = document.getElementById("speed");
let diffInput = document.getElementById("diff");
let inGame = true //aka not gameover
let scoreDiv = document.getElementById("Score"); // <p> punteggio
let punteggio = 0;
// Una volta messo un elemento html dentro un oggetto Js puoi modificare le sue caratteristiche CSS da qua. Javascript è un mondo meraviglioso
//Un processo simile avviene quando dai a un oggetto.valore = oggettodue.valore per cui se modifico oggettodue.valore oggetto.valore si va a prendere la stessa porzione di memoria


//speedValue e diffValue sono due parametri numerici che devono ereditare il valore degli input presi dai listener per modificare l'esecuzione del metodo principale eseguiCiclo()
let speedValue
let diffValue


// I listener si impostano una sola volta sugli oggetti Js a cui ho fatto prendere in input gli <input type="range"> per aggiornare speedValue e diffValue
speedInput.addEventListener("input", function () {
    speedValue = speedInput.value;
    console.log("Valore di speed:", speedValue);
});

diffInput.addEventListener("input", function () {
    diffValue = diffInput.value;
    console.log("Valore di diff:", diffValue);
});


bird.style.left = "100px"; // Imposta la posizione orizzontale a 100 pixel
bird.style.top = "50px";  // Imposta la posizione verticale a 50 pixel


//Ora inizia il cuore dell'esecuzione del gioco. Finche non siamo in gameover, il ciclo while continuerà a riprodurre ulteriori due o tre cicli (vedrò strada facendo)
//per aggiornare il progresso in base alla difficoltà e velocità impostate. 


// Esegui la funzione eseguiCiclo ogni 1000 millisecondi (1 secondo)
const intervalId = setInterval(eseguiCiclo, 1000);

function eseguiCiclo() {



    console.log("Punteggio:" +
        parseInt(punteggio, 10));

    // I valori di diffValue e speedValue vengono qui presi come interi dagli oggetti input range dell'html
    var valoreStringaSpeed = speedInput.value // Usa la proprietà .value per ottenere il valore come stringa
    var valoreInteroSpeed = parseInt(valoreStringaSpeed, 10)// Converte la stringa in un numero intero utilizzando parseInt

    var valoreStringaDiff = diffInput.value
    var valoreInteroDiff = parseInt(valoreStringaDiff, 10)

    speedValue = valoreInteroSpeed
    diffValue = valoreInteroDiff

    // Elaborazione punteggio
    punteggio += 0.1 + diff;

    console.log("Punteggio:" + parseInt(punteggio))
    console.log("SpeedValue" + speedValue)
    console.log("DiffValue:" + diffValue)


    // Verifica se devi terminare il ciclo
    if (punteggio > 1000) {
        clearInterval(intervalId); // Termina l'esecuzione del ciclo
    }
}


