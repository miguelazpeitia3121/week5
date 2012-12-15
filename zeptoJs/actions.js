// JavaScript Document
$ (document).ready(function(e) {
	document.addEventListener("deviceready", llamarBD, false);
});
function llamarBD(){
	window.localStorage.setItem("llave", "Nombre");
	mostrarLocal();
	//SQL
	//1)crear base de datos de 2Kb
	var bd = window.openDatabase("Nombres","1.0","Prueba SQL", 2000, function () {
		navigator.notification.alert('La Base de Datos se ha cargado',function() { }, 'SQL Transactions', 'Aceptar');
	});
	bd.transaction(generarTrnasacciones, error, cargado);
	mostrarSQL();
	
}
function mosntrarSQL(){
	$('#SQL').tap(function(){
		var bd = window.openDatabase("Nombres","1.0","Prueba SQL", 2000);
		bd.transaction(function(tx){
			tx.executeSql("SELECT * FROM TAB", [],function(tx1, res){//res= resulatado
				var largo = res.rows.length;
				alert('La tabla TAB: '+largo+' filas encontradas');
				for(i=0;i<largo;i++){
					alert('ID = '+res.rows.item(i).nomId+'\nNombre = '+res.rows.item(i).nombre);
					
				}
			},function(err){
				alert(err);
			});
		});
	});
}
function generarTransacciones(tx){
	tx.executeSql('DROP TABLE IF EXIST TAB'); //cada vez que entre a la app elimine la tabla, por que asi lo quiero
	tx.executeSql('CREAR TABLE IF NOT EXIST TAB (nomId unique, nombre)');//aqui le especifico que cree la tabla solo la primera vez
	tx.executeSql('INSERT INTO TAB (nombId, nombre) VALUES (1,"Walter")');
	tx.executeSql('INSERT INTO TAB (nombId, nombre) VALUES (2,"Miguel")'); 
	tx.executeSql('INSERT INTO TAB (nombId, nombre) VALUES (3,"Alex")');
	tx.executeSql('INSERT INTO TAB (nombId, nombre) VALUES (4,"Erika")');
	tx.executeSql('INSERT INTO TAB (nombId, nombre) VALUES (5,"Simon")');
}
function error(err) {
	navigator.notification.alert('Error en las transacciones: '+err,function() { }, 'SQL Transactions', 'Aceptar');	
}
function cargado(){
	navigator.notification.alert('La Base de Datos se ha creado',function() { }, 'SQL Transactions', 'Aceptar');
	
}
function mostrarLocal() {
	$('#local').tap(function(){
		var key = window.localStorage.key(0);
		var name = window.localStorage.getItem("llave");
		navigator.notification.confirm('Llave: ' +key+'\nNombre: ',function(btn){
			if(btn==1) {
				window.localStorage.clear();
			}
		},'LocalStorage','Borrar BD, Cancelar');
	});
	
}