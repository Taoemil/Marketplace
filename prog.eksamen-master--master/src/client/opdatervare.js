const opdaterform = document.querySelector("#formOpd");
opdaterform.addEventListener("submit", async(e) => {
    e.preventDefault();
    
let vareId = document.getElementById("vareId").value;
let produkt = document.getElementById("produkt").value;
let pris = document.getElementById("pris").value;
let kategori = document.getElementById("varekategori").value;

var opdater = {
    vareId: vareId,
    produkt: produkt,
    pris: pris,
    kategori: kategori
}

await fetch("http://localhost:5000/varer/opdatervare", {
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
    window.alert("Varen er nu opdateret");
})
});

