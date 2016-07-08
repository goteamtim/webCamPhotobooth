//window.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("videoStream"),
        videoObj = { "video": true },
        imagesArray = [],
        takingPictures = false,
        onError = (error) => {
            console.log("Capture Error: " + error.code);
        };

//Check if the user has a camera attached.  Seems like this only checks to see if the ability is there.
    if (navigator.getUserMedia) {
        navigator.getUserMedia(videoObj, (stream) => {
            video.src = stream;
            video.play();
        }, onError);
    } else if (navigator.webkitGetUserMedia) {
        navigator.webkitGetUserMedia(videoObj, (stream) => {
            video.src = window.URL.createObjectURL(stream);
            video.play;
        }, onError);
    }

    document.getElementById("takePicture").addEventListener("click", () => {
            takePictures();
    });

function buildPhotoStrip(imgArray){
    //Paste the pictures to a picture strip
    //canvas?
    let photoStripCanvas = document.getElementById("photoStrip");
    let photoStripContext = photoStripCanvas.getContext("2d");
    imgArray.forEach((photo,arrIndex)=>{
        //first Photo
        photoStripContext.drawImage(photo,5,5*(arrIndex+1)+(480*arrIndex),640,480);
    },this);
}


    function takePictures() {
        if (!takingPictures) {
            let countdown = 3;
        let pictureCount = 0;
        countdownTimer();
        //set refreshIntervalID so you can cancel the loop later
        let refreshInterval = setInterval((countdown) => {

            takePicture();
            countdownTimer();
            pictureCount++;
            imagesArray.push( convertToImage());
            //
            if (pictureCount >= 4) {
                buildPhotoStrip(imagesArray);
                //stops the interval
                clearInterval(refreshInterval);
                takingPictures = false;
                addDownloadButton();
            }
        }, 4000);//set to 4 seconds between pictures
        }
    };

    function countdownTimer() {
        var countdownTime = 3;
        var intervalID = setInterval(function () {
            var timer = document.getElementById("countdown");
            timer.innerHTML = countdownTime;
            countdownTime--;
            if (countdownTime == 0) {
                timer.innerHTML = "Smile!";
                clearInterval(intervalID);
            }
        }, 1000);
    }

    function takePicture() {
        //countdownTimer();
        context.drawImage(video, 0, 0, 640, 480);
    }

    function convertToImage() {
        let img = new Image();
        img.src = canvas.toDataURL("image/jpg");
        return img;
    }

    function addDownloadButton(){
        var photoStrip = document.getElementById("photoStrip");
        var photoUrl = photoStrip.toDataURL("image/jpg");
        let downloadButton = document.getElementById("downloadPhotoStrip");

        /* Change MIME type to so the user can download instead of displaying the picture */
        photoUrl = photoUrl.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

        downloadButton.href = photoUrl;
        downloadButton.addEventListener("click",photoUrl,false);
    }
    
//}, false);