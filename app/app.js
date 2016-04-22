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
        'acAutocomplete',
        'acUsuarios',
        'acUsuariosAdministracion',
        'acProductos',
        'acProductosAdministracion',
        'acStocks',
        'acReportes',
        'acContacts',
        'acMovimientos',
        'acCajas',
        'acCobros',
        'acResumenCajaDiaria',
        'acAbrirCerrarCaja',
        'LangTables',
        'acUploads'
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
        }])
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['UserService', '$location', '$rootScope'];
    function AppCtrl(UserService, $location, $rootScope) {
        var vm = this;
        vm.isLogged = false;
        vm.user = undefined;

        if (!UserService.getFromToken()) {
            $location.path('/login')
        } else {
            vm.user = UserService.getFromToken();
        }

        $rootScope.$on('login-success', function () {
            vm.user = UserService.getFromToken();
        });

        $rootScope.$on('login-error', function () {
            vm.user = undefined;
        });

    }

})();
