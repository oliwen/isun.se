/* Swedish initialisation for the jQuery UI date picker plugin. */
/* Written by Anders Ekdahl ( anders@nomadiz.se). */
jQuery(function($){
	$.datepicker.regional['sv'] = {
		closeText: 'Stäng',
        //prevText: '&laquo;Förra',
		//nextText: 'Nästa&raquo;',
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
		currentText: 'Idag',
        monthNames: ['Januari','Februari','Mars','April','Maj','Juni',
        'Juli','Augusti','September','Oktober','November','December'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
        'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNamesShort: ['Sön','Mån','Tis','Ons','Tor','Fre','Lör'],
		dayNames: ['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag'],
		dayNamesMin: ['S&ouml;', 'M&aring;', 'Ti', 'On', 'To', 'Fr', 'L&ouml;'],
		weekHeader: 'Ve',
        dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		showOtherMonths: true,
		selectOtherMonths: true,		
		yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['sv']);
});
