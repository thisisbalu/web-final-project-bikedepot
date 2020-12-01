$(document).ready(function () {
    var cartBikes = JSON.parse(localStorage.getItem('cartBikes'));
    var invoice_total = 0;
    var invoice_tps = 0;
    var invoice_tvq = 0;
    var invoice_final = 0;

    var nameRegex = new RegExp(/^[a-zA-Z\s]*$/);
    var onlyNumberRegex = new RegExp(/^[0-9]*$/);
    var emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    var visaRegex = new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?)$/);
    var mastRegex = new RegExp(/^(?:5[1-5][0-9]{14})$/);
    var amexRegex = new RegExp(/^(?:3[47][0-9]{13})$/);
    var discRegex = new RegExp(/^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/);
    var cvvRegex = new RegExp(/^^[0-9]{3,4}$/);
    var expirtyRegex = new RegExp(/^\d{2}\/\d{2}$/);


    $.each(cartBikes, function (key, val) {
        var productName = val.name;
        var cost = val.cost;
        var quantity = val.quantity;
        var total = cost * quantity;
        $('#summary-table').append(
            '<tr>' +
            '<td>'+productName+'</td>\n' +
            '<td>'+cost+'</td>\n' +
            '<td>'+quantity+'</td>\n' +
            '<td>'+total+'</td>' +
            '</tr>'
        );
        invoice_total = invoice_total + total;
    });
    invoice_tps = Math.ceil(invoice_total * 0.05);
    invoice_tvq = Math.ceil(invoice_total * 0.09975);
    invoice_final = Math.ceil(invoice_total + invoice_tvq + invoice_tps);
    $('#summary-table').append(
        '<tr>' +
        '<td></td>\n' +
        '<td></td>\n' +
        '<td></td>\n' +
        '<td><br><br>TPS : '+invoice_tps+'<br>TVQ : '+invoice_tvq+'<br>TOTAL : '+invoice_final+'</td>' +
        '</tr>'
    );

    $(document).on('click', '#cancel', function (e) {
        localStorage.removeItem('cartBikes');
        alert("Order was cancelled.\n\nRedirecting you back to Shopping page.");
        $(location).attr('href','shopping.html');
    })

    $(document).on('click', '#order', function (e) {
        var validated = $.fn.validate();
        if(validated) {
            var order = {};
            order.id = new Date().getTime();
            order.date = new Date().toDateString();
            order.products = [];
            $.each(cartBikes, function (key, val) {
                order.products.push(val.name + ' X ' + val.quantity);
                var cost = val.cost;
                var quantity = val.quantity;
                var total = cost * quantity;
                invoice_total = invoice_total + total;
            });
            invoice_tps = Math.ceil(invoice_total * 0.05);
            invoice_tvq = Math.ceil(invoice_total * 0.09975);
            invoice_final = Math.ceil(invoice_total + invoice_tvq + invoice_tps);
            order.price = invoice_final;
            var orderhistory = JSON.parse(localStorage.getItem('orderHistory'));
            if(!!orderhistory) {
                orderhistory.push(order);
                localStorage.setItem('orderHistory', JSON.stringify(orderhistory));
            } else {
                var orders = [];
                orders.push(order);
                localStorage.setItem('orderHistory', JSON.stringify(orders));
            }
            localStorage.removeItem('cartBikes');
            alert("Order Placed!\n\nThank you for shopping\n\nRedirecting you to shopping page.\n\nHappy shopping :)");
            $(location).attr('href','shopping.html');
        }
    });

    $.fn.validate = function () {
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var address = $('#address').val().trim();
        var city = $('#city').val().trim();
        var postal = $('#postal').val().trim();
        var province = $('#province').val().trim();

        var nameOnCard = $('#name-on-card').val().trim();
        var cardNo = $('#card-no').val().trim();
        var cvv = $('#cvv').val().trim();
        var expiry = $('#expiry').val().trim();

        var validated = true;

        if(!name) {
            alert("Name is Mandatory in Shipping");
            validated = false;
        } else if (!nameRegex.test(name)) {
            alert("Invalid Name. Only alphabets and spaces are allowed for name field.");
            validated = false;
        }

        if (!address) {
            alert("Address field is mandatory. Please fill the field");
            validated = false;
        }

        if(!email) {
            alert("Email is mandatory");
            validated = false;
        } else if (!emailRegex.test(email)){
            alert("Invalid email");
            validated = false;
        }

        if(!city) {
            alert("City is Mandatory in Shipping");
            validated = false;
        } else if (!nameRegex.test(name)) {
            alert("Invalid City. Only alphabets and spaces are allowed for name field.");
            validated = false;
        }

        if(!postal) {
            alert("Postal Code is Mandatory in Shipping");
            validated = false;
        }

        if(!province) {
            alert("Province is Mandatory in Shipping");
            validated = false;
        } else if (!nameRegex.test(name)) {
            alert("Invalid Province. Only alphabets and spaces are allowed for name field.");
            validated = false;
        }

        if(!nameOnCard) {
            alert("Name is Mandatory in Payment");
            validated = false;
        } else if (!nameRegex.test(nameOnCard)) {
            alert("Invalid Name. Only alphabets and spaces are allowed for name field.");
            validated = false;
        }

        var isVisa = visaRegex.test( cardNo ) === true;
        var isMast = mastRegex.test( cardNo ) === true;
        var isAmex = amexRegex.test( cardNo ) === true;
        var isDisc = discRegex.test( cardNo ) === true;

        if(!cardNo) {
            alert("Card Number is Mandatory");
            validated = false;
        } else if(!(isVisa || isMast || isAmex || isDisc)) {
            alert("Invalid Card! We only Accept VISA, MasterCard, AMEX amd Discover");
            validated = false;
        }

        if(!cvv) {
            alert("CVV is Mandatory in Payment");
            validated = false;
        } else if (!cvvRegex.test(cvv)) {
            alert("Invalid CVV.");
            validated = false;
        }

        if(!expiry) {
            alert("Expiry is Mandatory in Payment");
            validated = false;
        } else if (!expirtyRegex.test(expiry)) {
            alert("Invalid expiry date. Please enter in format MM/YY");
            validated = false;
        }

        return validated;
    };
});
