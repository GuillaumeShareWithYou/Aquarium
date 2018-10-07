
class Timer{
    constructor(fn, t){
        this.fn = fn
        this.t = t
        this.timerObj = setInterval(fn, t)
    }

    toggle(){
        if(!this.timerObj)
            this.start()
        else
            this.stop()
        return this.timerObj
    }
    stop(){
        if (this.timerObj) {
            clearInterval(this.timerObj);
            this.timerObj = null;
        }
        return this;
    }
    // start timer using current settings (if it's not already running)
    start() {
        if (!this.timerObj) {
            this.stop();
            this.timerObj = setInterval(this.fn, this.t);
        }
        return this;
    }
}
