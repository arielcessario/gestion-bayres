(function () {
    'use strict';
    angular.module('gestionBayres.main', [['bower_components/ac-angular-cajas/ac-encomiendas.js',
            'bower_components/ac-angular-cajas/ac-encomiendas-administracion.js']])
        .controller('MainController', MainController);


    MainController.$inject = ['CajasService', 'UserService', 'StockService', 'EncomiendasService', 'PedidoVars', 'PedidoService', '$location'];
    function MainController(CajasService, UserService, StockService, EncomiendasService, PedidoVars, PedidoService, $location) {

        var vm = this;

        vm.saldoFinal = 0;
        vm.saldoInicial = 0;
        vm.ahorro = 0;
        vm.reponer = [];
        vm.encomiendas = [];
        vm.pedidos = [];
        vm.showCaja = true;
        vm.showProducto = true;
        vm.showEncomienda = true;
        vm.showPedido = true;
        vm.cliente;
        vm.pedido;
        vm.producto;

        //FUNCIONES
        vm.goToPagina = goToPagina;
        vm.removeProducto = removeProducto;
        vm.removeEncomienda = removeEncomienda;
        vm.removePedido = removePedido;
        vm.detalleProducto = detalleProducto;
        vm.detalleEncomienda = detalleEncomienda;


        function goToPagina(pagina) {
            $location.path(pagina);
        }

        function removeProducto(producto) {
            console.log(producto);

            if (confirm("¿Esta seguro que desea borrar el producto " + producto.nombre + "?") == true) {
                console.log('borrar producto');
            } else {
                console.log('No se borra el producto');
            }
        }

        function removeEncomienda(cliente) {
            console.log(cliente);

            if (confirm("¿Esta seguro que desea borrar la encomienda del cliente " + cliente.cliente + "?") == true) {
                console.log('borrar encomienda');
            } else {
                console.log('No se borra la encomienda');
            }
        }

        function removePedido(pedido) {
            console.log(pedido);

            if (confirm("¿Esta seguro que desea borrar el pedido " + pedido + "?") == true) {
                console.log('borrar pedido');
            } else {
                console.log('No se borra el pedido');
            }
        }

        function detalleProducto(producto) {
            console.log(producto);
        }

        function detalleEncomienda(encomenda) {
            console.log(encomenda);
        }

        PedidoVars.all = false;
        PedidoService.get(
            function (data) {
                vm.pedidos = data;
                //console.log(vm.pedidos);
            }
        );


        EncomiendasService.get().then(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].fecha_entrega = (new Date(data[i].fecha_entrega)).getDate() + '/' + ((new Date(data[i].fecha_entrega)).getMonth() + 1) + '/'+ (new Date(data[i].fecha_entrega)).getFullYear();
            }

            vm.encomiendas = data;
        });

        StockService.getAReponer(UserService.getFromToken().data.sucursal_id).then(function (data) {
            data.sort(function (a, b) {
                return a.nombre - b.nombre;
            });

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
                console.log(data);
                if (data[0] == undefined) {

                    vm.ahorro = 0;
                } else {

                    vm.ahorro = data[0].importe;
                    CajasService.getResultado('1.1.1.3' + UserService.getFromToken().data.sucursal_id, function (data) {
                        console.log(data);
                        vm.ahorro = parseFloat(vm.ahorro) + parseFloat(data[0].total);
                    });
                }
            });
        }

    }
})();
