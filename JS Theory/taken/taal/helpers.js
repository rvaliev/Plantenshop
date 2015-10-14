// JS library


/*----------------------- DOM functions ----------------------- */

/**
 * Deletes the content of the objNode
 * @param objNode - required
 */
function leegNode(objNode){
    while(objNode.hasChildNodes()){
        objNode.removeChild(objNode.firstChild);    // removeChild works only from the parent, the can't delete itself
    }
}





/*---------------------- Date, time functions --------------------*/

var vandaag         = new Date();
var huidigeDag      = vandaag.getDate();        // current month day
var huidigeWeekDag  = vandaag.getDay();         // current week day
var huidigeMaand    = vandaag.getMonth();       // current month number
var huidigJaar      = vandaag.getUTCFullYear(); // current year


function getVandaagStr(){
    var strNu   =   "Momenteel: " + vandaag.toLocaleDateString() + ", ";
    strNu       +=  vandaag.toLocaleTimeString();
    return strNu;
}



/*---------------------- Date arrays -----------------------------*/

var arrWeekdagen = Array('zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag');  // days are sorted by getDay()

var arrMaanden   = Array(['januari', 31],
    ['februari', 28],
    ['maart', 31],
    ['april', 30],
    ['mei', 31],
    ['juni', 30],
    ['juli', 31],
    ['augustus', 31],
    ['september', 30],
    ['oktober', 31],
    ['november', 30],
    ['december', 31]);


/**
 * Detect a leap year
 */
function isSchrikkelJaar(jaar){
    var eindWaarde  = false;

    if (!isNaN(jaar)){
        if (jaar%4 === 0){
            eindWaarde = true;
            if(jaar%100 === 0){
                eindWaarde = false;
                if(jaar%400 === 0){
                    eindWaarde = true;
                }
            }
        }
    }
    return eindWaarde;
}





/********************** Cookies ********************************/
/**
 * Setting cookie
 * naam: cookie name
 * waarde: cookie value
 * dagen: optional, days during which cookie will be active
 */
function setCookie(naam, waarde, dagen){
    var verval = "";
    if (dagen){
        // today - see above in this lib
        var vervalDatum = new Date(vandaag.getTime() + (dagen * 24 * 60 * 60 * 1000));
        verval          = vervalDatum.toUTCString(); // set time to UTC
    }
    document.cookie     = naam + "=" + waarde + ";expires=" + verval;
}


/**
 * Reading cookie
 * @param naam: cookie name
 */
function getCookie(naam){
    var zoek = naam + "=";
    if (document.cookie.length > 0){
        var begin = document.cookie.indexOf(zoek);
        if (begin != -1){
            begin       += zoek.length;
            var einde    = document.cookie.indexOf(";", begin);
            if (einde == -1){
                einde = document.cookie.length;
            }
            return document.cookie.substring(begin, einde);
        }
    }
}


/**
 * Deleting cookie
 * @param naam: cookie name
 */
function clearCookie(naam){
    setCookie(naam, "", -1);
}
































