// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.dash', {
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.friends', {
                url: '/friends',
                views: {
                    'tab-friends': {
                        templateUrl: 'templates/tab-friends.html',
                        controller: 'FriendsCtrl'
                    }
                }
            })
            .state('tab.friend-detail', {
                url: '/friend/:friendId',
                views: {
                    'tab-friends': {
                        templateUrl: 'templates/friend-detail.html',
                        controller: 'FriendDetailCtrl'
                    }
                }
            })
            .state('tab.task', {
                url: '/task',
                views: {
                    'tab-task': {
                        templateUrl: 'templates/tab-task.html',
                        controller: 'TaskCtrl'
                    }
                }
            })
            .state('tab.moralBank', {
                url: '/moralBank',
                views: {
                    'tab-moralBank': {
                        templateUrl: 'templates/tab-moralBank.html',
                        controller: 'MoralBankCtrl'
                    }
                }
            })
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    })
    .directive('stopEvent', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.bind('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
            }
        };
    })
/*
 * Auto-expanding textbox directive for single-line <input> controls.
 *
 * This is adapted from: https://gist.github.com/thomseddon/4703968
 *
 * See the above link for auto-growing multiline <textarea> controls, a similar but slightly
 * different objective.
 *
 * The original, pure jQuery (and non-AngularJS) version of this can be found here:
 * http://jsbin.com/ahaxe
 *
 * Usage example:
 * <input type="text" auto-grow max-width="500"></input>
 */
.directive('autoGrow', function () {
    return function(scope, element, attr) {

        var opts = {
            maxWidth: parseInt(attr.maxWidth) || 1000,
            minWidth: parseInt(attr.minWidth) || element.width(),
            comfortZone: parseInt(attr.comfortZone) || 20
        };

        var minWidth = opts.minWidth;
        var val = '';
        var input = element;

        var $shadow = angular.element('<div></div>').css({
            position: 'absolute',
            top: -10000,
            left: -10000,
            width: 'auto',
            fontSize: element.css('fontSize'),
            fontFamily: element.css('fontFamily'),
            fontWeight: element.css('fontWeight'),
            letterSpacing: input.css('letterSpacing'),
            whitespace: 'nowrap'
        });

        $shadow.insertAfter(element);

        var update = function() {
            if (val === (val = input.val())) {return;}

            // Enter new content into the shadow element
            var escaped = val.replace(/&/g, '&amp;').replace(/\s/g,'&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            $shadow.html(escaped);

            // Calculate new width + whether to change
            var testerWidth = $shadow.width(),
                newWidth = (testerWidth + opts.comfortZone) >= minWidth ? testerWidth + opts.comfortZone : minWidth,
                currentWidth = input.width(),
                isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth)
                    || (newWidth > minWidth && newWidth < opts.maxWidth);

            // Animate width
            if (isValidWidthChange) {
                input.width(newWidth);
            }
            if (newWidth >= opts.maxWidth) {
                input.width(opts.maxWidth);
            }
        };

        if (attr.ngModel) { scope.$watch(attr.ngModel, update); }
        else { element.bind('keyup keydown keypress change', update); }

        update();
    }
});
