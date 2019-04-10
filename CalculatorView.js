    "use strict";

function CalculatorView() {
    var button0 = document.getElementById("button0");
    var button1 = document.getElementById("button1");
    var button2 = document.getElementById("button2");
    var button3 = document.getElementById("button3");
    var button4 = document.getElementById("button4");
    var button5 = document.getElementById("button5");
    var button6 = document.getElementById("button6");
    var button7 = document.getElementById("button7");
    var button8 = document.getElementById("button8");
    var button9 = document.getElementById("button9");
    var buttonC = document.getElementById("buttonC");
    var button_equals = document.getElementById("button=");
    var buttonGo = document.getElementById("select");
    var nav_bar = document.getElementById("navbar");
    var select_home = document.getElementById("homeCurrency");
    var select_away = document.getElementById("destinationCurrency");
    var confirm_button = document.getElementById("select");
    var home_flag = document.getElementsByClassName("home-flag");
    var destination_flag = document.getElementsByClassName("destination-flag");


    this.setCallBackFunc = function (callback) {
        button0.addEventListener("click", callback);
        button1.addEventListener("click", callback);
        button2.addEventListener("click", callback);
        button3.addEventListener("click", callback);
        button4.addEventListener("click", callback);
        button5.addEventListener("click", callback);
        button6.addEventListener("click", callback);
        button7.addEventListener("click", callback);
        button8.addEventListener("click", callback);
        button9.addEventListener("click", callback);
        buttonC.addEventListener("click", callback);
        button_equals.addEventListener("click", callback);
        buttonGo.addEventListener("click", callback);


    };
    this.set_bar_callback = function (callback) {
        nav_bar.addEventListener("click", callback);
        confirm_button.addEventListener("click", callback);
    };

    this.set_home_change_callback = function (callback) {
        select_home.addEventListener("change", callback);

    };
    this.set_away_change_callback = function (callback) {
        select_away.addEventListener("change", callback);
    };

    this.updateDisplay = function (num, currency) {
        document.getElementById("display").value = num + " " + currency;
    };

    this.get_radio_group = function () {
        return document.getElementsByName("fee");
    };

    this.change_home_flag = function(currency) {
        for(let i = 0; i < home_flag.length; i++) {
            home_flag[i].src = "Icons/" + currency + ".png";
        }
    };

    this.change_destination_flag = function(currency) {
        for(let i = 0; i < destination_flag.length; i++) {
            destination_flag[i].src = "Icons/" + currency + ".png";
        }
    };

    this.get_fee = function () {
        var selectedFee = 0;
        if (document.getElementById("radio1").checked) {
            selectedFee = document.getElementById("radio1").value;
        }
        if (document.getElementById("radio2").checked) {
            selectedFee = document.getElementById("radio2").value;
        }
        if (document.getElementById("radio3").checked) {
            selectedFee = document.getElementById("radio3").value;
        }
        if (document.getElementById("radio4").checked) {
            selectedFee = document.getElementById("radio4").value;
        }

        return selectedFee;
    };

    this.get_hCurrency = function () {

        var currencies = document.getElementById("homeCurrency");
        return currencies.options[currencies.selectedIndex].value;
    };

    this.get_dCurrency = function () {

        var currencies = document.getElementById("destinationCurrency");
        return currencies.options[currencies.selectedIndex].value;
    };


    this.get_select_bar_home = function () {
        return document.getElementById("homeCurrency");

    };
    this.get_select_bar_dest = function () {
        return document.getElementById("destinationCurrency");

    };
    this.check_cache = function () {
        var appCache = window.applicationCache;
        appCache.addEventListener("checking", function (event) {
            console.log("Checking for updates.");
        }, false);

        appCache.addEventListener("downloading", function (event) {
            console.log("Started Download.");
        }, false);


        appCache.addEventListener("progress", function (event) {
            console.log(event.loaded + " of " + event.total + " downloaded.");
        }, false);

        appCache.addEventListener("cached", function (event) {
            console.log("Done.");
        }, false);
    };
}

