$(document).ready(function () {
    var data = $.fn.getData();
    var roadBikes = data.roadBikes;
    $.each(roadBikes, function (index) {
        $("#roadbikes-div").append(
            '<div class="pcol">' +
            '<div class="product-card" id=' +roadBikes[index].id+ '>' +
            '<h3>' + roadBikes[index].name + '</h3><img src="' + roadBikes[index].img + '" alt="' + roadBikes[index].name + '" width="100%" height="100%">' +
            '<p style="font-size: 20px;font-weight: 800;">' + roadBikes[index].price + '</p>' +
            '</div>' +
            '</div>'
        );
    });

    $(document).on('click', '.product-card', function (e) {
        var id = $(this).attr('id');
        var roadBikes = data.roadBikes;
        var selectedRoadBike = {};
        $.each(roadBikes, function (index) {
            if(id === roadBikes[index].id) {
                selectedRoadBike = roadBikes[index];
            }
        })
        localStorage.setItem('selectedBikeToView', JSON.stringify(selectedRoadBike));
        $(location).attr('href','product.html');
    });

});
