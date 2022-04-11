const opdformbruger = document.querySelector("#formOpdBruger");
opdformbruger.addEventListener("submit", async (e) => {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let adgangskode = document.getElementById("adgangskode").value;

    var opdater = {
        email: email,
        adgangskode: adgangskode
    }

    


    await fetch("http://localhost:5000/brugere/opdaterbruger", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(opdater),
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        window.location.href = "/";
        window.alert("Brugeren er nu opdateret");
    })
    .cath(err => {
        window.alert("Der skete en fejl", err);
    });
    
});


    


