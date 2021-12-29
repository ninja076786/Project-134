song="";
objects=[];
status="";
function preload()
{
    song=loadSound("Alarm.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects...";
}
function modelLoaded(){
console.log("MODEL LOADED!!!!!!!!!!!!!!!!");
status=true;
}
function gotResult(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results);
        objects=results;
    }
}
function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0;i<objects.length; i++){
    
            document.getElementById("status").innerHTML="Status: Objects Detected!╚╝(o゜▽゜)o☆";
            document.getElementById("num_of_obj").innerHTML="Number Of Objects Detecte Are: "+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("num_of_obj").innerHTMl="Baby Found!! YAY";
                song.stop()

            }
            else{
                document.getElementById("num_of_obj").innerHTMl="Baby NOT Found!! OH NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO ";
                song.play();
            }
        }
    }
    }
