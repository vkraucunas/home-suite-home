$('.all .on').on('click', function(e) {
    e.preventDefault();
    allLights('on');
})

$('.all .off').on('click', function(e) {
    e.preventDefault();
    allLights('off');
})

function allLights(direction) {
    return $.ajax('/lights/'+direction)
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert( "error" );
        })
}
