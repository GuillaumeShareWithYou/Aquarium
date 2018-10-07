(function () {
    let c = document.getElementById("c1");
    let ctx = c.getContext("2d");
    ctx.moveTo(0, 0);
    ctx.fillStyle = "#0F0";
    ctx.fillRect(100, 25, 100, 200);
    ctx.fillStyle = "#F00";
    ctx.fillRect(50, 75, 100, 100);// x , y , width , height
})()
