let globalValue = "all"
window.onload = () => {
    newUpdates();
    updateCountriesTable();
    apiFetching();
    searchList();
}

document.querySelector(".total").addEventListener("click", function() {
    clearPrevCircle();
    apiFetching();
    fetchDataChart1("cases")
    document.querySelector(".total").classList.toggle("active")
    document.querySelector(".recovered").classList.remove("active")
    document.querySelector(".activeCases").classList.remove("active")
    document.querySelector(".death").classList.remove("active")

})

document.querySelector(".death").addEventListener("click", function() {
    clearPrevCircle();
    deathsCircle();
    fetchDataChart1("deaths")
    document.querySelector(".death").classList.toggle("active")
    document.querySelector(".recovered").classList.remove("active")
    document.querySelector(".activeCases").classList.remove("active")
    document.querySelector(".total").classList.remove("active")

})

document.querySelector(".recovered").addEventListener("click", function() {
    clearPrevCircle();
    recoveredCircle();
    fetchDataChart1("recovered")
    document.querySelector(".recovered").classList.toggle("active")
    document.querySelector(".death").classList.remove("active")
    document.querySelector(".activeCases").classList.remove("active")
    document.querySelector(".total").classList.remove("active")

})

document.querySelector(".activeCases").addEventListener("click", function() {
    clearPrevCircle();
    activeCircle();
    fetchDataChart1("active")
    document.querySelector(".activeCases").classList.toggle("active")
    document.querySelector(".death").classList.remove("active")
    document.querySelector(".recovered").classList.remove("active")
    document.querySelector(".total").classList.remove("active")


})

var map;

function initMap() {
    var styledMapType = new google.maps.StyledMapType(
        [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }]
            },
            {
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#616161"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#f5f5f5"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#bdbdbd"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#eeeeee"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#757575"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e5e5e5"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9e9e9e"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#757575"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dadada"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#616161"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9e9e9e"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e5e5e5"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#eeeeee"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#c9c9c9"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9e9e9e"
                }]
            }
        ]
    );

    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 32.397,
            lng: 40.644
        },
        zoom: 2
    });
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

}


//in this we will simply call those functions which will use data from api of countries likewise: makingcricle and etc 
const apiFetching = () => {
    fetch("https://corona.lmao.ninja/v2/countries").then((response) => {
        return response.json();
    }).then((data) => {
        cricleAdd(data)
    })

}

//add if condition data,cases then har citycircle pe conndtion lagao and then kaam karo! click pe apifetch ho!
let circlemap = [];
const cricleAdd = (data) => {

        data.forEach((element) => {

            let countryCenter = {
                lat: element.countryInfo.lat,
                lng: element.countryInfo.long
            }


            var cityCircle = new google.maps.Circle({
                strokeColor: "#DF0A56",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                map: map,
                center: countryCenter,
                radius: element.cases
            });
            circlemap.push(cityCircle)
            let infoWindow = new google.maps.InfoWindow();
            let html = `<div class="window-country">
        <div class="country-flag">
        <img src=${element.countryInfo.flag} alt="country Flag" width="100%"/>
        </div>
        <div class="country-details">
        <h3><strong>${element.country}</strong></h3>
        <p id="todayCases"><strong>Total Case:</strong> ${element.cases}</p>
        <p id="todayDeaths"><strong>Total Death:</strong> ${element.deaths}</p> 
        <p id="todayRecovered"><strong>Total recovered:</strong> ${element.recovered}</p>   
        </div>
        </div>`;
            infoWindow.setContent(html);
            infoWindow.setPosition(cityCircle.center)

            google.maps.event.addListener(cityCircle, 'mouseover', function() {
                infoWindow.setContent(html);
                infoWindow.open(map, cityCircle)
            });
            google.maps.event.addListener(cityCircle, 'mouseout', function() {
                infoWindow.close()
            });


        })

    }
    //circle for deaths;

