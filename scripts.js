var speed = document.getElementById("volumeControl");


var speedControl = document.getElementById("speedControl");
var volumeValueDisplay = document.getElementById("volumeValue");

// Aggiungi un gestore degli eventi per il cambiamento del valore
speedControl.addEventListener("input", function () {
    // Aggiorna il valore visualizzato

    // Puoi anche utilizzare il valore per fare altre azioni, ad esempio regolare il volume di un elemento audio
    // Esempio:
    // var audioElement = document.getElementById("ilTuoAudio");
    // audioElement.volume = volumeControl.value / 10;
});

function main() {
    console.log(volumeControl.value);
}

var intervalloID = setInterval(main, 1000);