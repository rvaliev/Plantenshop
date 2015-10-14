// JavaScript Document
// JS bestand voor About pagina



var lijst       = ['roger', 'evelyn', 'hilde', 'jan'];

$(function () {

    //$('a').addClass('rood').filter('a[target]').addClass('groen').end().addClass('onderlijnd');

    $('tbody tr:odd').addClass('oneven');
    $('tbody tr:even').addClass('even');

    $('a[href^="http"]').click(function () {
        alert('u verlaat het pagina');
    });


    /**
     * Create 'a' element, create button, add arrow
     */
    $('<a href="#about" title="terug naar boven">Terug naar boven </a>').insertBefore(':header:gt(1)').button({ icons: {secondary:'ui-icon-circle-traingle-n'}});






    /**
     * Loopen through array and create elements
     */

// Method 1
    /*var $uul    = $('<ul>');
    $.each(lijst, function (n, value) {
        $('<li>').text(value).appendTo($uul);
    });

    $('#team').after($uul);*/

// Method 2: better usage for huge html blocks
    /*
    var $uul          = $('<ul>');  // create <ul></ul>
    var strDeLijst    = '';

    $.each(lijst, function (n, value) {              // $.each predefined function: used to loop through arrays or objects
        strDeLijst += '<li>' + value + '</li>';
    });

    $uul.html(strDeLijst);  // html() === text()
    $('#team').after($uul); // insert $uul INTO #team
    */

// Method 3: voor JSONgegevens
    var $container      = $('<div id="teamboks">');      // <div id="teamboks"></div>
    var $diefrechts     = $('<div id="teamgegevens">');  // <div id="teamgegevens"></div>
    var $keuzelijst     = $('<select id="teamkeuzelijst">'); // <select id="teamkeuzelijst"></select>
    var strDeOptions    = '<option value="">--- het team ---</option>';

    $.each(lijst, function (n, value) {
        strDeOptions    += '<option>' + value + '</option>';
    });

    $keuzelijst.html(strDeOptions);
    $container.append($keuzelijst).prepend($diefrechts);
    $('#team').after($container);




    // maak de inhoudsopgave
    var root            = $('article')[0];  // select 'article'; 0 - because there is only one article on this page
    var $list           = $('<ol>');
    //$('#toc').empty().append(walkTree(root, $list, enterNode, exitNode));




    /***************************** AJAX call naar JSON gegegvens team **********************************/
    $('#teamkeuzelijst')   // select select-element
        .change(function () {   // do smth when smth is changed
            var waarde = $(this).val();  // value of the selected element

            $.getJSON(   // start JSON
                        'services/ajax_json_team.php',  // get JSON data as response from appropriate php file
                        waarde,
                        function (jeeson) {  // do smth after JSON file has been read
                            var strHTML = "";
                            var oProfile = jeeson[waarde];
                            if (oProfile) {
                                strHTML += "<img src='images/" + oProfile.foto + "'/>";
                                strHTML += "<h3>" + oProfile.naam + "</h3>";
                                strHTML += "<p>Leeftijd: " + oProfile.leeftijd + "</p>";
                                strHTML += "<p>Functie: " + oProfile.functie + "</p>";
                            }
                            $('#teamgegevens').html(strHTML);
                        }
                    );
    });


}); // end ready



var arrKoppen       = ["h1", "h2", "h3", "h4", "h5", "h6"];
var arrSections     = ["article", "section", "aside", "nav"];
var getal           = 1;



/**
 * Selecteert enkel 'section' elementen
 * The 'nodeType' property returns the node type, as a number, of the specified node.
   If the node is an element node, the nodeType property will return 1.
   If the node is an attribute node, the nodeType property will return 2.
   If the node is a text node, the nodeType property will return 3.
   If the node is a comment node, the nodeType property will return 8.
 */
var checkNode   = function (node) {
    var strNotoc    = "no-toc";
    return (node.nodeType == 1 && arrSections.indexOf(node.tagName.toLowerCase()) >= 0 && node.className.indexOf(strNotoc) == -1);
};


/**
 * Bouwt $list op bij het binnengaan van een node
 */
function enterNode(node, $list){
    /**
     * Als node is eigenlijk een element node
     */
    if (checkNode(node)){
        var $nieuw  = $('<li>').attr('tabindex', getal.toString());  // creer <li tabindex="getal.toString"></li>
        var $a      = $('<a>').attr({
            "href": "#" + getal.toString(),
            "id"  : "o" + getal.toString()
        });

        node.setAttribute("id", getal.toString());
        getal++;   // counter

        $a.text(zoekKoppen(node));
        $nieuw.append($a);

        if ($list[0].tagName == "LI"){
            var $nieuwLijst = $('<ol>').append($nieuw);
            $list.append($nieuwLijst);
            $list = $nieuw;
        }
        else{
            $list.append($nieuw);
            $lijst = $nieuw;
        }
    }

    return $list;
} // end enter node


/**
 * Sluit de opbouw van de node af
 */
var exitNode = function (node, $list) {
    if (checkNode(node)){
        if ($list[0].tagName == "OL"){
            $list = $list.parent();
        }
        // $list = $list.parent(); // WTFF??
    }
    return $list;
};




var  zoekKoppen = function (node) {
    var $node       = $(node);
    var koptekst    = "";

    // zoek de hoogste kop, return zijn tekst
    $.each(arrKoppen, function (i, v) {
        var $kop    = $(v, $node);
        if ($kop.length > 0){
            koptekst    = $kop.first().text();
            return false;
        }
    });

    return koptekst;



};




/**
 * Overloopt DOM tree
 */
var walkTree = function (root, $list, enter, exit) 
{
  var node = root;
  start: while (node) {
  console.log($list[0]);
	$list = enterNode(node,$list);
	if (node.firstChild) {
	  node = node.firstChild;
	  continue start;
	}
	while (node) {
	  $list = exitNode(node,$list);
	  if (node.nextSibling) {
		node = node.nextSibling;
		continue start;
	  }
	  if (node == root)
		node = null;
	  else
		node = node.parentNode;
	}
  }
  return $list;
};