const deathsCircle = () => {
    fetch("https://corona.lmao.ninja/v2/countries").then((response) => {
        return response.json();
    }).then((data) => {
        circleForDeaths(data)
    })
}

const clearPrevCircle = () => {
    for (let circle of circlemap) {
        circle.setMap(null);
    }
}

const circleForDeaths = (data) => {

    data.forEach((element) => {

        let countryCenter = {
            lat: element.countryInfo.lat,
            lng: element.countryInfo.long
        }


        var cityCircle = new google.maps.Circle({
            strokeColor: "#554B86",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#EEECF9",
            fillOpacity: 0.35,
            map: map,
            center: countryCenter,
            radius: element.cases
        });
        circlemap.push(cityCircle)
        let infoWindow = new google.maps.InfoWindow();
        let html = `<div class="window-country">
    <div class="country-flag">
    <img src=${element.countryInfo.flag} alt="country Flag" width="100%"/>
    </div>
    <div class="country-details">
    <h3><strong>${element.country}</strong></h3>
    <p id="todayCases"><strong>Total Case:</strong> ${element.cases}</p>
    <p id="todayDeaths"><strong>Total Death:</strong> ${element.deaths}</p> 
    <p id="todayRecovered"><strong>Total recovered:</strong> ${element.recovered}</p>   
    </div>
    </div>`;
        infoWindow.setContent(html);
        infoWindow.setPosition(cityCircle.center)

        google.maps.event.addListener(cityCircle, 'mouseover', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, cityCircle)
        });
        google.maps.event.addListener(cityCircle, 'mouseout', function() {
            infoWindow.close()
        });


    })

}

const recoveredCircle = () => {
    fetch("https://corona.lmao.ninja/v2/countries").then((response) => {
        return response.json();
    }).then((data) => {
        circleForRecoverd(data)
    })
}

const circleForRecoverd = (data) => {

    data.forEach((element) => {

        let countryCenter = {
            lat: element.countryInfo.lat,
            lng: element.countryInfo.long
        }


        var cityCircle = new google.maps.Circle({
            strokeColor: "#28D7A6",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#E6FFF8",
            fillOpacity: 0.35,
            map: map,
            center: countryCenter,
            radius: element.cases
        });
        circlemap.push(cityCircle)
        let infoWindow = new google.maps.InfoWindow();
        let html = `<div class="window-country">
    <div class="country-flag">
    <img src=${element.countryInfo.flag} alt="country Flag" width="100%"/>
    </div>
    <div class="country-details">
    <h3><strong>${element.country}</strong></h3>
    <p id="todayCases"><strong>Total Case:</strong> ${element.cases}</p>
    <p id="todayDeaths"><strong>Total Death:</strong> ${element.deaths}</p> 
    <p id="todayRecovered"><strong>Total recovered:</strong> ${element.recovered}</p>   
    </div>
    </div>`;
        infoWindow.setContent(html);
        infoWindow.setPosition(cityCircle.center)

        google.maps.event.addListener(cityCircle, 'mouseover', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, cityCircle)
        });
        google.maps.event.addListener(cityCircle, 'mouseout', function() {
            infoWindow.close()
        });


    })

}

const activeCircle = () => {
    fetch("https://corona.lmao.ninja/v2/countries").then((response) => {
        return response.json();
    }).then((data) => {
        circleForActive(data)
    })
}

