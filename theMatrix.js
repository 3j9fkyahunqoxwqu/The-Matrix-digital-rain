/*
 * Code inspired from http://www.arungudelli.com/2013/09/matrix-effect-using-html5-and-javascript.html
 *
 * by Andrew Golightly (support@andrewgolightly.com)
 */


"use strict";

var theMatrixCanvas = document.getElementById("theMatrixCanvas");
var matrixContext = theMatrixCanvas.getContext("2d");
var yCoordinates;
var timeoutID;
var xIncrement = 20;

function initMatrix() {
    window.addEventListener('resize', resizeMatrixCanvas, false);
    resizeMatrixCanvas();
    
    //make sure the background is completely black at the start
    /*
    matrixContext.fillStyle = "black";
    matrixContext.fillRect(0, 0, theMatrixCanvas.width, theMatrixCanvas.height);
    */
}

function resizeMatrixCanvas() {

    theMatrixCanvas.width = window.innerWidth;
    theMatrixCanvas.height = window.innerHeight;
    
    console.log("The canvas's new width is " + theMatrixCanvas.width);
    console.log("Number of characters is: " + Math.floor(theMatrixCanvas.width / xIncrement));
    
    yCoordinates = new Array(Math.floor(theMatrixCanvas.width / xIncrement)).join(0).split('');
    
    // if we're about to re-start The Matrix, clear the previous timer
    if (timeoutID) {
        clearTimeout(timeoutID);
    }
    
    startTheMatrix();
}

function startTheMatrix() {
 
    matrixContext.fillStyle = "rgba(0,0,0,0.5)";
    matrixContext.fillRect(0, 0, theMatrixCanvas.width, theMatrixCanvas.height);
    matrixContext.font = "30px sans-serif";
    matrixContext.fillStyle = "#0f0";

    yCoordinates.map(function (y, index) {
        var x = (index * xIncrement) + xIncrement;
        matrixContext.fillText(String.fromCharCode(0x30A0 + Math.random() * (0x30FF - 0x30A0 + 1)), x, y);
        if (y > theMatrixCanvas.height + Math.random()*1000) {
            yCoordinates[index] = 0;
        } else {
            yCoordinates[index] = y + 10;
        }
    });
    
    timeoutID = setTimeout(function () {
        requestAnimationFrame(startTheMatrix);
    }, 1000 / 8);
}