const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
 

var url = 'https://api.bitkub.com/api/market/ticker';
var token = '' // Line Notify Token
fetch(url)
.then(res => res.json())
.then(res => {
    console.log( res.THB_ETH.last )
    line_notify("Last: "+res.THB_ETH.last+"\nHight: "+res.THB_ETH.highestBid+"\nLow: "+res.THB_ETH.lowestAsk+"\nChange: "+res.THB_ETH.change)
});

line_notify = (msg) => {
    const params = new URLSearchParams();
    var d = new Date();
    params.append('message', "Etherium state "+d+"\n" + msg);

    fetch('https://notify-api.line.me/api/notify',
    {
        method: 'post',
        body:    params,
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+token
        },
    })
    .catch(err => {
        console.log(err)
    })
}
