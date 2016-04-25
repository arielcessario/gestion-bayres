(function () {
    'use strict';
    angular.module('gestionBayres.confirmar', ['ngRoute',['bower_components/ac-angular-stocks/ac-confirmar-pedidos.js',
            'bower_components/ac-angular-stocks/ac-pago-proveedores.js']])
        .controller('ConfirmarController', ConfirmarController);


    ConfirmarController.$inject = [];
    function ConfirmarController() {

        var vm = this;

    }
})();
