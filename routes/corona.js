
const express = require('express');
const router = express.Router();
const unirest = require("unirest");
const path = require('path');
// Home page route.
// https://rapidapi.com/apilayernet/api/rest-countries-v1
// https://rapidapi.com/spamakashrajtech/api/corona-virus-world-and-india-data

const apiCredenatialsCountries = require('../config/country_api');
const apiCredenatialsCorona = require('../config/corona_api');


router.post('/countries/area/death/top', function (user_req, user_res) {
    console.log(user_req.body);
    const reverse = user_req.body.reverse == "on";
    const req_countries= unirest("GET", "https://restcountries-v1.p.rapidapi.com/all");
    const req_corona = unirest("GET", "https://corona-virus-world-and-india-data.p.rapidapi.com/api");

    req_countries.headers(apiCredenatialsCountries);
    req_corona.headers(apiCredenatialsCorona);

    req_countries.end((res) => {
        if (res.error) {
            user_res.sendFile(path.join(__dirname, "./views/404.html"))
        }
        const countries = res.body;
        
        req_corona.end((res) => {
            if (res.error) {
                user_res.sendFile(path.join(__dirname, "./views/404.html"))
            }
            const coronaCountries = res.body.countries_stat;
          
            user_res.send(
                countries
                .filter(c => coronaCountries.find(c2=> c2.country_name == c.name) != undefined)
                .map(c => {return {name: c.name, ratio: coronaCountries.find(c2=> c2.country_name == c.name).deaths.split(',').join('')/parseInt(c.area)}})
                .filter(c => c.ratio != null)
                .sort((a,b) => (b.ratio - a.ratio)* (reverse ? -1 : 1))
                .slice(0, parseInt(user_req.body.top))
                );
        });
    });

});

router.post('/countries/area/cases/top', function (user_req, user_res) {
    console.log(user_req.body);
    const reverse = user_req.body.reverse == "on";
    const req_countries= unirest("GET", "https://restcountries-v1.p.rapidapi.com/all");
    const req_corona = unirest("GET", "https://corona-virus-world-and-india-data.p.rapidapi.com/api");

    req_countries.headers(apiCredenatialsCountries);
    req_corona.headers(apiCredenatialsCorona);

    req_countries.end((res) => {
        if (res.error) {
            user_res.sendFile(path.join(__dirname, "./views/404.html"))
        }
        const countries = res.body;
        
        req_corona.end((res) => {
            if (res.error) {
                user_res.sendFile(path.join(__dirname, "./views/404.html"))
            }
            const coronaCountries = res.body.countries_stat;
          
            user_res.send(
                countries
                .filter(c => coronaCountries.find(c2=> c2.country_name == c.name) != undefined)
                .map(c => {return {name: c.name, ratio: coronaCountries.find(c2=> c2.country_name == c.name).cases.split(',').join('')/parseInt(c.area)}})
                .filter(c => c.ratio != null)
                .sort((a,b) => (b.ratio - a.ratio)* (reverse ? -1 : 1))
                .slice(0, parseInt(user_req.body.top))
                );
        });
    });

});

router.post('/countries/population/cases/top', function (user_req, user_res) {
    console.log(user_req.body);
    const reverse = user_req.body.reverse == "on";
    const req_countries= unirest("GET", "https://restcountries-v1.p.rapidapi.com/all");
    const req_corona = unirest("GET", "https://corona-virus-world-and-india-data.p.rapidapi.com/api");

    req_countries.headers(apiCredenatialsCountries);
    req_corona.headers(apiCredenatialsCorona);

    req_countries.end((res) => {
        if (res.error) {
            user_res.sendFile(path.join(__dirname, "./views/404.html"))
        }
        const countries = res.body;
        
        req_corona.end((res) => {
            if (res.error) {
                user_res.sendFile(path.join(__dirname, "./views/404.html"))
            }
            const coronaCountries = res.body.countries_stat;
          
            user_res.send(
                countries
                .filter(c => coronaCountries.find(c2=> c2.country_name == c.name) != undefined)
                .map(c => {return {name: c.name, ratio: coronaCountries.find(c2=> c2.country_name == c.name).cases.split(',').join('')/parseInt(c.population)}})
                .filter(c => c.ratio != null)
                .sort((a,b) => (b.ratio - a.ratio)* (reverse ? -1 : 1))
                .slice(0, parseInt(user_req.body.top))
                );
        });
    });

});

router.post('/countries/population/death/top', function (user_req, user_res) {
    console.log(user_req.body);
    const reverse = user_req.body.reverse == "on";
    const req_countries= unirest("GET", "https://restcountries-v1.p.rapidapi.com/all");
    const req_corona = unirest("GET", "https://corona-virus-world-and-india-data.p.rapidapi.com/api");

    req_countries.headers(apiCredenatialsCountries);
    req_corona.headers(apiCredenatialsCorona);

    req_countries.end((res) => {
        if (res.error) {
            user_res.sendFile(path.join(__dirname, "./views/404.html"))
        }
        const countries = res.body;
        
        req_corona.end((res) => {
            if (res.error) {
                user_res.sendFile(path.join(__dirname, "./views/404.html"))
            }
            const coronaCountries = res.body.countries_stat;
          
            user_res.send(
                countries
                .filter(c => coronaCountries.find(c2=> c2.country_name == c.name) != undefined)
                .map(c => {return {name: c.name, ratio: coronaCountries.find(c2=> c2.country_name == c.name).deaths.split(',').join('')/parseInt(c.population)}})
                .filter(c => c.ratio != null)
                .sort((a,b) => (b.ratio - a.ratio)* (reverse ? -1 : 1))
                .slice(0, parseInt(user_req.body.top))
                );
        });
    });

});

router.post('/world', function (user_req, user_res) {
    console.log(user_req.body);
    const country = user_req.body.country;
    const req = unirest("GET", "https://corona-virus-world-and-india-data.p.rapidapi.com/api");
    req.headers(apiCredenatialsCorona);

    req.end((res) => {
        if (res.error) {
            user_res.sendFile(path.join(__dirname, "./views/404.html"))
        }
        const countries = res.body.countries_stat;
        const world = res.body.world_total;

        console.log(countries, world)
        user_res.send(
            countries
            .filter(c => c.country_name == country)
            .map(c => {console.log(c, c.cases.split(',').join('') , c.deaths.split(',').join(''), world.total_deaths.split(',').join('')) ; return {
                "total_cases":   parseInt(c.cases.split(',').join(''))/parseInt(world.total_cases.split(',').join('')),
                "total_deaths": parseInt(c.deaths.split(',').join(''))/parseInt(world.total_deaths.split(',').join('')),
                "total_recovered": parseInt(c.total_recovered.split(',').join(''))/parseInt(world.total_recovered.split(',').join('')),
                "new_deaths": parseInt(c.new_deaths.split(',').join(''))/parseInt(world.new_deaths.split(',').join('')),
                "new_cases": parseInt(c.new_cases.split(',').join(''))/parseInt(world.new_cases.split(',').join('')),
                "data_taken_at": world.statistic_taken_at
            }})
        );
    });

});
module.exports = router;