function calcularFrecuenciaLineal(){
    //Obtener valores de los inputs
    var masa = document.getElementById("masa").value;
    var k = document.getElementById("k").value;
    var b = document.getElementById("b").value;

    //Verificar que los valores sean válidos
    if(masa === "" || k === "" || b === ""){
        alert("Por favor ingresa la masa, la constante de rigidez y la constante de amortiguamiento.");
        return;
    }

    masa = parseFloat(masa);  //Sobrescribo los valores que tomo del html y los cambio de fomato (convierte el texto a números con parseFloat)
    k = parseFloat(k);
    b = parseFloat(b);

    //Calcular la frecuencia angular amortiguada (w = sqrt((k/m)-(b/2m)^2)
    var factorRig = k/masa;
    var factorAmort = Math.pow(b/(2*masa),2);
    var frecuenciaAngAm = Math.sqrt(factorRig-factorAmort);

    //Calcular la frecuencia lineal (f = w/2pi)
    var frecuenciaL = frecuenciaAngAm/(2*Math.PI);

    //Mostrar el resultado
    document.getElementById("frecuenciaL").innerText = frecuenciaL.toFixed(2);
}

function calcularFrecuenciaAngAmort(){
    //Obtener valores de los inputs
    var masa = document.getElementById("masa").value;
    var k = document.getElementById("k").value;
    var b = document.getElementById("b").value;

    //Verificar que los valores sean válidos
    if(masa === "" || k === "" || b === ""){
        alert("Por favor ingresa la masa, la constante de rigidez y la constante de amortiguamiento.");
        return;
    }

    masa = parseFloat(masa);  //Sobrescribo los valores que tomo del html y los cambio de fomato (convierte el texto a números con parseFloat)
    k = parseFloat(k);
    b = parseFloat(b);

    //Calcular la frecuencia angular amortiguada (w = sqrt((k/m)-(b/2m)^2)
    var factorRig = k/masa;
    var factorAmort = Math.pow(b/(2*masa),2);
    var frecuenciaAngAm = Math.sqrt(factorRig-factorAmort);

    
    //Mostrar el resultado
    document.getElementById("frecuenciaAngAm").innerText = frecuenciaAngAm.toFixed(2);
}

function tipoAmort(){
    //Obtener valores de los inputs
    var masa = document.getElementById("masa").value;
    var k = document.getElementById("k").value;
    var b = document.getElementById("b").value;

    //Verificar que los valores sean válidos
    if(masa === "" || k === "" || b === ""){
        alert("Por favor ingresa la masa, la constante de rigidez y la constante de amortiguamiento.");
        return;
    }

    masa = parseFloat(masa);  //Sobrescribo los valores que tomo del html y los cambio de fomato (convierte el texto a números con parseFloat)
    k = parseFloat(k);
    b = parseFloat(b);

    //Calcular factores de rigidez y amortiguamiento
    var factorRig = k/masa;
    var factorAmort = Math.pow(b/(2*masa),2);
    
    //Indicar tipo de amortiguamiento del sistema
    var tipoAmort = "";
    if (factorRig < factorAmort) {
        tipoAmort = "El sistema es sobreamortiguado.";
    } else if (factorRig > factorAmort) {
        tipoAmort = "El sistema es subamortiguado.";
    } else {
        tipoAmort = "El sistema tiene amortiguamiento crítico.";
    }

    // Mostrar el tipo de amortiguamiento
    document.getElementById("tipoAmort").innerText = tipoAmort;
}