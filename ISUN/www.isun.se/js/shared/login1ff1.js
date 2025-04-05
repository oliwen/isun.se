function getNewPasswordKey() {
    if (newPasswordKey)
        return newPasswordKey;
    var params = $.deparam(location.hash.substring(1));
    return params.newPasswordKey;
}
function clearLoginError() {
    $('.login-error').hide().html(null);
    $('.forgot-password-error').hide().html(null);
    $('#login-username, #login-password, #forgot-password-email').parent('.svlag-floating-label').removeClass("invalid");
}

var requestInProgress = false;
$('#login-modal').on('show.bs.modal', function () {
    clearLoginError();
    $('body').addClass('login-open');
    $('.login-signin').hide();
    $('.forgot-password-step1').hide();
    $('.forgot-password-step2').hide();
    $('.forgot-password-step3').hide();
    $('.forgot-password-step4').hide();
    $('.forgot-password-btn').show();
    $('.sign-in').show();
});



$('#login-modal').on('hidden.bs.modal', function () {
    $('body').delay(800).removeClass('login-open');
    $('.login-back').hide();
});

function getLoginRedirectUrl() {
    var params = $.deparam(location.search.substring(1));

    if (params.redirecturl && params.redirecturl.indexOf("/" + teamName + "/blank") == -1)
        return params.redirecturl;

    if (location.pathname.indexOf("/" + teamName + "/blank") > -1 || location.pathname == "/" + teamName || location.pathname == "/" || location.pathname == "/" + teamName + "/logga-in")
        return "/" + teamName + "/kontrollpanelen";

    if (location.pathname.indexOf("/logga-in/nytt-losenord") > -1)
        return "/" + teamName;

    return null;
}


$('#login-form').submit(function () {
    if (requestInProgress)
        return false;
    $('#login-submit .fa-spinner').css('display', 'inline-block');
    $('#login-submit .login-submit-text').html('Loggar in');
    clearLoginError();
    requestInProgress = true;
    $.ajax({
        type: 'POST',
        url: $('#login-form').attr('action'),
        data: {
            userName: $('#login-form [name="UserName"]').val(),
            userNameSite: $('#login-form [name="UserNameSite"]').val(),
            userPass: $('#login-form [name="UserPass"]').val(),
            cbautologin: $('#login-form [name="cbautologin"]').val(),
        },
    }).done(function (response) {
        if (response.error) {
            $('#login-submit .fa-spinner').hide();
            $('#login-submit .login-submit-text').html('Logga in');
            $('#login-username, #login-password').parent('.svlag-floating-label').addClass("invalid fixed-label");
            $('.login-error').html("<span>" + response.error + "</span>").show();
        }
        else {
            if (response.redirect)
                location.href = response.redirect;
            var loginRedirectUrl = getLoginRedirectUrl();
            if (loginRedirectUrl)
            {
                location.href = loginRedirectUrl;
                setTimeout(function () {
                    // Redirect to the documents page incase the login post request returned a document file.
                    var guidRegex = /\/dokument\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}/;
                    if (guidRegex.test(loginRedirectUrl))
                        location.href = "/" + teamName + "/dokument";
                }, 1000);
            }
            else
                location.reload();
        }
        requestInProgress = false;
    });
    return false;
});



$('.forgot-password-btn').click(function () {
    $(this).hide();
    $('.sign-in').hide();
    $('.error-msg').hide().html(null);
    $('.forgot-password-step1').show();
    $('.login-back').show();
});



$('#send-password').click(function () {
    if (requestInProgress)
        return;
    $('.forgot-password-error').html(null);

    var email = $('#forgot-password-email').val();
    $('#send-password .fa-spinner').css('display', 'inline-block');
    $('#send-password span').text($('#send-password').data('loading-text'));
    requestInProgress = true;
    $.post("/" + teamName + "/login/forgot", { email: email }).then(function (response) {
        requestInProgress = false;
        $('#send-password .fa-spinner').hide();
        $('#send-password span').text($('#send-password').data('default-text'));
        if (response.error) {
            $('.forgot-password-error').html("<span>" + response.error + "</span>").show();
            $('#forgot-password-email').parent('.svlag-floating-label').addClass("invalid fixed-label");
        } else {
            $('#forgot-password-email').val("");
            $('.forgot-password-step1').hide();
            $('.forgot-password-step2').show();
        }
    });
});



$('.goto-signin').click(function () {
    clearLoginError();
    $('.forgot-password-step1').hide();
    $('.forgot-password-step2').hide();
    $('.forgot-password-step3').hide();
    $('.forgot-password-step4').hide();
    $('.login-back').hide();
    $('.login-signin').hide();
    $('.sign-in').show();
    $('.forgot-password-btn').show();

    if ($(this).hasClass('goto-signin-use-new-login')) {
        var username = $('.forgot-password-step3 .new-password-username').text();
        var password = $('.forgot-password-step3 [name="password"]').val();

        $('#login-username').val(username);
        $('#login-password').val(password);
    }
});

