jest
    .dontMock('fs')
    .dontMock('jquery');
var $ = require('jquery');
global.$ = global.jQuery = $;
var html = require('fs').readFileSync('./challenge-3.html').toString();
require('../js/plugins/jquery.btnProgress.js');
require('bootstrap');
describe('validateBtnProgress', function () {
    document.documentElement.innerHTML = html;
    var $btn = $('#progressMe');
    test('hello test', function () {
        expect('Hello test').toEqual('Hello test');
    });
    test('Testing btn available', function () {
        expect($btn.length > 0).toBeTruthy();
    });
    test('Test if btnProgress is available', function () {
        expect(typeof $.fn.btnProgress !== undefined).toBeTruthy();
    });
    test('Test if fn.modal is available', function () {
        expect(typeof $.fn.modal !== 'undefined').toBeTruthy();
    });
    test('Check start progress', function () {
        $btn.btnProgress('start');
        expect($btn.attr('disabled')).toBeTruthy();
    });
    test('Check stop progress', function () {
        $btn.btnProgress('stop');
        expect($btn.attr('disabled')).toBeFalsy();
    });
    test('Check error progress', function () {
        $btn.btnProgress('error', null, 'Call failed', true);
        expect($btn.attr('btn-danger')).toBeTruthy();
    });
    test('Challenge 3: Check if modal was loaded', function () {
        // please finish this test
        expect(false).toBeTruthy();
    });
});
