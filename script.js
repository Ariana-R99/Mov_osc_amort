function funcionGeneral(){
    calcularFrecuenciaLineal()
    calcularFrecuenciaAngNat()
    calcularFrecuenciaAngAmort()
    tipoAmort()
    graficarMAS()
    graficarMovAmort()
} 

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

function calcularFrecuenciaAngNat(){
    //Obtener valores de los inputs
    var masa = document.getElementById("masa").value;
    var k = document.getElementById("k").value;
    
    masa = parseFloat(masa);  //Sobrescribo los valores que tomo del html y los cambio de fomato (convierte el texto a números con parseFloat)
    k = parseFloat(k);

    //Calcular la frecuencia angular natural (w = sqrt(k/m))
    var frecuenciaAngNat = Math.sqrt(k/masa);
    
    //Mostrar el resultado
    document.getElementById("frecuenciaAngNat").innerText = frecuenciaAngNat.toFixed(2);
}

function calcularFrecuenciaAngAmort(){
    //Obtener valores de los inputs
    var masa = document.getElementById("masa").value;
    var k = document.getElementById("k").value;
    var b = document.getElementById("b").value;

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

var grafico1 = null;
function graficarMAS() {
    // Obtener los valores de los inputs
    var masa = document.getElementById("masa").value;
    var k = document.getElementById("k").value;
    
    masa = parseFloat(masa);  //Sobrescribo los valores que tomo del html y los cambio de fomato (convierte el texto a números con parseFloat)
    k = parseFloat(k);

    //Calcular la frecuencia angular natural (w = sqrt(k/m))
    var frecuenciaAngNat = Math.sqrt(k/masa);

    // Parámetros iniciales
    var A = 1; // Amplitud inicial
    var phi = 0; // Fase inicial (puedes cambiar esto si quieres)

    // Crear el array de tiempos y posiciones 
var tiempos = []; 
var posiciones = []; 
for (var t = 0; t <= 20; t += 0.1) { // Graficar de 0 a 10 segundos 
    tiempos.push(t); 
    var x = A * Math.cos(frecuenciaAngNat * t + phi); // Ecuación del MAS 
    posiciones.push(x); 
} 
 
// Crear el gráfico 
var ctx = document.getElementById("grafico1").getContext("2d"); 

if (grafico1) {
    grafico1.destroy();
}

grafico1 = new Chart(ctx, { 
    type: "line", 
    data: { 
        labels: tiempos, // Tiempo 
        datasets: [{ 
            label: "Posición x(t) del Movimiento sin Amortiguamiento", 
            data: posiciones, // Posición x(t) 
            borderColor: "rgb(75, 192, 192)", 
            fill: false 
        }] 
    }, 
    options: { 
        responsive: true, 
        scales: { 
            x: { 
                title: { 
                    display: true, 
                    text: "Tiempo (s)" 
                } 
            }, 
            y: { 
                title: { 
                    display: true, 
                    text: "Posición x(t)" 
                } 
            } 
        } 
    } 
}); 

} 

var grafico2 = null;
function graficarMovAmort() {
    // Obtener los valores de los inputs
    var masa = document.getElementById("masa").value;
    var k = document.getElementById("k").value;
    var b = document.getElementById("b").value;

    masa = parseFloat(masa);
    k = parseFloat(k);
    b = parseFloat(b);

    // Calcular la frecuencia angular amortiguada y el coeficiente de amortiguamiento
    var beta = b / (2 * masa); // Factor de amortiguamiento
    var omega = Math.sqrt(k / masa - Math.pow(b / (2 * masa), 2)); // Frecuencia angular amortiguada

    // Parámetros iniciales
    var A = 1; // Amplitud inicial
    var phi = 0; // Fase inicial (puedes cambiar esto si quieres)

    // Crear el array de tiempos y posiciones
    var tiempos = [];
    var posiciones = [];
    var t = 0; // Tiempo inicial
    var epsilon = 0.001; // Tolerancia para detener el gráfico cuando la posición es cercana a cero

    // Bucle para generar los puntos hasta que la amplitud A sea pequeña
    while (true) {
        // Ecuación del movimiento amortiguado: x(t) = A * e^(-beta * t) * cos(omega * t + phi)
        var x = A * Math.exp(-beta * t) * Math.cos(omega * t + phi); // Posición

        // Si A * e^(-beta * t) < epsilon, detenemos el bucle
        if (A * Math.exp(-beta * t) < epsilon) {
            break;
        }
        
        // Agregar el tiempo y la posición al gráfico
        tiempos.push(t);
        posiciones.push(x);

        // Incrementar el tiempo para el siguiente cálculo
        t += 0.01; // Puedes ajustar el paso de tiempo aquí
    }

    // Obtener el contexto del canvas
    var ctx = document.getElementById("grafico2").getContext("2d");

    // Destruir el gráfico existente si lo hay
    if (grafico2) {
        grafico2.destroy();
    }

    // Crear el nuevo gráfico y asignarlo a la variable global
    grafico2 = new Chart(ctx, {
        type: "line",
        data: {
            labels: tiempos, // Tiempo
            datasets: [{
                label: "Posición x(t) del Movimiento Amortiguado",
                data: posiciones, // Posición x(t)
                borderColor: "rgb(75, 192, 192)",
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Tiempo (s)"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Posición x(t)"
                    }
                }
            }
        }
    });
}

function clearInputField() {
    document.getElementById('masa').value = "";
    document.getElementById('k').value = "";
    document.getElementById('b').value = "";
    document.querySelectorAll('.result');
    document.getElementById('frecuenciaL').innerText = "";
    document.getElementById('frecuenciaAngAm').innerText = "";
    document.getElementById('tipoAmort').innerText = "";
    // Destruir el gráfico si existe
    if (grafico1) {
        grafico1.destroy();
        grafico1 = null; // Reiniciar la variable global
    }
    
    if (grafico2) {
        grafico2.destroy();
        grafico2 = null; // Reiniciar la variable global
    }
    
    var canvas = document.getElementById("grafico1");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Limpiar el canvas
    var canvas = document.getElementById("grafico2");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}