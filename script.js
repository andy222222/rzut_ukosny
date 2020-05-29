function showSliderRange() {
    var arrMin = new Array();
    var arrMax = new Array();

    var elements = document.getElementsByName('slider');


    for (var i=0;i<elements.length;i++) {
        arrMin[i] = document.getElementById("slider"+(i+1)).min;
        arrMax[i] = document.getElementById("slider"+(i+1)).max;
    }		

    for(var i=0;i<elements.length;i++) {
        document.getElementById("slider" + (i+1) + "Min").innerHTML = parseFloat(arrMin[i]).toFixed(2);
        document.getElementById("slider" + (i+1) + "Max").innerHTML = parseFloat(arrMax[i]).toFixed(2);
    }
}

function showSliderValue() {
    var elements = document.getElementsByName('slider');

    for(var i=0;i<elements.length;i++) {
        var wartosc = document.getElementById("slider" + (i+1)).value	
        document.getElementById("slider"+(i+1)+"Val").innerHTML = parseFloat(wartosc).toFixed(2);
    }
}

function showKey() {
    var klawisz = this.keys();

    console.log(klawisz);	
}

var t;    

function wykres(){
    var g = document.getElementById("slider1").value;
    var v = document.getElementById("slider2").value;
    var alfa = document.getElementById("slider3").value;
    var beta = document.getElementById("slider4").value;

    var t=0;

    var data = [];
         while ((((v*Math.sin(alfa))/beta)+g/beta)*(1-Math.exp(-1*beta*t))-(g*t)/beta>=0) {
                    data.push({
                       x: ((v*Math.cos(alfa))/beta) * (1-Math.exp(-1*beta*t)),
                       y: (((v*Math.sin(alfa))/beta)+g/beta)*(1-Math.exp(-1*beta*t))-(g*t)/beta
                    });
             t+=0.01;  
         };

    var Dane = {
        datasets:[{
              label: 'Obiekt',
              borderColor: 'rgba(20,200,50,1)',
              backgroundColor: 'rgba(20,200,50,1)',
              data: data
                }]  
            };

    var ctx = document.getElementById('myChart').getContext('2d');
    window.scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: Dane,
    options: {
         legend: {
                display:false
                },
                }
    });
    
    var jakdaleko=((v*Math.cos(alfa))/beta) * (1-Math.exp(-1*beta*t));
    var tm=Math.log((g)/(beta*v*Math.sin(alfa)+beta*g))/(-1*beta);
    var wysokosc=(((v*Math.sin(alfa))/beta)+g/beta)*(1-Math.exp(-1*beta*tm))-(g*tm)/beta;
    if(jakdaleko<0 || t<=0 || tm<=0 || wysokosc<=0){
        document.getElementById("zasieg").value="brak rzutu";
        document.getElementById("maxwysokosc").value="brak rzutu";
        document.getElementById("cc").value="brak rzutu";
        document.getElementById("cmax").value="brak rzutu";
    }
    else{
        document.getElementById("zasieg").value=jakdaleko.toFixed(2)+" m";
        document.getElementById("maxwysokosc").value=wysokosc.toFixed(2)+" m";
        document.getElementById("cc").value=t.toFixed(2)+" s";
        document.getElementById("cmax").value=tm.toFixed(2)+" s";
    }
};

function odswiez(chart) {
    chart.destroy();
    wykres();
}