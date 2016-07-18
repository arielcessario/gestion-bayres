(function () {
    'use strict';

    angular.module('acHelper', ['ngRoute'])
        .factory('HelperService', HelperService);


    HelperService.$inject = ['$http', '$q'];
    function HelperService($http, $q) {
        var service = {};
        var url = './helper/includes/ac-helper.php';


        service.create = create;
        service.save = save;

        return service;


        /**
         * @description: Crea un sucursal.
         * @param sucursal
         * @param callback
         * @returns {*}
         */
        function create(sucursal) {
            console.log(sucursal);
            return $http.post(url,
                {
                    'function': 'create',
                    'sucursal': JSON.stringify(sucursal)
                })
                .then(function (data) {
                    console.log(data);
                    console.log('ok');
                })
                .catch(function (data) {
                    console.log(data);
                    console.log('error');
                });
        }

        function save(sucursal, callback) {
            console.log(sucursal);
            return $http.post(url,
                {
                    function: 'save',
                    'sucursal': JSON.stringify(sucursal)
                })
                .success(function (data) {
                    callback(sucursal);
                })
                .error(function (data) {
                    console.log('error');
                });
        }


    }



})();