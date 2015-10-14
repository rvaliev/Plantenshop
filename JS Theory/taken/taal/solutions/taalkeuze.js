// JavaScript Document
/*

JS taak taalkeuze voorbeeldoplossing 2010

*/
var startPagina= "JS_taak_taalkeuze_afgewerkt.html";

//=============
function checkTaalKeuze(){
/*
controleert voor een taalversiePagina of er effectief een taalcookie bestaat
en of we op de juiste keuze zitten, zoniet terug nr de startpagina

@veronderstelt de global paginaTaal op depagina

*/
	
	var taal = getCookie("taal");
	console.log(taal)
	if (!taal || taal==""){ 
		//blijf hier
	}
	else {
		//gemakshalve kunnen we altijd naar de taalpagina gaan, zelf al zitten we er al op
		//maar beter eerst checken
		if(taal!=paginaTaal) gaNaar(taal);
	}

}

//=============
function gaNaar(taal){
/*brengt gebruiker naar Taalversie startpagina*/
	var url;
	switch (taal){
			case "NL" :
				url="JS_taak_taalkeuze_NL.html";
				break;
			case "FR" :
				url="JS_taak_taalkeuze_FR.html";
				break;
			case "EN" :
				url="JS_taak_taalkeuze_EN.html";
				break;
			case "neutral" :
				url=startPagina;
				break;
			default:
				url=startPagina;
			}
		
		top.location.href=url;
		//console.log("gaNaar: %s", url);
}

//=============
function wijzigTaal(){
/*verwijdert het cookie */

clearCookie('taal');

}

//==================
function  kiesTaal(taal){
/*
plaatst een taalcookie en  brengt de gebruiker naar de taal versie van de startpagina
*/

setCookie('taal',taal, 100); // nuttig_lib
gaNaar(taal);

}