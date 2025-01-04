const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');


app.get('/', async(req, res) => {


    
    
    const url = "https://weatherapi-com.p.rapidapi.com/current.json?q=metar:VIDP";

    const response = await axios.get(url,{ 
        headers: {
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        'x-rapidapi-key': '9b996c3356msh3ed6f1d413e0c56p1d1011jsnf7d8a90fecc0',
    }});

    const apiData = response.data;
    console.log(apiData);
    res.render('index', { data: apiData });
});

app.post('/metar', async(req, res) => {
    
    const ic = req.body.ICAO;
    
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=metar:${ic}`;

    const response = await axios.get(url,{ 
        headers: {
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        'x-rapidapi-key': '9b996c3356msh3ed6f1d413e0c56p1d1011jsnf7d8a90fecc0',
    }});

    const apiData = response.data;
    console.log(apiData);
    res.render('index', { data: apiData });
    
});



app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`)
});





// Serve static files (if needed)
//app.use(express.static(path.join(__dirname, 'public')));