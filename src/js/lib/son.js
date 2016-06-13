/**
 * Created by pc-namdinh on 01/06/2016.
 */
/*jshint esversion: 6 */
import Person from "./person";
export default class Son extends Person{
    constructor (name, age){
        super(name,age);
        this.son = true;
    }
    consoleLogName(){
        console.log(this.getName());
    }
}