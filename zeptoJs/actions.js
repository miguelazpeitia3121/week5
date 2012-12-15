// JavaScript Document
$ (document).ready(function(e) {
	document.addEventListener("deviceready", llamarBD, false);
});
function llamarBD(){
	window.localStorage.setItem("llave", "Nombre");
	mostrarLocal();
	
}
function mostrarLocal() {
	$('#local').tap(function(){
		var key = window.localStorage.key(0);
		var name = window.localStorage.getItem("llave");
		navigator.notification.confirm('Llave: ' +key+'/nNombre: ',function(btn){
			if(btn==1) {
				window.localStorage.clear();
			}
		},'LocalStorage','Borrar BD, Cancelar');
	});
	
}