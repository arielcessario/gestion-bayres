(function () {
    'use strict';
    angular.module('gestionBayres.main', ['ngRoute'])
        .controller('MainController', MainController);


    MainController.$inject = ['CajasService', 'UserService', 'StockService'];
    function MainController(CajasService, UserService, StockService) {

        var vm = this;

        vm.saldoFinal = 0;
        vm.saldoInicial = 0;
        vm.ahorro = 0;
        vm.reponer = [];

        StockService.getAReponer(UserService.getFromToken().data.sucursal_id).then(function (data) {
            vm.reponer = data;
        });


        CajasService.getSaldoInicial(UserService.getFromToken().data.sucursal_id, UserService.getFromToken().data.caja_id, function (data) {

            vm.saldoInicial = parseFloat(data.replace('"', ''));
            vm.saldoFinal = vm.saldoInicial;
            CajasService.getCajaDiaria(UserService.getFromToken().data.sucursal_id, UserService.getFromToken().data.caja_id, function (data) {
                var asientos = [];
                var detalles = [];
                var asiento = {};

                for (var i = 0; i < data.length; i++) {
                    for (var x = 0; x < data[i].movimientos.length; x++) {

                        //agrego el movimiento de caja - Estos son los totales que aparecen al final del movimiento

                        if (data[i].movimientos[x].cuenta_id.indexOf('1.1.1.0') > -1 || // Caja chica
                            data[i].movimientos[x].cuenta_id.indexOf('1.1.2.0') > -1 || // Deudores
                            data[i].movimientos[x].cuenta_id.indexOf('1.1.4.0') > -1 || // Tarjeta
                            data[i].movimientos[x].cuenta_id.indexOf('2.1.1.0') > -1 || // Proveedores a deuda
                            data[i].movimientos[x].cuenta_id.indexOf('1.1.1.2') > -1    // CC CA MP ML
                        ) {


                            if (data[i].movimientos[x].cuenta_id.indexOf('1.1.1.0') > -1) {
                                vm.saldoFinal += parseFloat(data[i].movimientos[x].importe);
                            }
                        }

                    }
                }

            });
        });


        func();
        function func() {
            CajasService.getTotalByCuenta('1.1.1.3' + UserService.getFromToken().data.sucursal_id, UserService.getFromToken().data.sucursal_id, function (data) {
                if (data[0] == undefined) {

                    vm.ahorro = 0;
                } else {

                    vm.ahorro = data[0].importe;
                    CajasService.getResultado('1.1.1.3' + UserService.getFromToken().data.sucursal_id, function (data) {
                        vm.ahorro = parseFloat(vm.ahorro) + parseFloat(data[0].total);
                    });
                }
            });
        }

    }
})();
