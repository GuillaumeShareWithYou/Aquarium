(function () {
    let c = document.getElementById("c3");
    let ctx = c.getContext("2d")
    ctx.moveTo(0, 0)
    let inputLargeur = document.getElementById("input_largeur")
    let inputLongueur = document.getElementById("input_longueur")
    let btnAdd = document.getElementById("btn_ajouter")
    let btnDelete = document.getElementById("btn_supprimer")
    btnAdd.addEventListener("click", e =>
        drawRectangle(inputLargeur.value, inputLongueur.value)
    );
    btnDelete.addEventListener("click", e =>
        ctx.clearRect(0, 0, c.width, c.height));

    function drawRectangle(largeur, longueur) {
        console.log(largeur, longueur)
        ctx.fillStyle = "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ")"
        ctx.fillRect(Math.random() * c.width, Math.random() * c.height, largeur, longueur)
    }
})()