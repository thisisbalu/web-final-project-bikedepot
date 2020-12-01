$(document).ready(function () {
    var data = $.fn.getData();
    var mountainBikes = data.mountainBikes;
    console.log(mountainBikes);
    $.each(mountainBikes, function (index) {
        $("#mountainbikes-div").append(
            '<div class="pcol">' +
            '<div class="product-card" id=' +mountainBikes[index].id+ '>' +
            '<h3>' + mountainBikes[index].name + '</h3><img src="' + mountainBikes[index].img + '" alt="' + mountainBikes[index].name + '" width="100%" height="100%">' +
            '<p style="font-size: 20px;font-weight: 800;">' + mountainBikes[index].price + '</p>' +
            '</div>' +
            '</div>'
        );
    });

    $(document).on('click', '.product-card', function (e) {
        var id = $(this).attr('id');
        var mountainBikes = data.mountainBikes;
        var selectedRoadBike = {};
        $.each(mountainBikes, function (index) {
            if(id === mountainBikes[index].id) {
                selectedRoadBike = mountainBikes[index];
            }
        })
        localStorage.setItem('selectedBikeToView', JSON.stringify(selectedRoadBike));
        $(location).attr('href','product.html');
    });
});
