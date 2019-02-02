/**
 * @param {jQuery} $
 */
(function ($) {
    "use strict";

    var $btn;

    /**
     * @param {String} action
     * @param {jQuery} elem
     * @param {Function} callback
     * @param {Object} errorMessage
     * @param {Boolean} showModal
     * @constructor
     */
    $.BtnProgress = function (action, elem, callback, errorMessage, showModal) {
        this.init(action, elem, callback, errorMessage, showModal);
    };

    /**
     * @type {{init: init, start: start, stop: stop, success: success, error: error, removeStartAttributes: removeStartAttributes, setBackgroundSizeAndTransitionTime: setBackgroundSizeAndTransitionTime, highlightButton: highlightButton, callback: callback, options: {}}}
     */
    $.BtnProgress.prototype = {

        /**
         * @param {String} action
         * @param {jQuery} elem
         * @param {Function} callback
         * @param {Object} errorMessage
         * @param {Boolean} showModal
         */
        init: function(action, elem, callback, errorMessage, showModal) {
            $btn = $(elem);
            // remove classes
            $btn.removeClass('btn-success btn-danger');

            // call appropriate function
            if (typeof action !== 'undefined' && typeof this[action] === 'function') {
                this[action](callback, errorMessage, showModal);
            }
        },

        /**
         * On start
         *
         * Add disabled and starts progress animation
         *
         * @param {Function} callback
         */
        start: function(callback) {
            $btn
                .addClass('btn_has-progress')
                .attr('disabled','disabled');

            this.setBackgroundSizeAndTransitionTime(90, 10);

            // callback
            this.callback(callback);
        },

        /**
         * On stop
         *
         * @param {Function} callback
         */
        stop: function(callback) {
            this.removeStartAttributes();

            // callback
            this.callback(callback);
        },

        /**
         * On success
         *
         * Removes disabled, makes animation
         *
         * @param {Function} callback
         */
        success: function(callback) {
            var _this = this;

            this.setBackgroundSizeAndTransitionTime(100, 1);

            // wait 1 sec 'till it complete 100%
            setTimeout(function(){

                // clear transitions
                $btn.css({'background-size':'', 'transition':'', '-webkit-transition':''});

                // animation
                $btn.addClass('btn-loading-check');
                setTimeout(function() {
                    $btn.addClass('animation btn-success');
                    $btn.css('background-position', 'center 0');

                }, 90);
                setTimeout(function() {
                    $btn.css('background-position', 'center 100px');
                    setTimeout(function() {
                        $btn.removeClass('btn-loading-check animation btn-success').attr('style', '');

                        _this.removeStartAttributes();

                        // callback
                        _this.callback(callback);
                    }, 200);
                }, 1000);
            }, 1000);
        },

        /**
         * On error
         *
         * Removes disabled, invert progress animation and shows the modal
         *
         * @param {Function}    callback
         * @param {String}      errorMessage
         * @param {Boolean}     showModal
         */
        error: function(callback, errorMessage, showModal) {
            var _this = this;
            showModal = (typeof showModal === "undefined" || showModal === null) ? true : showModal;
            this.setBackgroundSizeAndTransitionTime(0, 0.5);

            setTimeout(function() {
                var $errorModal = $('#errorModal'),
                    $customMessage = $errorModal.find('.customErrorMessage'),
                    $defaultMessage = $errorModal.find('.defaultErrorMessage');

                _this.removeStartAttributes();
                highlightButton($btn, 'btn-danger');

                if (showModal) {
                    // show custom message if passed
                    if (errorMessage) {
                        var _errorMessage = errorMessage.status;

                        $customMessage.html(_errorMessage).show();
                        $defaultMessage.hide();
                    } else {
                        $customMessage.hide();
                        $defaultMessage.show();
                    }

                    // show modal
                    $errorModal.modal('show');
                }

                // callback
                _this.callback(callback);
            }, 500);
        },

        /**
         * Removes disabled and spin and btn-loading class
         */
        removeStartAttributes: function() {
            $btn
                .removeClass('btn_has-progress');
        },

        /**
         * Set background-size and transition for background size
         *
         * @param {int} size    in percent
         * @param {int} time    in seconds
         */
        setBackgroundSizeAndTransitionTime: function(size, time) {
            $btn.css({'transition':'','-webkit-transition':''})
                .css({'background-size': size + '% 100%',
                    'transition': 'background-size ' + time + 's cubic-bezier(0,1.07,.38,1)',
                    '-webkit-transition': 'background-size ' + time + 's cubic-bezier(0,1.07,.38,1)'});
        },

        /**
         * Highlight button
         *
         * @param {Object} $btn
         * @param {String} typeClass
         */
        highlightButton: function($btn, typeClass) {
            $btn.addClass(typeClass);
            setTimeout(function() {
                $btn.removeClass(typeClass);
            }, 2000);
        },

        /**
         * Call callback function
         *
         * @param {Function} callbackFunction
         */
        callback: function(callbackFunction) {
            if (typeof(callbackFunction) !== "undefined") {
                callbackFunction();
            }
        },

        /**
         * Removes disabled and spin and btn-loading class
         */
        removeStartAttributes: function() {
            $btn
                .removeClass('btn_has-progress');
        },

        options: {}
    };

    /**
     * @param {String} action
     * @param {Function} callback
     * @param {Object} errorMessage
     * @param {Boolean} showModal
     */
    $.fn.btnProgress = function(action, callback, errorMessage, showModal) {
        new $.BtnProgress(action, this, callback, errorMessage, showModal);
    };

}(jQuery));