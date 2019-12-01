function initGraph(customColorStr, graphId, initData, horDist, verDist) {
  let customColor = am4core.color(customColorStr);
  // Themes begin
  am4core.useTheme(am4themes_dark);
  am4core.useTheme(am4themes_animated);
  // Themes end

  let chart = am4core.create(graphId, am4charts.XYChart);
  chart.hiddenState.properties.opacity = 0;

  chart.padding(0, 0, 0, 0);

  chart.zoomOutButton.disabled = true;

  var data = initData;

  chart.data = data;

  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.renderer.minGridDistance = 30;
  dateAxis.dateFormats.setKey("second", "ss");
  dateAxis.periodChangeDateFormats.setKey("second", "[bold]HH:mm");
  dateAxis.periodChangeDateFormats.setKey("minute", "[bold]HH:mm");
  dateAxis.periodChangeDateFormats.setKey("hour", "[bold]HH:mm");
  dateAxis.renderer.inside = true;
  dateAxis.renderer.axisFills.template.disabled = true;
  dateAxis.renderer.ticks.template.disabled = true;
  dateAxis.renderer.minGridDistance = horDist;

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.interpolationDuration = 500;
  valueAxis.rangeChangeDuration = 500;

  valueAxis.strictMinMax = false;
  valueAxis.renderer.minGridDistance = verDist;
  valueAxis.renderer.inside = true;

  valueAxis.renderer.minLabelPosition = 0.05;
  valueAxis.renderer.maxLabelPosition = 0.95;
  valueAxis.renderer.axisFills.template.disabled = false;
  valueAxis.renderer.ticks.template.disabled = false;

  var line = new am4charts.LineSeries();
  line.fill = customColor;

  var series = chart.series.push(line);
  series.dataFields.dateX = "date";
  series.dataFields.valueY = "value";
  series.interpolationDuration = 500;
  series.defaultState.transitionDuration = 0;
  series.tensionX = 0.8;

  chart.events.on("datavalidated", function() {
    dateAxis.zoom({ start: 1 / 15, end: 1.2 }, false, true);
  });

  dateAxis.interpolationDuration = 500;
  dateAxis.rangeChangeDuration = 500;


  // all the below is optional, makes some fancy effects
  // gradient fill of the series
  series.fillOpacity = 1;
  var gradient = new am4core.LinearGradient();
  gradient.addColor(customColor, 0);
  gradient.addColor(customColor, 0.1);
  series.fill = gradient;

  // this makes date axis labels to fade out
  dateAxis.renderer.labels.template.adapter.add("fillOpacity", function(fillOpacity, target) {
    var dataItem = target.dataItem;
    return dataItem.position;
  })

  // need to set this, otherwise fillOpacity is not changed and not set
  dateAxis.events.on("validated", function() {
    am4core.iter.each(dateAxis.renderer.labels.iterator(), function(label) {
      label.fillOpacity = label.fillOpacity;
    })
  })

  // this makes date axis labels which are at equal minutes to be rotated
  dateAxis.renderer.labels.template.adapter.add("rotation", function(rotation, target) {
    var dataItem = target.dataItem;
    if (dataItem.date && dataItem.date.getTime() == am4core.time.round(new Date(dataItem.date.getTime()), "minute").getTime()) {
      target.verticalCenter = "middle";
      target.horizontalCenter = "left";
      return -90;
    } else {
      target.verticalCenter = "bottom";
      target.horizontalCenter = "middle";
      return 0;
    }
  })

  // bullet at the front of the line
  var bullet = series.createChild(am4charts.CircleBullet);
  bullet.circle.radius = 3;
  bullet.fillOpacity = 1;
  bullet.fill = chart.colors.getIndex(0);
  bullet.isMeasured = false;

  // bullet at the front of the line
  var bullet1 = series.bullets.push(new am4charts.CircleBullet);
  bullet1.circle.radius = 3;
  bullet1.fillOpacity = 0.5;
  bullet1.fill = customColor;


  series.events.on("validated", function() {
    bullet.moveTo(series.dataItems.last.point);
    bullet.validatePosition();
  });
  return chart;
} // end am4core.ready()