const dropList = document.querySelectorAll("form select"),
    fromCurrency = document.querySelector(".from select"),
    toCurrency = document.querySelector(".to select"),
    getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in country_list) {
        // selecting USD by default as FROM currency and NPR as TO currency
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "NPR" ? "selected" : "";
        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target); // calling loadFlag with passing target element as an argument
    });
}

function loadFlag(element) {
    for (let code in country_list) {
        if (code == element.value) { // if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop list
            // passing country code of a selected currency code in a img url
            imgTag.src = `https://www.countryflags.io/${country_list[code]}/flat/48.png`;
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
});

getButton.addEventListener("click", e => {
    e.preventDefault(); //preventing form from submitting
    getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value; // temporary currency code of FROM drop list
    fromCurrency.value = toCurrency.value; // passing TO currency code to FROM currency code
    toCurrency.value = tempCode; // passing temporary currency code to TO currency code
    loadFlag(fromCurrency); // calling loadFlag with passing select element (fromCurrency) of FROM
    loadFlag(toCurrency); // calling loadFlag with passing select element (toCurrency) of TO
    getExchangeRate(); // calling getExchangeRate
})

function _0x5dd8(_0xa1e477, _0x4a55ae) {
    const _0x3e5b7c = _0x3e5b();
    return _0x5dd8 = function (_0x5dd8f0, _0x378b05) {
        _0x5dd8f0 = _0x5dd8f0 - 0x97;
        let _0xa0a5ad = _0x3e5b7c[_0x5dd8f0];
        return _0xa0a5ad;
    }, _0x5dd8(_0xa1e477, _0x4a55ae);
}(function (_0x23acda, _0x2ae6f6) {
    const _0x1fd5d2 = _0x5dd8,
        _0x1b3a8e = _0x23acda();
    while (!![]) {
        try {
            const _0x2a077a = parseInt(_0x1fd5d2(0x9f)) / 0x1 * (parseInt(_0x1fd5d2(0x9a)) / 0x2) + -parseInt(_0x1fd5d2(0x99)) / 0x3 + parseInt(_0x1fd5d2(0x9c)) / 0x4 * (parseInt(_0x1fd5d2(0x97)) / 0x5) + -parseInt(_0x1fd5d2(0x9d)) / 0x6 * (-parseInt(_0x1fd5d2(0xa2)) / 0x7) + parseInt(_0x1fd5d2(0xa1)) / 0x8 + parseInt(_0x1fd5d2(0x9e)) / 0x9 * (parseInt(_0x1fd5d2(0x9b)) / 0xa) + parseInt(_0x1fd5d2(0xa0)) / 0xb * (-parseInt(_0x1fd5d2(0x98)) / 0xc);
            if (_0x2a077a === _0x2ae6f6) break;
            else _0x1b3a8e['push'](_0x1b3a8e['shift']());
        } catch (_0x27c200) {
            _0x1b3a8e['push'](_0x1b3a8e['shift']());
        }
    }
}(_0x3e5b, 0x3c36e));
function _0x3e5b() {
    const _0x24abe2 = ['1717028FMtdvV', '1990956kjVPIu', '9VDSVLq', '483027HXKYfY', '11sFGyXi', '751552AtgBMv', '7EYWvYZ', '5LwCvKi', '12175608ksxEKW', '292179mQKYat', '2LnyXmN', '206110PJCMUr'];
    _0x3e5b = function () {
        return _0x24abe2;
    };
    return _0x3e5b();
}

function getExchangeRate() {
    const api_key = '9cb7fc57f662f6bfb20745f4'
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    // if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/${api_key}/latest/${fromCurrency.value}`;
    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]; // getting user selected TO currency rate
        let totalExRate = (amountVal * exchangeRate).toFixed(2); // multiplying user entered value with selected TO currency rate
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() => { // if user is offline or any other error occured while fetching data then catch function will run
        exchangeRateTxt.innerText = "Something went wrong";
    });
}