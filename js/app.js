window.addEventListener("DOMContentLoaded", ()=>{
    var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    video = document.getElementById("videoStream"),
    videoObj = {"video": true},
    onError = (error) => {
        console.log("Capture Error: " + error.code);
    };

    if(navigator.getUserMedia){
        navigator.getUserMedia(videoObj, (stream)=>{
            video.src = stream;
            video.play();
        }, onError);
    }else if(navigator.webkitGetUserMedia){
        navigator.webkitGetUserMedia(videoObj,(stream)=>{
            video.src = window.URL.createObjectURL(stream);
            video.play;
        },onError);
    }
    
    document.getElementById("takePicture").addEventListener("click",()=>{
    takePictures();
    //take four pictures here?  add them up?
    
});
},false);



function takePictures(){
    let countdown = 3;
    //set refreshIntervalID so you can cancel the loop later
    let refreshInterval = setInterval((countdown)=>{
        takePicture();
        //update ui
        //update countdown
        //set 3 second timer?
    },4000);//set to 4 seconds between pictures
    //start countdown timer
    //take pictures
    //save to an array
    //return array
    for(let i = 0; i <3; i++){
        
    }
    //stops the interval
    clearInterval(refreshInterval);
};

function countdownTimer() {
    let timer = document.querySelector("#countdown");
    let countdownTime = 3;
    setInterval(function(){
        timer.innerHTML = countdownTime;
        countdownTime--;
        
    },500);
}

function takePicture(){
    countdownTimer();
    context.drawImage(video,0,0,640,480);
}

function convertToImage(){
    let img = new Image();
    img.src = canvas.toDataURL("image/png");
    return img;
}