/**
 * Created by pc-namdinh on 10/06/2016.
 */

class MyDomHelper{
    getElementSize(strSelector){
        if(strSelector) {
            let ele = document.querySelector(strSelector)[0];
            return [ele.clientWidth,ele.clientHeight];
        }
        else
        {
            return [document.documentElement.clientWidth,document.documentElement.clientHeight];
        }

    }
    geWindowSize(){
        return [window.innerWidth];

    }

    getBrowser: {}

    constructor(){

    }
}
export default MyDom