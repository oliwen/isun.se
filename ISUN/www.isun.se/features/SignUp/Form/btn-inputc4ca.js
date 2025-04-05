$(function () {
	$('.btn-input:not(.btn-input-initialized) .btn').click(function () {
		var isActive = $(this).hasClass("active");
		$(this).closest(".btn-input").find(".btn").removeClass("active");
		if (!isActive)
			$(this).addClass("active");
		var fieldName = $(this).closest(".btn-input").data('full-name-safe');
		$('input[name="' + fieldName + '"]').val($(this).hasClass("active") ? $(this).data('value') : '');
	});
	$('.btn-input:not(.btn-input-initialized)').each(function (i, e) {
		var fieldName = $(e).data('full-name-safe');
		var value = $('input[name="' + fieldName + '"]').val();
		if (value > 0)
			$(e).find('.btn[data-value="' + value + '"]').addClass("active");
		$(e).addClass('btn-input-initialized');
	});
});