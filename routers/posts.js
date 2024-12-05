// Importa modulo express
const express = require("express");
// Crea un router utilizzando express.Router
const router = express.Router();
// Importa dati del file data.js
const postsList = require("../data");
// Esporta router
module.exports = router;

const postController = require("../controllers/postController")

// index - legge tutti i dati di ogni elemento
router.get('/',  postController.index);

// show - legge i dati di un singolo elemento attraverso un'id
router.get("/:id", postController.show );

// store - aggiunge un nuovo elemento
router.post("/", postController.store);

// update - modifica e sovrascrive tutte le proprietà di un elemento
router.put("/:id", postController.update);

// modify - modifica alcune proprietà selezionate di un elemento
router.patch("/:id", postController.modify);

// destroy - elimina un elemento
router.delete("/:id", postController.destroy);