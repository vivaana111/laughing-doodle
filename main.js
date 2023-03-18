status = "";
value_from_input_box = "";
objects = [];
results = [];
synth = "";

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}


function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status_model").innerHTML = "Status: Detecting Objects";
    value_from_input_box = document.getElementById("input_box").value;

}
function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}
function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    if(results)
    {
        console.log(results);
        objects = results;  
    }
}

function draw()
{
    image(video,0,0,480,380);

    if(status != "")
    {
  
        objectDetector.detect(video,gotResult);

    for( i = 0; i< objects.length; i++)
        {
            document.getElementById("status_model").innerHTML = "Objects Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%" ,  objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            

            if(objects[i].label == value_from_input_box)
            {
               video.stop();
               document.getElementById("status_object").innerHTML = value_from_input_box + " found :)"; 
               objectDetector.detect(gotResult);
               synth = window.speechSynthesis;
               utterThis = new SpeechSynthesisUtterance(value_from_input_box + "found:)");
               synth.speak(utterThis);

            }
            else
            {
                document.getElementById("status_object").innerHTML = value_from_input_box + " not found :(";
            }
        }
    }

}