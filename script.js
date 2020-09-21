
function clearAll() {
    $("#city-name, #current, #currency, #covid").empty()

}

$("#submit").on("click", function () {
    clearAll();

    var queryParams = { "APPID": "8c321cc1716884b0a6eec6410a70fa25" }
    queryParams.q = $("#city-input").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?"
    queryURL = queryURL + $.param(queryParams);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        initMap();

        function initMap() {
            var location = { lat: response.coord.lat, lng: response.coord.lon }
            var map = new google.maps.Map(document.querySelector("#map"), {
                zoom: 10,
                center: location
            });
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
        }
        // date 
        var threeDaysAgo = moment().subtract(3, 'days').format();
        var twoDaysAgo = moment().subtract(2, 'days').format();
        var yesterday = moment().subtract(1, 'days').format();
        threeDaysAgo = threeDaysAgo.slice(0, 11) + "00:00:00Z"
        twoDaysAgo = twoDaysAgo.slice(0, 11) + "00:00:00Z"
        yesterday = yesterday.slice(0, 11) + "00:00:00Z"


        var kelvinChange = 273.15
        var cityName = $("<h1>").text(response.name);
        var celsTemp = (response.main.feels_like) - kelvinChange
        var celsDec = celsTemp.toFixed(2)
        var currentTemp = $("<h3>").text("Temperature: " + celsDec + "°C")
        var humidity = $("<h3>").text("Humidity: " + response.main.humidity + "%")
        var windSpeed = $("<h3>").text("Wind Speed: " + response.wind.speed + "KPH")
        $("#city-name").append(cityName)
        $("#current").append(currentTemp)
        $("#current").append(humidity)
        $("#current").append(windSpeed)

        var countryCode = response.sys.country

        //covid cases yesterday
        $.ajax({
            url: "https://api.covid19api.com/total/country/" + countryCode + "/status/confirmed?from=" + twoDaysAgo + "&to=" + yesterday,
            method: "GET"
        }).then(function (response) {

            var totalCases = response[0].Cases

            //covid cases two days ago
            $.ajax({
                url: "https://api.covid19api.com/total/country/" + countryCode + "/status/confirmed?from=" + threeDaysAgo + "&to=" + twoDaysAgo,
                method: "GET"
            }).then(function (response) {

                //recent cases
                var totalCasesTwoDaysAgo = response[0].Cases
                var recentCase = parseInt(totalCases) - parseInt(totalCasesTwoDaysAgo)

                //recovered cases
                $.ajax({
                    url: "https://api.covid19api.com/total/country/" + countryCode + "/status/recovered?from=" + twoDaysAgo + "&to=" + yesterday,
                    method: "GET"
                }).then(function (response) {

                    //active cases
                    var recoveredCases = response[0].Cases
                    var activeCase = parseInt(totalCases) - parseInt(recoveredCases)

                    var covidTotal = $("<h2>").text("Country Covid 19 Status: Total Cases: " + totalCases + "; " + "Recent Confirmed Cases: " + recentCase + "; " + "Active Cases: " + activeCase)
                    $("#covid").append(covidTotal)

                    //map color
                    $("#map").css("border-style", "solid")
                    $("#map").css("border-width", "10px")
                    if (activeCase < 1000) {
                        $("#map").css("border-color", "green")
                    } else if (activeCase < 10000) {
                        $("#map").css("border-color", "orange")
                    } else {
                        $("#map").css("border-color", "red")
                    }
                })
            })
        })
        let array = {
            "AD": "EUR",
            "AE": "AED",
            "AF": "AFN",
            "AG": "XCD",
            "AI": "XCD",
            "AL": "ALL",
            "AM": "AMD",
            "AO": "AOA",
            "AQ": null,
            "AR": "ARS",
            "AS": "USD",
            "AT": "EUR",
            "AU": "AUD",
            "AW": "AWG",
            "AX": "EUR",
            "AZ": "AZN",
            "BA": "BAM",
            "BB": "BBD",
            "BD": "BDT",
            "BE": "EUR",
            "BF": "XOF",
            "BG": "BGN",
            "BH": "BHD",
            "BI": "BIF",
            "BJ": "XOF",
            "BL": "EUR",
            "BM": "BMD",
            "BN": "BND",
            "BO": "BOB",
            "BQ": "USD",
            "BR": "BRL",
            "BS": "BSD",
            "BT": "INR",
            "BV": "NOK",
            "BW": "BWP",
            "BY": "BYN",
            "BZ": "BZD",
            "CA": "CAD",
            "CC": "AUD",
            "CD": "CDF",
            "CF": "XAF",
            "CG": "XAF",
            "CH": "CHF",
            "CI": "XOF",
            "CK": "NZD",
            "CL": "CLP",
            "CM": "XAF",
            "CN": "CNY",
            "CO": "COP",
            "CR": "CRC",
            "CU": "CUP",
            "CV": "CVE",
            "CW": "ANG",
            "CX": "AUD",
            "CY": "EUR",
            "CZ": "CZK",
            "DE": "EUR",
            "DJ": "DJF",
            "DK": "DKK",
            "DM": "XCD",
            "DO": "DOP",
            "DZ": "DZD",
            "EC": "USD",
            "EE": "EUR",
            "EG": "EGP",
            "EH": "MAD",
            "ER": "ERN",
            "ES": "EUR",
            "ET": "ETB",
            "FI": "EUR",
            "FJ": "FJD",
            "FK": "FKP",
            "FM": "USD",
            "FO": "DKK",
            "FR": "EUR",
            "GA": "XAF",
            "GB": "GBP",
            "GD": "XCD",
            "GE": "GEL",
            "GF": "EUR",
            "GG": "GGP",
            "GH": "GHS",
            "GI": "GIP",
            "GL": "DKK",
            "GM": "GMD",
            "GN": "GNF",
            "GP": "EUR",
            "GQ": "XAF",
            "GR": "EUR",
            "GS": "GBP",
            "GT": "GTQ",
            "GU": "USD",
            "GW": "XOF",
            "GY": "GYD",
            "HK": "HKD",
            "HM": "AUD",
            "HN": "HNL",
            "HR": "HRK",
            "HT": "HTG",
            "HU": "HUF",
            "ID": "IDR",
            "IE": "EUR",
            "IL": "ILS",
            "IM": "GBP",
            "IN": "INR",
            "IO": "USD",
            "IQ": "IQD",
            "IR": "IRR",
            "IS": "ISK",
            "IT": "EUR",
            "JE": "GBP",
            "JM": "JMD",
            "JO": "JOD",
            "JP": "JPY",
            "KE": "KES",
            "KG": "KGS",
            "KH": "KHR",
            "KI": "AUD",
            "KM": "KMF",
            "KN": "XCD",
            "KP": "KPW",
            "KR": "KRW",
            "KW": "KWD",
            "KY": "KYD",
            "KZ": "KZT",
            "LA": "LAK",
            "LB": "LBP",
            "LC": "XCD",
            "LI": "CHF",
            "LK": "LKR",
            "LR": "LRD",
            "LS": "LSL",
            "LT": "EUR",
            "LU": "EUR",
            "LV": "EUR",
            "LY": "LYD",
            "MA": "MAD",
            "MC": "EUR",
            "MD": "MDL",
            "ME": "EUR",
            "MF": "EUR",
            "MG": "MGA",
            "MH": "USD",
            "MK": "MKD",
            "ML": "XOF",
            "MM": "MMK",
            "MN": "MNT",
            "MO": "MOP",
            "MP": "USD",
            "MQ": "EUR",
            "MR": "MRO",
            "MS": "XCD",
            "MT": "EUR",
            "MU": "MUR",
            "MV": "MVR",
            "MW": "MWK",
            "MX": "MXN",
            "MY": "MYR",
            "MZ": "MZN",
            "NA": "NAD",
            "NC": "XPF",
            "NE": "XOF",
            "NF": "AUD",
            "NG": "NGN",
            "NI": "NIO",
            "NL": "EUR",
            "NO": "NOK",
            "NP": "NPR",
            "NR": "AUD",
            "NU": "NZD",
            "NZ": "NZD",
            "OM": "OMR",
            "PA": "PAB",
            "PE": "PEN",
            "PF": "XPF",
            "PG": "PGK",
            "PH": "PHP",
            "PK": "PKR",
            "PL": "PLN",
            "PM": "EUR",
            "PN": "NZD",
            "PR": "USD",
            "PS": "JOD",
            "PT": "EUR",
            "PW": "USD",
            "PY": "PYG",
            "QA": "QAR",
            "RE": "EUR",
            "RO": "RON",
            "RS": "RSD",
            "RU": "RUB",
            "RW": "RWF",
            "SA": "SAR",
            "SB": "SBD",
            "SC": "SCR",
            "SD": "SDG",
            "SE": "SEK",
            "SG": "SGD",
            "SH": "SHP",
            "SI": "EUR",
            "SJ": "NOK",
            "SK": "EUR",
            "SL": "SLL",
            "SM": "EUR",
            "SN": "XOF",
            "SO": "SOS",
            "SR": "SRD",
            "SS": "SSP",
            "ST": "STD",
            "SV": "USD",
            "SX": "ANG",
            "SY": "SYP",
            "SZ": "SZL",
            "TC": "USD",
            "TD": "XAF",
            "TF": "EUR",
            "TG": "XOF",
            "TH": "THB",
            "TJ": "TJS",
            "TK": "NZD",
            "TL": "USD",
            "TM": "TMT",
            "TN": "TND",
            "TO": "TOP",
            "TR": "TRY",
            "TT": "TTD",
            "TV": "AUD",
            "TW": "TWD",
            "TZ": "TZS",
            "UA": "UAH",
            "UG": "UGX",
            "UM": "USD",
            "US": "USD",
            "UY": "UYU",
            "UZ": "UZS",
            "VA": "EUR",
            "VC": "XCD",
            "VE": "VEF",
            "VG": "USD",
            "VI": "USD",
            "VN": "VND",
            "VU": "VUV",
            "WF": "XPF",
            "WS": "EUR",
            "YE": "YER",
            "YT": "EUR",
            "ZM": "ZMW",
            "ZA": "ZAR",
            "ZW": "USD"
        }

        let obj = array[countryCode]

        if (obj) {
            var currencyRateURl = "https://v6.exchangerate-api.com/v6/077422a8ec047bea40fab6ea/latest/" + obj

            $.ajax({
                url: currencyRateURl,
                method: "GET"
            }).then(function (response) {
                var inverseCurrency = response.conversion_rates.AUD
                var currencyRateDecimal = 1 / inverseCurrency
                currencyRate = currencyRateDecimal.toFixed(3)
                var rate = $("<h2>").text("One Australian Dollar will buy you " + currencyRate + obj)
                $("#currency").append(rate);

            }).catch(function (err) {
                var rate = $("<h2>").text("Currency Conversion Unavailable")
                $("#currency").append(rate);
            })
        }

    });

});
