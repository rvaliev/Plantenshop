//===============GLOBALS======================================
//array van functies
var aFuncties	= [
    "instructeur",
    "bediende",
    "manager",
    "arbeider"
];
//array van personen, elke persoon is een object
var aoPersoneel = [
    {
        id:4678,
        naam:"Roger Mary",
        functie:"instructeur",
        leeftijd: 65,
        sexe:"m",
        gehuwd:true,
        kinderen:[
            {
                naam:"Liesbeth",
                leeftijd: 26,
                sexe:"v"
            }
        ],
        vrienden:24
    },
    {
        naam:"Evelyn Van Welsenaers",
        leeftijd: 44,
        sexe:"v",
        gehuwd:true,
        kinderen:[
            {
                naam:"Patrick",
                leeftijd: 12,
                sexe:"m"
            },
            {
                naam:"Jonas",
                leeftijd: 14,
                sexe:"m"
            }
        ],
        functie:"bediende",
        id:1025,
        vrienden:11
    },
    {
        leeftijd: 27,
        sexe:"v",
        gehuwd:false,
        id:9007,
        functie:"arbeider",
        naam:"Heidi Vercouteren",
        vrienden:6
    }
];

window.onload = function(){

    //=======DOM REFERENTIES=======================================

    //knoppen
        var eToevoegen 		= document.getElementById('toevoegen');
        var ePersoneelsLijst= document.getElementById('personeelsLijst');
    //invulvelden, keuzelijsten, etc...
        var eNaam 			= document.getElementById('naam');
        var eFunctie 		= document.getElementById('functie');
        var eSexe 			= document.frmPersoneelslid.sexe;       // check all fields with the name="sexe"
        var eLeeftijd 		= document.getElementById('leeftijd');
        var eGehuwd 		= document.getElementById('gehuwd');
        var eKind1			= document.getElementById('kind1');
        var eKind2			= document.getElementById('kind2');
        var eKind3			= document.getElementById('kind3');
    //andere
        var eOutput			= document.getElementById('output');
        var eTeller			= document.getElementById('teller');

    //=======KEUZELIJST OPVULLEN ===================================


    aFuncties.unshift("Kies een functie");                      // Put default element on top of array
    var nFuncties = aFuncties.length;
    // create 'option' tags with the content; default option has value = 0
    for (var i = 0; i < nFuncties; i++) {
        var eOption = document.createElement('option');
        var sOption = document.createTextNode(aFuncties[i]);
        //eOption.innerHTML = aFuncties[i];                     // don't use innerHTML because it can not be working in IE
        eOption.appendChild(sOption);
        eOption.setAttribute('value', i);
        eFunctie.appendChild(eOption);
    }




    //========================== EVENT HANDLERS ===========================//

    // personeel tonen
    ePersoneelsLijst.addEventListener('click', function () {
        eOutput.innerHTML = fnToonPersoneel(aoPersoneel);
        // it's important that fnRegLikeKnoppen() is placed after the fnToonPersoneel, because buttons are made in fnToonPersoneel
        fnRegLikeKnoppen();
    });


    // personeel toevoegen
    eToevoegen.addEventListener('click', function () {
        var sNaam       = eNaam.value;
        var nLeeftijd   = eLeeftijd.value;
        var sKind1      = eKind1.value;
        var sKind2      = eKind2.value;
        var sKind3      = eKind3.value;
        var bGehuwd     = eGehuwd.value;
        var sFunctie    = eFunctie.value;

        // this is the way the checkboxes are handled
        var sSexe       = undefined;

        // because there are 2 possible variants (man or vrouw), we need to loop throug all of them and determine which one is selected
        for (var j = 0; j < eSexe.length; j++) {
            // check checkbox via 'checked' property
            if (eSexe[j].checked == true){
                sSexe = eSexe[j].value;         // output is like "m" or "v"
            }
        }
        
        // simple data validation
        if (sNaam == "" || isNaN(nLeeftijd) || typeof(sSexe) === "undefined" || sFunctie == ""){
            console.log("BAD");
            alert('1 van de verplichte velden is niet ingevuld');
        }
        else{
            fnPersoneelslidToeveogen(sNaam, nLeeftijd, bGehuwd, sFunctie, sSexe, [sKind1, sKind2, sKind3]);     // children are sended as an array
            document.frmPersoneelslid.reset();      // reset the whole form, so that new person can be added
            eNaam.focus();                          // put cursor in eNaam input field
        }
    }); // end personeel toevoegen

    
    
    
};

