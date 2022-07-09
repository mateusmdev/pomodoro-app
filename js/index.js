const tempoDisplay = document.querySelector('#tempo');
const quantidade = document.querySelector('.break p');
const playButton = document.querySelector('#play');
const resetButton = document.querySelector('#reiniciar');
const audio =  new Audio('audio\\click.mp3');

let pomodoro = true;
let cronometro = moment();
let loop = null;

playButton.addEventListener('click', play, false);
resetButton.addEventListener('click', reset, false);

function play(){
    playButton.disabled = true;
    playButton.style.opacity = 0.5;
    playButton.classList.toggle('botao-desativado');
    pomodoroTime();
    toggleAnimation();
}

function reset(){
    pomodoro = true;
    playButton.disabled = false;
    playButton.style.opacity = 1;
    clearInterval(loop);
    tempoDisplay.innerHTML = "25:00";
    tempoDisplay.innerHTML = cronometro.format('mm:ss');
    quantidade.innerHTML = '4X';
    playButton.classList.toggle('botao-desativado');
    toggleAnimation()
    tempoDisplay.classList.add('pomodoro-time');
    tempoDisplay.classList.remove('break-time');
}

function pomodoroTime(){
    cronometro.minutes(25);
    cronometro.seconds(0)

    loop = setInterval(() =>{
        let segundos = cronometro.seconds() - 1;
        cronometro.seconds(segundos);
        let tempoAtual = cronometro.format('mm:ss');
        tempoDisplay.innerHTML = `${tempoAtual}`;
        if (tempoAtual === '00:00'){

            audio.play();
            trocaPeriodo();
        }
    }, 1000);
}

function trocaPeriodo(){
    let breakTime = parseInt(quantidade.innerHTML[0]);
    toggleColor();
    pomodoro = !pomodoro;

    if (pomodoro){
        cronometro.minutes(25);
        cronometro.seconds(0);
    }else{
        breakTime--;
        quantidade.innerHTML = breakTime + 'X';
        cronometro.minutes(5);
        cronometro.seconds(0);
    }

    let tempoAtual = cronometro.format('mm:ss');

    if (breakTime === 0){
        clearInterval(loop);
        reset();
        tempoDisplay.innerHTML = '00:00';
        
    }else
        tempoDisplay.innerHTML = `${tempoAtual}`;
}

function toggleColor(){
    tempoDisplay.classList.toggle('pomodoro-time');
    tempoDisplay.classList.toggle('break-time');
}

function toggleAnimation(){
    const contador = document.querySelector('.contador');
    contador.classList.toggle('sentido-horario');
    tempoDisplay.classList.toggle('sentido-anti-horario');
}

