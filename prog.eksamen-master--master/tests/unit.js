
const {request, expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http"); //Chai skal bruge 
const app = require("../index") //Henter serveren


chai.use(chaiHttp);
describe('Opret bruger', () => {

    // Tester log ind med POST metode

    describe("POST /brugere/opret", () => {
        it("Oprette en bruger", (done) => { //Hvad testen skal gøre
            chai
            .request(app) // Sender request til serveren
            .post("/brugere/opret") //Hente dette endpoint 
            .send( {
                email: "test@test.test",
                adgangskode: "test"})
            .end((error, res) => {
                expect(error).to.be.null;
                expect(res.status).to.equal(200);

                done(); // Done funktionen kaldes til sidst
        
            });
        });
    });
});


