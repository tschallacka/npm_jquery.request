// REQUEST PLUGIN DEFINITION
// ============================
var $ = require('jquery');
var jQuery = $;
var Request = require('@tschallacka/oc.foundation.request');
var parameterToObject = require('@tschallacka/parameter_to_object');

var old = $.fn.request


$.fn.request = function(handler, option) {
    var args = arguments

    var $this = $(this).first()
    var data  = {
        evalBeforeUpdate: $this.data('request-before-update'),
        evalSuccess: $this.data('request-success'),
        evalError: $this.data('request-error'),
        evalComplete: $this.data('request-complete'),
        confirm: $this.data('request-confirm'),
        redirect: $this.data('request-redirect'),
        loading: $this.data('request-loading'),
        flash: $this.data('request-flash'),
        update: parameterToObject('data-request-update', $this.data('request-update')),
        data: parameterToObject('data-request-data', $this.data('request-data'))
    }
    if (!handler) {
    	handler = $this.data('request');
    }
    var options = $.extend(true, {}, Request.DEFAULTS, data, typeof option == 'object' && option)
    return new Request($this, handler, options)
}

$.fn.request.Constructor = Request

$.request = function(handler, option) {
    return $('<form />').request(handler, option);
}

// REQUEST NO CONFLICT
// =================

$.fn.request.noConflict = function() {
    $.fn.request = old;
    return this;
}

// REQUEST DATA-API
// ==============



$(document).on('change', 'select[data-request], input[type=radio][data-request], input[type=checkbox][data-request]', function () {
    $(this).request();
})

$(document).on('click', 'a[data-request], button[data-request], input[type=button][data-request], input[type=submit][data-request]', function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.request();

    if ($this.is('[type=submit]')) {
        return false
    }
})

$(document).on('keydown', 'input[type=text][data-request], input[type=submit][data-request], input[type=password][data-request]', function(e) {
    if (e.keyCode == 13) {
        if (this.dataTrackInputTimer !== undefined) {
            window.clearTimeout(this.dataTrackInputTimer);
        }
        $(this).request();
        return false
    }
});

$(document).on('keyup', 'input[data-request][data-track-input]', function (e) {
    var
        $el = $(this),
        lastValue = $el.data('oc.lastvalue');

    if (!$el.is('[type=email],[type=number],[type=password],[type=search],[type=text]')) {
        return;
    }

    if (lastValue !== undefined && lastValue == this.value) {
        return;
    }

    $el.data('oc.lastvalue', this.value);

    if (this.dataTrackInputTimer !== undefined) {
        window.clearTimeout(this.dataTrackInputTimer)
    }

    var interval = $(this).data('track-input')
    
    if (!interval) {
        interval = 300
    }

    var self = this;
    
    this.dataTrackInputTimer = window.setTimeout(function() {
        $(self).request()
    }, interval);
})

$(document).on('submit', '[data-request]', function() {
    $(this).request();
    return false;
})

$(window).on('beforeunload', function() {
    window.ocUnloading = true;
});