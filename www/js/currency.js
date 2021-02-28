var docurrency = function(){
    
    console.log("GETTING CURRENCY");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let currency = JSON.parse(this.responseText);
            console.log(currency);
            buildcurrency(currency);
        }
    };
     url = 'https://api.exchangeratesapi.io/latest?base=USD';
        
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}



function buildcurrency(currency){
    let workspace = document.getElementById("content");
    workspace.innerHTML = "";

    const keys = Object.keys(currency);
    const ratekey = Object.keys(currency.rates);

    workspace.html(`<div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">currency   
    <span class="caret"></span></button>
    <ul class="dropdown-menu">
      
    </ul>
  </div>`)


    /*
    const table = $('<table></table>');
    const tr = '<tr></tr>';

    const frow = $(tr);
    frow.append('<th>Currency</th>, <th>Rate</th>');
    table.append(frow);

    const keys = Object.keys(currency);
    const ratekey = Object.keys(currency.rates);
    console.log(keys,ratekey, ratekey[0]);
    console.log(tr);
    const th = '<th>' + ratekeys[0] + '</th>';
    const td = '<td>' +  currency['rate'][ratekeys[0]] + '</td>';
    */

    
    
    const rows = $(tr)


    table.append('')
    //TODO : CURRENCY DATA IS IN JSON OBJECT currency
    //All you need to do is build it into content.
    

}


