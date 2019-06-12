function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function init(){
    let i = document.getElementById("counter").value;
    while (i >= 0){
        if (i >= 0){
            console.log(i);
            let spans = document.getElementsByTagName("span");
            for (let j = 0; j < spans.length; j++){
                let new_content = document.createTextNode(i);
                spans[j].replaceChild(new_content, spans[j].childNodes[1]);
            }
            await sleep(1000);
            i--;
        }

        if (i == 0)
            document.getElementById("counter").value = "0";
    }
}

function print_spans(){
    for (let i = 0; i < 100; i++){
        let element = document.createElement("span");
        let content = document.createTextNode('0');
        let br = document.createElement("br");
        element.appendChild(br);
        element.appendChild(content);
        let first_span = document.getElementById("first_span");
        document.body.insertBefore(element, first_span);
    }
    console.log(0);
}