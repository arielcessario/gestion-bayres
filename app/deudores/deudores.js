(function () {
    'use strict';
    angular.module('gestionBayres.deudores', ['ngRoute',['bower_components/ac-angular-usuarios/ac-deudores.js']])
        .controller('DeudoresController', DeudoresController);


    DeudoresController.$inject = [];
    function DeudoresController() {

        var vm = this;

    }
})();
