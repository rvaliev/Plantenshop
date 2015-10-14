$(function () {


    $('#promos').click(function () {   // Promoties - email subscription
        if ($(this).is(':checked')){
            $('#email').removeAttr('disabled')[0].focus();
        }
        else{
            $('#email').attr('disabled', true).val('');
        }
    });

    var $foutBoksen = $('div.foutBox');

    $('#regForm').validate({
        // instead of creating rules, you just can add 'required' to html tag, however the error message will be taken out of the title
        debug: false,  // when set to 'true' sends message in devtools in case of an error
        rules: {
            vnaam: {   // or vnaam: "required"  ---- vnaam comes from <input id="vnaam">
                required: true,
                minlength: 5
            },
            fnaam: {
                required: true,
                minlength: 5
            },
            postnr: {
                required: true,
                digits: true,
                minlength: 4,
                maxlength: 4
            },
            geboren: {
                required: true,
                dateISO: true           // dateISO: YYYY-MM-DD of YYYY/MM/DD;   DateDe: DD.MM.YYYY
            },
            sexe: {
                required: true    // redio button
            },
            "ruimte[]": {   // this are input fields with input type=checkbox with the same name: "ruimte[]"
                required: true
            },
            "soort_id[]": {    // multi select list
                required: true,
                rangelength: [1,4]   // range of choosen elements
            },
            username: {
                required: true,
                minlength: 8
            },
            ww1: {
                wwCheck: true
            },
            ww2: {
                equalTo: "#ww1"  // 2nd pswd must be the same as 1st (#ww1)
            },
            mail: {
                email: {
                    required: "#promos:checked",   // #promos becomes reuquired IF it's 'checked'
                    email: true // check if it's an email
                }
            }


        },
        messages: {
            vnaam: {
                required: "Voornaam is verplicht",
                minlength: "Minimum lengte is 5"
            },
            fnaam: {
                required: "Familienaam is verplicht",   // if you don't assign message, validator will try to use title of input tag
                minlength: "Minimum lengte is 5"
            },
            postnr: {
                required: "De postcode is verplicht",
                digits: "Een postcode bestaat enkel uit getallen",
                minlength: "Een postcode bestaat uit exact 4 getallen",
                maxlength: "Een postcode bestaat uit exact 4 getallen"
            },
            geboren: {
                required: "Geef uw geboortedatum in, aub",
                dateISO: "De datum moet het formaat YYYY-MM-DD of YYYY/MM/DD hebben"
            },
            sexe: {
                required: "Kies uw geslacht"
            },
            "ruimte[]" : "Kies minstens 1 optie",
            "soort_id[]": "Kies minstens 1 soort maar niet meer dan 4",
            username: "Uw gebruiksersnaam is verplich en moet minimum 8 charactrers hebben",
            ww1: "Het wachtwoord moet minimum 8 karakters lang zijn en moet minstens 1 kleine letter, 1 hoofdletter, 1 getal en 1 speciaal karakter bevatten",
            ww2: "Wachtwoorden moeten identiek zijn",
            email: {
                required: "Een email adres is nodig om u te kunnen contacteren",
                email: "Het email adres is ongeldig"
            }
        },

/*        errorPlacement: function (error, element){     // placing error message to appropriate place
            var $ctrlbx = element.parents("div.controlbox");  // select parent element of the "element" - the input element
            if ($ctrlbx.length != 0){
                error.insertAfter($ctrlbx);
            }
            else{
                error.insertAfter(element);
            }
        },
*/

        /* Showing errors in one container */
        errorContainer: $foutBoksen,  // assigning $('div.foutBox') as error container
        errorLabelContainer: $("ul", $foutBoksen),  // choosing ul within $foutBoksen
        wrapper: "li",  // choosing the tag which will wrap the message

        submitHandler: function (form) {  // what to do in case of successfull submit
            form.submit(); // just regular submit, but you can do whatever you want after successfull submit
        }

    });

    // Datepicker
    $('#geboren').datepicker({
        dateFormat: "yy-mm-dd",
        yearRange: '-80:-18',  // max 80 jaar en min 18 jaar oud  OR minDate: -20, maxDate: "+1M +10D"
        changeMonth: true,  // allow changing month
        changeYear: true,  // allow changing year
        showAnim: 'slideDown', // showing with animation
        showOtherMonths: true, // display dates in other months
        selectOtherMonths: true,
        numberOfMonths: 3 // show multiple months

    });



    // Dialog window
    $(".dialoogvenster").dialog({  // setting .dialoogvenster as dialog
        autoOpen: false,
        buttons: {
            "Oke": function(){   // Button name
                $(this).dialog("close");  // close window if "Oke" is pressed
            }
        },
        modal: true,
        width: "90%"
    });

    $('#dialog_link_username')
                        .button({   // styling button
                            icons: {
                                secondary: 'ui-icon-help'
                            }
                        })
                        .click(function (e) {  // activate dialog window when button was pressed
                            e.preventDefault();
                            $('#dialog_username').dialog("open");  // #dialog_username id of the dialog block
                        });


});


// Adding new method to validator (checking password pattern)
$.validator.addMethod("wwCheck", function(value, element) {  // new function wwCheck added
    return value.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/);
});