$(document).ready(function () {
    var data = $.fn.getData();
    var allBikes = [];
    var cartBikes = {};
    var size = 0;

    $.fn.loadHtml = function(d) {
        $("#bikes-div").html('');
        $.each(d, function (index) {
            $("#bikes-div").append(
                '<div class="pcol">' +
                '<div class="product-card" id=' +d[index].id+ '>' +
                '<h3>' + d[index].name + '</h3><img src="' + d[index].img + '" alt="' + d[index].name + '" width="100%" height="100%">' +
                '<p style="font-size: 20px;font-weight: 800;">' + d[index].price + '</p>' +
                '<div id="AddToCart" class="add-to-cart"><select id="' +d[index].id+'_select" style="margin-right: 10px;" name="quantity" id="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select><span class="addtocart" id="'+d[index].id+'">Add to Cart</span>' +
                '</div>' +
                '</div>'
            );
        });
    };

    $.fn.search = function(searchText) {
        var searchedBikes = [];
        $.each(allBikes, function (index) {
            if(allBikes[index].name.toLowerCase().indexOf(searchText) != -1){
                searchedBikes.push(allBikes[index]);
            }
            if(allBikes[index].type.toLowerCase().indexOf(searchText) != -1){
                searchedBikes.push(allBikes[index]);
            }
        });
        $.fn.loadHtml(searchedBikes);
    };

    $(document).on('click', '#search-button', function (e) {
        var searchText = $('#search-text').val().trim().toLowerCase();
        console.log(searchText);
        if(!!searchText) {
            $.fn.search(searchText);
        } else {
            $.fn.search(allBikes);
        }
    });

    $(document).on('keyup', '#search-text', function (event) {
        var searchText = $('#search-text').val().trim().toLowerCase();
        console.log(searchText);
        if(!searchText) {
            $.fn.loadHtml(allBikes);
        }
    });

    $(document).on('click', '.addtocart', function (e) {
        var id = $(this).attr('id');
        console.log(id);
        $(this).html('Added to Cart');
        var selectId = id + '_select';
        var quantity = Number($("#" + selectId).val());
        var selectedbike = {};
        $.each(allBikes, function (i) {
            if(id === allBikes[i].id) {
                selectedbike = allBikes[i];
            }
        });
        selectedbike.quantity = quantity;
        cartBikes[id] = selectedbike;
        $('#invoice').html('Go To Invoice (' +Object.keys(cartBikes).length +')');
        localStorage.setItem('cartBikes', JSON.stringify(cartBikes));
    });

    $(document).on('click', '#invoice', function () {
        if(!!Object.keys(cartBikes).length && Object.keys(cartBikes).length > 0) {
            $(location).attr('href','invoice.html');
        } else {
            alert("Please add items to cart!");
        }
    });

    $.each(data.roadBikes, function (index) {
        allBikes.push(data.roadBikes[index]);
    });
    $.each(data.mountainBikes, function (index) {
        allBikes.push(data.mountainBikes[index]);
    });
    $.each(data.electricBikes, function (index) {
        allBikes.push(data.electricBikes[index]);
    });
    $.fn.loadHtml(allBikes);

});
