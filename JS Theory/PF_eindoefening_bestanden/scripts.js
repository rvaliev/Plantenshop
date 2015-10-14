/**
 * Object met winkels
 */
var winkels = [
                  {
                       naam:"de fruitmand",
                       adres:"steenstraat 34",
                       post:8000,
                       gemeente:"Brugge",
                       tel:"050342218",
                       manager:"Francine Lapoule"
                   },
                   {
                       naam:"Jos & Anneke",
                       adres:"visserijstraat 1",
                       post:8400,
                       gemeente:"Oostende",
                       tel:"059463689",
                       manager:"Jos Leman"
                   },
                   {
                       naam:"groene vingers",
                       adres:"hoogstraat 108",
                       post:9000,
                       gemeente:"Gent",
                       tel:"091342218"
                   },
                   {
                       naam:"de buurtwinkel",
                       adres:"die laene 22",
                       post:2000,
                       gemeente:"Antwerpen",
                       tel:"0230342218",
                       manager:"Bert Simoens"
                   }
];



var groenten = [
    ["aardappelen",0.95,"kg"],
    ["avocado",2.69,"stuk"],
    ["bloemkool",1.93,"stuk"],
    ["brocoli",1.29,"stuk"],
    ["champignons",0.89,"250g"],
    ["chinese kool",1.59,"stuk"],
    ["groene kool",1.69,"stuk"],
    ["knolselder",1.29,"stuk"],
    ["komkommer",2.49,"stuk"],
    ["kropsla",1.69,"stuk"],
    ["paprika",0.89,"net"],
    ["prei",2.99,"bundel"],
    ["princessenbonen",1,"250g"],
    ["rapen",0.99,"bundel"],
    ["rode kool",1.39,"stuk"],
    ["sla iceberg",1.49,"stuk"],
    ["spinazie vers",1.89,"300g"],
    ["sjalot",0.99,"500g"],
    ["spruiten",1.86,"kg"],
    ["trostomaat",2.99,"500g"],
    ["ui",0.89,"kg"],
    ["witloof 1ste keus",1.49,"700g"],
    ["wortelen",2.59,"kg"],
    ["courgetten",1.5,"stuk"]
];


var fouten = {
  SELECT: 'Deze veld is verplicht te selecteren',
  INPUT:     'Deze veld moet met een getal ingevuld zijn'
};

var aWinkelMandje = [];
window.onload = function () {

    /**
     * Feature detection
     */
    if (document.getElementById){
        var eFD     = document.getElementById("featureDetection"); // selecteer element featureDetection
        eFD.style.display = "none"; // zet waarschuwingsblock af

        /*********************************************** MAIN CODE BLOCK ********************************************************/







        /**
         * Loop 'winkels' object
         * Creer lijst met winkels
         */
        var eWinkel             = document.getElementById('winkel');  // selecteer SELECT element van winkels
        for (var i = 0; i < winkels.length; i++) {
            var eOption         = document.createElement('option'); // maak nieuwe OPTION element
            eOption.title       = winkels[i].adres + ", " + winkels[i].post + " " + winkels[i].gemeente; // voeg adres als title  bij option
            eOption.innerHTML   = winkels[i].naam;  // voeg TEXT in option element
            eOption.value       = i;    // geef unieke value aan elk OPTION element
            eWinkel.appendChild(eOption);   // voeg eOption in eWinkel
        } // end FOR


        /**
         * Loop 'groenten'
         * Creer lijst met groenten
         */
        var eGroenten       = document.getElementById('groente'); // selecteer SELECT element van groenten
        for (var i = 0; i < groenten.length; i++) {
            var eOption         = document.createElement('option'); // maak nieuwe OPTION element
            eOption.innerHTML   = groenten[i][0] + " (" + groenten[i][1] + "€/" + groenten[i][2] + ")"; // voeg text in option
            eOption.value       = i;
            eGroenten.appendChild(eOption); // voeg eOption in eGroenten
        }



        var eSubmitForm = document.frmBestel;

        eSubmitForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var error = 0;

            for (var i = 0; i < this.length; i++) {
                var nValue      = this[i].value;

                if (this[i].type !== 'submit'){
                    if (nValue !== "" && !isNaN(nValue)){
                        if(this[i].tagName === 'SELECT'){
                            /**
                             * input -> 'text' dan mag het float zijn
                             * input -> 'selection' dan moet het integer zijn
                             */
                            if (!validateInteger(nValue)){
                                error = 1;
                                insertWarning(this, i);
                            }
                        } // end if

                        var eWarningId  = document.getElementById(this[i].id + "Warning"); // added
                        if (eWarningId){ // added
                            eWarningId.remove();
                        }

                    }
                    else{
                        error = 1;
                        insertWarning(this, i);
                    }
                } // end if
            } // end for


            /**
             * Voeg item in mandje
             */
            if (error === 0){
                var delWarning = document.getElementsByClassName('warning');
                for (var i = 0; i < delWarning.length; i++) {
                    delWarning[i].innerHTML = "";
                }

                var leeg = document.getElementById('leeg');
                leeg.style.display = 'none';
                addProduct(this, aWinkelMandje);

            }


        }); // end event listener












        /*********************************************** END MAIN CODE BLOCK ********************************************************/
    } // END featureDetection
}; // END window.onload

