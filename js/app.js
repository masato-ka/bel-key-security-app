
const LockServiceUUID = "12345678-9012-3456-7890-1234567890ff";
const LockCharacteristicUUID = "12345678-9012-3456-7890-123456789011";
const BeepCharacteristicUUID = "12345678-9012-3456-7890-123456789022";

let lockDevice;
let lockStatusCharacteristic;
let beepCharacteristic;
let isSubscribe;
let isBeep

angular.module('myApp', [])
.controller('ConnectController', ['$scope', function($scope){

    $scope.init = function () {
        initialize();
    }

    $scope.connect = function() {
        if(lockDevice == null){
            requestDevice();
        }
    }

    function requestDevice(){
        //TODO Chapter 3.2.1
        alert("See in chapter 3.2.1");
    }

    $scope.disconnect = function(){
        //TODO Chapter 3.3.1
        alert("See in chapter 3.3.1");
    }

    $scope.read = function(){
        //TODO Chapter 3.4.1
        alert("See in chapter 3.4.1");
    }

    $scope.subscribe = function(){
        //TODO Chapter 3.5.1
        alert("See in chapter 3.5.1");
    }

    $scope.write = function(){
        if(isBeep === true){
            isBeep = false;
            $scope.beepUILabel = "Set Alert";
        }else{
            isBeep = true;
            $scope.beepUILabel = "Unset Alert";
        }
        
    }

    function doBeep(event){
        //TODO Chapter 3.6.1
        alert("See in chapter 3.6.1");
    }

    function onSubscribeLockInfo(event){
        //TODO Chapter 3.5.3
        alert("See in chapter 3.5.3");
    }

    function onDisconnected(){
        initialize();
        $scope.$apply();
    }

    function initialize(){
        $scope.statuImgPath=""
        $scope.message = "No connect";
        $scope.subscribeUILabel = "Subscribe"
        isSubscribe = false;
        $scope.beepUILabel = "Set alert"
        isBeep = false;
    }

}]);

