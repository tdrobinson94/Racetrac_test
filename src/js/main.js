let $ = require("jquery");
let Cleave = require('cleave.js');

let cookieStatus = '';

// Sets our cookie
$(document).ready(function() {
    document.cookie = "visitedSite";
    cookieStatus = true;
})


//Makes sure that only one checkbox can be selected at a time
$('.next').prop('disabled', true);
$('.submit').prop('disabled', true)
$('.icon-form input').on('change',  function() {
    $('.icon-form input').not(this).prop('checked', false);
    $('.next').prop('disabled', false);
    $('.next').addClass('clickable');
})

$('.payment-form input').on('change', function () {
    $('.payment-form input').not(this).prop('checked', false);
    $('.submit').prop('disabled', false);
    $('.submit').addClass('clickable');
})

//Format Credit card field
var cleave = new Cleave('.card-number', {
    creditCard: true,
});

//Format date field
var cleave = new Cleave('.exp-date', {
    date: true,
    datePattern: ['m', 'y']
});

//Select styles when an image label is clicked
$('label').click(function() {

    $('label').removeClass('selected');
    if ($(this).hasClass('item_1')) {
        console.log("Item 1")
        $(this).addClass('selected');
    } else if ($(this).hasClass('item_2')) {
        console.log("Item 2")
        $(this).addClass('selected');
    } else if ($(this).hasClass('item_3')) {
        console.log("Item 3")
        $(this).addClass('selected');
    } else if ($(this).hasClass('item_4')) {
        console.log("Item 4")
        $(this).addClass('selected');
    }

})

//Click next
$('.next').click(function(){
    $('.form_1').hide()
    $('.form_2').show()

    $('.progress_1').addClass('success');
    $('.progress_1 span:first-child').replaceWith(`<span class="checkmark">✔</span>`);
    $('.progress_2').addClass('on');
})


//Click back
$('.back').click(function () {
    $('.form_2').hide()
    $('.form_1').show()

    $('.progress_1').removeClass('success');
    $('.progress_1 span:first-child').replaceWith(`<span class="progress_1">1</span>`);
    $('.progress_2').removeClass('on');
})

//Submit form
$('.submit').click(function() {
    $('.form_2').hide()
    $('.form_3').show()

    $('.progress_2').removeClass('on');
    $('.progress_2 span:first-child').replaceWith(`<span class="checkmark">✔</span>`);
    $('.progress_2').addClass('success');
})

//Return home
$('.return').click(function () {
    $('.form_2').hide()
    $('.form_3').hide()
    $('.form_1').show()

    $('.progress_1, .progress_2').removeClass('success');
    $('.progress_1 span:first-child').replaceWith(`<span class="progress_1">1</span>`);
    $('.progress_2 span:first-child').replaceWith(`<span class="progress_2">2</span>`);
    $('.progress_1').addClass('on');
})