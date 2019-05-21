var canvas = document.getElementById('jsCanvas');
var ctx = canvas.getContext('2d');
var colors = document.getElementsByClassName('controls_color');
var range = document.getElementById('jsRange');
var mode = document.getElementById('jsMode');
var saveBtn = document.getElementById('jsSave');

//default value setting
ctx.strokeStyle = 'black'; 
ctx.lineWidth = 2.5;

//if I didn't set this default color, the backgroundColor will be transparent when I save the image
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var painting = false;
var filling = false;


function handleSaveClick(){
    var image = canvas.toDataURL();
    //default값은 png인데, jpeg 으로 확장자는 바꿀 수 있음.
    //var image = canvas.toDataURL('image/jpeg');
    //console.log(image);

    var link = document.createElement('a');
    //<a> 태그에 들어가는 herf와 download라는 attribute를 만듬.
    link.href = image;
    link.download = 'paintJS[EXPORT]';
    link.click();
}
function handleCanvasClick(){
    if(filling){ //**중요! 유효성 체크 (매번 놓치는 부분!)
        ctx.fillRect(0,0,canvas.width,canvas.height);

         //handleColorClick을 통해서 클릭없이 자동으로 칠해지는 설정
        //canvas.style.background = color;
    }  
}
function handleCM(event){
    //when you right click, the drop down bar which is context menu will be opened.
    event.preventDefault();
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
    //These properties provide the X and Y coordinates of the mouse pointer relative to the top-left corner of the document. (.clientX, .offsetX, and .pageX are available)

    //if(boolean == false)은 if(!boolean)와 같다.
    if(!painting){
        ctx.beginPath();//선그리기 선언
        ctx.moveTo(x,y);//시작좌표 선언
    }else{
        ctx.lineTo(x,y);//끝나는 좌표 선언
        ctx.stroke();//canvas위에 line 그리기
    }
    //Begin a path, move to position 0,0. Create a line to position 300,150:
    /*
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 150);
    ctx.stroke();
    */
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
//Array.from은 object를 array로 만든다.
Array.from(colors).forEach(function(a){
    a.addEventListener('click',handleColorClick);
});

//range라는 변수가 undefine인지 아닌지 check하는 방법이다.
if(range){
    range.addEventListener('input',handleRangeChange);
}
if(mode){
    mode.addEventListener('click',handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener('click',handleSaveClick);
}