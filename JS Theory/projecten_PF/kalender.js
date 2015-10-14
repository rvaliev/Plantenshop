


window.onload = function () {



    var divOutput             = document.getElementById('output');
    var divKalender           = document.getElementById('kalender');


    leegNode(divOutput); // empty divOutput from child nodes
    divOutput.innerHTML       = getVandaagStr(); // insert current date

    //divKalender.innerHTML   = maakMaandTabel(huidigJaar, huidigeMaand); // show only 1 month
    divKalender.innerHTML     = maakJaarKalender(huidigJaar);

    var verjaardag            = new Date(huidigJaar, 1, 22);
    dagAanduiden(verjaardag, 'verjaardag');  // verjaardag is an object, 'verjaardag' is a class for css

    dagAanduiden(vandaag, 'vandaag');  // vandaag is an object, 'vandaag' is a class for css







};


/**
 * Creates kalender table
 * Dependency: nuttig_lib.js
 * @param kalenderJaar - integer: 4 digit year
 * @param maandIndex - integer: 0-12
 * Return: string
 */
function maakMaandTabel(kalenderJaar, maandIndex){
    // Validate year
    if (isNaN(kalenderJaar) || isNaN(kalenderJaar.toString().length != 4)){
        return "Fout jaargetal";
    }

    // Validate month
    if (isNaN(maandIndex) || (maandIndex < 0) || (maandIndex > 11)){
        return "Fout maandgetal";
    }

    
    // first day of the current month
    var start_datum     = new Date(kalenderJaar, maandIndex, 1);  // year, month, day
    var start_weekdag   = start_datum.getDay(); // returns the day (integer) on which current month starts

    
    // get the end day of the month, but need to check february for the leap day
    var eindDag     = arrMaanden[maandIndex][1];   // ['februari', 28]
    if ((maandIndex == 1) && (isSchrikkelJaar(kalenderJaar))){
        eindDag = 29;
    }
    
    
    // creating table
    strMaandTabel   = "<table class='kalender'>";
    
    // row
    strMaandTabel   += "<tr><th colspan='7'>" + arrMaanden[maandIndex][0] + " ";
    strMaandTabel   += kalenderJaar +  "</th></tr>";


    // day titles
    strMaandTabel   += "<tr>";
    for (var i = 0; i < 7; i++) {
        strMaandTabel  += "<td>" + arrWeekdagen[i].substr(0, 2).toUpperCase() + "</td>";  // substr() - chooses first 2 letters ex. VR, MA
    }
    strMaandTabel   += "</tr>";


    var dag     = 1;
    var teller  = 0;

    while(dag <= eindDag){
        // week row
        strMaandTabel   += "<tr>";
        for (var j = 0; j < 7; j++) {
            // draw cell with or without day value in them
            var strId           = '';
            var strDagNummer    = '';

            // draw the days
            if ((teller >= start_weekdag) && (dag <= eindDag)){
                strDagNummer    = dag;
                strId           = " id='" + kalenderJaar + "_" + maandIndex + "_" + dag + "'";
                dag++;
            }

            // draws the cell
            strMaandTabel       += "<td " + strId + ">" + strDagNummer + "</td>";
            teller++;
        }

        strMaandTabel   += "</tr>";
    }

    strMaandTabel += "</table>";
    return strMaandTabel;

}


/**
 * Highlights the current day
 * @param oDatum - an object with date
 * @param CSS_Class - css class name
 */
function dagAanduiden(oDatum, CSS_Class){
    // get day, month and the year
    var dDag        = oDatum.getDate();
    var dMaand      = oDatum.getMonth();
    var dJaar       = oDatum.getFullYear();

    // build up id attribute for a cell
    var strId           = dJaar + "_" + dMaand + "_" + dDag;
    var dCel            = document.getElementById(strId);
    if (dCel){
        dCel.className  = CSS_Class;
    }
}


/**
 * Creates calender for the whole year
 * @param kalenderJaar
 * @returns {string}
 */
function maakJaarKalender(kalenderJaar){
    strJaarKalender     = "";
    for (var i = 0; i < 12; i++) {
        strJaarKalender     += "<div class='maandContainer'>";
        strJaarKalender     += maakMaandTabel(kalenderJaar, i);
        strJaarKalender     += "</div>";
    }
    return strJaarKalender;
}














































