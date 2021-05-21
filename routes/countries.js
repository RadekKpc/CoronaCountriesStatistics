
const express = require('express');
const router = express.Router();
const unirest = require("unirest");
const path = require('path');
// Home page route.
// https://rapidapi.com/apilayernet/api/rest-countries-v1

const apiCredenatials = require('../config/country_api');

router.post('/population/top', function (user_req, user_res) {
    console.log(user_req.body);
    const reverse = user_req.body.reverse == "on";

    const req = unirest("GET", "https://restcountries-v1.p.rapidapi.com/all");

    req.headers(apiCredenatials);
    req.end((res) => {
        if (res.error) {
            user_res.sendFile(path.join(__dirname, "./views/404.html"))
        }
        const counteries = res.body;

        user_res.send(
            counteries
            .sort((a,b) => (b.population - a.population) * (reverse ? -1 : 1))
            .map(c => {return {name: c.name, population: c.population}})
            .filter(c => c.population != null)
            .slice(0, parseInt(user_req.body.top))
            );
    });

});

router.post('/area/top', function (user_req, user_res) {
    console.log(user_req.body);
    const reverse = user_req.body.reverse == "on";
    const req = unirest("GET", "https://restcountries-v1.p.rapidapi.com/all");
    
    req.headers(apiCredenatials);
    req.end((res) => {
        if (res.error) {
            user_res.sendFile(path.join(__dirname, "./views/404.html"))
        }
        const counteries = res.body;

        user_res.send(
            counteries
            .sort((a,b) => (b.area - a.area)* (reverse ? -1 : 1))
            .map(c => {return {name: c.name, area: c.area}})
            .filter(c => c.area != null)
            .slice(0, parseInt(user_req.body.top))
            );
    });

});


router.post('/population_area_ratio', function (user_req, user_res) {
    console.log(user_req.body);
    const req = unirest("GET", "https://restcountries-v1.p.rapidapi.com/all");
    const reverse = user_req.body.reverse == "on";
   
    req.headers(apiCredenatials);
    req.end((res) => {
        if (res.error) {
            user_res.sendFile(path.join(__dirname, "./views/404.html"))
        }
        const counteries = res.body;

        user_res.send(
            counteries
            .sort((a,b) => { 
                if(b.area == 0 || b.area == null) return -1;
                if(a.area == 0 || a.area == null) return 1;
                return (b.population/b.area - a.population/a.area)* (reverse ? -1 : 1)
            })
            .map(c => {return {name: c.name, ratio: c.population/c.area, d: c.population, a: c.area}})
            .slice(0, parseInt(user_req.body.top))
            );
    });

});

// About page route.
router.get('/about', function (req, res) {
  res.send('About this wiki');
})

module.exports = router;