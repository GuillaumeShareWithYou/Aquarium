(function () {

    let c = document.getElementById("c2")
    let ctx = c.getContext("2d")
    let r = 10;
    let stepstart = r/10 * Math.sqrt(2)/2
    let step = stepstart;
    let direction = true;
    let timer = new Timer(function () {
        r = Math.random() > 0.5 ? r + 1 : r;
        ctx.clearRect(0,0,c.width, c.height)
        ctx.moveTo(0,0)
        ctx.beginPath();
        ctx.arc(125,125,r,0,2*Math.PI);
        ctx.lineWidth = 0.5;
        let colorRandom = "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")"
        ctx.fillStyle = colorRandom

        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.moveTo(125,125-r)
        ctx.lineTo(125+step,125-step)
        ctx.lineTo(125+r,125)
        ctx.lineTo(125+step,125+step)
        ctx.lineTo(125,125+r)
        ctx.lineTo(125-step,125+step)
        ctx.lineTo(125-r,125)
        ctx.lineTo(125-step,125-step)
        ctx.lineTo(125,125-r)
        ctx.closePath()
        ctx.fill()

        ctx.beginPath()
        ctx.arc(125,125,r/10,0,2*Math.PI);
        ctx.fillStyle = colorRandom
        ctx.closePath();
        ctx.fill();

        step = direction ? step + 1 : step - 1
        if(step > r * Math.sqrt(2)/2)
            direction = false
        else if(step < stepstart)
            direction = true
        ctx.translate(125,125)
        ctx.rotate(90);
        ctx.translate(-125,-125)
    }, 80);

    timer.start();

    let info = document.getElementById("infoc2");
    c.addEventListener("click", e => {
        bool = timer.toggle();
        if(bool)
            info.innerHTML = "Clique dessus pour arrêter"
        else
            info.innerHTML = "Clique dessus pour redémarrer"
    })

})()