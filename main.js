song = "";

function preLoad() {
    song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('poseNet is intialized');
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keyPoints[10].score;
        scoreLeftWrist = results[0].pose.keyPoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
        rightWristX = results[0].pose.rightWrist.X;
        rightWristY = results[0].pose.rightWrist.Y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.X;
        leftWristY = results[0].pose.leftWrist.Y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

}

if(scoreLeftWrist > .2)
{
    circle(leftWristX,leftWristY,20);
    InNumberLeftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberLeftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
} 

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
