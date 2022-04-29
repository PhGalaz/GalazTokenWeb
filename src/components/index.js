const axios = require('axios')
const crypto = require("crypto");




const base = 'https://b2t-api-cmc-staging-5.flexprotect.org/'
const base2 = 'https://b2t-api-cmc-staging-5.flexprotect.org/marketdata/cmc/v1/'

var email = "test+1@galaz.de"
var password = "CapHold123!"
const api_key_public = '3d751b4e-ab64-4c27-9fb3-caa2ab2de831'
const api_key_private = '6413d6ea-2b27-46f1-9581-11dfd7767f25'






const config = {
    headers: { Authorization: `Bearer e5be984d-a913-4928-87b5-074474302b0b` }
};







var nonce = 0

function getNonce(){
  nonce = nonce++
  return nonce
}


// function encrypt(key, str) {
//   var hmac = crypto.createHmac("sha512", key);
//   var signed = hmac.update(new Buffer(str, 'utf-8')).digest("base64");
//   return signed
// }
//
//
// //creating hmac object
// var hmac = crypto.createHmac('sha512', api_key_private);
// //passing the data to be hashed
// data = hmac.update('nodejsera');
// //Creating the hmac in the required format
// gen_hmac= data.digest('hex');
// //Printing the output on the console
// console.log("hmac : " + gen_hmac);









//////////////////// Call API Using the Authorization Code Flow with PKCE ////////////////////


// Dependency: Node.js crypto module
// https://nodejs.org/api/crypto.html#crypto_crypto

function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
var verifier = base64URLEncode(crypto.randomBytes(32));

function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}
var challenge = base64URLEncode(sha256(base64URLEncode(crypto.randomBytes(32))));






///////////////////////////////////////////////////
////////////////// Trading APi ////////////////////
///////////////////////////////////////////////////







// Returns up-to-date information about all currency pairs (instruments) supported by the exchange.
// zec_eth:
//  { baseAsset: 'zec',
//    quoteAsset: 'eth',
//    minAmount: 0,
//    priceDeviation: 0,
//    hidden: 1,
//    makerFee: 0,
//    makerFeeLimit: 0,
//    takerFee: 0.001,
//    takerFeeLimit: 0,
//    priceScale: 8,
//    amountScale: 8,
//    createdAt: '2021-12-03T14:35:48.438029Z',
//    updatedAt: '2022-04-05T14:45:07.388344Z',
//    status: 'Open',
//    side: 'BuySell' },

async function supportedInstruments(){
  var furl = base + 'frontoffice/api/info'
  const resp = await axios.get(furl, {})
  .then((res) => {
    console.log(res.data)
  })
  .catch((error) => {
    console.error(error.response.data)
  })
  return resp
}






// Returns an order book information for a specified currency pair (instrument).
// { instrument: 'eth_btc',
//   bids: [],
//   asks: [],
//   version: 0,
//   askTotalAmount: 0,
//   bidTotalAmount: 0,
//   snapshot: true }

async function orderBookSnapshot(instrument){
  var furl = base + 'marketdata/instruments/' + instrument + '/depth'
  const resp = await axios.get(furl, {})
  .then((res) => {
    console.log(res.data)
  })
  .catch((error) => {
    console.error(error.response.data)
  })
  return resp
}







// Returns candlestick chart data for a specified currency pair (instrument).
// {
//   "success": true,
//   "instrument": "btc_usdt",
//   "data": [
//     {
//       "instrument": "btc_usdt",
//       "start": "2019-03-13T09:00:00Z",
//       "end": "2019-03-13T10:00:00Z",
//       "low": 3842.855,
//       "high": 3855.445,
//       "volume": 4,
//       "quoteVolume": 0,
//       "open": 3855.105,
//       "close": 3842.855
//     },
//     {
//       "instrument": "btc_usdt",
//       "start": "2019-03-13T10:00:00Z",
//       "end": "2019-03-13T11:00:00Z",
//       "low": 3834.355,
//       "high": 3848.855,
//       "volume": 26,
//       "quoteVolume": 0,
//       "open": 3842.865,
//       "close": 3835.655
//     }
//   ],
//   "startDateTime": "2019-03-13T09:00:00Z",
//   "endDateTime": "2019-03-13T11:00:00Z"
// }

async function instrumentCandles(instrument,startDate,endDate,type,count){
  var furl = base + 'marketdata/instruments/' + instrument + '/history'
  const resp = await axios.get(furl, {
    params: {
      startDate: startDate,
      endDate: endDate,
      type: type
    }
  })
  .then((res) => {
    console.log(res.data)
  })
  .catch((error) => {
    console.error(error.response.data)
  })
  return resp
}







