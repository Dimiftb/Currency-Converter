function CalculatorModel() {
    var number = 0;
    var home_currency = "GBP";
    var dest_currency = "EUR";
    var rate1, rate2;
    var check = 0;
    var bankFee = 0;
    var currencies = [];


    this.get_home_currency = function () {
        return home_currency;
    };
    this.set_home_currency = function (currency) {
        home_currency = currency;
    };
    this.set_dest_currency = function (currency) {
        dest_currency = currency;
    };

    this.get_destination_currency = function () {
        return dest_currency;
    };

    this.get_number = function () {
        return number;
    };

    this.set_bank_fee = function (fee) {
        bankFee = fee / 100;
    };

    this.reset_calculator = function () {
        check = 0;
        number = 0;

    };
    this.init_rates = function () {
        currencies.push(["EUR", 1]);
        currencies.push(["USD", 1.1471]);
        currencies.push(["JPY", 124.91]);
        currencies.push(["BGN", 1.9558]);
        currencies.push(["CZK", 25.695]);
        currencies.push(["DKK", 7.4654]);
        currencies.push(["GBP", 0.87888]);
        currencies.push(["HUF", 317.63]);
        currencies.push(["PLN", 4.2739]);
        currencies.push(["RON", 4.7557]);
        currencies.push(["SEK", 10.3878]);
        currencies.push(["CHF", 1.1396]);
        currencies.push(["ISK", 137.80]);
        currencies.push(["NOK", 9.6685]);
        currencies.push(["HRK", 7.4150]);
        currencies.push(["RUB", 75.1176]);
        currencies.push(["TRY", 5.9884]);
        currencies.push(["AUD", 1.5789]);
        currencies.push(["BRL", 4.2110]);
        currencies.push(["CAD", 1.5075]);
        currencies.push(["CNY", 7.7262]);
        currencies.push(["HKD", 9.0012]);
        currencies.push(["IDR", 16009.50]);
        currencies.push(["ILS", 4.1649]);
        currencies.push(["INR", 81.7710]);
        currencies.push(["KRW", 1281.33]);
        currencies.push(["MXN", 21.9455]);
        currencies.push(["MYR", 4.6839]);
        currencies.push(["NZD", 1.6567]);
        currencies.push(["PHP", 59.916]);
        currencies.push(["SGD", 1.5472]);
        currencies.push(["THB", 35.893]);
        currencies.push(["ZAR", 15.3372]);


    };

    this.update_rates = function () {
        for (let i = 0; i < currencies.length; i++) {
            if (localStorage.getItem(currencies[i][0]) != null) {
                currencies.splice(i, 1, [currencies[i][0], localStorage.getItem(currencies[i][0])]);
            }
        }
    };

    this.manipulate_display_number = function (value) {
        if (check !== 0) {
            this.reset_calculator();
        }
        if (parseInt(value) === 0 && parseInt(number) === 0) {
            number = 0;
        }
        else if (parseInt(number) === 0) {
            number = value;
        }
        else {
            number = number + "" + value;
        }
    };


    this.convert_currency = function () {
        findRate();
        if (parseInt(check) !== parseInt(number)) {
            number = number / rate1;
            number = number * rate2;

            if (bankFee !== 0) {
                number = number + (number * bankFee);
            }
            if (String(dest_currency) === "JPY" || String(dest_currency) === "ISK" || String(dest_currency) === "KRW" || String(dest_currency) === "IDR") {
                number = number.toFixed(0);
            } else {
                number = number.toFixed(2);
            }

            check = number;
        }
    };

    this.getData = function () {
        var xhttp = new XMLHttpRequest();
        var url = "https://devweb2018.cis.strath.ac.uk/~aes02112/ecbxml.php";
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                getRates(xhttp);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    };

    function getRates(xml) {
        var cube_nodes = xml.responseXML.getElementsByTagName("Cube");
        var nodes_size = cube_nodes.length;

        for (let node = 2; node < nodes_size; node++) {
            currencies.splice((node - 1), 1, [cube_nodes[node].getAttribute("currency"), cube_nodes[node].getAttribute("rate")]);
            localStorage.setItem(cube_nodes[node].getAttribute("currency"), cube_nodes[node].getAttribute("rate"));

        }
    }

    function findRate() {
        for (let rate = 0; rate < currencies.length; rate++) {
            if (String(home_currency) === currencies[rate][0]) {
                rate1 = currencies[rate][1];
            }
            if (String(dest_currency) === currencies[rate][0]) {
                rate2 = currencies[rate][1];
            }
        }
    }
}





