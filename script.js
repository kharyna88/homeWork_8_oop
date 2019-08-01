let minutes = document.querySelector('#minutes');
let seconds = document.querySelector('#seconds');
let interval = document.querySelector('#interval');
let autoStart = document.querySelector('#autoStart');


class Timer {
    constructor(options = {
        minutes: parseInt(minutes.value, 10),
        seconds: parseInt(seconds.value, 10),
        interval: parseInt(interval.value, 10),
        autoStart: autoStart.checked
    }) {

        this.options = options;
        this.divTimer = this.addTimer();
        this.button = this.createButton();
        this.line = this.addLine();

    }

    addTimer() {
        const divTimer = document.createElement("div");
        divTimer.className = 'div_timer';
        divTimer.style.margin = "30px 0 0 10px";

        if (this.options.minutes < 10 && this.options.seconds < 10) {
            divTimer.innerHTML = `0${this.options.minutes} : 0${this.options.seconds}`;

        } else if (this.options.seconds < 10) {
            divTimer.innerHTML = `${this.options.minutes} : 0${this.options.seconds}`;

        } else if (this.options.minutes < 10) {
            divTimer.innerHTML = `0${this.options.minutes} : ${this.options.seconds}`;

        } else {
            divTimer.innerHTML = `${this.options.minutes} : ${this.options.seconds}`;
        }
        this.start();

        document.body.append(divTimer);
        return divTimer;
    }

    addLine() {
        const line = document.createElement("div");
        this.options.line100 = 100;
        line.style.height = "20px";
        line.style.background = 'rgb(39, 25, 243)';
        document.body.append(line);

        this.options.allLine = (this.options.minutes * 60) + this.options.seconds;
        this.options.lineWidth = 100 / this.options.allLine;
        //console.log(this.options.lineWidth);

        return line;

    }

    start() {

        if (this.options.autoStart == true) {

            this.options.timerId = setInterval(
                () => {

                    this.options.seconds -= this.options.interval;

                    this.options.line100 -= this.options.lineWidth * this.options.interval;
                    this.line.style.width = `${this.options.line100}%`;

                    if (this.options.seconds == 0 && this.options.minutes == 0 || this.options.minutes == 0 && this.options.seconds <= 0) {
                        clearInterval(this.options.timerId);
                        this.options.seconds = 0;
                        this.button.innerText = "START";
                        this.line.style.width = "0%";
                    }

                    if (this.options.seconds <= 0 && this.options.minutes > 0) {
                        this.options.seconds = 0;

                        setTimeout(function () {
                            this.options.minutes--;
                            this.options.seconds = 60;
                        }.bind(this), 1);

                    }

                    if (this.options.minutes < 10 && this.options.seconds < 10) {
                        this.divTimer.innerHTML = `0${this.options.minutes} : 0${this.options.seconds}`;

                    } else if (this.options.seconds < 10) {
                        this.divTimer.innerHTML = `${this.options.minutes} : 0${this.options.seconds}`;

                    } else if (this.options.minutes < 10) {
                        this.divTimer.innerHTML = `0${this.options.minutes} : ${this.options.seconds}`;

                    } else {
                        this.divTimer.innerHTML = `${this.options.minutes} : ${this.options.seconds}`;

                    }
                }, this.options.interval * 1000);

            if (this.options.seconds < this.options.interval && this.options.minutes == 0) {
                alert("Time is less than the interval!");
            }
        }
    }

    createButton() {
        const button = document.createElement("button");
        button.className = 'button_start';
        if (this.options.autoStart == true) {
            button.innerText = "STOP";
        } else {
            button.innerText = "START";
        }

        button.addEventListener("click", function () {

            if (button.innerText == "STOP") {
                button.innerText = "START";
                clearInterval(this.options.timerId);
            } else if (button.innerText == "START") {
                this.options.autoStart = true;
                button.innerText = "STOP";
                this.start();
            }
        }.bind(this));

        document.body.append(button);
        return button;
    }

    buttonStart() {
        button.addEventListener("click", function () {

            if (button.innerText == "START") {
                this.options.autoStart = true;
                this.button.innerText = "STOP";
                this.start();
            }
        })
    }
}

const button = document.querySelector(".button_create");
button.addEventListener("click", function () {
    const newTimer = new Timer();
    console.log(newTimer);

});

new Timer({
    minutes: 0,
    seconds: 15,
    interval: 1,
    autoStart: false
});

new Timer({
    minutes: 5,
    seconds: 30,
    interval: 2,
    autoStart: true
}); 