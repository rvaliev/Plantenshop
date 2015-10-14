$(function () {


    var ikoontjes   = {
        header: "ui-icon-circle-arrow-e",        // normal header icon: s-south, n-north, ...
        activeHeader: "ui-icon-circle-arrow-s"   // active header icon: s-south, n-north, ...
    };

    $('#keuzes').accordion({
        active: 1,         // opens 2nd tab when loaded
        collapsible: true,  // allow collapse current tab,so that no tabs are opened
        icons: ikoontjes,    // icons -> using object ikoontjes
        heightStyle: "content",    // adapt window height to the content
        animate: true              // animation: false, "easeInQuint",... http://api.jqueryui.com/easings/

    });













}); // end function

