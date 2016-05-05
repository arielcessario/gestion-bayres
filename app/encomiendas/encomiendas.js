(function () {
    'use strict';
    angular.module('gestionBayres.encomiendas', [['bower_components/ac-angular-cajas/ac-encomiendas.js',
            'bower_components/ac-angular-cajas/ac-encomiendas-administracion.js']])
        .controller('EncomiendasController', EncomiendasController);


    EncomiendasController.$inject = [];
    function EncomiendasController() {

        var vm = this;

    }
})();
