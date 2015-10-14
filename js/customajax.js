$(function () {


    $.getJSON( "services/ajax_json_dt_planten.php", function( data ) {
        var select = $('<select id="plantenNamen">');  // create <select></select>
        var colorArray = [];
        $.each( data.aaData, function( key, val ) {
            if (colorArray.indexOf(val[2]) == -1 && val[2] != null){  // no duplcates and no null
                colorArray.push(val[2]); // add element to array

                var option = $('<option>');  // create <option></option>
                option.attr('value', val[2]); // add attribute value to option
                option.html(val[2]); // add content to option
                select.append(option);  // add option to select
            }
        });
        select.appendTo('body');

        $('#plantenNamen').change(function () {
            triggerResult();
        });
    });





});


function triggerResult(e)
{
    //e.preventDefault();
    /*jQuery.ajax({
     type:"GET",
     async:false,
     url:"services/ajax_json_dt_planten.php",
     data: ["aaData"][1],
     success: function(response){
     console.log(jQuery("#data").html(response));

     }
     });*/


    $.getJSON(
        "services/ajax_json_dt_planten.php",
        [
            {
                "name": "kleur",
                "value": $('#plantenNamen').val()
            }
        ],
        function (json) {
            var dataBlock = $('#data');

            if (dataBlock.text() != ""){
                dataBlock.html("");
            }

            var uList = $('<ul>');
            $.each(json['aaData'], function (key, val) {
                if (json['aaData'][key][2] != null){
                    var liList = $('<li>');
                    var liContent = json['aaData'][key][1] + " is " + json['aaData'][key][2] + " en is " + json['aaData'][key][7];
                    liList.html(liContent);
                    uList.append(liList);
                }

            });

            uList.appendTo(dataBlock);
        });

}