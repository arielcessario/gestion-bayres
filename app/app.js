(function () {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('app', [
        "oc.lazyLoad",
        'ngRoute',
        'ngAnimate',
        'angular-storage',
        'angular-jwt',
        'auth0',
        'acUtils',
        'acSucursales',
        'acAutocomplete',
        'acUsuarios',
        'acUsuariosAdministracion',
        'acUsuariosNuevo',
        'acProductos',
        'acProductosAdministracion',
        'acStocks',
        'acPagoProveedores',
        'acPedidosAdministracion',
        'acPedidosDetalles',
        'acReportes',
        'acContacts',
        'acMovimientos',
        'acCajas',
        'acCobros',
        'acGastos',
        'acDepositos',
        'acResumenCajaDiaria',
        'acAbrirCerrarCaja',
        'LangTables',
        'acUploads',
        'acAvisos',
        'acAvisosAdministracion'
    ]).config(['$routeProvider', 'authProvider', function ($routeProvider, authProvider) {
            authProvider.init({
                domain: 'ac-desarrollos.auth0.com',
                clientID: 'su5JUmdUk52EWhfK5xxZJtnw6W3IK9c1',
                loginUrl: '/ingreso'
            });

            $routeProvider.when('/login', {
                templateUrl: 'login/login.html',
                controller: 'LoginController',
                data: {requiresLogin: false},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('login/login.js');
                    }]
                }
            });

            $routeProvider.when('/main', {
                templateUrl: 'main/main.html',
                controller: 'MainController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('main/main.js');
                    }]
                }
            });

            $routeProvider.when('/administracion/productos', {
                templateUrl: 'productos/productos.html',
                controller: 'ProductosController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('productos/productos.js');
                    }]
                }
            });

            $routeProvider.when('/administracion/usuarios', {
                templateUrl: 'usuarios/usuarios.html',
                controller: 'UsuariosController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('usuarios/usuarios.js');
                    }]
                }
            });


            $routeProvider.when('/administracion/avisos', {
                templateUrl: 'avisos/avisos.html',
                controller: 'AvisosController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('avisos/avisos.js');
                    }]
                }
            });

            $routeProvider.when('/caja/cobros', {
                templateUrl: 'cobros/cobros.html',
                controller: 'CobrosController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('cobros/cobros.js');
                    }]
                }
            });

            $routeProvider.when('/caja/abrir_cerrar_caja', {
                templateUrl: 'abrir-cerrar-caja/abrir-cerrar-caja.html',
                controller: 'AbrirCerrarCajasController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('abrir-cerrar-caja/abrir-cerrar-caja.js');
                    }]
                }
            });


            $routeProvider.when('/caja/gastos', {
                templateUrl: 'gastos/gastos.html',
                controller: 'GastosController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('gastos/gastos.js');
                    }]
                }
            });

            $routeProvider.when('/caja/depositos', {
                templateUrl: 'depositos/depositos.html',
                controller: 'DepositosController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('depositos/depositos.js');
                    }]
                }
            });

            $routeProvider.when('/stock/pedidos', {
                templateUrl: 'pedidos/pedidos.html',
                controller: 'PedidosController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('pedidos/pedidos.js');
                    }]
                }
            });

            $routeProvider.when('/stock/confirmar', {
                templateUrl: 'confirmar/confirmar.html',
                controller: 'ConfirmarController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('confirmar/confirmar.js');
                    }]
                }
            });

            $routeProvider.when('/stock/fraccionado', {
                templateUrl: 'fraccionado/fraccionado.html',
                controller: 'FraccionadoController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('fraccionado/fraccionado.js');
                    }]
                }
            });

            $routeProvider.when('/stock/traslado', {
                templateUrl: 'traslado/traslado.html',
                controller: 'TrasladoController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('traslado/traslado.js');
                    }]
                }
            });

            $routeProvider.when('/reportes/stock', {
                templateUrl: 'reportes/reportes.html',
                controller: 'ReportesController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('reportes/reportes.js');
                    }]
                }
            });

            $routeProvider.when('/caja/encomiendas', {
                templateUrl: 'encomiendas/encomiendas.html',
                controller: 'EncomiendasController',
                data: {requiresLogin: true},
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('encomiendas/encomiendas.js');
                    }]
                }
            });
        }])
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['UserService', '$location', '$rootScope', '$interval', 'ProductService', 'CajasService', 'SucursalesService', '$window', '$scope', 'AvisosService'];
    function AppCtrl(UserService, $location, $rootScope, $interval, ProductService, CajasService, SucursalesService, $window, $scope, AvisosService) {
        var vm = this;
        vm.isLogged = false;
        vm.user = undefined;
        vm.sucursal = '';
        vm.caja = '';
        vm.time = new Date().format('dddd, mmmm d, yyyy h:MM TT');
        vm.isMoved = false;
        vm.avisos_index = [];
        vm.nuevos_avisos = false;

        var location = $location.path().split('/');
        vm.menu = location[1];
        vm.sub_menu = location[2];

        vm.updateValorCaja = updateValorCaja;

        ProductService.get();
        //StockService.get();

        angular.element($window).bind("scroll", function (e) {
            vm.isMoved = this.pageYOffset > 88;
            if (!$scope.$$pahse) {
                $scope.$apply();
            }
        });

        $interval(function () {

            vm.time = new Date().format('dddd, mmmm d, yyyy h:MM TT');
        }, 6000);

        vm.menu = $location.path().split('/')[1];

        if (!UserService.getFromToken()) {
            $location.path('/login');
        } else {
            vm.user = UserService.getFromToken();
            SucursalesService.get().then(function (data) {
                for (var i in data) {
                    if (vm.user.data.sucursal_id == data[i].sucursal_id) {

                        vm.sucursal = data[i].nombre;
                        vm.caja = 'Caja ' + vm.user.data.caja_id;

                    }
                }
            });
        }

        $rootScope.$on('login-success', function () {
            vm.user = UserService.getFromToken();
            SucursalesService.get().then(function (data) {
                for (var i in data) {
                    if (vm.user.data.sucursal_id == data[i].sucursal_id) {

                        vm.sucursal = data[i].nombre;
                        vm.caja = 'Caja ' + vm.user.data.caja_id;

                    }
                }
            });


            $interval(getAvisos, 6000);
            getAvisos();
            //SucursalesService.getByParams('sucursal_id', 'nombre', 'true')
        });

        $rootScope.$on('login-error', function () {
            vm.user = undefined;
        });

        $rootScope.$on('$routeChangeStart', function (event, next, current) {

            var location = next.$$route.originalPath.split('/');
            vm.menu = location[1];
            vm.sub_menu = location[2];
        });

        if (vm.user != undefined) {
            $interval(getAvisos, 6000);
            getAvisos();
        }

        function getAvisos() {
            console.log('entra');
            AvisosService.get().then(function (data) {
                console.log(data);
                if (vm.avisos_index.length > 0 && vm.nuevos_avisos == false) {
                    for (var i = 0; i < data.length; i++) {
                        if (vm.avisos_index[i].aviso !== data[i].aviso) {
                            console.log('nuevo');
                            vm.nuevos_avisos = true;
                        }
                    }
                }

                if (vm.nuevos_avisos || vm.avisos_index.length == 0) {
                    vm.avisos_index = data;
                }

            });
        }

        function updateValorCaja() {
            vm.saldoInicial = 0;
            vm.saldoFinal = 0;
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
        }

    }

})();
