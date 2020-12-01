$(document).ready(function () {

    var orders = JSON.parse(localStorage.getItem('orderHistory'));
console.log(orders);
    if(!!orders) {
        $('#no-orders').html('');
        $.each(orders, function (index) {
           var order = orders[index];
           var productName = '';
           $.each(order.products, function (index) {
               productName = productName + order.products[index] + '\n';
           });

            $('#history-table').append(
                '<tr>' +
                '<td style="padding: 10px;">'+order.id+'</td>\n' +
                '<td style="padding: 10px;">'+productName+'</td>\n' +
                '<td style="padding: 10px;">'+order.date+'</td>\n' +
                '<td style="padding: 10px;">'+order.price+'</td>' +
                '</tr>'
            );
        });
    } else {
        $('#history-table').html('');
        $('#no-orders').html('No Previous Orders');
    }
});
