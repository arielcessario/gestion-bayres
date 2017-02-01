(function () {
    'use strict';
    angular.module('gestionBayres.categorias', ['ngRoute'])
        .controller('CategoriasController', CategoriasController);


    CategoriasController.$inject = ['ProductService'];
    function CategoriasController(ProductService) {

        var vm = this;

    }
})();
