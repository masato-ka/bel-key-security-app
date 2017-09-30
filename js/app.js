
let LockServiceUUID = "12345678-9012-3456-7890-1234567890ff";
let LockCharacteristicUUID = "12345678-9012-3456-7890-123456789011";
let BeepCharacteristicUUID = "12345678-9012-3456-7890-123456789022";

var lockDevice;
var lockStatusCharacteristic;
var beepCharacteristic;
var isSubscribe;
var isBeep

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
        navigator.bluetooth.requestDevice(
            { acceptAllDevices:true,optionalServices:[LockServiceUUID] }
         ) 
        .then(device => {
            lockDevice = device;
            lockDevice.addEventListener('gattserverdisconnected', onDisconnected);
            return device.gatt.connect();
        })                     
        .then(server => server.getPrimaryService(LockServiceUUID))
        .then(service => {
            
            return Promise.all([
                service.getCharacteristic(LockCharacteristicUUID)
                  .then(characteristic => lockStatusCharacteristic = characteristic),
                service.getCharacteristic(BeepCharacteristicUUID)
                  .then( characteristic => beepCharacteristic = characteristic),
              ]);
        })
    }

    $scope.disconnect = function(){
        if(lockDevice.gatt.connected === true){
            lockDevice.gatt.disconnect();
            lockDevice=null;
        }
    }

    $scope.read = function(){

        lockStatusCharacteristic.readValue().then(value=>{
            var lockValue = value.getUint8(0);
            if(lockValue == 2){
                $scope.statusImgPath = "./img/lock.png";
                $scope.message = "Lock";
            }else{
                $scope.statusImgPath = "./img/unlock.png";
                $scope.message = "Unlock";
            }
        })

    }

    $scope.subscribe = function(){
        if(isSubscribe === false){
            lockStatusCharacteristic.addEventListener("characteristicvaluechanged", onSubscribeLockInfo);
            $scope.subscribeUILabel = "Unsubscribe";
            isSubscribe = true;
            return lockStatusCharacteristic.startNotifications();
        }else{
            $scope.subscribeUILabel = "Subscribe";
            return lockStatusCharacteristic.stopNotifications();            
        }

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
        if(event===true){
            value = new Uint8Array([0x04]);
            beepCharacteristic.writeValue(value);            
        }else{
            value = new Uint8Array([0x00]);
            beepCharacteristic.writeValue(value);            
        }
    }

    function onSubscribeLockInfo(event){
        let lockValue = event.target.value.getUint8(0);
        if(lockValue == 2){
            $scope.statusImgPath = "./img/lock.png"
            $scope.message = "Lock"
            doBeep(false);
            
        }else{
            $scope.statusImgPath = "./img/unlock.png"
            $scope.message = "Unlock"
            doBeep(isBeep);
        }
        $scope.$apply();
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

