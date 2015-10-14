$(function () {
   $('#plantenlijst').dataTable({  // http://datatables.net/manual/installation
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
});