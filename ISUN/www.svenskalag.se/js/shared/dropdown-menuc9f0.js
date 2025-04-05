$(".dropdown-trigger").click(function () {
	var dropdownMenu = $(this).closest(".header-dropdown").find(".drop-arrow, .dropdown-menu");
	if (dropdownMenu.is(':visible')) {
	    $(".header-dropdown .drop-arrow, .header-dropdown .dropdown-menu").hide();
	    dropdownMenu.closest(".header-dropdown").removeClass("open");
		dropdownMenu.hide();
	} else {
	    $(".header-dropdown .drop-arrow, .header-dropdown .dropdown-menu").hide();
	    $(".header-dropdown").removeClass("open");
	    dropdownMenu.closest(".header-dropdown").addClass("open");
		dropdownMenu.show();
	}
	$(".dispatch-bouble").hide();
});

$("html").click(function () {
    $(".header-dropdown.open .drop-arrow, .header-dropdown.open .dropdown-menu, .dispatch-bouble:visible").hide();
    $(".header-dropdown.open").removeClass("open");
});

$(".dropdown-trigger, #dispatchBtn, .dispatch-bouble, .drop-arrow").click(function (e) {
    e.stopPropagation();
});

$("body").on("click", ".dropdown .dropdown-menu", function(e) {
    //$("body").on("click", ".dropdown:not('#sideMenu') .dropdown-menu", function(e) {
    if (!$(e.target).is("a") && !$(e.target).parent().is("a"))
    {
        e.stopPropagation();
    }
});

$("#dispatchBtn").click(function () {
	margin = ($(this).width() - 164) / 2;
	$(".dispatch-bouble").css("marginLeft", margin);
	$(".dispatch-bouble").toggle();
});



/* Enable multi-level dropdowns */
$(document).ready(function(){
  $('.navbar .dropdown-submenu a:first-child:not(.submenu a)').on("click", function(e){
    $(this).next('ul').toggle();
    $(this).parent('li.dropdown-submenu').toggleClass('submenu-open');
    e.stopPropagation();
    e.preventDefault();
  });
});