/**
 * Validatie integer
 */
function validateInteger(number){
    return Math.round(number) == number;
}


/**
 * Voegt een waarschuwing aan element toe
 */
function insertWarning(element, i){
    var eWarningId  = document.getElementById(element[i].id + "Warning"); // TOEGEVOEGD
    if (!eWarningId){ // TOEGEVOEGD IF STATEMENT
        var eSpan     = document.createElement('span');
        eSpan.innerHTML = fouten[element[i].tagName];
        eSpan.className = "warning";
        eSpan.id        = element[i].id + "Warning";  // TOEGEVOEGD
        element[i].parentNode.insertBefore(eSpan);
    }



}


/**
 * Product in winkelmandje toevoegen
 */
function addProduct(elem, aWinkelMandje){
    var nGroente    = parseInt(elem.groente.value);
    var nAantal     = elem.aantal.value;
    var nPrijsPP    = groenten[nGroente][1];

    // VERWIJDERD
   /* if (aWinkelMandje.length == 0){
        aWinkelMandje.push([nGroente, nAantal, nPrijsPP]);
    }
    else{
        for (var i = 0; i < aWinkelMandje.length; i++) {
            if (parseInt(aWinkelMandje[i][0]) == parseInt(nGroente)){
                //console.log('exists');
                aWinkelMandje[i][1] = nAantal;
            }
            else{

                console.log(nGroente);
                console.log(aWinkelMandje[i][0]);
                //console.log(aWinkelMandje.length);
            }
        }
    }*/

    aWinkelMandje.push([nGroente, nAantal, nPrijsPP]);




    drawTable(aWinkelMandje); // teken tabel
    //console.log(aWinkelMandje);


}


/**
 * Tabel uittekenen
 * @param aWinkelMandje
 */
function drawTable(aWinkelMandje){
    var eTable        = document.getElementById('tg');
    eTable.innerHTML  = "";
    var sumP            = 0;

    for (var i = 0; i < aWinkelMandje.length; i++) {
        var eTR           = document.createElement('tr');
        var eTdNaam         = document.createElement('td');
        var eTdAantal       = document.createElement('td');
        var eTdPrijs        = document.createElement('td');
        var eTdTotPrijs     = document.createElement('td');


        sumP += (groenten[aWinkelMandje[i][0]][1] * aWinkelMandje[i][1]);


        eTdNaam.innerHTML   = groenten[aWinkelMandje[i][0]][0];  // groentenaam
        eTR.appendChild(eTdNaam);
        eTdAantal.innerHTML = aWinkelMandje[i][1];  // aantal groenten
        eTR.appendChild(eTdAantal);
        eTdPrijs.innerHTML   = groenten[aWinkelMandje[i][0]][1]; // prijs per product
        eTR.appendChild(eTdPrijs);
        eTdTotPrijs.innerHTML = (groenten[aWinkelMandje[i][0]][1] * aWinkelMandje[i][1]).toFixed(2); // totale prijs per product
        eTR.appendChild(eTdTotPrijs);
        eTable.appendChild(eTR);


    }

    var totNum          = document.getElementById('totNum');
    totNum.innerHTML    = "";
    totNum.innerHTML    = sumP.toFixed(2);

}

