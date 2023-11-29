let bird = document.getElementById("bird")
let speedInput = document.getElementById("speed");
let diffInput = document.getElementById("diff");
let inGame = true //aka not gameover
let scoreDiv = document.getElementById("Score"); // <p> punteggio
let punteggio = 0;
// Una volta messo un elemento dentro un oggetto Js puoi modificare le sue caratteristiche CSS da qua. Javascript è un mondo meraviglioso
//Un processo simile avviene quando dai a un oggetto.valore = oggettodue.valore


// I listener si impostano una sola volta sugli oggetti Js a cui ho fatto prendere in input gli <input type="range"> per aggiornare speedValue e diffValue
speedInput.addEventListener("input", function () {
    let speedValue = speedInput.value;
    console.log("Valore di speed:", speedValue);
});

diffInput.addEventListener("input", function () {
    let diffValue = diffInput.value;
    console.log("Valore di diff:", diffValue);
});


bird.style.left = "100px"; // Imposta la posizione orizzontale a 100 pixel
bird.style.top = "50px";  // Imposta la posizione verticale a 50 pixel



//Ora inizia il cuore dell'esecuzione del gioco. Finche non siamo in gameover, il ciclo while continuerà a riprodurre ulteriori due o tre cicli (vedrò strada facendo)
//per aggiornare il progresso in base alla difficoltà e velocità impostate. 


// Esegui la funzione eseguiCiclo ogni 1000 millisecondi (1 secondo)
const intervalId = setInterval(eseguiCiclo, 1000);

function eseguiCiclo() {
    // Il tuo codice qui

    console.log("Iterazione:", punteggio);

    punteggio++;

    // Verifica se devi terminare il ciclo
    if (punteggio > 10) {
        clearInterval(intervalId); // Termina l'esecuzione del ciclo
    }
}

