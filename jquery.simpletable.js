(function( $ ){

   	$.fn.simpletable = function(options ) {
   		// Initialization
   		var opts = $.extend( {}, $.fn.simpletable.defaults, options );
		var tableElement = $(this);
		var addButtonHtml = "<button type='button' class='btn btn-md btn-success text-center' id='baddtable'><span class='glyphicon glyphicon-plus' aria-hidden='true'></span></button></td>"
		var columns = tableElement.find("th"), idString = [], typeString = [], staticString = [];
		var idPrime, dataTable;

		var renderTableView = function(data){
			tableElement.find("tbody").empty();
			var newRow = "";
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				newRow += "<tr>";
				for(var j = 0; j < idString.length; j++){
					if(typeString[j] == "custom"){
						newRow += "<td class='text-center' id='"+ idString[j] + "''>";
						newRow += opts.customRenderView[idString[j]](i,rowData[idPrime],rowData[idString[j]]);
						newRow += "</td>"
					}
					else{
						newRow += "<td class='text-center' id='"+ idString[j] + "''>" + rowData[idString[j]] + "</td>";
					}
				}
				newRow += "<td class='text-center'>" + "<button type='button' class='btn btn-xs btn-warning bedit'>Edit</button></td> ";
				newRow += "<td class='text-center'>" +"<button type='button' class='btn btn-xs btn-danger bdel'>Delete</button></td>";
			}

			console.log($("table#list_badges"));
			console.log(tableElement);
			tableElement.find("tbody").append(newRow);
		};

		var renderTableEdit = function(data, target){
			tableElement.find("tbody").empty();
			var elmPrimeId = $(target).parent().parent().find("#"+idPrime);
			var valuePrimeId = elmPrimeId.text();
			var newRow = "";
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				newRow += "<tr>";
				console.log(rowData[idPrime] + " " + valuePrimeId);
				if(rowData[idPrime] == valuePrimeId){
					// input box
					for(var j = 0; j < idString.length; j++){
						//static check
						if(staticString[j]){
							// static not work for custom type
							if(typeString[j] == "custom"){
								newRow += "<td class='text-center' id='"+ idString[j] + "''>";
								newRow += opts.customRenderEdit[idString[j]](i,rowData[idPrime],rowData[idString[j]]);
								newRow += "</td>"
							}
							else{
								switch(typeString[j]){
									case "text":
									newRow += "<td class='text-center' id='"+ idString[j] + "''><input type=\"text\" class='form-control' value="+rowData[idString[j]]+" readonly></td>";
									break;
									case "number":
									newRow += "<td class='text-center' id='"+ idString[j] + "''><input type=\"number\" class='form-control' value="+rowData[idString[j]]+" readonly></td>";
									break;
									case "boolean":
									if(rowData[idString[j]]){
									newRow += "<td class='text-center' id='"+ idString[j] + "''><input type=\"checkbox\" class='form-control' checked readonly></td>";
									}
									else{
									newRow += "<td class='text-center' id='"+ idString[j] + "''><input type=\"checkbox\" class='form-control' readonly></td>";
									}
									break;
								}
							}		

						}
						else{
							if(typeString[j] == "custom"){
								newRow += "<td class='text-center' id='"+ idString[j] + "''>";
								newRow += opts.customRenderEdit[idString[j]](i,rowData[idPrime],rowData[idString[j]]);
								newRow += "</td>"
							}
							else{
								switch(typeString[j]){
									case "text":
									newRow += "<td class='text-center' id='"+ idString[j] + "''><input type=\"text\" class='form-control' value="+rowData[idString[j]]+"></td>";
									break;
									case "number":
									newRow += "<td class='text-center' id='"+ idString[j] + "''><input type=\"number\" class='form-control' value="+rowData[idString[j]]+"></td>";
									break;
									case "boolean":
									if(rowData[idString[j]]){
									newRow += "<td class='text-center' id='"+ idString[j] + "''><input type=\"checkbox\" class='form-control' checked></td>";
									}
									else{
									newRow += "<td class='text-center' id='"+ idString[j] + "''><input type=\"checkbox\" class='form-control' ></td>";
									}
									break;
								}
							}							
						}

					}
					newRow += "<td class='text-center'>" + "<button type='button' class='btn btn-xs btn-success bsave'>Save</button></td> ";
					newRow += "<td class='text-center'>" +"<button type='button' class='btn btn-xs btn-danger bcancel'>Cancel</button></td>";
				}
				else{
					for(var j = 0; j < idString.length; j++){
						if(typeString[j] == "custom"){
							newRow += "<td class='text-center' id='"+ idString[j] + "''>";
							newRow += opts.customRenderView[idString[j]](i,rowData[idPrime],rowData[idString[j]]);
							newRow += "</td>"
						}
						else{
							newRow += "<td class='text-center' id='"+ idString[j] + "''>" + rowData[idString[j]] + "</td>";
						}
					}
					newRow += "<td class='text-center'>" + "<button type='button' class='btn btn-xs btn-warning bedit'>Edit</button></td> ";
					newRow += "<td class='text-center'>" +"<button type='button' class='btn btn-xs btn-danger bdel'>Delete</button></td>";
				}
			}
			tableElement.find("tbody").append(newRow);
		};

		var appendEmptyRow = function(){
			var newRow = "<tr>";
			for(var j = 0; j < idString.length; j++){
				if(typeString[j] == "custom"){
					newRow += "<td class='text-center' id='"+ idString[j] + "''>";
					newRow += opts.customRenderEdit[idString[j]](null,null);
					newRow += "</td>"
				}
				else{
					switch(typeString[j]){
						case "text":
							newRow += "<td class='text-center' id='"+ idString[j] + "''><input type=\"text\" class='form-control'></td>";
						break;
						case "number":
							newRow += "<td class='text-center' id='"+ idString[j] + "''><input type=\"number\" class='form-control'></td>";
						break;
						case "boolean":
							newRow += "<td class='text-center' id='"+ idString[j] + "''><input type=\"checkbox\" class='form-control' ></td>";
						break;
					}
				}		

			}
			newRow += "<td class='text-center'>" + "<button type='button' class='btn btn-xs btn-success badd'>Add</button></td> ";
			newRow += "<td class='text-center'>" +"<button type='button' class='btn btn-xs btn-danger bcancel'>Cancel</button></td>";
			tableElement.find("tbody").append(newRow);
		};

		var getEditedData = function(rowElement){
			if(opts.format.toLowerCase() == "json"){
				var obj = {};
				console.log(rowElement);
				for(var j = 0; j < idString.length; j++){
					if(!staticString[j]){
						switch(typeString[j]){
							case "custom":
								var value = opts.customSave[idString[j]]();
								// ignore if empty
								if(value){
									obj[idString[j]] = value;
								}
							break;
							case "boolean":
								var value = rowElement.find("#" + idString[j] + " input").prop("checked");
								// ignore if empty
								if(value){
									obj[idString[j]] = value;
								}
							break;
							default:
								var value = rowElement.find("#" + idString[j] + " input").val();
								// ignore if empty
								if(value){
									obj[idString[j]] = value;
								}
						}
					}
				}
				return obj;
			}
			if(opts.format.toLowerCase() == "form"){
				var form = new FormData();
				console.log(rowElement);
				for(var j = 0; j < idString.length; j++){
					if(!staticString[j]){
						switch(typeString[j]){
							case "custom":
								var value = opts.customSave[idString[j]]();
								// ignore if empty
								if(value){
									form.append(idString[j],value);
								}
							break;
							case "boolean":
								var value = rowElement.find("#" + idString[j] + " input").prop("checked");
								// ignore if empty
								if(value){
									form.append(idString[j],value);
								}
							break;
							default:
								var value = rowElement.find("#" + idString[j] + " input").val();
								// ignore if empty
								if(value){
									form.append(idString[j],value);
								}
						}
					}
				}
				return form;
			}
			throw "Format is not recognized, try \"json\" or \"form\" ";
			
		};

		var getAddedData = function(rowElement){
			if(opts.format.toLowerCase() == "json"){
				var obj = {};
				console.log(rowElement);
				for(var j = 0; j < idString.length; j++){
					switch(typeString[j]){
						case "custom":
							var value = opts.customSave[idString[j]]();
							obj[idString[j]] = value;
						break;
						case "boolean":
							var value = rowElement.find("#" + idString[j] + " input").prop("checked");
							obj[idString[j]] = value;
						break;
						default:
							var value = rowElement.find("#" + idString[j] + " input").val();
							obj[idString[j]] = value;
					}
				}
				return obj;
			}
			if(opts.format.toLowerCase() == "form"){
				var form = new FormData();
				console.log(rowElement);
				for(var j = 0; j < idString.length; j++){
					switch(typeString[j]){
						case "custom":
							var value = opts.customSave[idString[j]]();
							form.append(idString[j],value);
						break;
						case "boolean":
							var value = rowElement.find("#" + idString[j] + " input").prop("checked");
							form.append(idString[j],value);
						break;
						default:
							var value = rowElement.find("#" + idString[j] + " input").val();
							console.log(idString[j] + " " + value);
							form.append(idString[j],value);
					}
				}
				return form;
			}
			throw "Format is not recognized, try \"json\" or \"form\" ";
			
		};

   		var init = function(){

	   		$.each(columns,function(k,v){
	   			idString.push($(v).attr("id"));
	   			typeString.push($(v).attr("type"));
	   			if($(v).attr("static")){
	   				staticString.push(true);
	   			}
	   			else{
		   			staticString.push(false);	
	   			}
	   			console.log($(v).attr("prime"));
	   			if($(v).attr("prime")){
	   				idPrime = $(v).attr("id");
	   			}
	   		});
	   		if(!idPrime){
	   			throw "No prime ID set";
	   		}
	   		idString = idString.slice(0,idString.length - 2);
	   		typeString = typeString.slice(0,typeString.length - 2);
	   		console.log(typeString);
	   		console.log(staticString);
	   		var resJSON;

			$(tableElement).after(addButtonHtml);

			 $.get(opts.getURL(),
            	function(dataraw){
	   			var data = opts.dataFormatter(dataraw);
	   			dataTable = data;
	   			console.log(dataTable);
	   			renderTableView(data);
	   			// Only at first
	   			registerListener();
	   		});
   		};

		var getDataFromServer =  function(){

            $.get(opts.getURL(),
            	function(dataraw){
	   			var data = opts.dataFormatter(dataraw);
	   			dataTable = data;
	   			renderTableView(data);
	   		});
   		};

		var refreshTable = function(){
			getDataFromServer();
		};

		var registerListener = function(){
			tableElement.find("tbody").on("click",".bedit",function(e){
				renderTableEdit(dataTable,e.target);
			});
			tableElement.find("tbody").on("click",".bsave",function(e){
				var rowElement = $(e.target).parent().parent();
				var elmPrimeId = rowElement.find("#"+idPrime);
				var valuePrimeId = elmPrimeId.find("input").val();
				var dataAjax = getEditedData(rowElement);
				$.ajax({
	                url:opts.editURL(valuePrimeId),
	                type:"PUT",
	                processData: false,
	                data: dataAjax,
	                contentType: false,
	                crossDomain: true,
	                success : function(data,status){
	                console.log(data);

	   				getDataFromServer();
	            }, error : function(error){
	                console.log(error);
	            }});
				
			});
			tableElement.find("tbody").on("click",".bdel",function(e){
				var rowElement = $(e.target).parent().parent();
				var elmPrimeId = rowElement.find("#"+idPrime);
				var valuePrimeId = elmPrimeId.text();
				$.ajax({
	                url:opts.deleteURL(valuePrimeId),
	                type:"DELETE",
	                processData: false,
	                contentType: false,
	                crossDomain: true,
	                success : function(data,status){
		                console.log(data);
		                refreshTable();
	            }, error : function(error){
	                	console.log(error);
	            }});
			});
			tableElement.find("tbody").on("click",".bcancel",function(e){
				renderTableView(dataTable);
				$("#baddtable").prop('disabled', false);
			});
			tableElement.find("tbody").on("click",".badd",function(e){
				var rowElement = $(e.target).parent().parent();
				var elmPrimeId = rowElement.find("#"+idPrime);
				var valuePrimeId = elmPrimeId.find("input").val();
				var dataAjax = getAddedData(rowElement);
				// for (var pair of dataAjax.entries()) {
				//     console.log(pair[0]+ ', ' + pair[1]); 
				// }
				$.ajax({
	                url:opts.addURL(valuePrimeId),
	                type:"POST",
	                processData: false,
	                data: dataAjax,
	                contentType: false,
	                crossDomain: true,
	                success : function(data,status){
	                console.log(data);
					$("#baddtable").prop('disabled', false);
	   				refreshTable();
	            }, error : function(error){
	                console.log(error);
	            }});
			});
			$("#baddtable").on("click",function(e){
				if(!$("#baddtable").prop('disabled')){
					appendEmptyRow();
					$("#baddtable").prop('disabled', true);
				}
			});
		};


		init();
		return this;
   }; 

   	$.fn.simpletable.defaults = {
		getURL : function(){},
		deleteURL : function(){},
		editURL : function(){},
		addURL : function(){},
		customRenderView : {},
		customRenderEdit : {},
		dataFormatter : function(){},
		format : "form"
	};
})( jQuery );