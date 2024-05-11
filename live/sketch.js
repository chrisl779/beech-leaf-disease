// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using tensorflow trained model and p5.js
This example uses a callback pattern to create the classifier
=== */

// Initialize the Image Classifier
let classifier;

// A variable to hold the image we want to classify
let img;
let label = null;
let confidence = null;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/6QuFNXgfYP/";

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  console.log("model loaded.");
}

function setup() {
  createCanvas(1240, 720);
  
  input = createFileInput(handleImage); //create the file chooser, calls "handleImage" on it
  input.position(10, 480); //puts it here
}

function draw() {
  background(80, 200, 130); // fill background with rgb color (200,200,200)

  
  
  fill(50); // set color with rgb color (50, 50, 50)
  rect(5, 50, 400, 400); //  draw rectangle ( x, y, width, height)
  showResult();
}

function showResult() {
  if (img != null) {
    image(img, 10, 50, 400, 400); //image() is a function, img is the variable
    }
  
  if (label != null && confidence != null) {
    textSize(20);
    fill(255); // white
    stroke(0); // black
    strokeWeight(5);
    textSize(20);
    
    text( label, 10, 535); // !!!
    
    fill(0);
    noStroke();
    text("Confidence: " + confidence, 10, 565);
  }
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);

  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2);
}

// A function to handle a file that uploaded from file-chooser
function handleImage(file) {
  if (file.type === "image") {
    img = createImg(file.data, "");
    img.hide();
    classifier.classify(img, gotResult);  // Prediction is made here
    label ="Analyzing .... " ;
    confidence = '...' ;
  } else {
    img = null;
  }
}