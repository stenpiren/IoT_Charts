var myApp = angular.module('app', ["chart.js"])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
    });


myApp.controller("ChartCtrl", function ($scope,$http) {

    $scope.numdaysChanged = function() {
        requestNewData();
    };

    var lastVal = function(array, n) {  
        if (array == null)   
            return void 0;  
        if (n == null)   
            return array[array.length - 1];  
        return array.slice(Math.max(array.length - n, 0));    
    };

    var getData = function(index,url,numdays) {
        $http({
            method: 'GET',
            url: url + "?numdays=" + numdays
            }).then(function successCallback(response) {
                    values = response.data.measurements.values;
                    labels = response.data.measurements.labels;
                    $scope.data[index] = [values];
                    $scope.labels[index] = labels;
                    title = url.replace("/api/","") + ": " + lastVal(values,1) + " (" + lastVal(labels,1) + ")";
                    $scope.titles.push(title);


            }, function errorCallback(response) {
        });
    };

    $scope.numdays = 1;

    var requestNewData = function() {
        $scope.data = [];
        $scope.labels = [];
        $scope.titles = [];
        $scope.series = ['Sensor'];
        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
        $scope.options = {
            scales: {
                yAxes: [
                    {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                    }
                ]
            }
        };

        getData(0,'/api/Outdoor/Temperature',$scope.numdays);
        getData(1,'/api/GroundFloor/Temperature',$scope.numdays);
        getData(2,'/api/Garage/Temperature',$scope.numdays);
        getData(3,'/api/Outdoor/Humidity',$scope.numdays);
        getData(4,'/api/GroundFloor/Humidity',$scope.numdays);
        getData(5,'/api/Garage/Humidity',$scope.numdays);
    };

    requestNewData();

});
