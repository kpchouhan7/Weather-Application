const express = require('express'); 
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res){

res.sendFile(__dirname+"/index.html");


}); 

app.post('/', function(req, res){

                       
    var query =  req.body.cityName;
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=a1a060627ee3739ded2375046b0a3555&units=metric";
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp =  weatherData.main.temp;
            const icon = weatherData.weather[0].icon
            const v = "http://openweathermap.org/img/wn/"+icon+ "@2x.png"
            const weatherDescription = weatherData.weather[0].description;
            res.write("<p>The weather is " + weatherDescription +  "</p>");
            res.write("<h1>The curent temperature in " + query +" is " +temp +" &#8451</h1>");
            res.write("<img src="+v+">")
        })
    })
})


app.listen(3000,function(){
    console.log("Server started at port 3000");
    
})
