/*$.fn.loadView = function (url) {
	$(this).load(url, function () { setPageHeight(); });
};*/


/* Banner title alignment fix (firefox) */
$(document).ready(function () {
    $('.title legend').attr('align', 'center');
});

/* Sticky #sidemenu navigation for smaller devices. */
var SlideMenuOffset;
var headerHeight;
$(document).ready(function () {
    if ($('#toggle-sideMenu').length > 0) {
        SlideMenuOffset = $('#toggle-sideMenu').offset().top;
        headerHeight = $('.header-emblem').height();
        //stickyMenu();
    }
});
function stickyMenu() {
    scroll = $(window).scrollTop();

    if (scroll > SlideMenuOffset && !$("#sideMenu").hasClass("open")) {
        $("body").addClass("stickyMenu");

    } else if (scroll < SlideMenuOffset + 10) {
        $("body").removeClass("stickyMenu");
    }
}
$(window).scroll(function () {
    //stickyMenu();
});





//POPUPFÖNSTER
function popit(url, name, width, height, scrollbars) {
	newwindow=window.open(url, name, 'status=YES,width='+width+',height='+height+',resizable=yes,scrollbars='+scrollbars);
	if (window.focus) {newwindow.focus()}
	return false;
}


var getPopupSize = function (width, height) {
    var size = {
        width: width || 450,
        height: height || 650
    }

    if (window.screen.availHeight > 1200) {
        size.height += 450;
    }
    else if (window.screen.availHeight > 1000) {
        size.height += 250;
    }
    return size;
}




function setPageHeight() {

	//Hämtar Y-offset för vänstermenyn.
	var menuOffset = $(".menu-bg").offset();

	if (!menuOffset) {
		return;
	}

	//var menuheight = $("#container").height() - menuOffset.top - 50 ;
	if( $('#siteCol').height() < $('#rightCol').height() ) {
		$('.menu-bg').css('min-height', $('#rightCol').height() + 'px');
	}

}



$(function () {

    //Anpassar höjden på vänstermenyn.
	setPageHeight();
	setTimeout(setPageHeight, 1000);

	$("[data-toggle='tooltip']").tooltip();

    //Lägger till en titel om texten är för lång i huvudmenyn.
	$(".multi-column-dropdown a").bind("mouseenter", function () {
        var $this = $(this);
        if(this.offsetWidth < this.scrollWidth && !$this.attr("title")){
            $this.attr("title", $this.text());
        }
    });

    $(".datepicker").datepicker({
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });

    $("body").on({
        mouseenter: function () {
            $(this).attr("title", "");
        }
    }, ".ui-datepicker-prev, .ui-datepicker-next");

    $('[data-toggle="popover"]').popover({ html: true });

    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    $(document).on("click", "[data-dismiss=popover]", function () {
        $(this).parents(".popover").popover('toggle');
    });

    $("#sideMenu a span").click(function (e) {
        e.preventDefault();
        $($(this).attr("data-target")).collapse('toggle');
    });

    $(".table-narrow th, .table-narrow tbody td").bind("mouseenter", function () {
        var $this = $(this);

        if (this.offsetWidth < this.scrollWidth && !$this.attr('title')) {
            $this.attr('title', $this.text());
        }
    });

    $("#navTeamsTrigger").click(function (e) {
        e.preventDefault();
        $("#navTeams").toggleClass("in");
    })

    $('a[data-toggle=dropdown]').click(function (e) {
        e.preventDefault();
        setTimeout($.proxy(function () {
            if ('ontouchstart' in document.documentElement) {
                $(this).siblings('.dropdown-backdrop').off().remove();
            }
        }, this), 0);
    });
});



function HideTeams() {
    //legacy function called from every page. 
}
		
function SwapBgColor(ID) {
		document.getElementById(ID).style.background = '#fefeef';	
	}
function RestoreBgColor(ID) {
		document.getElementById(ID).style.background = '#FFFFFF';		
	}
				
			
			
//	AJAX
function GetXmlHttpObject() {
	var xmlHttp=null;
	try {
		// Firefox, Opera 8.0+, Safari
		xmlHttp = new XMLHttpRequest();
	}
	catch (e) {
		// Internet Explorer
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e) {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}	  
		
		
		
//REDIGERAFÖNSTER
function editWindow(url, type) {

	//Default Width / Height
	var w = 777;
	var h = 740;

	//Slim size
	if (type == "slim") {
		w=549;
		h=640;
	}
	else if (type == "wide") {
		w=766;
	}

	//Set the popup height to mainwindow size is bigger than popup
	if ( window.top.outerHeight-250 > h) {
		h = window.top.outerHeight-250;
	} 

	//Set max height of popup
	if ( h > 1000 ) {
		h = 1000;
	}

	//Center popup in main window
	var popPosTop = window.top.outerHeight / 2 + window.top.screenY - ( h / 2)
	var popPosLeft = window.top.outerWidth / 2 + window.top.screenX - ( w / 2) - 50

	//Create window 
	neweditwindow = window.open(url, "editWindow"+type, "scrollbars=yes,status=yes,resizable=1,width="+w+",height="+h+", left="+popPosLeft+", top="+popPosTop+"");
	

	if (window.focus) {neweditwindow.focus()}
	return false;
}



$(function () {


	/***************************************************************************
	Siteoverlay mobile nav
	****************************************************************************/
	$(".dropdown").on("show.bs.dropdown", function (e) {
        if (!$(e.relatedTarget).hasClass("mobile-nav")) {
            return;
        }
        $("#site-overlay").show();
        //$("body").addClass("noscroll");
    });
    $(".dropdown").on("hide.bs.dropdown", function (e) {
        $("#site-overlay").hide();
        //$("body").removeClass("noscroll");
    });


	/***************************************************************************
	Radio-dropdown 
	****************************************************************************/
	$(".radio-dropdown .dropdown-toggle").click(function (e) {
		
		//Variables
		isOpen = $(this).parent().is(".open");
		//checkedItem = $(this).next().find(".checked");

		//Close all other radio-dropdowns.
		$(".radio-dropdown").removeClass("open")
		
		if(isOpen) {
			//mark selected item
			$(this).parent().removeClass("open");
			return;
		} else {
			$(this).parent().addClass("open");
		}

		e.preventDefault();
	});
		/* Close radio-dropdown on click outside */
		$(document).mouseup(function (e) {
			var container = $(".radio-dropdown");

			if (container.hasClass("auto-close") && !$(e.target).hasClass("disabled")) {
				container.removeClass("open");
			}
			else {
				if (!container.is(e.target) // if the target of the click isn't the container...
					&& container.has(e.target).length === 0) // ... nor a descendant of the container
				{
					container.removeClass("open");
				}
			}
		});



});
		
//Special select menu (Previously used in schedule)
//$(document).on("change", ".select-menu select", function (e) {
//    alert("change")
//	var value = $(this).find('option:selected').text(); 
//	$(this).parents(".select-menu").find("span").text(value);
//});
		
		
		
/*	
$(document).ready(function($) {
					
	//Hämtar Y-offset för vänstermenyn.
	var menuOffset = $(".menu-bg").offset();

	if (!menuOffset) {
		return;
	}

	//Anpassar höjden på vänstermenyn.
	var menuheight = $("#container").height() - menuOffset.top - $("#footer").height() + 50 + $(".header-alert").height();
	$('.menu-bg').css('min-height', menuheight + 'px');


	//Anpassar marginal för sidfot med olika höjd.
	//var footerHeight = $("#footer").height() + 90;
	//$('.content').css('margin-bottom', footerHeight + 'px');

});*/
		
			
