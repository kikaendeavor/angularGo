/**
 * Created by kika on 2016/5/4.
 */
angular.module('angularGo')
.directive('dataPrefix',function(){
        return {
            restrict: 'AE',
            template: 'Hi, <strong ng-bind="name"></strong>' +
            '<p>this is data prefix</p>',
            scope: {
                dataInput: '='
            },
            link: function(scope, elem, attrs){
                scope.name = scope.dataInput;
                console.log(scope.dataInput);
            }
        }
    })
.directive('prefixData',function(){
        return {
            restrict: 'EA',
            template: 'Hi, <strong ng-bind="name"></strong>' +
            '<p>this is prefix data</p>',
            scope: {
                inputData: '='
            },
            link: function(scope, elem, attrs){
                scope.name = scope.inputData.name;
            }
        }
    })
;