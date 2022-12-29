var link = "https://www.mercadobitcoin.net/api/BTC/trades/";
		
function buscarOperacoes(){
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = funcaoTrataRespostaServidor;
	xmlhttp.responseType="text";
	xmlhttp.open("GET",link,true);
	xmlhttp.send();
}

async function funcaoTrataRespostaServidor(){
	try {
		const response = this.responseText;
		const obj = JSON.parse(response).reverse();
		
		var table = document.getElementById("table_info");
		var tbodyRef = document.getElementById('table_info').getElementsByTagName('tbody')[0];
		
		//Limpando o tbody da table
		var numero_linhas = tbodyRef.rows.length;
		if(numero_linhas > 0){
			for (let j = numero_linhas; j >= 1; j--) {
				table.deleteRow(j);
			}
		}
		
		for (let i = 0; i < 10; i++) {
			let milissegundos = await pegarData(obj[i]);
			let dateFull = new Date(milissegundos);
			
			// Insere uma linha no final da tabela
			let newRow = tbodyRef.insertRow();
			
			// Insere uma célula no final da linha e o texto em cada célula
			let newCell0 = newRow.insertCell();
			let newText0 = document.createTextNode(obj[i].tid);
			newCell0.appendChild(newText0);
			
			let newCell1 = newRow.insertCell();
			let newText1 = document.createTextNode(dateFull.toLocaleString());
			newCell1.appendChild(newText1);
			
			let newCell2 = newRow.insertCell();
			let newText2 = document.createTextNode("R$ "+(obj[i].price.toFixed(2)));
			newCell2.appendChild(newText2);
			
			let newCell3 = newRow.insertCell();
			let newText3 = document.createTextNode(obj[i].amount);
			newCell3.appendChild(newText3);
			
			let newCell4 = newRow.insertCell();
			let newText4 = document.createTextNode(obj[i].type);
			newCell4.appendChild(newText4);
		}
	} catch (err) {
		//console.log('error', err);
	}
	
}

function pegarData(obj){
	let milissegundos = (obj.date)*1000; //Convertendo de segundos para milissegundos

	return milissegundos;
}

function btnBuscar(){
	var input_date = document.querySelector("#date");
	var texto_date = input_date.value;
	
	if(texto_date != ""){
		clearInterval(intervalo);
		data = new Date(texto_date);
		let segundos = data.getTime()/1000; //Convertendo de milissegundos para segundos
		link = "https://www.mercadobitcoin.net/api/BTC/trades/" + segundos.toString() + "/";
		//console.log(link);
		buscarOperacoes();
	}
}

var intervalo = setInterval(buscarOperacoes, 5000);