//	Color picker
// 	author: Jean-Pierre Sierens
//	-----------------------------------------------------------------------------------

var context = document.getElementById('painter').getContext("2d");
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var curColor = "#000";
//	this array holds all the dot's colors
var clickColor = new Array();
// sizes
var curSize = 'normal';
//	this array holds all the dot's sizes
var clickSize = new Array();

/**
*	Each dot has 5 parameters, x pos, y pos, boolean to see if its dragging,
* the color it had at that moment and the size at that moment.
*/
function addDot(x, y, dragging){
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
  clickSize.push(curSize);
}

/**
*	 canvas is cleared and everything is redrawn.
*/
function redraw(){
  // Clears the canvas
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); 
 
  context.lineJoin = "round";
	
  //	Loop through all the dots and draw then according to their 
  //	parameters
  for(var i=0; i < clickX.length; i++) {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.strokeStyle = clickColor[i];
     context.lineWidth = clickSize[i];
     context.stroke();
  }
}

/*
* EVENTS
*/

$('#painter').mousedown(function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
		
  paint = true;
  addDot(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#painter').mousemove(function(e){
  if(paint){
    addDot(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

// Mouse Up Event: Marker is off the paper; paint boolean will remember!
$('#painter').mouseup(function(e){
  paint = false;
});

// Mouse Leave Event: If the marker goes off the paper
$('#painter').mouseleave(function(e){
  paint = false;
});

//	user picks a color
$('.picker').on('click', function(e){
	curColor = $(this).css('background-color');
});

//	user clears data
$('#btnClear').on('click', function(e){
  clickX = new Array();
	clickY = new Array();
	clickDrag = new Array();
	clickColor = new Array();
	clickSize = new Array();
  // Clears the canvas
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); 
})

//  save data
$('#btnSave').on('click', function(e){
  var canvas = document.getElementById('painter');
  var data = canvas.toDataURL();
  window.open(data);
});