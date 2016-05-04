(function () {
    'use strict';
    angular.module('gestionBayres.cobros', ['ngRoute', ['bower_components/ac-angular-cajas/ac-encomiendas.js']])
        .controller('CobrosController', CobrosController);


    CobrosController.$inject = ['ProductService'];
    function CobrosController(ProductService) {

        var vm = this;

    }
})();