////////////////////////////////// base2 //////////////////////////////////






// assetInfo()
// Returns up-to-date information about supported assets.
// {
//   "BTC": {
//     "name": "btc",
//     "can_withdraw": true,
//     "can_deposit": true,
//     "min_withdraw": "0.00000001",
//     "max_withdraw": "100000000"
//   },
//   "USDT": {
//     "name": "usdt",
//     "can_withdraw": true,
//     "can_deposit": true,
//     "min_withdraw": "0.00000001",
//     "max_withdraw": "100000000"
// }

async function assetInfo(){
  var furl = base2 + 'asset'
  const resp = await axios.get(furl, {})
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    console.error(error.response)
  })
  return resp
}





// summary()
// Returns summary information about a specified market. The data is aggregated for the last 24 hours.
// {
//   "BTC_USDT": {
//     "id": "btc_usdt",
//     "last": "10978.93578",
//     "lowestAsk": "10979.0",
//     "highestBid": "10978.71",
//     "percentChange": "0.0813730364297798727996051454",
//     "baseVolume": "6.47119743",
//     "quoteVolume": "70829.9781692126756",
//     "isFrozen": "0",
//     "high24hr": "10985.0049",
//     "low24hr": "10857.95376"
//   },
//   "BTC_USD": {
//     "id": "btc_usd",
//     "last": "0",
//     "lowestAsk": "0",
//     "highestBid": "0",
//     "percentChange": "0",
//     "baseVolume": "0",
//     "quoteVolume": "0",
//     "isFrozen": "0",
//     "high24hr": "0",
//     "low24hr": "0"
//   }
// }

async function summary(){
  var furl = base2 + 'summary'
  const resp = await axios.get(furl, {})
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    console.error(error.response)
  })
  return resp
}







// ticketInfo()
// Returns up-to-date ticker information.
// {
//   "dash_btc": {
//     "base_name": "dash",
//     "quote_name": "btc",
//     "last_price": "0",
//     "base_volume": "0",
//     "quote_volume": "0",
//     "isFrozen": "1"
//   },
//   "eth_usdt": {
//     "base_name": "eth",
//     "quote_name": "usdt",
//     "last_price": "423.9936",
//     "base_volume": "2942.97774",
//     "quote_volume": "1273092.080666887",
//     "isFrozen": "0"
//   }
// }

async function ticketInfo(){
  var furl = base2 + 'ticker'
  const resp = await axios.get(furl, {})
  .then((res) => {
    console.log(res.data)
  })
  .catch((error) => {
    console.error(error.response)
  })
  return resp
}











// tradesInfo()
// Returns information about all trades related to a specified currency pair (instrument) and executed within the last 24 hours.
// [
//   {
//     "tradeID": "1247307",
//     "price": "10093.92246491",
//     "base_volume": "0.0259",
//     "quote_volume": "261.432591841169",
//     "trade_timestamp": "1599577070",
//     "type": "buy"
//   },
//   {
//     "tradeID": "1247309",
//     "price": "10091.69185435",
//     "base_volume": "0.0754",
//     "quote_volume": "760.913565817990",
//     "trade_timestamp": "1599577128",
//     "type": "sell"
//   }
// ]

async function tradesInfo(instrument){
  var furl = base2 + 'trades/' + instrument
  const resp = await axios.get(furl, {})
  .then((res) => {
    console.log(res.data)
  })
  .catch((error) => {
    console.error(error.response)
  })
  return resp
}









////////////////////////////////// Private calls //////////////////////////////////



// axios.post(
//     url,
//     bodyParameters,
//     config
//   ).then(console.log).catch(console.log);




// Places a new order on the exchange.
async function placeOrder(public_key,private_key,order){
  var furl = base + 'frontoffice/api/order'
  const resp = await axios.post(furl, {
    headers: {
      Key: api_key_public,
      Sign: api_key_private
    },
    params: {
      ts: new Date(),
      nonce: getNonce(),
      order: {
        instrument: "btc_usdt",
        type: "sell",
        amount: 1,
        price: 1,
        isLimit: true,
        isStop: false,
        isFok: false,
        activationPrice: 0,
        clientOrderId: "6fdf688e-00b0-4c68-82dd-3aee5c727ed1"
      }
    }
  })
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    console.error(error.response)
  })
  return resp
}




