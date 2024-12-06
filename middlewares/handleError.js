// Funzione per gestire l'errore del server presente nell'argomento err
const handleError =(err, req, res, next) => {
//debug
console.log("Ho gestito errore nel serever");
// Quando è presente un errore nel codice restituisce messaggio di errore
res.statusCode = 500;
res.json({
    error: true,
    message: "Errore interno al server"
});
};

// Esporta la funzione
module.exports = handleError;