$(document).ready(function () {
    var selectedBikeToView = JSON.parse(localStorage.getItem('selectedBikeToView'));
    $('#name').html(selectedBikeToView.name);
    $("#img").attr("src",selectedBikeToView.img);
    $('#description').html(selectedBikeToView.description);
    $('#price').html('PRICE : '+selectedBikeToView.price);
    $('#sku').html('SKU CODE : '+selectedBikeToView.sku);
    $('#emi').html('EMI/Month : '+selectedBikeToView.emi);
});
