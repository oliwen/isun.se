function handleCrmCampaign() {
    var params = $.deparam(location.search.substring(1), true);

    if (!params.utm_identifier)
        return;

    $.post('/crmcampaigns/handle', { identifier: params.utm_identifier });
}
handleCrmCampaign();
