// Importa modulo express
const express = require("express");
// Crea un router utilizzando express.Router
const router = express.Router();
// Importa dati del file data.js
const postsList = require("../data");
// Importa le funzioni del file postController
const postController = require("../controllers/postController")
// importa la funzione per la gestione dell'errore del parametro client
const checkPostExists = require("../middlewares/checkPostExists");


// index - legge tutti i dati di ogni elemento
router.get('/',  postController.index);

// show - legge i dati di un singolo elemento attraverso un'id
router.get("/:id", checkPostExists, postController.show );

// store - aggiunge un nuovo elemento
router.post("/", postController.store);

// update - modifica e sovrascrive tutte le proprietà di un elemento
router.put("/:id", checkPostExists, postController.update);

// modify - modifica alcune proprietà selezionate di un elemento
router.patch("/:id", checkPostExists, postController.modify);

// destroy - elimina un elemento
router.delete("/:id", checkPostExists, postController.destroy);

// Esporta router
module.exports = router;