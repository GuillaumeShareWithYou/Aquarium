(function () {
    let c = document.getElementById("c5")
    let context = c.getContext("2d")
    function drawCurve()
    {
        context.beginPath();
        context.strokeStyle= "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")"
        context.lineWidth=4;
        context.moveTo(Math.random()*c.width,Math.random()*c.height);
        context.quadraticCurveTo(Math.random()*300,Math.random()*300, Math.random()*300, Math.random()*300);
        context.stroke();
    }
    setInterval(drawCurve, 100)
    setInterval(() => context.clearRect(0, 0, c.width, c.height), 1000);
})()