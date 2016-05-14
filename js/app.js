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
    context.drawImage(video,0,0,640,480);
    //take four pictures here?  add them up?
});
},false);



function takePictures(){
    
};

function convertToImage(){
    let img = new Image();
    img.src = canvas.toDataURL("image/png");
    return img;
}