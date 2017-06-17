var appHome = angular.module('home', ['ui.bootstrap']);

appHome.controller('homeCtrl', ['$scope', '$http', 'PhotoService', function ($scope, $http, PhotoService) {

    PhotoService.loadData();
    $scope.PhotoService = PhotoService;
    $scope.currentPage = 0;
    $scope.pageSize = 25;
    $scope.numbers = [4, 3.5, 4.1324, 2.1, 0, -2, -3.3, -4.2]

    $scope.pages = function () {
        return Math.ceil($scope.PhotoService.allItems.length / $scope.pageSize);
    }
}])

appHome.factory('PhotoService', ['$http', '$filter', function ($http, $filter) {

    var Source = {};
    Source.allItems = [];
    Source.loadData = function () {

        return $http.get('https://jsonplaceholder.typicode.com/photos')
            .then(function (response) {
                Source.allItems = response.data;
            });
    };

    return Source;
}]);


appHome.filter('startFrom', function () {
    return function (input, startPoint) {
        startPoint = +startPoint;
        return input.slice(startPoint);
    }
});

appHome.filter('mathPower', function () {
    return function (number) {

        var float = parseFloat(number.toFixed(2))
        var base = Math.floor(float)
        var exponent = 0;
        var splitNumber = float.toString().split(".");

        if (splitNumber.length > 0) {
            base = splitNumber[0];
        }
        if (splitNumber.length > 1) {
            exponent = splitNumber[1];
        }

        return Math.pow(base, exponent);
    }
})

appHome.filter('mathPowerBase', function () {
    return function (number) {

        var float = parseFloat(number.toFixed(2))
        var base = Math.floor(float)
        var splitNumber = float.toString().split(".");

        if (splitNumber.length > 0) {
            base = splitNumber[0];
        }

        return base;
    }
})

appHome.filter('mathPowerExponent', function () {
    return function (number) {

        var float = parseFloat(number.toFixed(2));
        var exponent = 0;
        var splitNumber = float.toString().split(".");
        if (splitNumber.length > 1) {
            exponent = splitNumber[1];
        }
        return exponent;
    }
})


appHome.directive('photoAppImage', ['$uibModal', function ($uibModal) {

    var controller = ['$scope', function ($scope) {

        $scope.modal = null;

        $scope.openModal = function () {
            $scope.modal = $uibModal.open({
                template: '<div class="modal-header"><h3 class="modal-title">{{item.title}}</h3></div>' +
                '<div class="modal-body">' +
                '<div>' +
                '<ul class="list-group"><li class="list-group-item">ID {{item.id}}</li>' +
                '<li class="list-group-item">Album ID {{item.albumId}}</li>' +
                '</ul>' +
                '</div>' +
                '<img class="img-responsive center-block" ng-src="{{item.url}}" alt=""/></div>' +
                '<div class="modal-footer"><button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button></div>',
                size: 'lg',
                windowClass: 'confirm-window',
                scope: $scope
            });
        };

        $scope.cancel = function () {
            $scope.modal.close('cancel');
        }
    }]

    return {
        restrict: 'E',
        scope: {
            item: '=item'
        },
        template: '<img ng-click="openModal()" class="img-responsive img-thumbnail" ng-src="{{item.thumbnailUrl}}" alt=""/><div class="text-info"> {{item.title }}</div >',
        controller: controller
    };
}]);