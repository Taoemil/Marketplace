const { application } = require("express");
const express  = require("express");
const router = express.Router();
const brugerModel = require("../model/bruger"); //Dette er en måde at hente indholdet fra en anden fil. Vi henter modellen fra mappen models og bruger.js.
const database = require('./../helper/database'); //Vi henter database filen. 
const fs = require("fs");

router.use(express.urlencoded({extended: true})) // Vi skal bruge urlencoded i express for at kunne parse POST request-svaret


// Router for opret bruger
router.post("/opret", (req, res) => { // Her oprettes et endpoint for at oprette en bruger. 
    const bruger = new brugerModel(req.body.email, req.body.adgangskode); // Vi opretter en ny bruger ved at sige at bruger objektet er lig med indholdet fra brugerModellen og vi tilgår email og password. 
    database.gemBruger(bruger); //Hver eneste vi kører /opret, gemmes brugerne. 
    res.status(200).send("Du er nu oprettet som bruger");
    console.log("Oprettet bruger: " + JSON.stringify(bruger))
});


// Router for log ind
router.post("/logind", (req, res) => { // Her oprettes et endpoint for at logge ind. Vi laver en POST request, så vi kan inkludere body, hvilket ikke inkluderes i GET requests. 
    const bruger = new brugerModel (req.body.email, req.body.adgangskode) //Nu oprettes en bruger ud fra det data vi har i body. 
    const fundet = database.findBruger(bruger) //Når brugeren er fundet, returneres objektet for brugeren. Hvis den ikke er fundet, returneres intet. 
   console.log("Bruger logind: " + JSON.stringify(bruger))
    if (fundet) {
       if(bruger.adgangskode == fundet.adgangskode) {// Hvis brugerens adgangskode stemmer overens med den fundne brugers adgangskode.
       res.status(200).send(true); // Får vi response tilbage på, at det er true med 200 ok statuskode. 
   } else {
       res.status(401).send(false) // Hvis disse ikke stemmer overens med hinanden, får vi et respons på false og 401 statuskode. 
   }

   }
   else {
       res.status(404).send(false) // Hvis brugeres ikke eksisterer i databasen, sendes et false response med 404 statuskode. 
   }
    
 /* Når dette login kaldes, får vi enten et true eller false response med enten 200, 401 eller 404 statuskoder
afhængigt efter, om brugeres adgangskode stemmer overens med det fundne brugers adgangskode i databasen,
om brugeren har tastet forkert adgangskode eller om brugeren overhovedet eksisterer i databasen. 
 */

// Router for slette bruger
router.delete("/sletbruger", (req, res) => {
    const bruger = new brugerModel (req.body.email, req.body.adgangskode);
    database.sletBruger(bruger);
    res.status(200).send(true);
})
}); 

// Router for at opdatere bruger
router.put("/opdaterbruger", (req, res) => {
    let data = JSON.parse(fs.readFileSync('data/brugere.json'))
console.log(req.body);
    for (let i = 0; i < data.length; i++) {
        if(data[i].email == req.body.email) {
            data[i].adgangskode = req.body.adgangskode;

            fs.writeFile('data/brugere.json', JSON.stringify(data, null, 3), err => {
                if(err) res.send(err);
                res.send(data);
            });
        }
    }
});

 





module.exports = router;