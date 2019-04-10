/*globals CalculatorView, CalculatorModel*/

var calcView = new CalculatorView();
var calcModel = new CalculatorModel();
var calcController = null;

function CalculatorController() {

    this.init = function () {
        calcView.check_cache();
        calcModel.init_rates();
        calcModel.update_rates();
        calcModel.getData();
        if(localStorage.getItem("home_currency")!= null) {
            calcView.change_home_flag(localStorage.getItem("home_currency"));
        }
        if(localStorage.getItem("dest_currency") != null) {
            calcView.change_destination_flag(localStorage.getItem("dest_currency"));
        }
        calcView.setCallBackFunc(function () {
            var number = event.target.dataset.number;


            if (isNaN(number)) {

                if (number === "=") {
                    calcModel.convert_currency();
                    calcView.updateDisplay(calcModel.get_number(), calcModel.get_destination_currency());
                }
                else if (number === "C") {
                    calcModel.reset_calculator();
                    calcView.updateDisplay(calcModel.get_number(), calcModel.get_home_currency())
                }
                else if (number === "go") {
                    calcModel.set_bank_fee(calcView.get_fee());
                    calcModel.set_home_currency(calcView.get_hCurrency());
                    calcModel.set_dest_currency(calcView.get_dCurrency());
                    localStorage.setItem("bank_fee", calcView.get_fee());
                    localStorage.setItem("home_currency", calcView.get_hCurrency());
                    localStorage.setItem("dest_currency", calcView.get_dCurrency());
                }
            }
            else {
                calcModel.manipulate_display_number(number);
                calcView.updateDisplay(calcModel.get_number(), calcModel.get_home_currency());
            }
        });
        calcView.set_home_change_callback(function () {
            calcView.change_home_flag(calcView.get_hCurrency());

        });

        calcView.set_away_change_callback(function () {
            calcView.change_destination_flag(calcView.get_dCurrency());
        });

        calcView.set_bar_callback(function () {
            var options = document.getElementById("options");
            if (options.style.display === "inline-block") {
                options.style.display = "none";
            }
            else {
                options.style.display = "inline-block";
            }
            if (localStorage.getItem("home_currency") != null) {
                calcView.get_select_bar_home().value = localStorage.getItem("home_currency");

            }
            if (localStorage.getItem("dest_currency") != null) {
                calcView.get_select_bar_dest().value = localStorage.getItem("dest_currency");

            }
            if (localStorage.getItem("bank_fee") != null) {
                switch (localStorage.getItem("bank_fee")) {
                    case 0:
                        calcView.get_radio_group()[0].checked = true;
                        break;
                    case "2.0":
                        calcView.get_radio_group()[1].checked = true;
                        break;
                    case "4.0":
                        calcView.get_radio_group()[2].checked = true;
                        break;
                    case "6.0":
                        calcView.get_radio_group()[3].checked = true;
                        break;
                }
            }
        })
    };

    this.load_settings = function () {
        if (localStorage.getItem("bank_fee") != null) {
            calcModel.set_bank_fee(localStorage.getItem("bank_fee"));
        }
        if (localStorage.getItem("home_currency") != null) {
            calcModel.set_home_currency(localStorage.getItem("home_currency"));
        }
        if (localStorage.getItem(("dest_currency")) != null) {
            calcModel.set_dest_currency(localStorage.getItem("dest_currency"));
        }
    };
}

calcController = new CalculatorController();
window.addEventListener("load", function () {
    calcController.load_settings();
    calcController.init();
});