
document.addEventListener("DOMContentLoaded", (e) => {
    document.getElementById("logInd").addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value
        const adgangskode = document.getElementById("adgangskode").value
        
        const bruger = {
            email: email,
            adgangskode: adgangskode
        };

        fetch("http://localhost:5000/brugere/logind", { //Fetch sender host til serveren. 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bruger),
        })
        .then((response) => response.json())
        .then((response) => {
            if (response) {
                localStorage.setItem("bruger", JSON.stringify(bruger)); // Put brugeren i localStorage på browseren, så det bliver gemt at brugeren er logget ind.
                location.href = "./"; //Når oplysningerne er korrekte, bliver brugeren sendt videre til home page, hvor den er logget ind. 
            } else {
                window.alert("De indtastede oplysninger er forkerte."); //Hvis oplysningerne ikke stemmer, vil en meddelelse komme frem.
            }
        })
        .catch(() => {
            window.alert("Der skete en fejl");
        });

        
    });
})

