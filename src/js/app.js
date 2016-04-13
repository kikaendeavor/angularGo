/**
 * Created by kika on 2016/4/14.
 */
angular.module('angularGo',['ngRoute']).
    config(function($routeProvider){
        $routeProvider
            .when('/',{
                controller:"indexCtrl",
                templateUrl:'home.html',
                publicAccess: true
            })
            .when('form',{
                controller:"formCtrl",
                templateUrl:'form.html',
                publicAccess: true
            })
            .otherwise({
                redirectTo: '/'
            });
    })
;
