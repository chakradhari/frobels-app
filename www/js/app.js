// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('Forbels', ['ionic', 'ngCordova', 'Forbels.controllers', 'Forbels.services'])

.run(function($ionicPlatform, $ionicLoading, $rootScope) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({
      template: '<ion-spinner class="bubbles"></ion-spinner> Loading ...'
    })
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide();
  })

})

.config(['$ionicConfigProvider', function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.attendence', {
    url: '/attendance/:studentId',
    views: {
      'menuContent': {
        templateUrl: 'templates/attendance.html',
        controller: 'AttendanceController'
      }
    }
  })

  .state('app.dashboard', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashboradController'
        }
      },
      params: {
        childDetails: null
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.exams', {
    url: '/exams/:studentId',
    views: {
      'menuContent': {
        templateUrl: 'templates/marks.html',
        controller: 'MarksController'
      }
    }
  })
  .state('app.exam-details', {
    url: '/exam',
    views: {
      'menuContent': {
        templateUrl: 'templates/exam-detail.html',
        controller: 'ExamController'
      }
    },
    params: {
      data:null
    }
  })

  .state('app.image-gallery', {
    url: '/image-gallery',
    views: {
      'menuContent': {
        templateUrl: 'templates/image-gallery.html',
        controller: 'ImageGalleryController'
      }
    }
  })

  .state('app.album', {
    url: '/album',
    views: {
      'menuContent': {
        templateUrl: 'templates/album.html',
        controller: 'AlbumController'
      }
    },
    params: {
      album: null
    }
  })


  .state('app.notifications', {
    url: '/notifications',
    views: {
      'menuContent': {
        templateUrl: 'templates/notifications.html',
        controller: 'NotificationController'
      }
    }
  })

  .state('app.chat', {
    url: '/chat/:studentId',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat.html',
        controller: 'ChatsController'
      }
    }
  })

  .state('app.message', {
    url: '/message/:teacherId',
    views: {
      'menuContent': {
        templateUrl: 'templates/message.html',
        controller: 'MessageController'
      }
    },
    params: {
      memberData: null
    }
  })

  .state('app.teacherinbox', {
    url: '/teacherinbox',
    views: {
      'menuContent': {
        templateUrl: 'templates/teacher-inbox.html',
        controller: 'TeacherController'
      }
    },
    params: {
      teacherId: null
    }
  })

  // $urlRouterProvider.otherwise('/app/message/1');

  $urlRouterProvider.otherwise(function($injector, $location) {
    var state = $injector.get('$state');
      if(window.localStorage.getItem('oauth') && window.localStorage.getItem('login_type')) {
        state.go('app.dashboard');
      }
      else {
        state.go('login');
      }
  });




});

/*
"proxies": [
  {
    "path": "/webservices",
    "proxyUrl": "http://www.frobelsedu.com/webservices"
  }
]
*/