const circleForActive = (data) => {

    data.forEach((element) => {

        let countryCenter = {
            lat: element.countryInfo.lat,
            lng: element.countryInfo.long
        }


        var cityCircle = new google.maps.Circle({
            strokeColor: "#633FE4",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#F5F5FF",
            fillOpacity: 0.35,
            map: map,
            center: countryCenter,
            radius: element.cases
        });
        circlemap.push(cityCircle)
        let infoWindow = new google.maps.InfoWindow();
        let html = `<div class="window-country">
            <div class="country-flag">
            <img src=${element.countryInfo.flag} alt="country Flag" width="100%"/>
            </div>
            <div class="country-details">
            <h3><strong>${element.country}</strong></h3>
            <p id="todayCases"><strong>Total Case:</strong> ${element.cases}</p>
            <p id="todayDeaths"><strong>Total Death:</strong> ${element.deaths}</p> 
            <p id="todayRecovered"><strong>Total recovered:</strong> ${element.recovered}</p>   
            </div>
            </div>`;
        infoWindow.setContent(html);
        infoWindow.setPosition(cityCircle.center)

        google.maps.event.addListener(cityCircle, 'mouseover', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, cityCircle)
        });
        google.maps.event.addListener(cityCircle, 'mouseout', function() {
            infoWindow.close()
        });


    })


}

//setting map center

const setMapCenter = (lat, long, zoom) => {
    map.setZoom(zoom)
    map.panTo({
        lat: lat,
        lng: long
    })
    console.log("this is working!");
}

// adding the chart js!


//chart1
const fetchDataChart1 = (typeData) => {
    fetch("https://corona.lmao.ninja/v2/historical/" + globalValue + "?lastdays=120").then((response) => {
        return response.json();
    }).then((data) => {
        if (globalValue != "all") {
            let getValue = formatingData(data.timeline, typeData);
            ShowingChart1(getValue, typeData);
        } else {
            let getValue = formatingData(data, typeData);
            ShowingChart1(getValue, typeData);
        }
    })
}

const formatingData = (data, typeData) => {
    let formatData = [];
    if (typeData == "cases" || typeData == "active") {
        for (date in data.cases) {
            let body = {
                x: date,
                y: data.cases[date]
            }
            formatData.push(body);
        }
    } else if (typeData == "recovered") {
        for (date in data.recovered) {
            let body = {
                x: date,
                y: data.recovered[date]
            }
            formatData.push(body);
        }
    } else if (typeData == "deaths") {
        for (date in data.deaths) {
            let body = {
                x: date,
                y: data.deaths[date]
            }
            formatData.push(body);
        }
    }

    return formatData;
}


const ShowingChart1 = (params, typeData) => {
    var timeFormat = "MM/DD/YY";
    var ctx = document.getElementById('myChart1').getContext('2d');

    if (typeData == "cases") {
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                datasets: [{
                    label: 'Cases',
                    backgroundColor: 'rgba(223, 10, 86,0.2)',
                    borderColor: 'rgb(223, 10, 86)',
                    data: params
                }]
            },

            // Configuration options go here
            options: {
                scales: {
                    xAxes: [{
                        type: "time",
                        time: {
                            format: timeFormat,
                            tooltipFormat: 'll'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Cases'
                        }
                    }]
                }

            }
        });

    } else if (typeData == "recovered") {
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                datasets: [{
                    label: 'Recovered',
                    backgroundColor: 'rgba(38, 162, 107,0.2)',
                    borderColor: 'rgb(38, 162, 107)',
                    data: params
                }]
            },

            // Configuration options go here
            options: {
                scales: {
                    xAxes: [{
                        type: "time",
                        time: {
                            format: timeFormat,
                            tooltipFormat: 'll'
                        },

                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Recovered'
                        }
                    }]
                }

            }
        });
    } else if (typeData == "deaths") {
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                datasets: [{
                    label: 'Recovered',
                    backgroundColor: 'rgba(85, 75, 134,0.2)',
                    borderColor: 'rgb(85, 75, 134)',
                    data: params
                }]
            },

            // Configuration options go here
            options: {
                scales: {
                    xAxes: [{
                        type: "time",
                        time: {
                            format: timeFormat,
                            tooltipFormat: 'll'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Recovered'
                        }
                    }]
                }

            }
        });
    } else if (typeData == "active") {
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                datasets: [{
                    label: 'Recovered',
                    backgroundColor: 'rgba(99, 63, 228,0.2)',
                    borderColor: 'rgb(99, 63, 228)',
                    data: params
                }]
            },

            // Configuration options go here
            options: {
                scales: {
                    xAxes: [{
                        type: "time",
                        time: {
                            format: timeFormat,
                            tooltipFormat: 'll'
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Date'
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Recovered'
                        }
                    }]
                }

            }
        });
    }
}





