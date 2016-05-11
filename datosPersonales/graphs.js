function drawDateXMealWeightChart(){
    $('#container').highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Días versus Peso de colasiones'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: {
                enabled: true,
                text: 'fecha'
            },
            type: 'datetime',
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'peso (g)'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.y} g'
                }
            }
        },
        series: [{
            name: 'desayuno',
            color: 'rgba(102,194,165, .5)',
            data: fetchDataForDateXMealWeight('desayuno')

        }, {
            name: 'almuerzo',
            color: 'rgba(252,141,98, .5)',
            data: fetchDataForDateXMealWeight('almuerzo')
        }, {
            name: 'merienda',
            color: 'rgba(141,160,203, .5)',
            data: fetchDataForDateXMealWeight('merienda')
        }, {
            name: 'cena',
            color: 'rgba(231,138,195, .5)',
            data: fetchDataForDateXMealWeight('cena')
        }]
    });
}

function drawAreaChart(){
    $('#container').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Historic and Estimated Worldwide Population Growth by Region'
        },
        subtitle: {
            text: 'Source: Wikipedia.org'
        },
        xAxis: {
            categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],//todo: poner fechas
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'gramos'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' g'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
            name: 'desayuno',
            data: fetchStackedWeight('desayuno')
        }, {
            name: 'almuerzo',
            data: fetchStackedWeight('almuerzo')
        }, {
            name: 'merienda',
            data: fetchStackedWeight('merienda')
        }, {
            name: 'cena',
            data: fetchStackedWeight('cena')
        }]
    });
}