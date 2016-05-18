//window.addEventListener("DOMContentLoaded", () => {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        video = document.getElementById("videoStream"),
        videoObj = { "video": true },
        images = [],
        onError = (error) => {
            console.log("Capture Error: " + error.code);
        };

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
        //take four pictures here?  add them up?

    });




    function takePictures() {
        let countdown = 3;
        let pictureCount = 0;
        countdownTimer();
        //set refreshIntervalID so you can cancel the loop later
        let refreshInterval = setInterval((countdown) => {

            takePicture();
            countdownTimer();
            pictureCount++;
            images.push( convertToImage());
            //
            if (pictureCount >= 4) {
                //stops the interval
                clearInterval(refreshInterval);
            }
        }, 4000);//set to 4 seconds between pictures
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
    
//}, false);