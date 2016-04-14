/**
 * Created by kika on 2016/4/14.
 */
angular.module('angularGo',['ngRoute']).
    config(function($routeProvider){
        $routeProvider
            .when('/',{
                controller: "homeCtrl",
                templateUrl: 'home.html'
            })
            .when('/form',{
                controller: "formCtrl",
                templateUrl: 'form.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
;
