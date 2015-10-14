var aLangages = [
    // 0 = eng
    [
        ['Close image', 'Open image'],
        ['Close all images', 'Open all images']
    ],

    // 1 = ned
    [
        ['Sluit foto', 'Open foto'],
        ['Sluit alle foto\'s', 'Open alle foto\'s']
    ],

    // 2 = rus
    [
        ['Закрыть фото', 'Открыть фото'],
        ['Закрыть все', 'Открыть все']
    ]
];

var nLang = 2;                          // language: 0 = eng, 1 = ned
var aLangage = aLangages[nLang];        // array with choosen language

window.onload = function(){

    var eDd  = document.getElementsByTagName('dd');
    var nDd  = eDd.length;                           // get length of all 'dd' elements

    for(var i = 0; i < nDd; i++){                    // loop through all 'dd' elements
        var eBtn = document.createElement('input');  // create button
        eBtn.setAttribute('type', 'submit');         // set type to 'submit'
        eBtn.setAttribute('value', aLangage[0][1]);  // set value to 'Open'
        eDd[i].appendChild(eBtn);                    // put button into 'dd' element as a child

        eDd[i].querySelector('input').addEventListener('click', function(e){   // within 'dd' element select 'button' and add to it an eventListener
            e.preventDefault();
            var eDdThis = this.parentNode;           // custom made 'this' (for 'dd') variable for the parent of 'input' node
            toggleBlock(eDdThis, this);              // send 2 variables to the function
        });
    } // end for


    var eMasterBtn = document.getElementById('hoofdknop');
    eMasterBtn.setAttribute('value', 'closed');                     // set value of the master button to 'closed'
    eMasterBtn.textContent = aLangage[1][1];                        // Change text content of master button
    eMasterBtn.addEventListener('click', function(e){               // add eventListener
        e.preventDefault();
        var eAllBtn    = document.getElementsByTagName('input');    // get ALL buttons
        toggleAll(this, this.getAttribute('value'), eAllBtn);       // send 2 varibles to the function; 2nd is the current value of the button
    });


    // toggle 1 block
    function toggleBlock(eDdThis, btnThis){
        if (eDdThis.querySelector('.toggle').style.display == 'block'){
            eDdThis.querySelector('.toggle').style.display = 'none';        // hide block
            btnThis.setAttribute('value', aLangage[0][1]);                  // change name of the buttons to 'Open'
        }
        else{
            eDdThis.querySelector('.toggle').style.display = 'block';       // show block
            btnThis.setAttribute('value', aLangage[0][0]);                         // change name of the buttons to 'Close'
        }
    } // end toggleBlock



    // toggle ALL blocks
    function toggleAll(masterBtnThis, masterBtnValue, eAllBtn){
        var eToggleClass = document.getElementsByClassName('toggle'); // select all elements with class 'toggle'
        var nMasterLength = eToggleClass.length;

        if (masterBtnValue == 'closed'){
            for (var i = 0; i < nMasterLength; i++) {           // loop through all elements with class 'toggle'
                eToggleClass[i].style.display = 'block';        // show block
                masterBtnThis.setAttribute('value', 'open');    // change VALUE of master button to 'open'
                masterBtnThis.textContent = aLangage[1][0];        // change NAME of master button to 'Close all'
                eAllBtn[i].setAttribute('value', aLangage[0][0]);      // change name of all buttons to 'Close'
            }
        }
        else{
            for (var j = 0; j < nMasterLength; j++) {
                eToggleClass[j].style.display = 'none';         // hide block
                masterBtnThis.setAttribute('value', 'closed');  // change VALUE of master button to 'closed'
                masterBtnThis.textContent = aLangage[1][1];         // change NAME of master button to 'Open all'
                eAllBtn[j].setAttribute('value', aLangage[0][1]);       // change name of all buttons to 'Open'
            }

        }
    } // end toggleAll










};