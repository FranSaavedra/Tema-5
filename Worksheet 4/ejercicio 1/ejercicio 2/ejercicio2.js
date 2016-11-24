google.charts.load('upcoming', {'packages':['geochart']});
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {

        var data = google.visualization.arrayToDataTable([
          ['Country', 'Number of visitants'],
          ['RU', 31.3],
          ['Mexico', 32.1],
          ['United Kingdon', 33],
          ['Germany', 35],
          ['Turkey', 41],
          ['Italy', 50.7],
          ['China', 56.9],
          ['Spain', 68.2],
          ['United States', 75],
          ['France', 84.5]
        ]);

        var options = {};

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
      }