express = require('express');
bodyParser = require('body-parser');
cors = require('cors');
request = require("request");
var port = 3000;

app = express();

app.use(cors());

app.get('/', function(req, res) {
  var key = process.env.SECRET_KEY||"AIzaSyB2fJm2TxdAszmoWLla4CAsiiHHbK-eeHQ";
  var str='';
  var str1 = JSON.stringify(req.query); 
  var str2=JSON.parse(str1);
  for (var key1 in str2){
         str+=str2[key1];
}
  var city=str;

var url1 = "https://maps.googleapis.com/maps/api/place/autocomplete/json?"+ "input=" + city + "&types=(cities)&language=en&key=" + key;
request(url1, function (error,response,body) {
  if (!error && response.statusCode == 200) {
      res.send(body);
  }
})
})

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())

app.get('/route1', function(req, res){
  var key = process.env.SECRET_KEY||"AIzaSyB2fJm2TxdAszmoWLla4CAsiiHHbK-eeHQ";
  var city = req.query.City;
  var street = req.query.Street;
  var state = req.query.State;
  geocode=encodeURI(street)+","+encodeURI(city)+","+encodeURI(state);
  var url2 = "https://maps.googleapis.com/maps/api/geocode/json?address="+geocode+"&key="+key;

  request(url2, function (error,response,body2) {
  if (!error && response.statusCode == 200) {
	res.send(body2);
        }
  })
}) 
 
app.get('/route2', function(req, res){
  var lat=req.query.latitude;
  var long=req.query.longitude;;
  var key1="9239f441bfe562a2b01fcd6d13faa9fe";
  var url3="https://api.darksky.net/forecast/"+key1+"/"+lat+","+long;

  request(url3, function (error,response,body3) {
        if (!error && response.statusCode == 200) {
		res.send(body3);
        }
  })

})

app.get('/route3', function(req, res){
  var state=req.query.id;
  var key="AIzaSyB2fJm2TxdAszmoWLla4CAsiiHHbK-eeHQ";
  var search_id="001232095785889877006:k7f9zftgbio";
  var url="https://www.googleapis.com/customsearch/v1?q="+state+"%20State%20Seal&cx="+search_id+"&imgSize=huge&imgType=news&num=1&searchType=image&key="+key;
  
  request(url,function (error,response,body) {
  	if (!error && response.statusCode ==200) {
		res.send(body);
	}
  })
  
})

app.get('/route4', function(req, res){
  var key="9239f441bfe562a2b01fcd6d13faa9fe";
  var url="https://api.darksky.net/forecast/"+key+"/"+req.query.latitude+","+req.query.longitude+","+req.query.wtime;

  request(url,function (error,response,body) {
        if (!error && response.statusCode ==200) {
                res.send(body);
        }
  })

})

app.listen(port, () => {
  console.log('listening on port',port);
})
