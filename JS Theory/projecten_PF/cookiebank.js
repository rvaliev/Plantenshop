window.onload = function () {
    // DOM elements
    var eOutput         = document.getElementById('output');
    var eKnopKrediet    = document.getElementById('krediet');
    var eKnopDebiet     = document.getElementById('debiet');

    // standard values
    var sMsg            = '';  // message for the user
    var sNaam           = 'niuwe klant'; // standard name
    var nSaldo          = 0; // standard saldo





    // known visitor
    if (getCookie('klantnaam')){
        sNaam  = getCookie('klantnaam');
        nSaldo = parseFloat(getCookie('saldo')).toFixed(2);            // set 10 to 10.00

        sMsg      += "Welkom " + sNaam + ",";
        sMsg      += " uw saldo bedraagt " + nSaldo + " Euro";

        // button
        var eKnop   = maakKnop('Sluit rekening');
        eKnop.addEventListener('click', rekeningSluiten);
    }
    else{
        // first visit
        sMsg      += "Welkom beste bezoeker, ";
        sMsg      += "Als u bij ons een nieuwe rekening opent, ontvangt u een startsaldo van 100 Euro!";

        // button
        var eKnop   = maakKnop('Open rekening');
        eKnop.addEventListener('click', rekeningOpenen);
    }

    // genereic DOM elements
    var dfBericht   = document.createDocumentFragment(); // disappears when added to DOM tree, while its children will be added
    var eN1         = document.createElement('br');

    // filling createDocumentFragment in
    var tNode       = document.createTextNode(sMsg);
    dfBericht.appendChild(tNode);
    dfBericht.appendChild(eN1.cloneNode(false)); // you need to use cloneNode to use eN1 more than once
    dfBericht.appendChild(eN1.cloneNode(false));
    dfBericht.appendChild(eKnop);

    eOutput.appendChild(dfBericht);


    /**
     * Event handler for +- buttons
     */
    eKnopKrediet.addEventListener('click', function () {
        berekenen('+');  // adding money
    });
    eKnopDebiet.addEventListener('click', function () {
       berekenen('-');   // subtracting money
    });





}; // END window.onload






/************************************** Functions ****************************************/

/**
 * Creating button
 * @param tekst
 * @returns {Element}
 */
function maakKnop(tekst){
    var eKnop       = document.createElement('button');
    var sTekst      = document.createTextNode(tekst);
    eKnop.appendChild(sTekst);
    eKnop.setAttribute('type', 'button');
    return eKnop;
}



function rekeningOpenen(){
    var sNaam       = window.prompt("Uw naam, graag?", "");
    if (sNaam != "" && sNaam != null){
        setCookie('klantnaam', sNaam, 100); // 100 days
        setCookie('saldo', 100, 100);
        window.history.go(0);  // history = contains an array of all URLs you've visited; go = takes an integer as argument ==> refreshes page
    }
}

function rekeningSluiten(){
    clearCookie('klantnaam');
    clearCookie('saldo');
    window.history.go(0);
}



function berekenen(bewerking){


    var nNieuwSaldo     = 0;
    var eBedrag         = document.getElementById('bedrag');
    var sBedrag         = eBedrag.value;
    var sSaldo          = getCookie('saldo');
    var sBericht        = "";
    var re              = /,/;
    sBedrag             = sBedrag.replace(re, '.');



    if (sSaldo != null && sSaldo != ""){
        if (sBedrag != "" && !isNaN(sBedrag)){
            var nSaldo  = parseInt(sSaldo);
            var nBedrag = parseFloat(sBedrag);
            switch(bewerking){
                case '+':
                    nNieuwSaldo = nSaldo + nBedrag;
                    break;
                case '-':
                    nNieuwSaldo = nSaldo - nBedrag;
                    break;
            }

            if (nNieuwSaldo <= 0){
                var nMax        = nSaldo - 1;
                sBericht       += "Uw saldo is ovoldoende om dit bedrag af te halen. "
                sBericht       += "U kunt maximaal " + nMax + " Euro afhalen.";
                eBedrag.value   = nMax;
                eBedrag.focus();
                toonWaarschuwing(sBericht);
            }
            else{
                setCookie('saldo', nNieuwSaldo, 100);
                window.history.go(0);
                eBedrag.value = "";
            }
        }
        else{
            alert('U moet een correct bedrag ingeven');
        }
    }
    else{
        // no saldo = no account
        var bOpenen = window.confirm('U heeft nog geen rekening geopend, nu even doen?');
        if (bOpenen === true){
            rekeningOpenen();
        }
    }
}




function toonWaarschuwing(msg){
    var eWarning            = document.querySelector('.waarschuwing');
    eWarning.innerHTML      = msg;
    eWarning.style.display  = "block";
}


