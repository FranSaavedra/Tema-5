google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
var reverse = true;
var rowData;

function drawChart() {
  if (reverse) {
    rowData = google.visualization.arrayToDataTable([
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
    reverse = false;
  }else{
    rowData = google.visualization.arrayToDataTable([
      ['Partido político', 'Escaños'],
      ['Partido Popular',     123],
      ['Partido Socialista Obrero Español',      90],
      ['Unidos Podemos',  57],
      ['Ciudadanos', 40],
      ['ERC-CATSI',    9],
      ['CDC', 8],
      ['EAJ-PNV', 6],
      ['EH Bildu', 2],
      ['CCa-PNC', 1]
    ]);
    reverse = true;
  }


  var options = {
    title: 'Representación en el congreso',
    is3D: true,
    slices: {
            0: { color: 'blue' ,offset : 0.2},
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

  chart.draw(rowData, options);
}
setInterval(drawChart, 10000); 