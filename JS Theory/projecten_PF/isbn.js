/**** OPLOSSING ISBN10 zonder taak -> met taak (ISBN13) zie JS_taakbasis_isbn13_afgewerkt.html ****/
//globals
var divOutput;
var isbnVeld;
var frm;
var arrISBN = ['978-90-209-7557-4','978-2-87386-537-5','0-596-00048-0','0 9579218 4 3','90-430-0508-8','90-430-0779-X','978-90-209-7455-3','048629868X','0_140009_930','978-0552139823','978-0-596-51774-8','978-1-59059-908-2']

//*******************************
window.onload = function(){

    divOutput	= document.getElementById('output');
    labelFout   = document.getElementById('fout');
    frm			= document.frmISBN; // get form tag
    isbnVeld 	= frm.kw; //name kw noodzakelijk voor isbndb.com (input)


    //lijst testwaarden
    var strNummers = "";
    for(var i=0; i < arrISBN.length;i++){
        strNummers += arrISBN[i] + "<br />";
    }
    divOutput.innerHTML = strNummers;


    isbnVeld.onfocus = function(){
        labelFout.style.display = "none";
    };

    frm.onsubmit = function () {

        var isbn    = isbnVeld.value; // get value of input field
        var geldig  = isValidISBN(isbn);

        if (geldig === false){
            labelFout.style.display = "inline";
        }

        return geldig;
    }


    var string = 'name';
    var string2= 'secondname';
    var person = "persons";

    var arr = [];
    var multiArr = [];

    arr[string] = "Jan";
    multiArr[person] = arr;

    console.log(multiArr.length);

}; // end window.onload



function isValidISBN(isbn){
    isbn    = isbn.replace(/\s/gi, "");   // verwijder alle spaties. 'gi' betekent dat patroon globaal is en dus alle spaties + letterONgevoelig
    isbn    = isbn.replace(/\-/gi, "");   // verwijder alle koppeltekens


    var l   = isbn.length;

    if (l == 10){
        var basis9      = isbn.substr(0, 9); // eerste 9 getallen
        var control     = isbn.substr(9); // controle getal

        if (!isNaN(basis9)){  // if first 9 digits are numbers
            control     = control.replace("X", "10", "gi");   // gi = voor elke X
            control     = parseInt(control);
            if (!isNaN(control)){  // if control is number after parseInt
                var sum = 0;
                for (var i = 0; i < basis9.length; i++) {
                    sum += parseInt(basis9.charAt(i)) * (i + 1);
                }
                var modulo  = sum % 11;
                return (control == modulo); // returns boolean value
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }


    }
    else if(l = 13){
        var basis12 = isbn.substr(0,12);
        var control = isbn.substr(12);

        if (!isNaN(basis12)){
            control = parseInt(control);
            var sumEven     = 0;
            var sumOneven   = 0;

            for (var i = 0; i < basis12.length; i += 2) {
                sumOneven     += parseInt(basis12.charAt(i));
                sumEven   += parseInt(basis12.charAt(i+1));

            }
            var modulo  = (10 - (sumOneven + (sumEven * 3)) % 10) % 10;
            return (control == modulo);
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }


}



