// var bird = document.getElementById('bird');
// var birdPosition = { top: 50, left: 50 }; // Posizione iniziale

// document.addEventListener('keydown', function (event) {
//     // Puoi aggiungere condizioni per gestire diverse tasti
//     if (event.key === 'ArrowUp') {
//         birdPosition.top -= 10; // Muovi verso l'alto
//     } else if (event.key === 'ArrowDown') {
//         birdPosition.top += 10; // Muovi verso il basso
//     } else if (event.key === 'ArrowLeft') {
//         birdPosition.left -= 10; // Muovi a sinistra
//     } else if (event.key === 'ArrowRight') {
//         birdPosition.left += 10; // Muovi a destra
//     }

//     // Aggiorna la posizione dell'uccellino
//     bird.style.top = birdPosition.top + '%';
//     bird.style.left = birdPosition.left + '%';
// 

// Una volta messo un elemento dentro un oggetto Js puoi modificare le sue caratteristiche CSS da qua. Javascript è un mondo meraviglioso
var bird = document.getElementById("bird")
var speedInput = document.getElementById("speed");
var diffInput = document.getElementById("diff");
var inGame = true //aka not gameover


// I listener si impostano una sola volta sugli oggetti Js a cui ho fatto prendere in input gli <input type="range"> per aggiornare speedValue e diffValue
speedInput.addEventListener("input", function () {
    var speedValue = speedInput.value;
    console.log("Valore di speed:", speedValue);
});

diffInput.addEventListener("input", function () {
    var diffValue = diffInput.value;
    console.log("Valore di diff:", diffValue);
});


bird.style.left = "100px"; // Imposta la posizione orizzontale a 100 pixel
bird.style.top = "50px";  // Imposta la posizione verticale a 50 pixel

//Ora inizia il cuore dell'esecuzione del gioco. Finche non siamo in gameover, il ciclo while continuerà a riprodurre ulteriori due o tre cicli (vedrò strada facendo)
//per aggiornare il progresso in base alla difficoltà e velocità impostate. 