$('.resend-password-key-btn').click(function () {
    if (requestInProgress)
        return;

    $('.resend-password-key-btn .fa-spinner').css('display', 'inline-block');
    $('.resend-password-key-btn span').text($('.resend-password-key-btn').data('loading-text'));

    requestInProgress = true;
    $.post('/' + teamName + '/login/resendpasswordkey', { key: getNewPasswordKey() }).then(function (response) {
        requestInProgress = false;
        $('.resend-password-key-btn .fa-spinner').hide();
        $('.resend-password-key-btn span').text($('.resend-password-key-btn').data('default-text'));
        $('.forgot-password-step3').hide();
        $('.forgot-password-step2').show();
        $('.login-back').hide();
        $('.login-signin').show();
    });
})


$('#set-new-password').submit(function () {
    if (requestInProgress)
        return false;
    requestInProgress = true;
    $('#set-new-password .fa-spinner').css('display', 'inline-block');
    $('.set-new-password-btn span').text($('.set-new-password-btn').data('loading-text'))
    var password = $('[name="password"]').val();
    var password2 = $('[name="password2"]').val();
    $('.new-password-error').html(null);
    $.post('/' + teamName + '/login/setnewpassword', { password: password, password2: password2, key: getNewPasswordKey() }).then(function (response) {
        requestInProgress = false;
        if (response.error) {
            $('.set-new-password-btn span').text($('.set-new-password-btn').data('default-text'))
            $('#set-new-password .fa-spinner').hide();
            $('.new-password-error').html("<span>" + response.error + "</span>").show();
        }
        else {
            $('.forgot-password-step3').hide();
            $('.forgot-password-step4').show();
        }
    });
    return false;
});

$('.close-login').click(function () {
    if ($(this).hasClass("close-login-go-previous-page"))
        goPreviousPage();
});

function initializeNewPassword() {
    var key = getNewPasswordKey();
    if (!key)
        return;

    $('.sign-in').hide();
    $('.forgot-password-btn').hide();

    $.post('/' + teamName + '/login/getNewPasswordInfo', { key: key }).then(function (response) {
        $('#login-modal').modal();
        if (response.link.alreadyUsed) {
            $('.new-password-container').hide();
            $('.link-already-used').show();
            $('.login-signin').show();

        }
        else if (response.link.expired) {
            $('.new-password-container').hide();
            $('.link-expired').show();
            $('.login-signin').show();

        }
        else if (!response.link.valid) {
            $('.new-password-container').hide();
            $('.link-invalid').show();
            $('.login-signin').show();

        }

        $('.sign-in').hide();
        $('.forgot-password-btn').hide();
        $('.new-password-username').html(response.link.userName);
        $('.forgot-password-step3 [name="username"]').val(response.link.userName);
        $('.is-first-login-new').toggle(!response.link.isFirstLogin);
        $('.forgot-password-step3').show();
    });
}

function initializeLoginModal() {
    var params = $.deparam(location.hash.substring(1), true);
    if (params.openLoginModal && !isAuthenticated) {
        $('#login-modal').modal('show');
        //location.hash = location.hash.replace("openLoginModal=true", "")
    }
    if (params.openForgotPasswordModal) {
        $('#login-modal').modal('show');
        //location.hash = location.hash.replace("openForgotPasswordModal=true", "")
        $('.forgot-password-btn').click();
    }
}

initializeLoginModal();
initializeNewPassword();

function goPreviousPage() {
    if (document.referrer.indexOf(window.location.host) !== -1 && document.referrer.indexOf("/logga-in/nytt-losenord") === -1) {
        window.location.href = document.referrer;
    }
    else {
        window.location.href = '/' + teamName;
    }
}

/****************************
Check for primary-color for contrast
use light/dark text color
*****************************/

//Get RGB of header
var headerRgb = $('.login-wrapper').css("background-color");
headerRgb = headerRgb.split("(")[1].split(")")[0].split(",");


// Check brightness of color: http://www.w3.org/TR/AERT#color-contrast
function setTextColor() {
    var brightness = Math.round(((parseInt(headerRgb[0]) * 299) + (parseInt(headerRgb[1]) * 587) + (parseInt(headerRgb[2]) * 114)) / 1000);

    //Set text color higher value = brighter background.
    if (brightness > 168 || isNaN(brightness)) {
        $('.login-wrapper').addClass('text-dark');
    } else {
        $('.login-wrapper').addClass('text-light');
    }

    //Check contrast for button
    if (brightness < 20 || isNaN(brightness)) {
        //Darkest
        $('.login-wrapper').addClass('button-darkest');
    } else if (brightness < 40 || isNaN(brightness)) {
        //Darker
        $('.login-wrapper').addClass('button-darker');
    } else if (brightness < 150 || isNaN(brightness)) {
        //Dark
        $('.login-wrapper').addClass('button-dark');
    } else if (brightness < 190 || isNaN(brightness)) {
        //Light
        $('.login-wrapper').addClass('button-light');
    } else if (brightness < 255 || isNaN(brightness)) {
        //Lighter
        $('.login-wrapper').addClass('button-lighter');
    }
}
setTextColor();