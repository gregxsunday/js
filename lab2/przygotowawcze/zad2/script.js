"use strict";
var expect = chai.expect;

function cyfry(napis){
    var digits =  napis.replace(/[^0-9]/g, "");
    var res = 0;
    for (var digit of digits){
        res += parseInt(digit);
    }
    return res;
}

function litery(napis){
    return napis.replace(/[^a-zA-Z]/g, "").length;
}

function number(napis) {
    var n = parseInt(napis);
    return isNaN(n) ? 0 : n;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main(){
    var user_input = window.prompt("Podaj napis");
    var sum = 0;
    while (user_input != null){
        var c = cyfry(user_input);
        var l = litery(user_input);
        var s = sum + number(user_input);
        sum = s;
        document.write("\t" + c + "\t" + l + '\t' + s + "<br>");
        await sleep(500);
        var user_input = window.prompt("Podaj napis");
    }
}

describe('The cyfry() function', function () {
    it ('Returns 6 for 123', function () {
        expect(cyfry("123")).to.equal(6);
    })
    it ('Returns 0 for aaa', function () {
        expect(cyfry("aaa")).to.equal(0);
    })
    it ('Returns 3 for 12aa', function () {
        expect(cyfry("12aa")).to.equal(3);
    })
    it ('Returns 0 for aa12', function () {
        expect(cyfry("aa12")).to.equal(3);
    })
    it ('Returns 0 for empty string', function () {
        expect(cyfry("")).to.equal(0);
    })
})

describe('The litery() function', function () {
    it ('Returns 0 for 111', function () {
        expect(litery("111")).to.equal(0);
    })
    it ('Returns 3 for aaa', function () {
        expect(litery("aaa")).to.equal(3);
    })
    it ('Returns 2 for 11aa', function () {
        expect(litery("11aa")).to.equal(2);
    })
    it ('Returns 2 for aa11', function () {
        expect(litery("aa11")).to.equal(2);
    })
    it ('Returns 0 for empty string', function () {
        expect(litery("")).to.equal(0);
    })
})

describe('The number() function', function () {
    it ('Returns 111 for 111', function () {
        expect(number("111")).to.equal(111);
    })
    it ('Returns 0 for aaa', function () {
        expect(number("aaa")).to.equal(0);
    })
    it ('Returns 11 for 11aa', function () {
        expect(number("11aa")).to.equal(11);
    })
    it ('Returns 0 for aa11', function () {
        expect(number("aa11")).to.equal(0);
    })
    it ('Returns 0 for empty string', function () {
        expect(number("")).to.equal(0);
    })
})