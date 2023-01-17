
let canvas;
let ctx;
let flowField;
let flowFieldAnimation;




//ANIMATION
window.onload = function(){
    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight
    flowField = new FlowfieldEffect(ctx, canvas.width, canvas.height)
    flowField.animate(0)
}

window.addEventListener('resize', function(){
    cancelAnimationFrame(flowFieldAnimation)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    flowField = new FlowfieldEffect(ctx, canvas.width, canvas.height)
    flowField.animate(0)
})

const mouse ={
    x:0,
    y:0,
}
window.addEventListener('mousemove', function(e){
   mouse.x = e.x
   mouse.y = e.y
})

class FlowfieldEffect{
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height){
    this.#ctx = ctx
    this.#ctx.strokeStyle ='white'
    this.#ctx.lineWidth = 0.05;
    this.#width = width
    this.#height = height
    this.lastTime = 0;
    this.interval = 1000/60
    this.timer = 0
    this.cellSize = 15
    this.gradient
    this.#createGradient()
    this.#ctx.strokeStyle =this.gradient
    this.radius = 0
    this.vr =0.03

    }

    #createGradient(){
        this.gradient = this.#ctx.createLinearGradient(0,0, this.#width, this.#height)
        this.gradient.addColorStop("0.3","#000000")

        this.gradient.addColorStop("0.7","#00FF00")
        this.gradient.addColorStop("0.9","#0E430E")

        
        // this.gradient.addColorStop("","")

    }

    #drawLine(angle, x, y){
        let positionX = x;
        let positionY = y;
        let dx = mouse.x - positionX
        let dy = mouse.y - positionY
        let distance = dx * dx + dy * dy
        if (distance > 500000) distance = 600000
        else if(distance < 100000) distance = 90000
        let length = distance/2000
        this.#ctx.beginPath()
        this.#ctx.moveTo(x,y)
        this.#ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle)*length)
        this.#ctx.stroke()
    }
    animate(timestamp){
        const deltaTime = timestamp - this.lastTime
        this.lastTime = timestamp
        if (this.timer > this.interval){

        this.#ctx.clearRect(0,0, this.#width, this.#height)
        this.radius += this.vr
        if(this.radius > 10 || this.radius < -10) this.vr *=-1;


            for (let y = 0; y < this.#height; y+= this.cellSize){
                for (let x = 0; x < this.#width; x += this.cellSize){
                    const angle = (Math.cos(x * 0.005)+ Math.
                    sin(y * 0.005)) * this.radius
                    this.#drawLine(angle,x,y)
                }
            }
        this.timer = 0
        }else {
            this.timer += deltaTime
        }
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this))
    }
}





    
