var aFeatures = [

    'document.images',
    'document.layers', 							// niet meer, enkel vroege versies van Netscape
    'document.all', 							// enkel IE
    'document.getElementById',
    'document.querySelector',					//selector API
    'document.styleSheets',
    'document.createElement',
    'document.createNodeIterator',				// niet IE
    'document.implementation.createDocument', 	// niet IE
    'window.walkTheDog', 						// bestaat niet
    'window.focus',
    'window.hasFeatures',  						// elke vrije functie die je zelf schrijft, is een property van het window object
    'window.ActiveXObject', 					// enkel IE
    'window.XMLHttpRequest',
    'window.localStorage',						// HTML5 feature
    '[].push', 									// array method JS 1.2
    '[].filter',								// array method JS 1.6
    'Object.prototype',
    'document.documentElement.style.WebkitBorderRadius',
    'navigator.geolocation', 					// HTML5 feature
    'document.documentElement.classList' 		// HTML5 feature
];




window.onload = function () {

    var eBrowserInfo = document.getElementById('browserInfo');
    eBrowserInfo.innerHTML = "Browser info is: " + navigator.userAgent; // getting browser information




    checkFeature();
};

function checkFeature(){
    var eContainer = document.getElementById('container');
    var eUl        = document.createElement('ul');

    var nLength = aFeatures.length;
    for(var i = 0; i < nLength; i++){
        var eLi        = document.createElement('li');
        var eSpan      = document.createElement('span');
        eSpan.className = "support";

        if(eval(aFeatures[i])){
            eSpan.innerHTML = 'supported';
            eLi.innerHTML = aFeatures[i];
            eLi.appendChild(eSpan);
            eLi.style.backgroundColor = "green";
            eLi.style.color = "white";
        }
        else{
            eSpan.innerHTML = 'not supported';
            eLi.innerHTML = aFeatures[i];
            eLi.appendChild(eSpan);
            eLi.style.backgroundColor = "red";
            eLi.style.color = "white";
        }
        eUl.appendChild(eLi);
        eContainer.appendChild(eUl);

    }

}