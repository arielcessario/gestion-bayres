(function () {
    'use strict';
    angular.module('gestionBayres.usuarios', ['ngRoute'])
        .controller('UsuariosController', UsuariosController);


    UsuariosController.$inject = ['ProductService'];
    function UsuariosController(ProductService) {

        var vm = this;

    }
})();
