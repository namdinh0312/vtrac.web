/**
 * Created by namdv on 09/06/2016.
 */
var blazy = new Blazy({
    selector:'.b-lazy', // all images
//        breakpoints: [{
//            width: 420 // max-width
//            , src: 'data-src-small'
//        }
//        , {
//            width: 768 // max-width
//            , src: 'data-src-medium'
//        }],
//    container: '.container',
    success: function(ele){
        // Image has loaded
        // Do your business here
        console.log('Element loaded: ', ele.nodeName);
        setTimeout(function(){
            // We want to remove the loader gif now.
            // First we find the parent container
            // then we remove the "loading" class which holds the loader image
            var parent = ele.parentNode;
            parent.className = parent.className.replace(/\bloading\b/,'');
        }, 5000);
    }
    ,error: function(ele, msg){
        if(msg === 'missing'){
            console.log('missing: ', ele.nodeName);
        }
        else if(msg === 'invalid'){
            console.log('invalid: ', ele.nodeName);
        }
    }
});