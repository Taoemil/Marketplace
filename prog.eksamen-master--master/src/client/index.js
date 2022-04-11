
//Tjek om bruger er logget ind ved at se om brugerinformationen er i localStorage i browseren 

// Log ud
document.addEventListener("DOMContentLoaded", (event) => { 
    const bruger = localStorage.getItem("bruger"); //Vi finder brugeren fra localstorage
    
    if (!bruger) { //Hvis brugeren ikke findes
        location.href = "/logind.html" // skal den føres videre til logind siden. 
    } 

    document.getElementById("logud").addEventListener("click", (e) => { //Når knappen logud bliver klikket
        localStorage.removeItem("bruger"); //Bliver brugeren i localstorage fjernet i browseren. 
        location.href = "/logind.html" // Og brugeren bliver ført ud igen til logind siden. 
    
    }) //Nu er brugeren logget ud. 


    // Slet bruger

    document.getElementById("sletBruger").addEventListener("click", (e) => {
        e.preventDefault();

        const bruger = JSON.parse(localStorage.getItem("bruger"));

       
        fetch("http://localhost:5000/brugere/sletbruger", { //Fetch sender host til serveren. 
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bruger),
        })
        .then((response) => response.json())
        .then((response) => {
            if (response) {
                localStorage.removeItem("bruger"); // Put brugeren i localStorage på browseren, så det bliver gemt at brugeren er logget ind.
                location.href = "/logind.html"; //Når oplysningerne er korrekte, bliver brugeren sendt videre til home page, hvor den er logget ind. 
            } 
        });
    });


    // Opdater bruger
    document.getElementById("opdaterbruger").addEventListener("click", (e) => {
        location.href="http://localhost:5000/opdaterbruger.html"

        

    })

    // Opdater annonce
    document.getElementById("opdatervare").addEventListener("click", (e) => {
        location.href = "http://localhost:5000/opdatervare.html"
    })

    // Opret vare

    document.getElementById("opretannonce").addEventListener("click", (e) => { 
        location.href = "http://localhost:5000/opretvare.html"
    }) 

    // Slet vare
    document.getElementById("sletvare").addEventListener("click", (e) => {
        location.href = "http://localhost:5000/sletvare.html"
    })
    

    // Se alle varer - tabel

    document.getElementById("mineannoncer").addEventListener("click", async() => {
        let table = document.getElementById("tabel");

        let result = await fetch("http://localhost:5000/varer/mineannoncer", {method: "GET"})
        .then(res => res.json())
        .catch(err => console.log(err));

        let tableHtml = `
        <tr>
            <th>Vare ID</th>
            <th>Produkt</th>
            <th>Pris</th>
            <th>Kategori</th>

        

        </tr>
        `;
        
        result.forEach((varer) => {
            tableHtml += `
            <tr>
                <td>${varer.vareId}</td>
                <td>${varer.produkt}</td>
                <td>${varer.pris}</td>
                <td>${varer.kategori}</td>
                

            `;

        
        })

        table.innerHTML = tableHtml;

        // Se elektronik - tabel
    })

    document.getElementById("elektronik").addEventListener("click", async() => {
        let table = document.getElementById("tabel");

        let result = await fetch("http://localhost:5000/varer/mineannoncer", {method: "GET"})
        .then(res => res.json())
        .catch(err => console.log(err));

        let tableHtml = `
        <tr>
            <th>Vare ID</th>
            <th>Produkt</th>
            <th>Pris</th>
            <th>Kategori</th>
        </tr>
        `;
        
        result.forEach((varer) => {
            if (varer.kategori != "Elektronik") {
                return;
            }
            tableHtml += `
            <tr>
                <td>${varer.vareId}</td>
                <td>${varer.produkt}</td>
                <td>${varer.pris}</td>
                <td>${varer.kategori}</td>
            `;
        })

        table.innerHTML = tableHtml;

    })

    // Se kæledyr - tabel

    document.getElementById("dyr").addEventListener("click", async() => {
        let table = document.getElementById("tabel");

        let result = await fetch("http://localhost:5000/varer/mineannoncer", {method: "GET"})
        .then(res => res.json())
        .catch(err => console.log(err));

        let tableHtml = `
        <tr>
            <th>Vare ID</th>
            <th>Produkt</th>
            <th>Pris</th>
            <th>Kategori</th>
        </tr>
        `;
        
        result.forEach((varer) => {
            if (varer.kategori != "Kæledyr") {
                return;
            }
            tableHtml += `
            <tr>
                <td>${varer.vareId}</td>
                <td>${varer.produkt}</td>
                <td>${varer.pris}</td>
                <td>${varer.kategori}</td>
            `;
        })

        table.innerHTML = tableHtml;

    })

    //Se tøj og mode - tabel

    document.getElementById("tojogmode").addEventListener("click", async() => {
        let table = document.getElementById("tabel");

        let result = await fetch("http://localhost:5000/varer/mineannoncer", {method: "GET"})
        .then(res => res.json())
        .catch(err => console.log(err));

        let tableHtml = `
        <tr>
            <th>Vare ID</th>
            <th>Produkt</th>
            <th>Pris</th>
            <th>Kategori</th>
        </tr>
        `;
        
        result.forEach((varer) => {
            if (varer.kategori != "Tøj & mode") {
                return;
            }
            tableHtml += `
            <tr>
                <td>${varer.vareId}</td>
                <td>${varer.produkt}</td>
                <td>${varer.pris}</td>
                <td>${varer.kategori}</td>
            `;
            
        })

        table.innerHTML = tableHtml;

    

    })
    
});




