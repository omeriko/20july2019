/**
 * Created by osinai on 8/28/2017.
 */
(function(angular){

    function utils(){
        function isMobileDevice() {
            return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
        }

        function detectOrientation(){
            var result = 'portrait';
            if(window.orientation === 90 || window.orientation === -90) {
                result = 'landscape';
            }
            return result;
        }

        return {
            isMobileDevice: isMobileDevice,
            detectOrientation: detectOrientation
        }
    }

    angular.module('benVsBen').service('utils', utils);
})(angular);