const opdaterform = document.querySelector("#formSlet");
opdaterform.addEventListener("submit", async(e) => {
    e.preventDefault();
    
let vareId = document.getElementById("vareId").value;



var slet = {
    vareId: vareId,
}


await fetch("http://localhost:5000/varer/sletvare", {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(slet),
})
.then(res => res.json())
.then(data => {
    console.log(data);
    window.location.href = "/";
    window.alert("Annoncen er nu slettet");
})
});

