angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('FriendsCtrl', function ($scope, Friends) {
        $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })
    .controller('TaskCtrl',function($scope,$stateParams,TaskService){
        //initialize tasks from service
        $scope.tasks=TaskService.all();
        $scope.newTask={id:$scope.tasks.length,name:"",type:0,duration:0};
        //time record type
        $scope.timeType='for';
        function clearNewTask(){
            $scope.tasks=TaskService.all(); //update $scope task from Task service
            $scope.newTask={id:$scope.tasks.length,name:"",type:0,duration:0};
            $scope.isNewShown=false;
        }
        //show the new task bar
        $scope.isNewShown=false;
        $scope.showNewTask=function(){
            console.log("show New Task");
            $scope.isNewShown=true;
        };
        $scope.createNewTask=function(newTask){
            console.log("create New Task");
            console.log(newTask);
            TaskService.add(newTask);
            clearNewTask();
        };
        $scope.getTaskDuration = function (from,to){
            var minutes = 1000 * 60;
            return Math.round((from-to) / minutes);
        };
        //show Edit on each task
        $scope.showEdit=function (){};

    })
    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
