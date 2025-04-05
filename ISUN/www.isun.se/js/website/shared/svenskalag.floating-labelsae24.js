/*Floating labels*/
$(function() {
	//Form fileds 
	var formField = $('.svlag-floating-label input:not([type=hidden]), .svlag-floating-label textarea, .svlag-floating-label select');

	//Float label when focus 
	formField.focus(function() {
		$(this).parent().addClass("floating");
	}).blur(function() {
		if( !this.value && !$(this).parent().is('.fixed-label')) {
			$(this).parent().removeClass("floating");
		}
	});

	//State of floating label
	formField.focusout(function () {
		//prefilled
		if ($(this).val() === "" && !$(this).parent().is('.fixed-label') ) {
			$(this).parent().removeClass('floating');
		} else {
			$(this).parent().addClass('floating');
		}
	}).focusout();

/*
	//Autofill fix
	var pfx = ["webkit", "moz", "MS", "o", ""];
	function PrefixedEvent(element, type, callback) {
		for (var p = 0; p < pfx.length; p++) {
			if (!pfx[p]) type = type.toLowerCase();
			element.addEventListener(pfx[p]+type, callback, false);
		}
	}

	function AnimationListener() {
		//console.log("test");
		//element.parentNode.className = element.parentNode.className + " floating";
	}

	
	formField.each(function() {
		var field = this;
		//PrefixedEvent(field, "AnimationEnd", AnimationListener(field));
		field.addEventListener("webkitAnimationEnd", AnimationListener, false);
		field.addEventListener("MozAnimationEnd", AnimationListener, false);
		field.addEventListener("OAnimationEnd", AnimationListener, false);
		field.addEventListener("animationEnd", AnimationListener, false);
	});


*/




	//Select field when label is clicked. (fallback if no for="" is set)
	$('.svlag-floating-label label').click(function(event){
		$(this).siblings('input, textarea, select').first().focus();
	});


	//Fix textarea height on type
	$(".svlag-floating-label textarea").each(function () {
		this.style.height = (this.scrollHeight+10)+'px';
	});

	function autoresize(textarea) {
		textarea.style.height = 'auto';     //Reset height, so that it not only grows but also shrinks
		textarea.style.height = (textarea.scrollHeight + 30) + 'px';    //Set new height
	}
	$('.svlag-floating-label textarea').on('input', function () {
		autoresize(this)
	});

});


