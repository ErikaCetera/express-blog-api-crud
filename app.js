// Importa modulo express
const express = require('express');
// Crea applicazione express
const app = express();
// Definisce la porta del server
const port = 3003 ;
// Importa router dei posts
const postsRouter = require("./routers/posts");
// Importa funzione per gestire errore del server
const handleError = require("./middlewares/handleError")


app.use(express.json())
// Include tutte le rotte che inziano con /posts
app.use("/posts", postsRouter);

// Rende accessibile il contenuto della cartella Public
app.use(express.static('Public'));

// Definisce la rotta base
 app.get('/', (req, res) => {
    res.send("Server del mio blog");

 });

 app.use(handleError);

// Apre il server, in ascolto sulla porta definita
app.listen(port, () => {
    console.log(`Server in ascolto  ${port}`);

});
