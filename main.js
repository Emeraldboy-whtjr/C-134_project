var alarm = "";
var object_detection = "";
var person = "";
var percent = "";
objects = [];

function preload(){
    alarm = loadSound("alarm.mp3");
}

function setup(){
    canvas = createCanvas(400,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(400,400);

}

function startDetect(){
    object_detection = ml5.objectDetector("cocossd",cocossd_loaded);

    document.getElementById("status").innerHTML = "Trying to detect objects in image."
}

function draw(){
    image(video,0,0,400,400);

    if(person != ""){
        object_detection.detect(video,detected);

        for(i = "person"; i != objects[0].label; i++){
            if(i == objects[0].label){
                document.getElementById("status").innerHTML = "baby has been detected";
                
                fill("white");
                textSize(15);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 20 , objects[i].y + 20);
                noFill(); 
                stroke("white");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

                alarm.stop();
            }

            else{
                document.getElementById("status").innerHTML = "baby has not been detected";

                alarm.play();
            }

        }
    }
    else{
        document.getElementById("status").innerHTML = "baby has not been detected";

        alarm.play();
    }

}

function cocossd_loaded(){
    console.log("cocossd loaded");

    person = true;

}

function detected(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);

        objects = result;
    }
}