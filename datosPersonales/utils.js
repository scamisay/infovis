var url = 'https://docs.google.com/spreadsheets/d/1YVeqOasXT_4cXKVKq1JaeXEl3XbWBkXxh3smlnikDi0/pub?output=csv';





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
                coallesce(parseInt(data[serie+'.peso']),"",0)
            ];
    });
}

function fetchStackedWeight(serie){
    return fetchData(function(data){
        return coallesce(parseInt(data[serie+'.peso']),"",0);
    });
}

function coallesce(value, nullValueCondition, sustitutionValue) {
    if(value == nullValueCondition){
        return sustitutionValue;
    }else{
        return value;
    }
}