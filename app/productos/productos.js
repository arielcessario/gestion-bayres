(function () {
    'use strict';
    angular.module('gestionBayres.productos', ['ngRoute'])
        .controller('ProductosController', ProductosController);


    ProductosController.$inject = ['ProductService'];
    function ProductosController(ProductService) {

        var vm = this;

    }
})();
