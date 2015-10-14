window.onload = function () {

    var url = window.location.href;
    url     = url.substring(url.lastIndexOf('/')+1); // get filename with extension
    url     = url.split('.');   // get filename without extension

    // check for cookies on index page only
    if (url[0] === 'index' || url[0] === ""){
        /**
         * Check if it's a first visit
         * If true, create cookie 'registered'
         * Else, send user to appropriate page
         */
        if (typeof(getCookie('registered')) != 'undefined'){
            //console.log('registered');

            top.location = getCookie('registered') + '.html';       // redirect to page

        }
    }







    var eLinks      = document.querySelectorAll('li > a');
    var className   = "";
    for (var i = 0; i < eLinks.length; i++) {
        eLinks[i].addEventListener('click', function(){
            className   = this.getAttribute('class');
            setCookie('registered', className, 30);
        });
    }







    /**
     * Remove cookie 'registered'
     * @type {Element}
     */
    var eResetBtn       = document.getElementById('reset');
    /**
     * Check whether eResetBtn is NOT a null
     */
    if (eResetBtn != null){
        eResetBtn.addEventListener('click', function(){
            clearCookie('registered');
        })
    }



    var word = "hello world";
    console.log(word.substr(2, 6));



}; // end window.onload






