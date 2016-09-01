// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
.run(function($ionicPlatform, $ionicPopup, $rootScope, $state)
{
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  // Enable to debug issues
  window.plugins.OneSignal.setLogLevel({logLevel: 0, visualLevel: 0});

  $rootScope.news = {};

  //the callBack function called when we click on the notification received
  var notificationOpenedCallback = function(jsonData)
  {
    console.log("Notification received:\n" + JSON.stringify(jsonData));

    var newsId = jsonData.additionalData.news;

    console.log('NEWS ID DUDE', newsId);

    $rootScope.news = jsonData;
    $state.go('tab.news');

    /*$ionicPopup.alert({
      title : jsonData.title,
      template : jsonData.message
    });*/
  };

  //init function to use OneSignal service and GCM sender ID
  window.plugins.OneSignal.init("d1946669-a78c-4934-a708-8815c855cc4e",
                                 {googleProjectNumber: "506350226596"},
                                 notificationOpenedCallback);
  //subscribe to the service
  window.plugins.OneSignal.setSubscription(true);
  //activating the reception of push notification when the app is working also
  window.plugins.OneSignal.enableNotificationsWhenActive(true);
})
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
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

    .state('tab.news', {
      url: '/news/:id',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-news.html',
          controller: 'NewsController'
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

});
