
    //poissons
    let poisson = document.getElementById('poisson')
    let poisson_reverse = document.getElementById('poisson_reverse')
    //context
    let c = document.getElementById("c6")
    let ctx = c.getContext("2d")
    let nbPoissons = 35
    let nbBulles = 80

    class Element {

        constructor(x, y, dx, dy) {
            this.x = x
            this.y = y
            this.dx = dx
            this.dy = dy

        }

        draw() {
        }

        move() {
        }

    }

    class Poisson extends Element {
        constructor(x, y, color, longueur, hauteur, isLegendary) {
            super(x, y, isLegendary ? -1 + Math.random()*2 : -2.5 + Math.random()*5, isLegendary ? 0 : -1.5 + Math.random()*3 )
            this.longueur = longueur
            this.hauteur = hauteur
            this.isLegendary = isLegendary
            this.isExcited = false
            this.color = color
            this.contrast = 50 + Math.random()*100
        }

        draw() {
            ctx.save()
            //
            ctx.filter = "hue-rotate(" +this.color + "deg) invert(90%)  brightness(110%)" + (this.isLegendary ? " drop-shadow(16px 16px 20px red)" : '');
            ctx.drawImage(this.dx > 0 ? poisson_reverse : poisson, this.x, this.y, this.longueur, this.hauteur)
            ctx.restore()
        }

        move() {
            if(this.isLegendary)
            {
                if(!this.isExcited && Math.random() < 0.005){
                    this.dx *= 20
                    this.dy += Math.random() < 0.5 ? 1 : -1
                    this.isExcited = true
                }else if(this.isExcited && Math.random() < 0.005){
                    this.dx /= 20
                    this.dy = 0
                    this.isExcited = false
                }
            }
            if ((this.x + this.dx + this.longueur > c.width) && this.dx > 0 || (this.x + this.dx <= 0) && this.dx < 0) {
                this.dx *= -1
            }
            if ((this.y + this.dy + this.hauteur > c.height) && this.dy > 0 || (this.y + this.dy <= 0) && this.dy < 0) {
                this.dy *= -1
            }
            this.x += this.dx
            this.y += this.dy
        }
    }

    class Bulle extends Element{

        constructor(x,y){
            super(x,y,0,0)
            this.rayon = Math.random()*30 + 5
            this.dy = -(100) / this.rayon
        }
        draw(){
            ctx.fillStyle = "rgba(200,200,200,0.05)"
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.rayon, 0, Math.PI * 2)
            ctx.closePath()
            ctx.fill()
            ctx.strokeStyle = "rgba(200,200,200,0.7)"
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.rayon, 0, Math.PI * 2)
            ctx.closePath()
            ctx.stroke()
        }
        move(){
            this.y += this.dy
            //bulle disparait entierement en haut
            if(this.y < -this.rayon*2){
                this.y = c.height + Math.random() * c.height / 3
                this.x  = Math.random() * c.width
            }
        }
    }
    class Aquarium {

        constructor() {
            this.periode = 25
            //Generer les poissons
            this.poissons = []
            for (let i = 0; i < nbPoissons; ++i) {
                let color = Math.random() * 360

                let legendaryPoisson = Math.random() < 0.001
                if(legendaryPoisson){
                    console.log("LEGENDARY")
                }
                let longueur = Math.random()*150+ (legendaryPoisson ? 400 : 40)
                let hauteur =  Math.random()*150+ (legendaryPoisson ? 250 : 40)
                this.poissons[i] = new Poisson(Math.random() * c.width * 0.9, Math.random() * c.height * 0.9, color, longueur, hauteur, legendaryPoisson );
            }

            this.bulles = []
            for(let i = 0; i < nbBulles; ++i) {
                this.bulles[i] = new Bulle(Math.random() * c.width, c.height + Math.random()*c.height)
            }
        }

        draw() {
            setInterval(() => {
                ctx.clearRect(0, 0, c.width, c.height)

                //couleur de fond
                let water = ctx.createLinearGradient(c.width / 2, 0, c.width / 2, c.height);
                water.addColorStop(0, "rgba(200, 200, 255, 0.6)");
                water.addColorStop(0.3, "rgba(50, 50, 250, 0.8)");
                water.addColorStop(1, "rgba(20, 20, 20, 1)");
                ctx.fillStyle = water;
                ctx.fillRect(0, 0, c.width, c.height);

                //deplacement et affichage des poissons
                this.poissons.forEach(poisson => {
                    poisson.move()
                    poisson.draw()
                })

                this.bulles.forEach(bulle => {
                    bulle.move()
                    bulle.draw()
                })
            }, this.periode)
        }

    }

    let aquarium = new Aquarium()
    //Attendre le chargement de la page et notamment les images
    document.addEventListener("DOMContentLoaded", () => {
        aquarium.draw()
    })


    //----------------CHAT---------------------------------------//
    let messages = document.getElementById("messages")
    let inputUser = document.getElementById("input_username")
    let inputMessage = document.getElementById("input_msg")

    function createMessage(user, message){
        user = user + ": "
        let divMsg = document.createElement("div")
        divMsg.setAttribute("class", "message")
        messages.appendChild(divMsg)
        let divContent = document.createElement("div")
        let divUser = document.createElement("div")
        divContent.setAttribute("class", "content")
        divUser.setAttribute("class", "user")
        divContent.innerHTML = message
        divUser.innerHTML = user
        divMsg.appendChild(divUser)
        divMsg.appendChild(divContent)
    }
    function sendMessage(user, message) {
        if(!user || /^\s*$/.test(user) )
        {
            alert("veuillez choisir un nom")
            inputUser.value = null
            return
        }
        console.log(message)
        if(!message || /^\s*$/.test(message)){
            alert("Veuillez entrer un message")
            inputMessage.value = null
            return
        }

        aquarium.poissons.forEach(poisson =>{
            poisson.dx *= 1.2
            poisson.dy *= 1.2
        } )
        createMessage(user, message)
        inputMessage.value = null
    }

    inputMessage.addEventListener("keydown", (e)=>{
        if(e.key === "Enter"){
            if(e.ctrlKey){
                inputMessage.value +=  "\n"
                return
            }
            e.preventDefault()
            sendMessage(inputUser.value, inputMessage.value)
        }
    })
    let compteur = 0
    let  robotmsg = [
        "Coucou",
        "Ecris ton nom et ton message",
        "Puis appuie sur entrée pour envoyer",
        "Ctrl + entrée pour passer à la ligne",
        "Les messages plaisent beaucoup aux poissons !"
    ]
    let id = setInterval(()=>{
        if(compteur > robotmsg.length-1) {
            clearInterval(id)
            return
        }
        createMessage("Guillaume", robotmsg[compteur])
        compteur++
    },1000)

    let i = 0
    setInterval(()=>{
        let ph = "Votre message"+".".repeat(i)
        i = i === 4 ? 0 : i + 1
        inputMessage.setAttribute("placeholder", ph);
    },100)