function drawDateXMealWeightChart(divId){
    var conf = {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Comparación de pesos de comidas'
        },
        xAxis: {
            title: {
                enabled: true
            },
            type: 'datetime',
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'peso (g)'
            },
            min: 250
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
        series: []
    };

    conf.series = $(series).map(
        function(){
            return [ 
            {
                name: this.name,
                data: fetchDataForDateXMealWeight(this.name),
                color: this.color
            }];
        }
    );

    drawChart(divId,conf);
}

function drawAcummelatedMealWeightChart(divId){
    var conf = {
        chart: {
            type: 'area'
        },
        title: {
            text: 'Peso acumulado de comidas'
        },
        xAxis: {
            type: 'datetime',
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'peso (g)'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            formatter: function() {
                var s = '<b>'+ Highcharts.dateFormat('%e %b', this.x) +'</b>',
                    sum = 0;
                
                $.each(this.points, function(i, point) {
                    s += '<br/>'+ point.series.name +': '+
                        point.y +'g';
                    sum += point.y;
                });
                
                s += '<br/>Total: <b>'+sum+'g</b>';
                
                return s;
            },
            shared: true
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
        series: []
    };

    conf.series = $(series.reverse()).map(
        function(){
            return [ 
            {
                name: this.name,
                data: fetchStackedWeight(this.name),
                color: this.color
            }];
        }
    );

    drawChart(divId,conf);
}

function drawDateXHourXMealWeightChart(divId){
    var conf = {

        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        title: {
            text: 'Distribución de comidas en pesos y horarios'
        },
        subtitle: {
            text: 'el tiempo se lee en MÓDULO 24'
        },

        xAxis: {
            gridLineWidth: 1,
            type: 'datetime'
        },

        yAxis: {
            title: {
                text: 'tiempo (h)'
            },
            startOnTick: false,
            endOnTick: false,
            min: 5
        },
    
        tooltip: {
            crosshairs: [true, true],
            formatter: function () {
                return '( '+Highcharts.dateFormat('%e %b', this.point.x) +' , '+this.point.y%24+'hs ) -> <b>'+this.point.z+'g</b>';
            }
        },

        series: []

    };

    conf.series = $(series).map(
        function(){
            return [ 
            {
                name: this.name,
                data: fetchDataForDateXHourXMealWeight(this.name),
                marker: {
                    fillColor: {
                        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                        stops: [
                            [0, 'rgba(255,255,255,0.5)'],
                            [1, this.color]
                        ]
                    }
                }
            }];
        }
    );

    drawChart(divId,conf);

}

function drawWeightEvolutionChart(divId) {
    var conf = {
        title: {
            text: 'Evolución del peso corporal',
            x: -20 //center
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'peso (kg)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            min: 63
        },
        tooltip: {
            valueSuffix: 'kg'
        },

        series: []
    };

    conf.series = [ 
    {   name: 'peso corporal',
        showInLegend: false,
        data: fetchWeightEvolution() 
    } ];
        

    drawChart(divId,conf);       
}