var interval_id = [];

function main(){
    let dx = Math.floor(Math.random() * 100);
    let dy = Math.floor(Math.random() * 100);
    console.log("dx: " + dx + " dy: " + dy)
    let elements = document.getElementsByTagName("*");
    for (let i = 0; i < elements.length; i++){
        if (elements[i].tagName !== "HTML" && elements[i].tagName !== "BODY") {
            interval_id.push(-1);
            elements[i].addEventListener("dblclick", function() {animation(elements[i], i, dx, dy)});
            elements[i].addEventListener("click", function() {move(elements[i], dx, dy)});
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function move(elem, dx, dy){
    await sleep(200);
    let compStyles = window.getComputedStyle(elem, null);
    x = compStyles.getPropertyValue("left");
    x = x.substring(0, x.length - 2);
    y = compStyles.getPropertyValue("top");
    y = y.substring(0, y.length - 2);
    let x_int = parseInt(x, 10);
    let y_int = parseInt(y, 10);
    if (isNaN(x_int))
        x_int = 0;
    if (isNaN(y_int))
        y_int = 0;
    x_int += dx;
    y_int += dy;
    elem.style.left = x_int + "px";
    elem.style.top = y_int + "px";
}

function animation(elem, i, dx, dy){
    console.log("dbclick");
    if (interval_id[i] === -1)
        interval_id[i] = setInterval(function() {move(elem, dx, dy);}, 1000);
    else
        clearInterval(interval_id[i]);
}