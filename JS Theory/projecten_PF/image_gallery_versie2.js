/**
 * Versie 2
 */

var versie = " versie 2.0";

window.onload = function(){
    // version information
    var eKop = document.querySelector('h1');
    eKop.innerHTML = eKop.innerHTML + versie;

    
    var eImg        = document.getElementById('plaatshouder');

    //var eSidebar    = document.querySelector('aside');        // selects aside
    //var eLinks      = eSidebar.getElementsByTagName('a');     // getting all hyperlinks from aside
    var eLinks      = document.querySelectorAll('aside a');     // replaces the 2 lines above

    for(var i = 0; i < eLinks.length; i++){
        // click
        eLinks[i].addEventListener('click', function(e){         // setting up click event on every link
            e.preventDefault();
            toonFoto(this, eImg);
        });

        // mouseover
        eLinks[i].addEventListener('mouseover', function(e){
            e.preventDefault();
            toonFoto(this, eImg);
        });
    }
};


function toonFoto(eLink, eImg){
    // Changes the src attribute of img#beeld

    eImg.src         = eLink.href;                      // sets src of 'plaatshouder' to href
    var sInfo        = eLink.getAttribute('title');     // take title from hyperlink
    var eInfo        = document.getElementById('info');

    if(eInfo){
        // if eInfo already exists, change its whole inner content to sInfo
        eInfo.innerHTML = sInfo;
    }
    else{
        // if eInfo doesn't exists (actually in the first time)
        eInfo            = document.createElement('p');     // create new element 'p' where the image description will be stored
        eInfo.id         = "info";                          // set id of 'p' element to info
        eInfo.innerHTML  = sInfo;                           // fill <p id="info"> with title taken from hyperlink
        //eImg.parentNode.appendChild(eInfo);                 // select parent of eImg, and then put new 'p' tag in
        eImg.parentNode.insertBefore(eInfo, eImg.parentNode.firstChild); // select parent node (#kader), then insert before first child (img) of this parent another child (p)

    }
}

