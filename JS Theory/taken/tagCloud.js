//het array met de tags
//elk item is zelf een Array met de naam, het huidig aantal stemmen en het vorig aantal stemmen die het kreeg
var arrTags = [
    ["Javascript", 1634, 987],
    ["jQuery", 1111, 34],
    ["PHP", 1024,1122],
    ["Asp.Net", 977, 1005],
    ["Photoshop", 594, 789],
    ["XML", 40, 666],
    ["Access", 55, 77],
    ["Java", 278, 277],
    ["MySQL", 155, 122]
];


/**
 * Cloud setup
 */
var nMaxFontSize    = 5; // 5 rem
var nMinFontSize    = 1; // 1 rem
var sPositiveColor  = "green";
var sNegativeColor  = "red";





window.onload = function () {
    var aCloudSize = fnCreateTags();    // create tags + set up tag color
    fnPositionSetupTags(aCloudSize);    // set tag size + tag position
}; // end window.onload




// **************************************************** FUNCTIONS ************************************************


/**
 * Creating tags
 */
function fnCreateTags(){
    var eCloud          = document.getElementById('tagContainer');
    var nCloudWidth     = eCloud.clientWidth;                                 // get window width in px of eCloud
    var nCloudHeight    = eCloud.clientHeight;                                // get window height in px of eCloud
    var aSize           = [nCloudWidth, nCloudHeight];                        // create an array with cloud sizes
    var oVotes          = fnGetMinMaxIndex(arrTags, 1);
    var nMaxVote        = oVotes['max'];
    var nMinVote        = oVotes['min'];

    var nFontBaseSize   = (nMaxFontSize - nMinFontSize) / (nMaxVote - nMinVote);  // determining of fontsize base multiplier

    for (var i = 0; i < arrTags.length; i++) {
        var eSpan   = document.createElement('span');
        eSpan.setAttribute('class', 'tag');
        var sTag    = document.createTextNode(arrTags[i][0]);
        eSpan.appendChild(sTag);

        fnColorTag(eSpan, i);       // set color tot the tag

        fnSetFontSize(eSpan, nFontBaseSize, arrTags[i][1]); // set fontsize tot the tag

        eCloud.appendChild(eSpan);
    }

    return aSize;

} // end fnCreateTags



/**
 * Set tag font size
 */
function fnSetFontSize(eSpan, nFontBaseSize, nVotesToFont){
    var nFontSize            = (Math.round((nFontBaseSize * nVotesToFont * 100))/100) + 1;  // + 1 = basic rem
    eSpan.style.fontSize     = nFontSize + 'rem';       // apply font size
} // end fnSetFontSize

// getting max and min value from array of tags
function fnGetMinMaxIndex(arr, idx) {
    return {
        min: Math.min.apply(null, arr.map(function (e) { return e[idx]})),
        max: Math.max.apply(null, arr.map(function (e) { return e[idx]}))
    }
} // end getMinMaxIndex


/**
 * Set tag color
 */
function fnColorTag(eSpan, i){
    var nCurrentVote    = arrTags[i][1];
    var nPastVote       = arrTags[i][2];

    if (nCurrentVote >= nPastVote){
        eSpan.style.color = sPositiveColor; // green
    }
    else{
        eSpan.style.color = sNegativeColor; // red
    }

} // end fnColorSizeTag






/**
 * Set tag positions
 * */
function fnPositionSetupTags(aCloudSize){
    var eTags       = document.querySelectorAll('#tagContainer > span');    // get all 'span' elements within tagContainer

    for (var i = 0; i < eTags.length; i++) {
        fnRandomPosition(eTags[i], aCloudSize[0], aCloudSize[1]);
    }


} // end fnSetupTags

function fnRandomPosition(eTag, nCloudWidth, nCloudHeight){
    var nTagWidth    = eTag.clientWidth;
    var nTagHeight   = eTag.clientHeight;

    var nLeft        = Math.round(Math.random() * nCloudWidth);
    if ((nLeft + nTagWidth) > nCloudWidth){
        nLeft = nCloudWidth - nTagWidth ;
    }

    var nTop         = Math.round(Math.random() * nCloudHeight);
    if ((nTop + nTagHeight) > nCloudHeight){
        nTop = nCloudHeight - nTagHeight;
    }

    eTag.style.left = nLeft + 'px';
    eTag.style.top  = nTop + 'px';
}