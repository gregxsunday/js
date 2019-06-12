var cnt = 0;
var sought_word = "";
var n = 0;


function get_word(){
    var word = window.prompt("Podaj wyraz");
    return word;
}

function get_n(){
    var n = window.prompt("Podaj N");
    return n;
}

function count_n_len_words(line, n){
    let counter = 0;
    for (var word of line.split(" ")){
        if (word.length == n){
            counter += 1;
        }
    }
    return counter;
}

function is_word_in_line(line, sought_word){
    for (var word of line.split(" ")){
        if (word === sought_word){
            return true;
        }
    }
    return false;
}

function stringify_set(set){
    var lines_string = "";
    for (var l of set.values()){
        lines_string += l + ", ";
    }
    lines_string = lines_string.substring(0, lines_string.length - 2);
    return lines_string;
}


function show_prompts(){
    if (sought_word == ""){
        sought_word = get_word();
    }
    if (n == 0){
        n = get_n();
    }
    var text = document.getElementById("user_input").value;
    var counter = 0;
    var lines = text.split("\n");
    var i;
    let lines_with_word = new Set();
    for (i = 0; i < lines.length; i++){
        counter += count_n_len_words(lines[i], n);
        if (is_word_in_line(lines[i], sought_word)){
            lines_with_word.add(i);
        }
    }

    var lines_string = stringify_set(lines_with_word);
    cnt += counter;
    document.getElementById("counter").innerHTML = cnt;
    document.getElementById("lines").innerHTML = lines_string;
}

var expect = chai.expect;

describe('The count_n_len_words() function', function () {
    it ('Returns 3 for len 3 in  aaa aaa bc aaa', function () {
        expect(count_n_len_words("aaa aaa bc aaa", 3)).to.equal(3);
    })
    it ('Returns 0 for empty string', function () {
        expect(count_n_len_words("", 3)).to.equal(0);
    })
    it ('Returns 2 for 2 in aa bbb ccc dd', function () {
        expect(count_n_len_words("aa bbb ccc dd", 2)).to.equal(2);
    })
});

describe('The count_n_len_words() function', function () {
    it ('Returns 3 for aaa aaa bc aaa', function () {
        expect(count_n_len_words("aaa aaa bc aaa", 3)).to.equal(3);
    })
});

describe('The count_n_len_words() function', function () {
    it ('Returns true for aaa in aaa aaa bc aaa', function () {
        expect(is_word_in_line("aaa aaa bc aaa", "aaa")).to.equal(true);
    })

    it ('Returns false for aaaa in aaa aaa bc aaa', function () {
        expect(is_word_in_line("aaa aaa bc aaa", "aaaa")).to.equal(false);
    })
});