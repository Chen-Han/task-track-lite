angular.module('starter.controllers', ['timer'])

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
    .controller('TasksCtrl', function ($scope, $stateParams, TaskService, $ionicPopup, $ionicPlatform) {
        $ionicPlatform.ready(function () {
            var now = new Date().getTime(),
                _60_seconds_from_now = new Date(now + 60 * 1000);
            window.plugin.notification.local.add({
                id: 1,
                title: 'Reminder',
                message: 'Dont forget to buy some flowers.',
                repeat: 'weekly',
                date: _60_seconds_from_now
            });
        });
        //initialize tasks from service
        function initializeTasks() {
            $scope.tasks = TaskService.all();
            $scope.newTask = {id: $scope.tasks.length, name: "", type: 0, duration: 0, from: "", to: ""};
        }

        initializeTasks();

        //the newTask is reinitialized
        function clearNewTask(){
            initializeTasks();
            $scope.isNewShown=false;
        }

        $scope.defaultTime = '00:00:00';
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
        //delete a task
        $scope.deleteTask = function (taskID) {
            //for now, taskID is just the position of the task in the tasks array,
            // perhaps $index can do the trick
            console.log(taskID);
            TaskService.remove(taskID);
        };
        $scope.setToNow=function(time){
            console.log('setToNow called'+ "time is " + time);
            if(time===0 || time=="" || typeof time==="undefined") {
                return moment().format('HH:mm');
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


    })
    .controller('taskCtrl', function ($scope, TaskService) {
        var defaultTimeRemaining = "00:20:00";
        var defaultBreakTime = "00:05:00";

        function initializeTimer() {
            $scope.isPaused = true;
            $scope.timeRemaining = defaultTimeRemaining;
            $scope.breakTimeRemaining = "00:00:00";
        }

        $scope.startTask = function () {
            //resets any break
            $scope.breakTimeRemaining = "00:00:00";
            $scope.isPaused = false;
            //if task is already started
            if ($scope.task.from) {
                //resets the to and duration
                $scope.task.to = "";
                $scope.task.duration = "";
                //start timer
            } else {
                //set the time start to now
                $scope.task.from = $scope.setToNow($scope.task.from);
                //start timer
            }
        };
        $scope.pause = function () {
            $scope.task.to = $scope.setToNow($scope.task.to);
            $scope.task.duration = $scope.timeDiff($scope.task.from, $scope.task.to);
            //pause the timer
            $scope.isPaused = true;
        };
        $scope.takeBreak = function () {
            $scope.isPaused = true;
            //start break timer, if already started, add another 5min to it
        };
        $scope.resetTime = function () {
            initializeTimer();
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
