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
    .controller('TasksCtrl', function ($scope, $stateParams, TaskService, $ionicPopup) {

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
            //console.log("create New Task");
            //console.log(newTask);
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
            //console.log('setToNow called'+ "time is " + time);
            if(time===0 || time=="" || typeof time==="undefined") {
                return moment().format('HH:mm');
            }else {
                return time;
            }
        };
        //@param time1 and time2 are both strings
        $scope.timeDiff=function(time1,time2){
            var t1 = moment(time1, "mm:ss");
            //console.log(t1.format());
            var t2 = moment(time2, "mm:ss");
            //console.log(t2.format());
            return t2.diff(t1, 'minutes');
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
    .controller('taskCtrl', function ($scope, TaskService, $cordovaLocalNotification) {
        var defaultCountDown = 1200;
        var defaultBreakTime = 300;
        function initializeTimer() {
            $scope.isPaused = true;
            //$scope.$broadcast('timer-set-countdown',defaultCountDown);
            $scope.$broadcast('timer-set-countdown-seconds', defaultCountDown);
            $scope.$broadcast('timer-stop');
        }

        initializeTimer();
        $scope.startTask = function () {
            //resets any break
            $scope.breakTimeRemaining = "00:00:00";
            $scope.isPaused = false;
            //if task is already started
            if ($scope.task.from) {
                //resets the to and duration
                $scope.task.to = "";
                $scope.task.duration = "";
                $scope.$broadcast('timer-resume');
            } else {
                //set the time start to now
                $scope.task.from = $scope.setToNow($scope.task.from);
                //start timer
                $scope.$broadcast('timer-start');
            }
        };
        $scope.pause = function () {
            $scope.task.to = $scope.setToNow($scope.task.to);

            //console.log($scope.task.duration);
            $scope.task.duration = $scope.timeDiff($scope.task.from, $scope.task.to);
            //console.log($scope.task.duration);
            $scope.$broadcast('timer-stop');
            $scope.isPaused = true;
        };
        $scope.addTime = function () {
            $scope.$broadcast('timer-add-cd-seconds', defaultBreakTime);
        };
        $scope.reduceTime = function () {
            $scope.$broadcast('timer-add-cd-seconds', -1 * defaultBreakTime);
        };
        $scope.takeBreak = function () {
            $scope.pause();
            //start break timer, if already started, add another 5min to it
        };
        $scope.resetTime = function () {
            $scope.pause();
            $scope.$broadcast('timer-reset');

        };
        //the callback when a countdown finishes
        $scope.timerFinished = function () {
            $cordovaLocalNotification.add({
                id: $scope.task.id,
                title: $scope.task.name,
                message: 'Time is up.',
                repeat: 'minutely',
                date: new Date(),
                autoCancel: true
            });
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
