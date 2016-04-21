(function () {
    'use strict';
    angular.module('gestionBayres.cobros', ['ngRoute'])
        .controller('CobrosController', CobrosController);


    CobrosController.$inject = ['ProductService'];
    function CobrosController(ProductService) {

        var vm = this;

    }
})();
