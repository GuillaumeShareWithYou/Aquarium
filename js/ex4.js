(function () {
    let c = document.getElementById("c4");
    let ctx = c.getContext("2d")
    let angle = 0
    setInterval(()=>
        {
            ctx.save()
            ctx.clearRect(0,0,c.width, c.height)
            ctx.translate(100,100)
            ctx.rotate(angle)
            ctx.translate(-100,-100)
            angle += (Math.PI/180)
            ctx.fillRect(50,50, 100,100)
            ctx.restore()
        }
    , 100);

})()