function ostacolo(x, y, segmentoBase, segmentoTop) {
    let numeroSegmenti = Math.floor(Math.random() * 7) + 1 // generuno uno numero casuale da 1 a 7 fette di collo del tubo
    this.x = x; // coordinata x dell'ostacolo
    this.y = y; // coordinata y dell'ostacolo
    this.segmentoBase = segmentoBase; // immagine del segmento di base
    this.segmentoTop = segmentoTop; // immagine dell'elemento per la cima
    this.numeroSegmenti = numeroSegmenti; // numero di segmenti di base
    this.altezzaSegmento = segmentoBase.height; // altezza del singolo segmento di base
    this.altezzaTop = segmentoTop.height; // altezza dell'elemento per la cima
    this.larghezzaSegmento = segmentoBase.width; // larghezza del singolo segmento di base

    // Altezza totale dell'ostacolo
    this.altezzaTotale = this.altezzaSegmento * numeroSegmenti + this.altezzaTop;

    // Metodo per disegnare l'ostacolo sul canvas
    this.disegna = function (context) {
        for (let i = 0; i < this.numeroSegmenti; i++) {
            context.drawImage(this.segmentoBase, this.x, this.y + i * this.altezzaSegmento);
        }
        context.drawImage(this.segmentoTop, this.x, this.y + this.numeroSegmenti * this.altezzaSegmento);
    };

    // Metodo per aggiornare la posizione dell'ostacolo (usato per l'animazione)
    this.aggiornaPosizione = function (velocita) {
        this.x -= velocita;
    };
}



// Esempio di utilizzo
let segmentoBaseImg = new Image();
segmentoBaseImg.src = 'path/to/segmentoBase.png';

let segmentoTopImg = new Image();
segmentoTopImg.src = 'path/to/segmentoTop.png';

let ostacolo = new Ostacolo(500, 100, segmentoBaseImg, segmentoTopImg, 3);

// Nel tuo ciclo di gioco o animazione
function anima() {
    // Aggiorna la posizione dell'ostacolo
    ostacolo.aggiornaPosizione(2);

    // Cancella il canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Disegna l'ostacolo
    ostacolo.disegna(context);

    // Richiama la funzione di animazione
    requestAnimationFrame(anima);
}

// Avvia l'animazione
anima();
