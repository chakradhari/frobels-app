angular.module('Forbels.services', [])
// .constant('FrobelsApi', '')
.constant('FrobelsApi', 'http://www.frobelsedu.com')

.service('LoginService', ['$q', '$http', '$httpParamSerializerJQLike', '$sce', 'FrobelsApi', function($q, $http, $httpParamSerializerJQLike, $sce, FrobelsApi) {

  this.login = function(requestParams) {
    var dataObj = {
      username: requestParams.username,
      password: requestParams.password
    }
    console.log(dataObj);
    var deferred = $q.defer();
    // var url  = `${FrobelsApi}/webservices/authUser.php?username=${requestParams.username}&password=${requestParams.password}`;
    // console.log(url);
    $http({
      method: 'GET',
      url: FrobelsApi + '/webservices/authUser.php',
      // ForbelsApi + '/webservices/authUser.php',
      // contentType: 'application/json',
      // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      // url: 'http://www.frobelsedu.com/webservices/authUser.php',
      // www.frobelsedu.com/webservices/authUser.php
      // processData: false,
      // dataType: 'json',
      // data: dataObj
      params: requestParams
      // paramSerializer: '$httpParamSerializerJQLike'
    }).then(
      function(response) {
        deferred.resolve(response);
        console.log(response);
      },
      function(error) {
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

  this.changepassword = function(requestParams) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: FrobelsApi + '/webservices/changePassword.php',
      params: requestParams
    }).then(
      function(response) {
        deferred.resolve(response);
      },
      function(error) {
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

  this.forgotPassword = function(requestParams) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: FrobelsApi + '/webservices/forgotPassword.php',
      params: requestParams
    }).then(
      function(response) {
        deferred.resolve(response);
      },
      function(error) {
        deferred.reject(error);
      }
    );
    return deferred.promise;
  };
  // www.frobelsedu.com/webservices/forgotPassword.php
}])

.service('MessageService', ['$q', '$http', 'FrobelsApi', function($q, $http, FrobelsApi) {
  this.sendMessage = function() {
    var deferred = $q.defer(requestParams);
    $http({
      method: 'POST',
      url: FrobelsApi + '/webservices/parentTeacherChat.php',
      params: requestParams
    }).then(
      function(response) {
        deferred.resolve(response);
      },
      function(error) {
        deferred.reject(error);
      }
    );
    return deferred.promise;
  }

}])

// http://www.frobelsedu.com/webservices/parentTeacherChat.php
.service('AttendanceService', ['$q', '$http', 'FrobelsApi', function($q, $http, FrobelsApi) {

    this.getStudentAttendance = function(studentId) {
      var deferred = $q.defer();
      var reqParams = {
        studentId: studentId
      };
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/getStudentAttendance.php',
        params: reqParams
      }).then(
        function(response) {
          deferred.resolve(response);
          console.log(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;

      // $http.get('www.frobelsedu.com/webservices/getstudentmarks.php?studentId=1&categoryId=1')
      // http://www.frobelsedu.com/webservices/getStudentAttendance.php
    };

  }])

  .service('MarksService', ["$q", "$http", "FrobelsApi", function($q, $http, FrobelsApi) {
    this.getStudentMarksNAttendance = function(studentId) {
      var deferred = $q.defer();
      var reqParams = {
        studentId: studentId
      };
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/getStudentMarksNAttendance.php',
        params: reqParams
      }).then(
        function(response) {
          deferred.resolve(response);
          console.log(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;

      // $http.get('http://www.frobelsedu.com/webservices/getStudentMarksNAttendance.php?studentId=1')
    };
  }])

  .service('dashBoradService', ["$q", "$http", "FrobelsApi", function($q, $http, FrobelsApi) {

    this.getImageGallery = function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/getImageGallery.php'
      }).then(
        function(response) {
          deferred.resolve(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    };

  }])

  .service('ChatService', ["$q", "$http", "FrobelsApi", function($q, $http, FrobelsApi) {
    this.getTeachersList = function(studentId) {
      var deferred = $q.defer();
      var requestParams = {
        student_id: studentId
      };
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/getChatMembersForParent.php',
        params: requestParams
      }).then(
        function(response) {
          deferred.resolve(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    };

    this.getChat = function(requestParams) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/getChat.php',
        params: requestParams
      }).then(
        function(response) {
          deferred.resolve(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    };

    this.updatMessageRead = function(requestParams) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/updateMessageRead.php',
        params: requestParams
      }).then(
        function(response) {
          deferred.resolve(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    };

  }])

  // www.frobelsedu.con/webservices/getChatMembers.php

  .service('ImageGalleryService', ["$q", "$http", "FrobelsApi", function($q, $http, FrobelsApi) {
    this.getImageGallery = function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/getImageGallery.php'
      }).then(
        function(response) {
          deferred.resolve(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    };
  }])

  .service('NotificationService', ["$q", "$http", "FrobelsApi", function($q, $http, FrobelsApi) {
    this.notifications = function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/getNotifications.php'
      }).then(
        function(response) {
          deferred.resolve(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    }
  }])

  .service('MessageService', ["$q", "$http", "FrobelsApi", function($q, $http, FrobelsApi) {
    this.sendMessage = function(requestParams) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/sendMessage.php',
        params: requestParams
      }).then(
        function(response) {
          deferred.resolve(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    }
  }])


  .service('TeacherService', ["$q", "$http", "FrobelsApi", function($q, $http, FrobelsApi) {
    this.parentListForTeacher = function(teacherId) {
      var deferred = $q.defer();
      var requestParams = {
        teacher_id: teacherId
      };
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/getChatMembersForTeacher.php',
        params: requestParams
      }).then(
        function(response) {
          deferred.resolve(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    }
  }])

  .service('ProfileService', ["$q", "$http", "FrobelsApi", function($q, $http, FrobelsApi) {
    this.viewProfileForStudent = function(studentId) {
      var deferred = $q.defer();
      var requestParams = {
        studentId: studentId
      };
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/getStudentProfile.php',
        // www.frobelsedu.com/webservices/getStudentProfile.php
        params: requestParams
      }).then(
        function(response) {
          deferred.resolve(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    };

    this.viewTeacherProfile = function(teacherId) {
      var deferred = $q.defer();
      var requestParams = {
        teacherId: teacherId
      };
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/getTeacherProfile.php',
        // www.frobelsedu.com/webservices/getTeacherProfile.php
        params: requestParams
      }).then(
        function(response) {
          deferred.resolve(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    };
  }])

  .service('AssignmentService', ["$q", "$http", "FrobelsApi", function($q, $http, FrobelsApi) {
    this.getAssignments = function(requestParams) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/getAssignments.php',
        // http://www.frobelsedu.com/webservices/getAssignments.php
        params: requestParams
      }).then(
        function(response) {
          deferred.resolve(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    };

    this.createAssignments = function(requestParams) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/createAssignment.php',
        // www.frobelsedu.com/webservices/createAssignment.php
        params: requestParams
      }).then(
        function(response) {
          deferred.resolve(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    };

    this.getListOfClassesAndSubjcts = function() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: FrobelsApi + '/webservices/getAllClassesNSubjects.php'
        // http://www.frobelsedu.com/webservices/getAllClassesNSubjects.php
      }).then(
        function(response) {
          deferred.resolve(response);
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    };

  }])

  // www.frobelsedu.com/webservices/getNotifications.php

// http://www.frobelsedu.com/webservices/getImageGallery.php
