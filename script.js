function validarEntradas() {
    var masa = parseFloat(document.getElementById("masa").value);
    var k = parseFloat(document.getElementById("k").value);
    var b = parseFloat(document.getElementById("b").value);

    // Verificar que los valores no sean NaN o inválidos
    if (isNaN(masa) || isNaN(k) || isNaN(b)) {
        alert("Por favor ingresa valores numéricos para masa, constante de rigidez y constante de amortiguamiento.");
        return false;
    }

    // Validar rango de la constante de rigidez
    if (k < 1 || k > 10000) {
        alert("La constante de rigidez debe estar entre 1 y 10000 N/m.");
        return false;
    }

    // Validar que la masa sea mayor a 0
    if (masa <= 0) {
        alert("La masa debe ser mayor a 0 kg.");
        return false;
    }

    // Validar rango de la constante de amortiguamiento
    if (b < 0.1 || b > 1000) {
        alert("La constante de amortiguamiento debe estar entre 0.1 y 1000 Nm/s.");
        return false;
    }

    return { masa, k, b };
}

function funcionGeneral() {
    if (!validarEntradas()) return;
    calcularFrecuenciaLineal()
    calcularFrecuenciaAngNat()
    calcularFrecuenciaAngAmort()
    tipoAmort()
    graficarMAS()
    graficarMovAmort()
} 

function calcularFrecuenciaLineal(){
    var { masa, k, b } = validarEntradas();
    //Calcular la frecuencia angular natural (w = sqrt(k/m))
    var frecuenciaAngNat = Math.sqrt(k/masa);

    //Calcular la frecuencia lineal (f = w/2pi)
    var frecuenciaL = frecuenciaAngNat/(2*Math.PI);

    //Mostrar el resultado
    document.getElementById("frecuenciaL").innerText = frecuenciaL.toFixed(2);
}

function calcularFrecuenciaAngNat(){
    var { masa, k, b } = validarEntradas();

    //Calcular la frecuencia angular natural (w = sqrt(k/m))
    var frecuenciaAngNat = Math.sqrt(k/masa);
    
    //Mostrar el resultado
    document.getElementById("frecuenciaAngNat").innerText = frecuenciaAngNat.toFixed(2);
}

function calcularFrecuenciaAngAmort(){
    var { masa, k, b } = validarEntradas();

    var factorRig = k / masa;
    var factorAmort = Math.pow(b / (2 * masa), 2);
    var elementoResultado = document.getElementById("frecuenciaAngAm");

    if (factorRig < factorAmort) {
        elementoResultado.innerText = "El sistema es sobreamortiguado, por lo cual, no oscila y no existe frecuencia angular amortiguada en ";
    } else {
        var frecuenciaAngAm = Math.sqrt(factorRig - factorAmort);
        elementoResultado.innerText = frecuenciaAngAm.toFixed(2);
    }
}

function tipoAmort(){
    var { masa, k, b } = validarEntradas();

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
    var { masa, k, b } = validarEntradas();

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
    var { masa, k, b } = validarEntradas();

    // Calcular la frecuencia angular amortiguada y el coeficiente de amortiguamiento
    var beta = b / (2 * masa); // Factor de amortiguamiento
    var omega = Math.sqrt(k / masa - Math.pow(b / (2 * masa), 2)); // Frecuencia angular amortiguada

    //Calcular factores de rigidez y amortiguamiento
    var factorRig = k/masa;
    var factorAmort = Math.pow(b/(2*masa),2);
    
    if (factorRig > factorAmort) {
        // Caso subamortiguado
        var A = 1; // Amplitud inicial
        var phi = 0; // Fase inicial
    
        // Crear el array de tiempos y posiciones
        var tiempos = [];
        var posiciones = [];
        var t = 0;
        var epsilon = 0.001; // Tolerancia para detener el gráfico cuando la posición es cercana a cero
    
        // Bucle para generar los puntos
        while (true) {
            var x = A * Math.exp(-beta * t) * Math.cos(omega * t + phi);
    
            if (A * Math.exp(-beta * t) < epsilon) break;
    
            tiempos.push(t);
            posiciones.push(x);
            t += 0.01;
        }
    
        // Graficar
        var ctx = document.getElementById("grafico2").getContext("2d");
        if (grafico2) grafico2.destroy();
        grafico2 = new Chart(ctx, {
            type: "line",
            data: {
                labels: tiempos,
                datasets: [{
                    label: "Posición x(t) del Movimiento Amortiguado",
                    data: posiciones,
                    borderColor: "rgb(255, 99, 132)",
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: "Tiempo (s)" } },
                    y: { title: { display: true, text: "Posición x(t)" } }
                }
            }
        });
    
    } else {
        // Caso sobreamortiguado o crítico
        function ode(t, state) {
            const x = state[0];
            const v = state[1];
            return [
                v,
                -(b / masa) * v - (k / masa) * x
            ];
        }
    
        function rungeKuttaSystem(f, t0, state0, h, endT) {
            let result = [{ t: t0, state: state0 }];
            let t = t0;
            let state = state0;
            while (t < endT) {
                const k1 = f(t, state).map((v) => h * v);
                const k2 = f(
                    t + 0.5 * h,
                    state.map((s, i) => s + 0.5 * k1[i])
                ).map((v) => h * v);
                const k3 = f(
                    t + 0.5 * h,
                    state.map((s, i) => s + 0.5 * k2[i])
                ).map((v) => h * v);
                const k4 = f(
                    t + h,
                    state.map((s, i) => s + k3[i])
                ).map((v) => h * v);
    
                state = state.map(
                    (s, i) => s + (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) / 6
                );
                t += h;
                result.push({ t: t, state: [...state] });
            }
            return result;
        }
    
        const t0 = 0;
        const state0 = [1, 0];
        const stepSize = 0.1;
        const endT = 10;
    
        const solution = rungeKuttaSystem(ode, t0, state0, stepSize, endT);
    
        const tiempos = solution.map(({ t }) => t);
        const posiciones = solution.map(({ state }) => state[0]);
    
        var ctx = document.getElementById("grafico2").getContext("2d");
        if (grafico2) grafico2.destroy();
        grafico2 = new Chart(ctx, {
            type: "line",
            data: {
                labels: tiempos,
                datasets: [{
                    label: "Posición x(t) del Movimiento Amortiguado",
                    data: posiciones,
                    borderColor: "rgb(255, 99, 132)",
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: "Tiempo (s)" } },
                    y: { title: { display: true, text: "Posición x(t)" } }
                }
            }
        });
    }
}  

function clearInputField() {
    document.getElementById('masa').value = "";
    document.getElementById('k').value = "";
    document.getElementById('b').value = "";
    document.querySelectorAll('.result');
    document.getElementById('frecuenciaL').innerText = "";
    document.getElementById('frecuenciaAngNat').innerText = "";
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