// Returns a history of orders meeting specified criteria or a history of all orders if no parameters are defined in a request.async function ordersHistory(){
async function ordersHistory(){
  var furl = base + 'frontoffice/api/order_history'
  const resp = await axios.get(furl, {
    headers: {
      Key: api_key_public,
      Sign: api_key_private
    },
    params: {
      ts: new Date(),
      nonce: getNonce()
    }
  })
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    console.error(error.response.data)
  })
  return resp
}


// Returns a history of trades meeting specified criteria or a history of all trades if no parameters are defined in a request.
async function tradesHistory(){
  var furl = base + 'frontoffice/api/trade_history'
  const resp = await axios.get(furl, {
    headers: {
      Key: api_key_public,
      Sign: api_key_private
    },
    params: {
      ts: new Date(),
      nonce: getNonce()
    }
  })
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    console.error(error.response.data)
  })
  return resp
}








// Returns up-to-date information about the total and locked amount of each asset on user balances.
async function userBalance(){
  var furl = base + 'frontoffice/api/balances'
  const resp = await axios.get(furl, {
    headers: {
      Key: api_key_public,
      Sign: api_key_private
    },
    params: {
      ts: new Date(),
      nonce: 7878
    }
  })
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    console.error(error.response)
    console.error(error.response.data)
  })
  return resp
}








// Returns order details based on a specified order ID or client order ID.
async function orderInfo(orderId){
  var furl = base + 'frontoffice/api/orders'
  const resp = await axios.get(furl, {
    orderId: orderId,
    params: {
      ts: new Date(),
      nonce: getNonce()
    }
  })
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    console.error(error.response.data)
  })
  return resp
}









// Returns up-to-date information about orders placed by a current user.
async function myOrdersInfo(){
  var furl = base + 'frontoffice/api/orders/my'
  const resp = await axios.get(furl, {
    headers: {
      Key: api_key_public,
      Sign: api_key_private
    },
    params: {
      ts: new Date(),
      nonce: getNonce()
    }
  })
  .then((res) => {
    console.log(res)
  })
  .catch((error) => {
    console.error(error.response.data)
  })
  return resp
}









////////////////////////////////////////////////////
////////////////// Platform API ////////////////////
////////////////////////////////////////////////////

// Admin API?







// sign-in request must be sent to obtain cookies.
// {
//   "secondFactorRequired": true,
//   "message": "For your security, we have emailed you a one-time authentication code. Please enter this code below to proceed.",
//   "provider": "Email"
// }
// { secondFactorRequired: false,
//   account:
//    { nickname: 'CapitalHolding',
//      email: 'test+1@galaz.de',
//      id: '39ac9401-77e0-425c-ac7f-064667f52af2' } }


async function signin(email, password){
  var furl = base + 'identity/sign-in'
  const resp = await axios.post(furl, {
    email: email,
    password: password
  })
  .then((res) => {
    console.log(res.data)
  })
  .catch((error) => {
    console.error(error)
  })
  return resp
}








// In case of successful authorization, cookies will be provided which are valid only for IdentityServer.

// Next, a request must be sent to obtain the xmlHttpRequest.responseURL code.
// {
//   "secondFactorRequired": true,
//   "message": "For your security, we have emailed you a one-time authentication code. Please enter this code below to proceed.",
//   "provider": "Email"
// }

async function connectAuthorize(client_id,redirect_uri){
  console.log(base64URLEncode(sha256(base64URLEncode(crypto.randomBytes(32)))))
  var furl = base + 'identity/connect/authorize'
  const resp = await axios.get(furl, {
    scope: 'openid profile FrontOffice BackOffice offline_access',
    code_challenge: base64URLEncode(sha256(base64URLEncode(crypto.randomBytes(32)))),
    code_challenge_method: 'S256',
    response_type: 'code',
    client_id: client_id,
    redirect_uri: redirect_uri,
    params: {
      ts: new Date(),
      nonce: getNonce()
    }
  })
  .then((res) => {
    console.log(res.data)
  })
  .catch((error) => {
    console.error(error.response)
  })
  return resp
}
























































// signin(email, password)
connectAuthorize('spa_admin',base + 'sign-in-done')
// placeOrder()
// pairs()
// instrumentCandles('btc_usdt','2019-03-13T09:00:00','2019-03-13T11:00:00','1m')
// ordersHistory()
// tradesHistory()
// userBalance()
// orderInfo(5)
// myOrdersInfo()
// assetInfo()
// summary()
// ticketInfo()
// tradesInfo('btc_usd')
// supportedInstruments()
// orderBookSnapshot('eth_btc')
