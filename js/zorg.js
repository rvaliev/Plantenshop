$(function(){

    var $tabs   = $('#verzorging');

    // tabs
    $tabs.tabs({
        active: 0,
        disabled: [3]
    });

    // enble tab by checkbox
    $('#toonWaterplanten').change(function () {
        var wpI = $('.ui-tabs-nav a').index($('a[href=#waterplanten]'));   // gets the index of #waterplanten
        if (this.checked){
            $tabs.tabs('enable', wpI).tabs('option', 'active', wpI);  // tabs('option', 'active', 3) - opens the 3rd tab
        }
        else{
            $tabs.tabs('option', 'active', 0).tabs('disable', wpI);
        }
    });


    $('#toonZiektes').one('click', function (e) {   // one is the same as on, but executes once for selected element
        e.preventDefault();
        var aantalTabs  = $('.ui-tabs-nav a').length;  // get amount of hyperlinks within ui-tabs-nav
        var tekst       = "ziektes";
        var eInh        = "<div id='" + tekst + "'>";  // <div id='ziektes'>  no closing tag needed
        var eLink       = "<li><a href='#" + tekst + "'>" + tekst + "</a></li>"; // <li><a href="#ziektes">ziektes</a></li>
        var $nieuweTabInhoud    = $(eInh).load("inc/ziektes.html"); // create div element and load the content of inc/ziektes.html in that element

        $tabs.append($nieuweTabInhoud); // add #verzorging into $nieuweTabInhoud
        $tabs.find("ul").append(eLink); // find "ul" elemnt within #verzorging and append <li><a href="#ziektes">ziektes</a></li> to it
        $tabs.tabs('refresh'); // refresh tabs
        $tabs.tabs("option", "active", aantalTabs); // set new created tab to active
        $(this).remove(); // removes #toonZiektes tag
    });

});