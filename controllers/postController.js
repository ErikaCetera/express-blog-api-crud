// Importa i dati dei post dal file data.js
const postsList = require('../data');

// Funzione per gestire la rotta GET e filtrare i post in base ai tag
const index = (req, res) => {
    // Estrae i parametri di query dall'oggetto req.query
    const queryString = req.query.tags;
    // Inizializza postSend con l'intero array di post
    let postSend = postsList;
    // Filtra i post in base ai tag se specificati nella query
    if (queryString !== undefined) {
        postSend = postsList.filter((curPost) => curPost.tags.includes(queryString));
    };
    // Crea un oggetto data con i post filtrati e il conteggio
    const data = {
        postsList: postSend,
        count: postSend.length
    };
    // Restituisce l'oggetto data in formato JSON
    res.json(data);
};


// Funzione per gestire la rotta GET per mostrare uno specifico elenento in base all'id
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


// Funzione che gestisce la rotta POST che crea un nuovo post e lo aggiunge all'array dei posts
const store = (req, res) => {
    // debug
    console.log(req.body);
    // Richiesta del client con nuovo post
    const newPost = req.body;
    // Trova l'indice dell'ultimo elemento dell'array
    const lastPostIndex = postsList.length - 1;
    // Preleva ultimo elemento
    const lastPost = postsList[lastPostIndex];
    // Aggiunge la proprietà id al nuovo post partendo dall'ultimo +1
    newPost.id = lastPost.id + 1;
    // Aggiunge nuovo post all'array
    postsList.push(newPost);
    // Restituisce codice 201 (elemento creato) e nuovo post
    res.statusCode = 201;
    res.json({
        message: "Nuovo elemento aggiunto",
        newPost
    });
};


// Funzione che gestisce la rotta PUT che modifica le preprieta di un oggetto (id escluso)
const update = (req, res) => {
    // preleva parametro e lo converte in numero
    const postId = parseInt(req.params.id);
    // Richiesta del client con modifiche da effettuare
    const postUpdate = req.body;
    // Trova l'indice del post da modificare
    const postIndex = postsList.findIndex((curPost) => curPost.id === postId);
    // Se l'indice inserto non porta a nessun riscontro e restituisce -1
    if (postIndex === -1) {
        // Restituisce errore
        res.json({
            error: true,
            message: "Post non trovato"
        });
     // Altrimenti
    } else {
        // Aggiunge lo stesso indice al post
        postUpdate.id = postId;
        // Assegna alla stessa posizione il post modificato (sostituisce)
        postsList[postIndex] = postUpdate;
        // Restituisce post modificato
        res.json({
            message: `post con id ${postId} modificato`,
            postUpdate
        });
    };
};

const modify = (req, res) => {
    const postId = req.params.id;
    res.json("modifica alcune proprietà selezionate di un elemento con id:" + postId)
};


// Funzione pr eliminare un post
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
    store,
    update,
    modify,
    destroy
};