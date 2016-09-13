(function () {
    'use strict';
    angular.module('gestionBayres.auditoria', ['ngRoute',['bower_components/ac-angular-reportes/ac-reporte-traslado.js']])
        .controller('AuditoriaController', AuditoriaController);


    AuditoriaController.$inject = [];
    function AuditoriaController() {

        var vm = this;

    }
})();
