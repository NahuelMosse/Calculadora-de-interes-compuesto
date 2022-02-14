const form = document.getElementById("formulario");
form.addEventListener("submit", comprobacion() );

function comprobacion () {
  //recoleccion de datos
  let datos = new FormData(formulario);
  var capitalInicial = datos.get("capital_inicial");
  var adicionAnual = datos.get("adicion_anual");
  var periodos = datos.get("periodos");
  var años = datos.get("años");
  var interesAnual = datos.get("interes_anual");
  var errorBox = document.getElementById("error_box");
  var errorText = document.getElementById("error_text");
  if (periodos < 1) {
    errorText.innerText = "Periodo menor a 1";
    errorBox.setAttribute("style", "display: flex;");
  }
  else if (años <= 0) {
    errorText.innerText = "Años menor a 1";
    errorBox.setAttribute("style", "display: flex;");
  }
  else {
    calculo (capitalInicial, adicionAnual, periodos, años, interesAnual);
  }
}

function calculo (capitalInicial, adicionAnual, periodos, años, interesAnual) {
  //Calculo
  var capitalFinal = capitalInicial * Math.pow( 1 + interesAnual / (100 * periodos), años * periodos) + ( (adicionAnual / periodos) * (Math.pow(1 + interesAnual / (100 * periodos), años * periodos) - 1) ) / (interesAnual / (100 * periodos));

  //Calculos graficos
  var añosGraf = [];
  var capitalFinalDatosGraf = [];
  for (var i=0; i <= (años * periodos); i++) {
    añosGraf[i] = "mes " + (i * 12 / periodos);
    capitalFinalDatosGraf[i] = (capitalInicial * Math.pow( 1 + interesAnual / (100 * periodos), (i / periodos) * periodos) + ( (adicionAnual / periodos) * (Math.pow(1 + interesAnual / (100 * periodos), (i / periodos) * periodos) - 1) ) / (interesAnual / (100 * periodos))).toFixed(2);
  }

  var capitalGanadoDatosGraf = [];
  for (var i=0; i <= (años * periodos); i++) {
    capitalGanadoDatosGraf[i] = (capitalFinalDatosGraf[i] - capitalInicial - adicionAnual / periodos * i).toFixed(2);
  }

  //Muestra de resultrados
  var capitalFinalObj = document.getElementById("capital_final");
  capitalFinalObj.innerText = capitalFinal.toFixed(2);
  var capitalGanado = capitalFinal - capitalInicial - (adicionAnual * años);
  var capitalGanadoObj = document.getElementById("capital_ganado");
  capitalGanadoObj.innerText = capitalGanado.toFixed(2);

  //Muestra de resultrados en grafica
  var graficoCapitalFinalConfig = {
    type:"line",
    data:{          
      datasets:[{
        data: capitalFinalDatosGraf,
        backgroundColor: "rgb(231, 64, 106)",
      }],
      labels: añosGraf
    },
    options: {
      responsive: true,
      legend: {
        display: false
      },
    },
  }

  var graficoCapitalFinal = document.getElementById('capital_final_graf').getContext('2d');
  if (window.chart1) {
  window.chart1.clear();
  window.chart1.destroy();
  }
  window.chart1 = new Chart(graficoCapitalFinal, graficoCapitalFinalConfig);

  var graficoCapitalGanadoConfig ={
    type:"line",
    data:{          
      datasets:[{
        data: capitalGanadoDatosGraf,
        backgroundColor: "rgb(231, 64, 106)",
      }],
      labels: añosGraf
    },
    options: {
      responsive: true,
      legend: {
        display: false
      },
    }
  }

  var graficoCapitalGanado = document.getElementById('capital_ganado_graf').getContext('2d');
  if (window.chart2) {
  window.chart2.clear();
  window.chart2.destroy();
  }
  window.chart2 = new Chart(graficoCapitalGanado, graficoCapitalGanadoConfig);
}

const errorBox = document.getElementById("error_box");
form.addEventListener("cross", cerrarBox() );

function cerrarBox () {
  errorBox.setAttribute("style", "display: none;");
}