// Importa i dati dei post dal file data.js
const postsList = require('../data');

// Funzione per gestire la rotta GET e filtrare i post in base ai tag
const index = (req, res) => {
    // Estrae i parametri di query dall'oggetto req.query
    const queryString = req.query;
    // Inizializza postSend con l'intero array di post
    let postSend = postsList
    // Filtra i post in base ai tag se specificati nella query
    if (queryString.tags !== undefined) {
        postSend = postsList.filter((curPost) => curPost.tags.includes(queryString.tags))
    };
    // Crea un oggetto data con i post filtrati e il conteggio
    const data = {
        postsList: postSend,
        count: postSend.length
    };
    // Restituisce l'oggetto data in formato JSON
    res.json(data);
};

const show = (req, res) => {
    // preleva parametro e lo converte in numero
    const postId = parseInt(req.params.id);
    // Trova il primo post con id corrispondente a quello inserito nell'url
    const post = postsList.find((curPost) => curPost.id === postId);
    // Se il post non è presente 
    if (post === undefined) {
        res.statusCode = 404;
        // retituisce errore
        res.json({
            erroe: true,
            message: "post non trovato"
        });
        // altrimenti
    } else {
        // restituisce il post corrispondente
        res.json(post);
    }

};

const create = (req, res) => {
    res.json("aggiunge un nuovo elemento")
};

const update = (req, res) => {
    const postId = req.params.id;
    res.json("modifica e sovrascrive tutte le proprietà di un elemento con id:" + postId)
};

const modify = (req, res) => {
    const postId = req.params.id;
    res.json("modifica alcune proprietà selezionate di un elemento con id:" + postId)
};
// Funzione pr eliminare un posts
const destroy = (req, res) => {
    // Estrae il parametro e lo converte in numero
    const postId = parseInt(req.params.id);
//   Trova post con parametro corrispondente e trova il suo indice 
    const postIndex = postsList.findIndex((curPost) => curPost.id === postId)
    //   Se l'indice è -1 (volore su postman in caso di nessun riscontro)
    if (postIndex === -1) {
        // Restituisce errore
        res.statusCode = 404;
        res.json({
            erroe: true,
            message: "post non trovato"
        });
        // Altrimenti
    } else {
        // Elimina il post e restituisce lo stato 204 di sola conferma senza contenuto
        postsList.splice(postIndex, 1);
        res.sendStatus(204);
    }
};

// Esporta le funzioni 
module.exports = {
    index,
    show,
    create,
    update,
    modify,
    destroy
};