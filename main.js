const form = document.getElementById("altaFormulario")
console.log(form)

form.addEventListener("submit", function(event){
    //event.preventDefault(); //detengo el envio del formulario
    let datosFormData = new FormData(form) //obtengo datos del formulario
    let datosObjeto =  conviertedatosFormData(datosFormData);
    guardarObj(datosObjeto)
    console.log(datosObjeto)
    calculador();
    insertarEnTabla(datosFormData);
    
    form.reset();
    
} );


document.addEventListener("DOMContentLoaded", function (event) {
    let datosObjetoArray = JSON.parse(localStorage.getItem("datoGuardado"))
    datosObjetoArray.forEach(
     function(elementosArray){
        insertarEnTabla(elementosArray)
        console.log("dato insertado")
     });
} )




function conviertedatosFormData(datosFormData){
    let cargaDNI = datosFormData.get("cargaDNI")
    let cargaNombre = datosFormData.get("cargaNombre")
    let cargaHaberes = datosFormData.get("cargaHaberes")
    let cargaDescuentos = datosFormData.get("cargaDescuentos")
    let cargatipoSelector = datosFormData.get("cargatipoSelector")
    let datosId = 1
    return{
        "cargaDNI" : cargaDNI,
        "cargaNombre": cargaNombre,
        "cargaHaberes": cargaHaberes,
        "cargaDescuentos": cargaDescuentos,
        "cargatipoSelector": cargatipoSelector,
        "datosId" : datosId
    }
     
}


function insertarEnTabla(datosFormData){
    let table = document.getElementById("tablaDatos") //obtengo la tabla completa
    let nuevatable = table.insertRow(-1) //inserto una fila
    let nuevaCelda = nuevatable.insertCell(0) //inserto una celda, la posicion 0 se cuenta de izq a der
    nuevaCelda.textContent = datosFormData["cargaDNI"];

    nuevaCelda = nuevatable.insertCell(1) 
    nuevaCelda.textContent = datosFormData["cargaNombre"];

    nuevaCelda = nuevatable.insertCell(2) 
    nuevaCelda.textContent = datosFormData["cargaHaberes"];

    nuevaCelda = nuevatable.insertCell(3) 
    nuevaCelda.textContent = datosFormData["cargaDescuentos"];
    nuevaCelda = nuevatable.insertCell(4) 
    nuevaCelda.textContent = datosFormData["cargatipoSelector"];

    let nuevaEliminarCelda = nuevatable.insertCell(5)
    let botonElminar = document.createElement("button")
    botonElminar.textContent = "Eliminar"
    nuevaEliminarCelda.appendChild(botonElminar)

    botonElminar.addEventListener("click", (event) => {
        event.target.parentNode.parentNode.remove();
    
    } )


}

function guardarObj(datosObjeto){
    let datosArray = JSON.parse(localStorage.getItem("datoGuardado")) || [];
    datosArray.push(datosObjeto);
    let datosArrayJSON= JSON.stringify(datosArray);//array pasado a json
    localStorage.setItem("datoGuardado",datosArrayJSON);//guardo
}

function calculador(datosFormData){
    let porcetBono = cargaHaberes * 0.20;
    
    if(cargaDescuentos < porcetBono ){
        let diferencia = porcetBono - descuentos;
        
        alert(" Tu cuota promedio es de: $" + Math.round (diferencia) + 
        "\nPodes acceder a las siguientes opciones de credito: \n Capital auotorizado $" 
        + Math.round(diferencia / 0.21) +" en 12 cuotas \n Capital auotorizado $" 
        + Math.round(diferencia / 0.19)+ " en 15 cuotas \n Capital auotorizado $" 
        + Math.round(diferencia / 0.17)+ " en 18 cuotas ");
    }else if(cargaDescuentos > porcetBono){
        alert("⛔ Los descuentos superan tu limite de credito")
    }


}


