const { application } = require("express");
const express  = require("express");
const router = express.Router();
const vareModel = require("../model/varer"); //Dette er en måde at hente indholdet fra en anden fil. Vi henter modellen fra mappen models og bruger.js.
const { varer } = require("./../helper/database");
const database = require('./../helper/database'); //Vi henter database filen. 
const fileUpload = require("express-fileupload"); // Modul til at oprette filer i express
const path = require("path"); //Modul til at finde stien
const fs = require("fs");


router.use(express.urlencoded({extended: true})) // Vi skal bruge urlencoded i express for at kunne parse POST request-svaret
router.use(fileUpload())




router.post("/opretvare", (req, res) => { 
  const vare = new vareModel(req.body.vareId, req.body.produkt, req.body.pris, req.body.kategori); 
  database.gemVarer(vare); 
  res.status(200).send("Varen er oprettet");
  console.log("Oprettet vare: " + JSON.stringify(vare))
});



// Router for at se alle varer/annoncer
router.get("/mineannoncer", (req, res) => {
  res.status(200).json(varer);
})



// Router for at slette en vare/annonce
router.delete("/sletvare", (req, res) => {

  const vare = new vareModel (req.body.vareId, req.body.produkt, req.body.pris, req.body.kategori);

  database.sletVare(vare);
  res.status(200).send("Annoncen er nu slettet");

});

// Router for at opdatere vare
router.put("/opdatervare", (req, res) => {
  let data = JSON.parse(fs.readFileSync('data/varer.json'))

  for (let i = 0; i < data.length; i++) {
      if(data[i].vareId == req.body.vareId) {
          data[i].produkt = req.body.produkt;
          data[i].pris = req.body.pris;
          data[i].kategori = req.body.kategori;

          fs.writeFile('data/varer.json', JSON.stringify(data, null, 4), err => {
              if(err) res.send(err);
              res.send(data);
          });
      }
  }
});


module.exports = router;



