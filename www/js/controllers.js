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
        $scope.newTaskTimeType='for';
        function clearNewTask(){
            $scope.tasks=TaskService.all(); //update $scope task from Task service
            $scope.newTask={id:$scope.tasks.length,name:"",type:0,duration:0,from:'',to:''};
            $scope.isNewShown=false;
        }
        //show the new task bar
        $scope.isNewShown=false;
        $scope.showNewTask=function(){
            $scope.isNewShown=true;
        };
        $scope.hideNewTask=function(){
            $scope.isNewShown=false;
        };
        $scope.createNewTask=function(newTask){
            console.log("create New Task");
            console.log(newTask);
            TaskService.add(newTask);
            clearNewTask();
        };

        $scope.setToNow=function(time){
            console.log('setToNow called'+ "time is " + time);
            if(time===0 || time=="" || typeof time==="undefined") {
                return moment().format('YYYY-MM-DD HH:mm');
            }else {
                return time;
            }
        };
        //@param time1 and time2 are both strings
        $scope.timeDiff=function(time1,time2){
            var a =moment(time1);
            var b =moment(time2);
            b.diff(a,'minutes');
        };

    })
    .controller("MoralBankCtrl",function($scope){
        $scope.goodCount=0;
        $scope.badCount=0;
        $scope.goodIncrement=function(){
            $scope.goodCount++;
        };
        $scope.badIncrement=function(){
            $scope.badCount++;
        };
        $scope.goodDecrement=function(){
            $scope.goodCount--;
        };
        $scope.badDecrement=function(){
            $scope.badCount--;
        };

    })


    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
