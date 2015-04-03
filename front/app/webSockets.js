angular.module('app')
    .run(function ($rootScope,$timeout){
        (function connect() {
            var url = 'ws://localhost:8888';
            var connection = new WebSocket(url);
            connection.onopen = function () {
                console.log('WebSocket connected')
            };

            connection.onclose=function(e){
              console.log('WebSocket closed. Reconnecting');
                $timeout(connect,10*1000);
            };

            connection.onmessage = function (e) {
                var payload = JSON.parse(e.data)
                $rootScope.$broadcast('ws:' + payload.topic, payload.data)
            };
        })();
    });