//changing the news from the Api.
async function newUpdates() {

    let response = await fetch("https://cryptic-ravine-96718.herokuapp.com/");
    let getJsonResponse = await response.json();
    let newsData = getJsonResponse.news;
    newsData.forEach((element) => {
        document.getElementById("news-append").innerHTML += `<div class="container-fluid" id="total-news">
                        <div class="row">
                            <div class="col-lg-2 col-md-2 col-sm-12 col-12">
                                <div class="news-image">
                                    <img src="${element.img}" width="100" alt=" ">
                                </div>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-12 col-12">
                                <div>
                                    <h3>${element.title}</h3>
                                    <a href="${element.link}" target="_blank">Click here to read more.</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
    });
    document.getElementById("loading").style.display = "none";
    document.getElementById("total-news").style.display = "flex";
}


//updating the table ..
const updateCountriesTable = () => {
    fetch("https://corona.lmao.ninja/v2/countries").then((response) => {
        return response.json();
    }).then((countryData) => {


        //this function will sort the obj according to the descending number of active cases!
        let data = countryData.sort((element1, element2) => {
            if (element1.cases < element2.cases) {
                return 1;
            } else {
                return -1;
            }
        })

        data.forEach((element) => {
            document.getElementById("table-countries").innerHTML += `
            <tr>
            <td class="country-table">${element.country}</td>
            <td class="table-active-cases">${element.cases}</td>
            <td class="table-deaths">${element.deaths}</td>
            <td class="table-recovered">${element.recovered}</td>
        </tr>`;
        })

    })

}

const updateHeading = (countryIso) => {

    fetch("https://corona.lmao.ninja/v2/countries/" + countryIso).then((response) => {
        return response.json();
    }).then((data) => {
        setMapCenter(data.countryInfo.lat, data.countryInfo.long, 5)
        document.getElementById("head-total-case").innerHTML = `<strong>${data.cases}</strong>`;
        document.getElementById("head-recovered-cases").innerHTML = `<strong>${data.recovered}</strong>`;
        document.getElementById("head-deaths-cases").innerHTML = `<strong>${data.deaths}</strong>`;
        document.getElementById("head-active-cases").innerHTML = `<strong>${data.active}</strong>`;
    })
}

const updateHeadingForAll = () => {
    fetch("https://disease.sh/v2/all").then((response) => {
        return response.json();
    }).then((data) => {
        setMapCenter(32.397, 40.644, 2)
        document.getElementById("head-total-case").innerHTML = `<strong>${data.cases}</strong>`;
        document.getElementById("head-recovered-cases").innerHTML = `<strong>${data.recovered}</strong>`;
        document.getElementById("head-deaths-cases").innerHTML = `<strong>${data.deaths}</strong>`;
        document.getElementById("head-active-cases").innerHTML = `<strong>${data.active}</strong>`;

    })
}


//predict function..

function predictorCorona() {
    document.getElementById("virusPredictor").style.display = "block";
}


function predictvirus() {
    var userInput = [];
    var calculatePredict = 0;
    //<=25 {normal,less}  >=25 <=60 {suspected case,}
    document.querySelectorAll("input[name='details-show']:checked").forEach(function(element) {
        userInput.push(element.value);
    });

    userInput.forEach(function(element) {
        if (element == "Tiredness") {
            calculatePredict += 5;
        } else if (element == "Fever") {
            calculatePredict += 25;
        } else if (element == "Cough") {
            calculatePredict += 25;
        } else if (element == "Throat") {
            calculatePredict += 10;
        } else if (element == "Headache") {
            calculatePredict += 15;
        } else if (element == "Breath") {
            calculatePredict += 15;
        } else if (element == "Rhinitis") {
            calculatePredict += 5;
        }
    })

    if (calculatePredict == 0) {
        document.querySelector(".progress-bar").classList.remove("bg-warning");
        document.querySelector(".progress-bar").classList.remove("bg-danger");
        document.querySelector(".result").style.display = "block";
        document.getElementById("suggestSym").innerHTML = "<strong>Click any options</strong>";
        document.getElementById("rateSym").innerHTML = " <strong>Nothing</strong>";
        document.querySelector(".progress-bar").style.width = calculatePredict.toString() + "%"
        document.querySelector(".progress-bar").classList.add(" bg-success");

    } else if (calculatePredict < 25) {
        document.querySelector(".progress-bar").classList.remove("bg-warning");
        document.querySelector(".progress-bar").classList.remove("bg-danger");
        document.getElementById("suggestSym").innerHTML = "Take Precautions";
        document.getElementById("rateSym").innerHTML = " Less";
        document.getElementById("suggestSym").style.color = "#26A26B";
        document.getElementById("rateSym").style.color = "#26A26B";
        document.querySelector(".result").style.display = "block";
        document.getElementById("virusPredictor").style.backgroundColor = "#E6FFF8";
        document.querySelector(".progress-bar").style.width = calculatePredict.toString() + "%"
        document.querySelector(".progress-bar").classList.add("bg-success");
    } else if (calculatePredict >= 25 && calculatePredict <= 60) {
        document.querySelector(".progress-bar").classList.remove("bg-success");
        document.querySelector(".progress-bar").classList.remove("bg-danger");
        document.getElementById("suggestSym").innerHTML = "Suspected Case, Stay home & follow precautions";
        document.getElementById("rateSym").innerHTML = " Suspected Case";
        document.getElementById("suggestSym").style.color = "#FFC107";
        document.getElementById("rateSym").style.color = "#FFC107";
        document.querySelector(".result").style.display = "block";
        document.getElementById("virusPredictor").style.backgroundColor = "rgba(255, 193, 7,0.2)";
        document.querySelector(".progress-bar").style.width = calculatePredict.toString() + "%"
        document.querySelector(".progress-bar").classList.add("bg-warning");
    } else if (calculatePredict > 60) {
        document.querySelector(".progress-bar").classList.remove("bg-warning");
        document.querySelector(".progress-bar").classList.remove("bg-success");
        document.getElementById("suggestSym").innerHTML = "<strong>Highly Suspected, NEED FREQUENT HOSPITALIZATION</strong>";
        document.getElementById("rateSym").innerHTML = " <strong>Highly Suspected Case</strong>";
        document.getElementById("suggestSym").style.color = "#C82333";
        document.getElementById("rateSym").style.color = "#C82333";
        document.querySelector(".result").style.display = "block";
        document.getElementById("virusPredictor").style.backgroundColor = "rgba(200, 35, 51,0.2)";
        document.querySelector(".progress-bar").style.width = calculatePredict.toString() + "%"
        document.querySelector(".progress-bar").classList.add("bg-danger");

    }

}

//dropdown!
const searchList = () => {
    let listData = [{ name: "worldwide", value: "www", selected: true }];
    fetch("https://corona.lmao.ninja/v2/countries").then((response) => {
        return response.json();
    }).then((data) => {
        data.forEach((element) => {
            listData.push({
                name: element.country,
                value: element.countryInfo.iso3
            })

        })
        dropDown(listData);
    })

}




const dropDown = (listData) => {
    console.log(listData)
    $('.ui.dropdown').dropdown({
        values: listData,
        onChange: function(value, text) {
            if (value == "www") {
                updateHeadingForAll();
                globalValue = "all";
                fetchDataChart1("cases")
            } else {
                updateHeading(value);
                console.log("called normal")
                globalValue = value;
                fetchDataChart1("cases")
            }
        }
    });
}