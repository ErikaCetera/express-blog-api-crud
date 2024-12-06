// Importa array dal file data
const postsList = require("../data");

// Funzione per gestire l'errore in caso di paramentro non presente
const checkPostExists = (req, res, next) => {
    // Preleva parametro
    const postId = parseInt(req.params.id);
    // Trova il post corrispondente al paramento inserito
    const post = postsList.find((curPost) => curPost.id === postId);
    // Se lo trova
    if (post !== undefined) {
        // Procede ad eseguire il codice della funzione in cui è stata chiamata
        next();
        // Altrimenti
    } else {
        //debug
        console.log("ho gestito l'errore");
        
        // Restituisce messaggio di errore
        res.statusCode = 404;
        res.json({
            error: true,
            message: "Post non trovato"
        });
    };
};

// Esporta la funzione
module.exports = checkPostExists;