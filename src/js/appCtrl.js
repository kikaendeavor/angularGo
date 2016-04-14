/**
 * Created by kika on 2016/4/14.
 */
angular.module('angularGo')
    .controller('homeCtrl', ['$scope', function($scope){

    }])
    .controller('formCtrl', ['$scope', function($scope){
        $scope.asset = {
            weight : {name:'中',id:'2',description:'means important.'}
        };
        $scope.weights = [
            {name:'高',id:'1',description:'means very important.'}
            ,{name:'中',id:'2',description:'means important.'}
            ,{name:'低',id:'3',description:'means not important.'}
        ];

        $scope.getErrorClass = function(inputName){
            this.class = "";
            if(inputName.$dirty && inputName.$invalid){
                this.class = "has-error";
            }
            return this;
        };
        $scope.showErrorMsg = function(inputName, error){
            this.show = false;
            if(inputName.$dirty && inputName.$error[error]){
                this.show = true;
            }
            return this;
        };
    }])
;