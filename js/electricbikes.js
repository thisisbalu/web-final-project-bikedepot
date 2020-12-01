$(document).ready(function () {
    var data = $.fn.getData();
    var electricBikes = data.electricBikes;
    $.each(electricBikes, function (index) {
        $("#electricbikes-div").append(
            '<div class="pcol">' +
            '<div class="product-card" id=' +electricBikes[index].id+ '>' +
            '<h3>' + electricBikes[index].name + '</h3><img src="' + electricBikes[index].img + '" alt="' + electricBikes[index].name + '" width="100%" height="100%">' +
            '<p style="font-size: 20px;font-weight: 800;">' + electricBikes[index].price + '</p>' +
            '</div>' +
            '</div>'
        );
    });

    $(document).on('click', '.product-card', function (e) {
        var id = $(this).attr('id');
        var electricBikes = data.electricBikes;
        var selectedRoadBike = {};
        $.each(electricBikes, function (index) {
            if(id === electricBikes[index].id) {
                selectedRoadBike = electricBikes[index];
            }
        })
        localStorage.setItem('selectedBikeToView', JSON.stringify(selectedRoadBike));
        $(location).attr('href','product.html');
    });
});
