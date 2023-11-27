let audio = new Audio();

audio.title="Moye Moye";
audio.src='';


let playBtn = document.querySelector(".playBtn");
playBtn.addEventListener('click',()=> {
    console.log("Play Button clicked");
    audio.play();
});

let pauseBtn = document.querySelector(".pauseBtn");
playBtn.addEventListener('click',()=> {
    console.log("Pause Button clicked");
    audio.pause();
});

