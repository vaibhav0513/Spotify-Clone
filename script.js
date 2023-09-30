//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName:"Khul Laglay Manaych",filePath:"songs/1.mp3",coverPath:"covers/cover 1.jpg"},
    {songName:"Mere Sajna Ve Song",filePath:"songs/2.mp3",coverPath:"covers/cover 2.jpg"},
    {songName:"Dilruba Official Song",filePath:"songs/3.mp3",coverPath:"covers/cover 3.jpg"},
    {songName:"Khul Laglay Manaych",filePath:"songs/4.mp3",coverPath:"covers/cover 1.jpg"},
    {songName:"Dilruba Official Song",filePath:"songs/5.mp3",coverPath:"covers/cover 1.jpg"},
    {songName:"Dilruba Official Song",filePath:"songs/6.mp3",coverPath:"covers/cover 1.jpg"},
]

songItems.forEach((element, i) =>{
    //console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
//audioElement.play();


//Handle Play/Pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

//Listen to events
audioElement.addEventListener('timeupdate',() =>{
    //console.log('timeupdate');
    //Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    //console.log(progress);
    myProgressBar.value = progress;
});
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

//playing songs List
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click', (e)=> {
        //console.log(e.target);
        makeAllPlays();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
});

//Next button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
//Previous Button
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})