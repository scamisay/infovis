var url = 'https://docs.google.com/spreadsheets/d/1YVeqOasXT_4cXKVKq1JaeXEl3XbWBkXxh3smlnikDi0/pub?output=csv';





function loadCSV(){
	var rawData;
	$.ajax({url: url, async: false, success: function(data){rawData = data;}});
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