// Show workers
function fnToonPersoneel(aoData){
    var sLijst = "";
    if (aoData.length > 0){
        // overloop array van objecten
        for (var i = 0; i < aoData.length; i++) {

            var oPersoon = aoData[i];
            sLijst += "<div class='persoon'" +
                                " id='pers_" + oPersoon.id + "'" +
                                " title='personeelsnummer: " + oPersoon.id + "'" +
                                " data-vrienden='" + oPersoon.vrienden + "'" +
                                "'>";

            for(var key in oPersoon){
                // 'id' and 'vrienden' should not be visible to the user
                if (key != 'id' && key != 'vrienden'){
                    if (Array.isArray(oPersoon[key])){
                        sLijst += "<span class='prop'>" + key + "</span><span class='val'>" + fnToonPersoneel(oPersoon[key]) + "</span>";
                    }
                    else{
                        sLijst += "<span class='prop'>" + key + ":</span><span class='val'>" + oPersoon[key] + "</span>";

                    }
                }


            }
            if (typeof oPersoon.vrienden !== "undefined"){
                sLijst += "<button class='like' title='Voeg een vriendje toe'>Like</button>";
            }
            sLijst += "</div>";
        }


    }
    return sLijst;
} // end fnToonPersoneel



// add new person
function fnPersoneelslidToeveogen(naam, leeftijd, gehuwd, functie, sexe, aKindnamen){
    var persoon         = new Object();     // creating new object 'persoon'
    persoon.naam        = naam;             // creating property 'naam' within object 'persoon'
    persoon.leeftijd    = leeftijd;
    persoon.functie     = functie;
    persoon.gehuwd      = gehuwd;
    persoon.sexe        = sexe;
    persoon.vrienden    = 0;
    persoon.id          = parseInt((Math.random() * 10000) + 1);  // assign random number to person's id

    /**
     * because children are optional, so it means that we can have this line be empty.
     * But in the next step we will count array elements, we need to have at least an empty array []
     * So, if eKindNamen isn't empty, we assign this to new array
     */
    var aKindNamen      = aKindnamen || [];
    var aantalKinderen  = aKindNamen.length;

    if (aantalKinderen > 0){                    // if aKindnamen isn't empty add proprty 'kinderen' to object 'persoon'
        persoon.kinderen    = [];

        for (var i = 0; i < aantalKinderen; i++) {
            if (aKindNamen[i] != ""){                   // if aKindNamen[i] isn't empty,
                var kind            = new Object();     // create new object
                kind.naam           = aKindNamen[i];    // with the child name
                persoon.kinderen.push(kind);            // insert that last created 'kind' object into persoon.kinderen
            }
        }
    }
    aoPersoneel.push(persoon);                          // insert new created person into 'aoPersoneel'

    fnUpdateTeller(1);                                  // update wordkers' counter info

} // fnPersoneelslidToeveogen



// update counter
function fnUpdateTeller(n){
    var eTeller         = document.getElementById('teller');
    var nTeller         = parseInt(eTeller.innerHTML);          // get last sign and make it number
    nTeller             = nTeller + n;
    eTeller.innerHTML   = nTeller;
} // end fnUpdateTeller


/**
 * Event registration for the 'like' buttons.
 * Can in JS only after a 'button' was made
 */
function fnRegLikeKnoppen(){
    var eLikes          = document.querySelectorAll('.like');
    for (var i = 0; i < eLikes.length; i++) {

        /**
         * create eventlistener for every button
         */
        eLikes[i].addEventListener('click', function(){
            var ePersoon    = this.parentNode;          // select the parent node of this button, which is <div class="person"...
            var nVriendjes  = parseInt(ePersoon.dataset['vrienden']) + 1;  // with dataset['vrienden'] we can read 'data-vrienden' attrbute,
            ePersoon.dataset['vrienden'] = nVriendjes;
            alert("Deze persoon heeft er een vriendje bij: " + nVriendjes);
        });
    }
} // end fnRegLikeKnoppen










