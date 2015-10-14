$(function () {
    /***********************************************************************************************
     * SLIDER WIDGET
     ***********************************************************************************************/
    var $sliderRangeHoogte  = $("#slider-range-hoogte");
    $sliderRangeHoogte.slider({
        range: true,            // makes two slider buttons
        values: [300, 500],   // start values
        min: 0,                 // min
        max: 5000,              // max
        step: 100,               // value per step
        slide: function(event, ui){    // event handler
            $("#hoogte_min").val($(this).slider("values", 0)); // assigns value to min
            $("#hoogte_max").val($(this).slider("values", 1)); // assigns value to max
            herlaadTable();
        },
        stop: function (event, ui) {   // allows to set slider button back to start values
            $("#hoogte_min").val($(this).slider("values", 0));
            $("#hoogte_max").val($(this).slider("values", 1));
            herlaadTable();
        }
    });

    $("#hoogte_min").val($sliderRangeHoogte.slider("values", 0)); // assigns value to min
    $("#hoogte_max").val($sliderRangeHoogte.slider("values", 1)); // assigns value to max


    $(".ui-slider-handle", "#slider-range-hoogte")  // select .ui-slider-handle WITHIN #slider-range-hoogte
        .first().attr({'title': 'Minimum hoogte'})  // first element
        .end()      // rewinds selection back
        .last().attr({'title': 'Maximum hoogte'});   // last element

    /**
     * Changing sliders when inout field changes
     */
    $("#hoogte_min, #hoogte_max").keyup(function () {
        var selector = $(this)[0].id;  // selecteer id

        if (selector == 'hoogte_min'){
            $sliderRangeHoogte.slider("values", 0, $(this).val());  // verander slider van min
        }
        else{
            $sliderRangeHoogte.slider("values", 1, $(this).val());  // verander slider van max
        }

    });



    // get data by changing kleur, soort_id
    $('#kleur, #soort_id').change(function(){
        herlaadTable();
    });


    // ajax call for new data
    function herlaadTable(){
        oTable.fnReloadAjax();
    }

    /************************ END OF SLIDER WIDGET ****************************/


    /************************ DATA TABLES ****************************/


   var oTable = $('#plantenlijst').dataTable({  // http://datatables.net/manual/installation
       "aAjaxSource": "services/ajax_json_dt_planten.php",

        "fnServerData": function (sSource, aoData, fnCallback) {
            $.getJSON(sSource, [{
                "name": "kleur",
                "value": $("#kleur option:selected").val()
                }],
                function (json) {
                    console.log('helloa');
                    fnCallback(json);

                }
            )
        },

       "bPaginate": true,   // disable pagination

       "iDisplayLength": 20,

       "iDisplayStart": 20,

       "sPaginationType": "full_numbers",

       "aLengthMenu": [[10, 25, 50 -1], [10, 25, 50, "Alle records"]],

       "bSort": true,    // enable/disable sorting

       "bProcessing": true,    // processing message if it takes too long to sort the table

       "aaSorting": [[6, 'asc'], [2, 'desc']],   // sorting during the 1st load: 1st sort: 'rubriek' ascending,...

       "aoColumnDefs": [  // column settings
           {"bVisible": false, "aTargets": [5]},  // visibility. aTargets - cols which will be affected
           {"bSortable": false, "aTargets": [2, 6]},
           {"asSorting": ['desc'], "aTargets": [3]},
           {"bSearchable": false, "sTitle": "Rubriek", "aTargets": [1, 2, 3, 4, 5, 6]},  // sTitle: sets title for column
           {"sTitle": "Lengte", "sWidth": "5%", "aTargets": [2]},
           {"sClass": "dt_fluo", "aTargets": [0]} // highlights the column
       ],

        "oLanguage": { // localisation
            "sUrl": "js/datatables.nl.txt"   // loading file with dutch localisation
        }
   });



    /************************ END DATA TABLES ****************************/

});


