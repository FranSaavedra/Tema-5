google.charts.load('current', {'packages':['corechart','bar']});
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(drawChart2);

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Partido político', 'Escaños'],
    ['Partido Popular',     137],
    ['Partido Socialista Obrero Español',      85],
    ['Unidos Podemos',  71],
    ['Ciudadanos', 32],
    ['ERC-CATSI',    9],
    ['CDC', 8],
    ['EAJ-PNV', 5],
    ['EH Bildu', 2],
    ['CCa-PNC', 1]
  ]);

  var options = {
    title: 'Representación en el congreso',
    is3D: true,
    slices: {
            0: { color: 'blue' },
            1: { color: 'red' },
            2: { color: 'purple' },
            3: { color: 'orange' },
            4: { color: 'yellow' },
            5: { color: 'darkblue' },
            6: { color: 'green' },
            7: { color: 'lightgreen' },
            8: { color: 'dodgerblue' }
          }
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}


function drawChart2() {
  var data = google.visualization.arrayToDataTable([
    ['Partido político', 'Escaños', { role: "style" }],
    ['Partido Popular',     137 ,'blue'],
    ['Partido Socialista Obrero Español', 85 ,'red'],
    ['Unidos Podemos',  71 ,'purple'],
    ['Ciudadanos', 32 ,'orange'],
    ['ERC-CATSI', 9 ,'yellow'],
    ['CDC', 8 ,'darkblue'],
    ['EAJ-PNV', 5 ,'green'],
    ['EH Bildu', 2 ,'lightgreen'],
    ['CCa-PNC', 1 ,'dodgerblue']
  ]);
  

  var view = new google.visualization.DataView(data);
  view.setColumns([0, 1,
                   { calc: "stringify",
                     sourceColumn: 1,
                     type: "string",
                     role: "annotation" },
                   2]);

  var options = {
    title: "Representación en el congreso",
    width: 600,
    height: 400,
    bars: 'horizontal',
    bar: {groupWidth: "95%"},
    legend: { position: "none" },
  };
  var chart = new google.charts.Bar(document.getElementById("barchart_values"));
  chart.draw(view, options);
} 
