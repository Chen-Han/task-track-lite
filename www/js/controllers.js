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
    .controller('TaskCtrl', function ($scope, $stateParams, TaskService, $ionicPopup) {
        //initialize tasks from service
        function initializeTasks() {
            $scope.tasks = TaskService.all();
            $scope.newTask = {id: $scope.tasks.length, name: "", type: 0, duration: 0};
        }

        initializeTasks();
        //time record type
        $scope.timeType='for';
        $scope.newTaskTimeType='for';

        //the newTask is reinitialized
        function clearNewTask(){
            initializeTasks();
            $scope.tasks=TaskService.all(); //update $scope task from Task service
            $scope.newTask={id:$scope.tasks.length,name:"",type:0,duration:0,from:'',to:''};
            $scope.isNewShown=false;
        }

        //whether or not to show the new task bar
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

        //delete task confirm
        $scope.showDeleteConfirm = function (taskID) {
            var confirmPopup = $ionicPopup.confirm({
                title: '<b>Delete Confirm</b>',
                template: 'Are you sure you want to delete this?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $scope.deleteTask(taskID);
                } else {
                    //TODO do something, hide the shown delete button
                }
            });
        };

        //delete a task
        $scope.deleteTask = function (taskID) {
            //for now, taskID is just the position of the task in the tasks array,
            // perhaps $index can do the trick
            console.log(taskID);
            TaskService.remove(taskID);
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
