$(function () {

    /***********************************************************************************************
     * GEAVANCEERD ZOEKEN
     ***********************************************************************************************/
    var $advZoeken      = $('#adv_zoeken');
    var $advZoekenLink  = $('#adv_zoeken_link');

    var zoek        = localStorage.getItem("advZoeken");    // read localStorage
    var setting     = (zoek != 0 && zoek != 1) ? 0 : zoek;  // setting gets the value of zoek. If localStoarage isn't set, it'll give back 0

    // direct implementation
    toggleZoeken(setting, $advZoekenLink, $advZoeken);


    $advZoekenLink.click(function (e) {
        e.preventDefault();
        setting = 1 - setting; // bitwise xor => changin the status of setting in case of clicking the button: if 1 set 0, if 0 set 1
        toggleZoeken(setting, $(this), $advZoeken);  // toggle link and form element
        localStorage.setItem("advZoeken", setting);  // setting localStorage with name advZoeken
    });

    /************************ END OF GEAVANCEERD ZOEKEN ****************************/


















    /***********************************************************************************************
     * ACCORDION
     ***********************************************************************************************/




    /************************************ END OF ACCORDION ******************************************/












}); // end function


/**
 * GEAVANCEERD ZOEKEN
 * toggle link and form element
 */
function toggleZoeken(toon, $link, $el){
    var txt_een     = "Eenvoudig zoeken";
    var txt_adv     = "Geavanceerd zoeken";


    if (toon == 1){
        $el.show('slow');
        $link.text(txt_een);
    }
    else if(toon == 0){
        $el.hide('fast');
        $link.text(txt_adv);
    }
    else{
        throw  new Error("Argument toon verkeerd");
    }
} // end toggleZoeken











































