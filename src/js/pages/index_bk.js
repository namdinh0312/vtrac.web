/**
 * Created by namdv on 10/06/2016.
 */
/**
 * Created by pc-namdinh on 01/06/2016.
 */
/*jshint esversion: 6 */
import Son from "../lib/son";
let son = new Son("AA", 20);
son.consoleLogName();

//import Test from "../lib/test";
//let test = new Test();
//test.getName();

//let son2 = new Son("BB", 20);
//son2.consoleLogName();

//
//import MyDom from "./lib/myDom";
//let myDom = new MyDom();
//console.log(myDom.clientWidth);


import AjaxHelper from "../lib/vtracAjaxHelper";
let ajaxHelper = new AjaxHelper();
//ajaxHelper.afunction();
var pGetClientDetail = ajaxHelper.getPromise('http://ip-api.com/json');
pGetClientDetail.then(function fulfilled(contents) {
        var obj = JSON.parse(contents.responseText);
        console.log(obj);
    },
    function rejected(reason) {
        console.log(readson);
    });