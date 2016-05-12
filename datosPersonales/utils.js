var url = 'https://docs.google.com/spreadsheets/d/1YVeqOasXT_4cXKVKq1JaeXEl3XbWBkXxh3smlnikDi0/pub?output=csv';


var series = [
	{
		name: 'desayuno',
		color:'rgba(102,194,165, .5)'
	},
	{
		name: 'almuerzo',
		color:'rgba(252,141,98, .5)'
	},
	{
		name: 'merienda',
		color:'rgba(141,160,203, .5)'
	},
	{
		name: 'cena',
		color:'rgba(231,138,195, .5)'
	}
];


function loadCSV(){
	var rawData;
	$.ajax(
		{
			url: url, 
			async: false, 
			crossDomain: true,
			success: function(data){
				rawData = data;
			}
		}
		);
	return rawData;
}

		//var csv is the CSV file with headers
function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }
  
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

function loadData(){
	return eval(csvJSON(loadCSV()));
}

function fetchData(formatter) {
   return $(loadData()).map(
    function(){
        return [formatter(this)];
    });
}

function fetchDataForDateXMealWeight(serie){
    return fetchData(function(data){
        var dateStr = data.fecha.split('/');
        return [
                Date.UTC(dateStr[2],dateStr[1]-1,dateStr[0]),
                coallesce(parseFloat(data[serie+'.peso']),"",0)
            ];
    });
}

function fetchWeightEvolution() {
	return fetchData(function(data){
        var dateStr = data.fecha.split('/');
        return [
                Date.UTC(dateStr[2],dateStr[1]-1,dateStr[0]),
                coallesce(parseFloat(data['peso']),"",'')
            ];
    });
}

function fetchStackedWeight(serie){
    return fetchData(function(data){
    	var dateStr = data.fecha.split('/');
        var date = Date.UTC(dateStr[2],dateStr[1]-1,dateStr[0]);

        var weight = coallesce(parseFloat(data[serie+'.peso']),"",'');

		if(weight == ''){
			return [ date, '' ];
        }else{
        	return [ date, weight ];
        }

    });
}

function fetchDataForDateXHourXMealWeight(serie){
    return fetchData(function(data){
        var dateStr = data.fecha.split('/');
        var date = Date.UTC(dateStr[2],dateStr[1]-1,dateStr[0]);

        var hour = coallesce(parseInt(data[serie+'.hora']),"",0);
        if(hour < 6 && serie == 'cena'){
        	hour += 24;
        }

        var weight = coallesce(parseFloat(data[serie+'.peso']),"",'');

        if(weight == ''){
			return [ date, '', '' ];
        }else{
        	return [ date, hour, weight ];
        }
    });
}

function coallesce(value, nullValueCondition, sustitutionValue) {
    if(value == nullValueCondition || isNaN(value)){
        return sustitutionValue;
    }else{
        return value;
    }
}

function drawChart(divId, conf){
	$('#'+divId).highcharts(conf);
}