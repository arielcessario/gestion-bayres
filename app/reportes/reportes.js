(function () {
    'use strict';
    angular.module('gestionBayres.reportes', [['bower_components/ac-angular-reportes/ac-reportes.js', 'bower_components/ac-angular-reportes/ac-reporte-stock.js']])
        .controller('ReportesController', ReportesController);


    ReportesController.$inject = [];
    function ReportesController() {

        var vm = this;

    }
})();
