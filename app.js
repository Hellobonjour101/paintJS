var canvas = document.getElementById('jsCanvas');
var ctx = canvas.getContext('2d');
var colors = document.getElementsByClassName('controls_color');
var range = document.getElementById('jsRange');
var mode = document.getElementById('jsMode');
var saveBtn = document.getElementById('jsSave');

//default value setting
ctx.strokeStyle = 'black'; 
ctx.lineWidth = 2.5;
ctx.fillStyle = 'white';

var painting = false;
var filling = false;


function handleSaveClick(){
    var image = canvas.toDataURL();
    var link = document.createElement('a');
    link.href = image;
    link.download = 'paintJS[EXPORT]';
    link.click();
}
function handleCanvasClick(){
    if(filling){ //**중요! 유효성 체크 (매번 놓치는 부분!)
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }  
}
function handleModeClick(){
    if(filling){
        filling = false;
        mode.innerText = 'paint mode';
        //아래 코드는 사용 할수 없음.
        //canvas.addEventListener('click',handleCanvasClick);
    }else{
        //filling === false && paint mode라면 && 클릭과 동시에 보이는 요소
        filling = true;
        mode.innerText = 'fill mode';
    }
}
function handleRangeChange(event){
    //console.log(event);
    var value = event.target.value;
    ctx.lineWidth = value;
}
function handleColorClick(event){
    //console.log(event);
    var color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}
function onMouseMove(event){
    var x = event.offsetX;
    var y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}


if(canvas){
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mousedown',startPainting);
    canvas.addEventListener('mouseup',stopPainting);
    canvas.addEventListener('mouseleave',stopPainting);
    //맨 첫 화면에서 바로 배경색을 넣고자 클릭했을 경우.
    canvas.addEventListener('click',handleCanvasClick);
}

//console.log(colors);
//console.log(Array.from(colors));
Array.from(colors).forEach(function(a){
    a.addEventListener('click',handleColorClick);
});

if(range){
    range.addEventListener('input',handleRangeChange);
}
if(mode){
    mode.addEventListener('click',handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener('click',handleSaveClick);
}