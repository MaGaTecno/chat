var nombre;
var arrayNombres = {};
var websocket = io.connect();

window.onload = function iniciar(){
	 var ventana = document.getElementById("setNombre");
     ventana.style.marginTop = "100px";
     ventana.style.left = ((document.body.clientWidth-350) / 2) +  "px";
	
		var boton = document.getElementById("setNick");
		boton.onclick = function(e){
			e.preventDefault();
		var cuenta = 0;
		var name = document.getElementById("name")
			for (var i = arrayNombres.length - 1; i >= 0; i--) {
			if(name.value == arrayNombres){
				cuenta = 1;
			}
		}
		if(cuenta == 0){
			nombreUsuario();
						}else{
							alert("Ese nombre ya existe");
							}
			
	ventana.style.display="none";
	var chat = document.getElementById("mens").disabled = false;
	var chatlog = document.getElementById("chatInsite")
	chatlog.style.display="block";
	chatlog.style.border ="none";
	
//formu para enviar mensaje
	var formuchat = document.getElementById("sendM");
	formuchat.onclick = function(){
	//con onsubmit no hace nada con onclick manda el nombre la primera vez sin contendi
		e.preventDefault();
			envia_mensaje();
			
	}
	
 //Cerramos sesión
	var cerrarSesion = document.getElementById("btnClosSes");
	
	cerrarSesion.onclick = function(){
	var nombre = document.getElementById("name").value;
		alert(nombre + " quiere salir del chat");
		nombre=name;
			localStorage.removeItem("nombreChatUsuario");
			location.reload(true);
				alert("cierra sesion");
	}
	}
	websocket.on("mensaje",procesaUsuario);
	websocket.on("newMessage",procesaMensaje);
	websocket.on("usuarioDesconectado",procesarUsuarios);
	websocket.on("errorName",repetirNombre);
	
	}//Fin Iniciar
function nombreUsuario(){
	var nombre = document.getElementById ("name").value;
	document.getElementById ("usuario").innerHTML = "<h2>Bienvenido " + nombre + " !!</h2>";
		if (localStorage){
			localStorage.nombreChatUsuario = nombre;
		}
		websocket.emit("enviarNombre",nombre);
 }
//Envia mensaje
 function envia_mensaje(){
		var mens = document.getElementById("mens").value;
		if(mens.indexOf("<") != -1){
				alert("Mensaje Erroneo")
				}
				else if(mens.indexOf(">") != -1){
					alert("mensaje erroneo")
				}
				else if(mens.indexOf(";") != -1){
					alert("Mensaje erroneo")
				}else if(mens.value == " "){
				   alert("tenes que mandar algo!")
				} else{
					websocket.emit("enviarMensaje", mens)
					 }
}
 

//el servidor avisa quien se conecto
 function procesaUsuario(mensaje){
	var usuario = document.getElementById ("usuarios");
	usuario.innerHTML = " ";
	var conectados = document.createElement("div");
	conectados.setAttribute("id", "conectados");
	for (i in mensaje[1]){
		usuario.appendChild(conectados);
		
		conectados.innerHTML += "<p> " +  mensaje[1][i] +  " </p>";
		arrayNombres[i] += "<p> " + mensaje[1][i] +  " </p>";
	}
}
//Esta función se ejecuta cuando el servidor nos
//avisa que al usuario que se desconectó borrandolo
function procesarUsuarios(data){
	var usuario = document.getElementById ("usuarios")
		for (i in data[0]){
			usuario.innerHTML =  data[0][i];
			arrayNombres[i] =  data[0][i];
		}
}
function procesaMensaje(data){
	var chatlog = document.getElementById("chatInsite");
	var comenta = document.createElement("p");
		chatlog.appendChild(comenta);
		comenta.innerHTML ="<span>" + data[0] + " dice : "+ data[1] +"</span>";
		comenta.style.border="none";
}
function repetirNombre(){
		localStorage.removeItem("nombreChatUsuario");
			alert("El nombre esta siendo usado por otro usuario");
		location.reload (true);

}
 

