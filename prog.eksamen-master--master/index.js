const express = require("express");
const app = express();


//Controllers
const usercontroller = require("./src/controller/user_controller"); //Her kobler vi filerne sammen
const varecontroller = require("./src/controller/varer_controller"); //Her kobler vi filerne sammen


const PORT = process.env.PORT || 5000; // to steger er or operator. Hvis variablen process.env.PORT ikke er defineret, skal den bruge 3000 og lægge det ind i port

//Middleware. Det der sker, før vi kører noget.
app.use(express.static("./src/client"));
app.use(express.json());

//Routes. Når vi skriver /brugere, kommer vi ind userConstroller fil
app.use("/brugere", usercontroller); //Indholdet af userController filen bliver lagt oveni endpointet /brugere. 
app.use("/varer", varecontroller); //Indholdet af userController filen bliver lagt oveni endpointet /brugere. 



//Init. Når vi starter serveren, skal der stå server is running

app.listen(PORT, ()=>{ //Starter serveren
    console.log(`Server lytter på port ${PORT}`);
    });

    module.exports = app;
    