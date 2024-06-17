let display=document.getElementById('screen');

const del=()=>{
    display.value='';
}
const show=(n)=>{
    display.value+=n;
}
function calculate() {
    display.value = eval(display.value);
}