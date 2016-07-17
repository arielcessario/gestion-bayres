(function () {
    'use strict';


    angular.module('acHelper', ['ngRoute'])
        .factory('HelperService', HelperService);


    HelperService.$inject = ['$http', '$q'];
    function HelperService($http, $q) {
        var service = {};
        var url = './helper/includes/ac-helper.php';


         service.create = create;

        return service;



        /**
         * @description: Crea un sucursal.
         * @param sucursal
         * @param callback
         * @returns {*}
         */
        function create(sucursal) {

            return $http.post(url,
                {
                    'function': 'create',
                    'sucursal': JSON.stringify(sucursal)
                })
                .then(function (data) {
                })
                .catch(function (data) {
                });
        }


    }



})();