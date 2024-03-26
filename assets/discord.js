var serverID = getParameterByName('serverID');
var title = getParameterByName('title') ? getParameterByName('title') : false;
var invite = getParameterByName('invite') ? getParameterByName('invite') : false;
var theme = getParameterByName('theme') ? getParameterByName('theme') : 'dark';
var showText = getParameterByName("showText") ? getParameterByName("showText") === "true" : false

$.getJSON('https://discordapp.com/api/servers/' + serverID + '/widget.json', function (data) {
    $("head").append('<link rel="stylesheet" href="assets/' + theme + '.css" />');
    $('.widgetHeaderCount').html('<strong>' + data.presence_count + '</strong> members online!');

    var wrapper = $('.widgetFooter');
    var titlebar = ``;
    if (showText) {
        titlebar = `Join the `;
        if (title) {
            titlebar += `<strong>` + title + `</strong>`;
        } else {
            titlebar += `<strong>` + data.name + `</strong>`;
        }

        titlebar += " Discord community!"
    }

    wrapper.append('<span class="widgetFooterText">' + titlebar + '</span>');
    if (invite) {
        var text = `<a class="widgetBtnConnect" href="` + data.instant_invite + `" target="_blank">Join Discord</a>`;
        wrapper.append(text);
    }
});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}