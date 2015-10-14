/**
 * Versie 2
 */

var versie = " versie 3.0";


window.onload = function(){
    // hiding noscript message
    var eNoScript = document.getElementById('noscript');
    eNoScript.style.display = "none";

    // object detection
    if(typeof aModernArt == "undefined"){                     // if there is no aModernArt array, throw new error
        throw new Error("array aModernArt niet gevonden");    // error will be shown in console
    }
    else{
        console.log(aModernArt);
    }
    // version information
    var eKop = document.querySelector('h1');
    eKop.innerHTML = eKop.innerHTML + versie;

    var eImg        = document.getElementById('plaatshouder');
    // dynamic dropdown list
    var eKeuzeLijst     = maakKeuzeLijst(aModernArt);
    var eSideBar        = document.querySelector('aside');
    eSideBar.appendChild(eKeuzeLijst);

    // changes in dropdown list
    eKeuzeLijst.addEventListener('change', function(e){
        e.preventDefault();
        var waarde = this.value;
        console.log(waarde);
        if(waarde != "" && waarde != null){ // if option is not a default, then show the new picture
            toonFoto(waarde, eImg);
        }
    });


};


// create authors list form an array of authors
function maakKeuzeLijst(a){
    var nArt            = a.length;                             // length of an array
    var eSelect         = document.createElement('select');     // select 'select' element
    eSelect.id          = "keuzelijst";                         // assign to 'select' an id of 'keuzelijst'

    // default option element
    var eOption         = document.createElement('option');     // create 'option'
    eOption.innerHTML   = "Maak een keuze";                     // put text into option
    eOption.setAttribute("value", "");                          // set value of default option to ""
    eSelect.appendChild(eOption);                               // put just created default 'option' with its content into 'select'

    // another option elements with the artists
    for(var i = 0; i < nArt; i++){
        eOption             = document.createElement('option'); // create 'option'
        eOption.innerHTML   = a[i][2];                          // put in just created option an artist name from 'a' array
        eOption.value       = i;                                // set value of this option to i
        eSelect.appendChild(eOption);                           // put created option as a child into 'select' element
    }

    return eSelect;                                             // return the whole list of options with authors an option values
}




// show new picture
function toonFoto(nIndex, eImg){
    var aArt    = aModernArt[nIndex];                           //
    var sPad    = aArt[0];
    var sInfo   = aArt[1];
    var sNaam   = aArt[2];

    eImg.src    = "./../art/" + sPad;
    var eInfo   = document.getElementById('info');


    // Changes the src attribute of img#beeld
    if(eInfo){
        // if eInfo already exists, change its whole inner content to sInfo
        eInfo.innerHTML = sInfo;
    }
    else{
        // if eInfo doesn't exists (actually in the first time)
        eInfo            = document.createElement('p');         // create new element 'p' where the image description will be stored
        eInfo.id         = "info";                              // set id of 'p' element to info
        eInfo.innerHTML  = sInfo;                               // fill <p id="info"> with title taken from hyperlink
        //eImg.parentNode.appendChild(eInfo);                   // select parent of eImg, and then put new 'p' tag in
        eImg.parentNode.insertBefore(eInfo, eImg.parentNode.firstChild); // select parent node (#kader), then insert before first child (img) of this parent another child (p)

    }
}



