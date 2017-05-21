angular.module('Forbels.controllers', [])

.controller('AppCtrl', function($scope, $ionicPlatform, $cordovaToast, $ionicModal, $ionicPopup, $timeout, $state, $ionicHistory, LoginService, ContactusService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal

/*
// Create the login modal that we will use later
$ionicModal.fromTemplateUrl('templates/login.html', {
  scope: $scope
}).then(function(modal) {
  $scope.modal = modal;
});

$scope.$on('$stateChangeStart', function(event, toState, toParams) {
    if(toState == 'app.marks') {
      $scope.bodyClass = 'marks-view'
    }
});
*/

$scope.logout = function() {
  // window.localStorage.setItem('oauth', '');
  window.localStorage.clear();
  $ionicHistory.clearCache();

  /*
  $cordovaToast.showShortTop("Logged out successfully").then(
    function(success) {

    },
    function(error) {

    }
  )
  */
  $state.go('login');
};

$scope.contactus = function() {
  $state.go('app.contactus')
};

$scope.showProfile = function() {
  if(window.localStorage.getItem('login_type') == 'teacher') {
    $state.go('app.viewprofile', { type: window.localStorage.getItem('login_type'), personId: JSON.parse(window.localStorage.getItem('loginDetails')).object_id });
  } else {
    $state.go('app.viewprofile', { type: window.localStorage.getItem('login_type'), personId: window.localStorage.getItem('currentStudentId')});
  }

};

/*

else if(result.data.userdetails.login_type == 'parent') {
  console.log(result);
  window.localStorage.setItem('oauth', result.data.userdetails.oauth);
  $rootScope.loginDetails = result.data.userdetails;
  window.localStorage.setItem('loginDetails', JSON.stringify(result.data.userdetails));
  window.localStorage.setItem('login_type', result.data.userdetails.login_type);
  $state.go('app.dashboard', { childDetails: result.data.userdetails.children_details});
}
else if(result.data.userdetails.login_type == 'teacher') {
  console.log(result);
  window.localStorage.setItem('oauth', result.data.userdetails.oauth);
  $rootScope.loginDetails = result.data.userdetails;
  window.localStorage.setItem('loginDetails', JSON.stringify(result.data.userdetails));
  window.localStorage.setItem('login_type', result.data.userdetails.login_type);
  console.log("Teacher Login");
  $state.go('app.teacherinbox', {teacherId: result.data.userdetails.object_id});
}
*/



/*
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
*/
  // Perform the login action when the user submits the login form

})

.controller('LoginController', ["$scope", "$state", "$ionicModal", "$cordovaToast", "$rootScope", "$filter", "LoginService", function($scope, $state, $ionicModal, $cordovaToast, $rootScope, $filter, LoginService) {
  $scope.loginData = {};

  $scope.forgotPasswordObj = {};

  $scope.changeObj = {};



  $scope.doLogin = function() {
    console.log("Entered")
    LoginService.login($scope.loginData).then(
      function(result) {
        if(result.data.error) {
          // alert(result.data.error + 'line 55');
          $cordovaToast.showShortTop(result.data.error).then(
            function(success) {

            },
            function(error) {

            }
          )
          $scope.loginData = {};
        }
        else {
          console.log(result);
          window.localStorage.setItem('oauth', result.data.userdetails.oauth);
          $rootScope.loginDetails = result.data.userdetails;
          window.localStorage.setItem('loginDetails', JSON.stringify(result.data.userdetails));
          window.localStorage.setItem('login_type', result.data.userdetails.login_type);
          window.localStorage.setItem('schoolId', result.data.schoolId);
          if(result.data.userdetails.login_type == 'parent') {
            $state.go('app.dashboard', { childDetails: result.data.userdetails.children_details});
          }
          else {
            $state.go('app.dashboard');
          }
        }
      },
      function(error) {
        $cordovaToast.showShortTop('Something went wrong please try again or try after few minutes').then(
          function(success) {

          },
          function(error) {

          }
        )

      }
    )
  };

  $scope.resestPasswordModal = function() {

  };

  $ionicModal.fromTemplateUrl('templates/popups/forgot.html', {
    scope: $scope,
  }).then(function(modal) {
    $scope.forgotModal = modal;
  })

  $scope.forgotPassword = function() {
    $scope.forgotModal.show();
  };

  // window.localStorage.getItem('login_type') == 'parent' // state.go('app.teacherinbox');
  $scope.submitForgotPassword = function(forgotObj) {
    console.log(typeof forgotObj.dob);
    console.log(forgotObj.dob);
    if(forgotObj.admission_no && forgotObj.dob && forgotObj.mobile_no) {
      // forgotObj.dob = $filter('date')(new Date(forgotObj.dob), 'yyyy-MM-dd')
        LoginService.forgotPassword(forgotObj).then(
          function(response) {
            console.log(response);
            $scope.forgotModal.hide();
            $scope.forgotPasswordObj = {};
            $cordovaToast.showLongTop(response.data.response).then(
              function(success) {

              },
              function(error) {

              }
            )
          },
          function(error) {
            console.log(response);
          }
        )
    }
    else {
      alert('Please fill all the details');
    }
  };

  $ionicModal.fromTemplateUrl('templates/popups/reset.html', {
    scope: $scope,
  }).then(function(modal) {
    $scope.changeModal = modal;
  })

  $scope.changePassword = function() {
    $scope.changeModal.show();
  };

  $scope.changeCredentials = function(changeObj) {
    if(changeObj.username && changeObj.old_pwd && changeObj.new_pwd) {
      // forgotObj.dob = $filter('date')(new Date(forgotObj.dob), 'yyyy-MM-dd')
        LoginService.changepassword(changeObj).then(
          function(response) {
            console.log(response);
            $scope.changeModal.hide();
            $scope.changeObj = {};
            $cordovaToast.showShortTop(response.data.response).then(
              function(success) {

              },
              function(error) {

              }
            )
          },
          function(error) {
            console.log(response);
          }
        )
    }
    else {
      $cordovaToast.showShortTop('Please fill all the details').then(
        function(success) {

        },
        function(error) {

        }
      )
    }
  };

}])

/* Landing page for both parent and teacher */

.controller('DashboradController', ["$scope", "$state", "$ionicPopup", "$rootScope", "dashBoradService", function($scope, $state, $ionicPopup, $rootScope, dashBoradService) {
  console.log($state.params.childDetails);
  // $scope.childDetails = $state.params.childDetails;

  if($state.params.childDetails) {
    window.localStorage.setItem('childDetails', JSON.stringify($state.params.childDetails));
    $scope.childDetails = JSON.parse(window.localStorage.getItem('childDetails'));
    $scope.currentStudentId = $scope.childDetails[0].student_id;
    window.localStorage.setItem('currentStudentId', $scope.childDetails[0].student_id);
  }

  if(window.localStorage.getItem('childDetails')) {
    $scope.childDetails = JSON.parse(window.localStorage.getItem('childDetails'));
    $scope.currentStudentId = $scope.childDetails[0].student_id;
  }

  $scope.loginDetails = $rootScope.loginDetails || JSON.parse(window.localStorage.getItem('loginDetails'));

  /* This function is for switching child if there are multiple */
  $scope.studentSelect = function() {
    var childSelect = $ionicPopup.show({
      title: "Select a child",
      templateUrl: 'templates/popups/student_select.html',
      scope: $scope,
      buttons: [
        {text: "Cancel"}
      ]
    });
  $scope.selectedChild = function(studentId) {
    console.log("called");
    $scope.currentStudentId = studentId;
    window.localStorage.setItem('currentStudentId', $scope.childDetails[0].student_id);
    childSelect.close();
  }
  };

  $scope.textParent = function() {
    $state.go('app.teacherinbox', {teacherId: $scope.loginDetails.object_id});
  };

  $scope.openFacebookPage = function() {
    console.log("print something");
    // window.open('https://www.facebook.com/Frobels-Residential-High-School-1244461868958871', '_system');
    // url.replace('https://www.facebook.com/Frobels-Residential-High-School-1244461868958871');
    // cordova.InAppBrowser.open('https://www.facebook.com/Frobels-Residential-High-School-1244461868958871', '_blank');
    cordova.InAppBrowser.open('https://www.google.com', '_blank');
    // window.open(ref);
  };


  $scope.getImages = function() {
    dashBoradService.getImageGallery()
    .then(
      function(response) {
        console.log(response);
      },
      function(error) {
        console.log(error);
      }
    )
  };
  $scope.getImages();
}])

/* This for parent and to view child attendance */
.controller('AttendanceController', ['$scope', '$stateParams', '$rootScope', 'AttendanceService', function($scope, $stateParams, $rootScope, AttendanceService) {

  var studentId = $stateParams.studentId;

  $scope.getAttendanceForStudent = function(studentId) {
    $rootScope.$broadcast('loading:show');
    AttendanceService.getStudentAttendance(studentId).then(
      function(response) {
        $scope.attendanceDetails = response.data.attendance;
        console.log($scope.attendanceDetails);
        $rootScope.$broadcast('loading:hide');
      },
      function(error) {
        console.log(error);
        $rootScope.$broadcast('loading:hide');
      }
     )
  };

  $scope.getAttendanceForStudent(studentId);

}])

/* This for parent and to view child marks */
.controller('MarksController', ["$scope", "$state", "$stateParams", "$rootScope", "$timeout", "MarksService", function($scope, $state, $stateParams, $rootScope, $timeout, MarksService) {
  var studentId = $stateParams.studentId;

  $scope.getMarksForStudent = function(studentId) {
    $rootScope.$broadcast('loading:show');
    MarksService.getStudentMarksNAttendance(studentId).then(
      function(response) {
        $scope.exams = response.data.marks;
        console.log($scope.marks);
        $rootScope.$broadcast('loading:hide');
      },
      function(error) {
        console.log(error);
        $rootScope.$broadcast('loading:hide');
      }
     )
  };

  $scope.getMarksForStudent(studentId);

  $scope.goToDetail = function(exam_id) {
    angular.forEach($scope.exams, function(value, key) {
      if(value.exam_id == exam_id) {
        $timeout(function() {
          $state.go('app.exam-details', {data: value})
        })
      }
    })
  };

}])

.controller('ExamController', ["$scope", "$state", function($scope, $state) {
  $scope.marks = $state.params.data.submarks;
  $scope.exam_name = $state.params.data.exam_name;
  $scope.total = $state.params.data.totalDetails.total;
}])

.controller('ImageGalleryController', ["$scope", "$state", "$rootScope", "ImageGalleryService", function($scope, $state, $rootScope, ImageGalleryService) {
  $scope.FrobelsApi = "http://www.frobelsedu.com";
  $scope.imageGallery = function() {
    $rootScope.$broadcast('loading:show');
    ImageGalleryService.getImageGallery().then(
      function(response) {
        console.log(response);
        $scope.albums = response.data;
        $rootScope.$broadcast('loading:hide');
      },
      function(error) {
        console.log(error);
        $rootScope.$broadcast('loading:hide');
      }
    )
  };

  $scope.openAlbum = function(index) {
    $state.go('app.album', {album: $scope.albums[index]});
  };

  $scope.imageGallery();
}])

.controller('NotificationController', ["$scope", "$rootScope", "NotificationService", function($scope, $rootScope, NotificationService) {
  $scope.getNotifications = function() {
    $rootScope.$broadcast('loading:show');
    NotificationService.notifications().then(
      function(response) {
        $scope.notifications = response.data.notifications;
        console.log($scope.notifications);
        $rootScope.$broadcast('loading:hide');
      },
      function(error) {
        console.log(error);
        $rootScope.$broadcast('loading:hide');
      }
    )
  }
  $scope.getNotifications();
}])

.controller('ChatsController', ["$scope", "$state", "$stateParams", "$rootScope", "ChatService", function($scope, $state, $stateParams, $rootScope, ChatService) {
  var studentId = $stateParams.studentId;
  console.log(studentId);
  $scope.loginDetails = $rootScope.loginDetails || JSON.parse(window.localStorage.getItem('loginDetails'));
  $scope.getTechersList = function(studentId) {
    $rootScope.$broadcast('loading:show');
    ChatService.getTeachersList(studentId).then(
      function(response) {
        $scope.teachersData = response.data.chat_members;
        console.log(response);
        $rootScope.$broadcast('loading:hide');
      },
      function(error) {
        console.log(error);
        $rootScope.$broadcast('loading:hide');
      }
    )
  };

  var getChatRequestParams = {
    object_id: $scope.loginDetails.object_id,
    type: $scope.loginDetails.login_type
  };

  /* For getting chat history between parent and teacher.
   Same is present in TeacherController Controller
  */
  $scope.getChat = function(getChatRequestParams) {
    $rootScope.$broadcast('loading:show');
    ChatService.getChat(getChatRequestParams).then(
      function(response) {
        console.log(response);
        $scope.chatHistoryList = response.data.chats;
        $scope.getTechersList(studentId);
      },
      function(error) {
        console.log(error);
      }
    )
  };

  $scope.getChat(getChatRequestParams);

  /*
   For showing dot in chat list if there are new messages added to the chat history whic are unread.
   Same is present in TeacherController Controller
  */
  $scope.showUnread = function(index) {
    var chatListForTeacher = $scope.chatHistoryList.filter(function(value) {
      return (value.message_to ==  index) || (value.message_from ==  index);
    });

    var showDot = false;

    if(chatListForTeacher.length > 0) {
        chatListForTeacher.forEach(function(value) {
            if(value.message_read == '0') {
                showDot = true;
            }
        });
    }
    return showDot;
    };

  $scope.textTeacher = function(index) {
    $state.go('app.message', {memberData: $scope.teachersData[index]});
  };
}])

/* For sending message. Both for parent and teacher same controller is utilized */
.controller('MessageController', ["$scope", "$state", "$stateParams", "$rootScope", "MessageService", "ChatService", function($scope, $state, $stateParams, $rootScope, MessageService, ChatService) {
  $scope.userData = $state.params.memberData;
  console.log($scope.userData);
  console.log($rootScope.loginDetails);
  $scope.loginDetails = $rootScope.loginDetails || JSON.parse(window.localStorage.getItem('loginDetails'));
  $scope.data = {};
  if($scope.loginDetails) {
    if($scope.loginDetails.object_id) {
      $scope.myId = $scope.loginDetails.object_id;
    }
  }

  $scope.sendMessage = function() {
    var requestParams = {
      from_id: $scope.loginDetails.object_id,
      from_type: $scope.loginDetails.login_type,
      to_id: $scope.userData.emp_id || $scope.userData.parent_id,
      description: $scope.data.message,
      subject: $scope.userData.subject_name || $scope.subjectForTeacher
    };

    $scope.messages.push({
      text: $scope.data.message,
      id: $scope.loginDetails.object_id
    });

    delete $scope.data.message;

    MessageService.sendMessage(requestParams).then(
      function(response) {
        console.log(response);
      },
      function(error) {
        console.log("Error send message");
      }
    )
  };

  var getChatRequestParams = {
    object_id: $scope.loginDetails.object_id,
    type: $scope.loginDetails.login_type
  };

  $scope.getChat = function(getChatRequestParams) {
    ChatService.getChat(getChatRequestParams).then(
      function(response) {
        console.log(response);
        $scope.chatHistoryList = response.data.chats;
        $scope.addMessagesOfChatHistory();
      },
      function(error) {
        console.log(error);
      }
    )
  };

  /* For updating message read. Once chat is studied then inorder update history this function is used.*/
  $scope.updateMessageRead = function(updateMessageString) {
      updateMessageString = updateMessageString.substring(0, updateMessageString.length-1);

      var requestParams = {
        message_id: updateMessageString
      };

      ChatService.updatMessageRead(requestParams).then(
        function(response) {
          console.log(response);
        },
        function(error) {
          console.log(error);
        }
      );

  };

  /* Adding messages to chat history */
  $scope.addMessagesOfChatHistory = function() {
      var updateMessageString = "";
      var historyMessages = $scope.chatHistoryList.filter(function(value) {
        return (value.message_to ==  $scope.userData.emp_id || $scope.userData.parent_id) || (value.message_from ==  $scope.userData.emp_id || $scope.userData.parent_id);
      });
      console.log(historyMessages);
      if(historyMessages.length > 0) {
        historyMessages.forEach(function(value, index) {
          $scope.messages.push({
            text: value.message_description,
            id: value.message_from
          });
          $scope.subjectForTeacher = value.message_subject;
          if(value.message_read == '0') {
            updateMessageString += value.message_id + ","
          }
          if((index+1) == historyMessages.length) {
            if(updateMessageString) {
              $scope.updateMessageRead(updateMessageString);
            }
          }
        });
      }
  };

  $scope.getChat(getChatRequestParams);

  $scope.messages = [];

}])

.controller('AlbumController', ["$scope", "$state", "FrobelsApi", function($scope, $state, FrobelsApi) {
  $scope.album = $state.params.album;
  console.log($scope.album);
  // var numberOfRecords = Math.ceil($scope.album[0].gallery.length/4)
  $scope.albumRows = chunk($scope.album.gallery, 4);
  console.log($scope.albumRows);
  $scope.frobelsApi = FrobelsApi;

  function chunk(arr, size) {
    var newArr = [];
    for(var i=0; i<arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
  }

}])

.controller('TeacherController', ["$scope", "$state", "$rootScope", "FrobelsApi", "TeacherService", "ChatService", function($scope, $state, $rootScope, FrobelsApi, TeacherService, ChatService) {
    var teacherId = $state.params.teacherId || JSON.parse(window.localStorage.getItem('loginDetails')).object_id;
    $scope.loginDetails = $rootScope.loginDetails || JSON.parse(window.localStorage.getItem('loginDetails'));
    $scope.getParentList = function(teacherId) {
      TeacherService.parentListForTeacher(teacherId).then(
        function(response) {
            console.log(response);
            $scope.parentsList = response.data.chat_members;
            $rootScope.$broadcast('loading:hide');
        },
        function(error) {
            console.log(error);
            $rootScope.$broadcast('loading:hide');
        }
      )
    };

    $scope.textParent = function(index) {
      $state.go('app.message', {memberData: $scope.parentsList[index]});
    };

    var getChatRequestParams = {
      object_id: $scope.loginDetails.object_id,
      type: $scope.loginDetails.login_type
    };

    $scope.getChat = function(getChatRequestParams) {
      $rootScope.$broadcast('loading:show');
      ChatService.getChat(getChatRequestParams).then(
        function(response) {
          console.log(response);
          $scope.chatHistoryList = response.data.chats;
          $scope.getParentList(teacherId);
        },
        function(error) {
          console.log(error);
        }
      )
    };

    $scope.getChat(getChatRequestParams);

    $scope.showUnread = function(index) {
      var chatListForTeacher = $scope.chatHistoryList.filter(function(value) {
        return (value.message_to ==  index) || (value.message_from ==  index);
      });

      var showDot = false;

      if(chatListForTeacher.length > 0) {
          chatListForTeacher.forEach(function(value) {
              if(value.message_read == '0') {
                  console.log(value);
                  showDot = true;
              }
          });
      }
      return showDot;
      };
}])

.controller('ViewProfileController', ['$scope', '$rootScope', '$state', 'ProfileService', function($scope, $rootScope, $state, ProfileService) {
  console.log($rootScope.loginDetails);

  if($state.params.type) {
    $scope.type = $state.params.type;
  }

  if($state.params.personId) {
    $scope.personId = $state.params.personId;
  }

  $scope.getTeacherProfile = function(teacherId) {
    ProfileService.viewTeacherProfile(teacherId).then(
      function(response) {
        console.log(response);
        $scope.data = response.data[0];
      },
      function(error) {
        console.log(error);
      }
    )
  };

  $scope.getStudentProfile = function(studentId) {
    ProfileService.viewProfileForStudent(studentId).then(
      function(response) {
        console.log(response);
        $scope.data = response.data[0];
      },
      function(error) {
        console.log(error);
      }
    )
  };

  if($scope.type) {
      if($scope.type == 'teacher') {
        $scope.getTeacherProfile($scope.personId);
      } else {
        $scope.getStudentProfile($scope.personId)
      }
  }

}])

.controller('ParentAssignmentController', ['$scope', '$stateParams', 'AssignmentService', function($scope, $stateParams, AssignmentService) {
  $scope.studentId = $stateParams.studentId;

  /* View Assignments for parent child*/
  $scope.getAssigmentsForParent = function(studentId) {
    var requestParams = {studentId : studentId};
    AssignmentService.getAssignments(requestParams).then(
      function(response) {
        console.log(response);
        $scope.assignments = response.data;
      },
      function(error) {

      }
    )
  };

  /* View Assignments for teacher */

  $scope.getAssigmentsForTeacher = function(teacherId) {
    var requestParams = {teacherId : teacherId};
    AssignmentService.getAssignments(requestParams).then(
      function(response) {
        console.log(response);
        $scope.assignments = response.data;
      },
      function(error) {
        console.log(error);
      }
    )
  };

  $scope.assignmentFilter = {};

  if(window.localStorage.getItem('login_type') == 'parent') {
    $scope.getAssigmentsForParent($scope.studentId);
  } else {
    $scope.getAssigmentsForTeacher(JSON.parse(window.localStorage.getItem('loginDetails')).object_id);
  }

}])

.controller('TeacherAssignmentController', ['$scope', 'AssignmentService', function($scope, AssignmentService) {
  $scope.getAssigmentsForTeacher = function(teacherId) {
    var requestParams = {teacherId: teacherId}
    AssignmentService.getAssignments(requestParams).then(
      function(response) {

      },
      function(error) {

      }
    )
  };

  $scope.createAssignment = function(selectedItem) {
    console.log(selectedItem);
    var requestParams = {
      classId: selectedItem.class.class_id,
      teacherId: JSON.parse(window.localStorage.getItem('loginDetails')).object_id,
      subjectId: selectedItem.subject.subject_id,
      message: selectedItem.message
    };

    AssignmentService.createAssignments(requestParams).then(
      function(response) {
        console.log(response);
        $scope.seletecItem = {};
      },
      function(error) {
        console.log(error);
      }
    )

  };

  $scope.seletecItem = {};

  $scope.getAllClassAndSubjects = function() {
    AssignmentService.getListOfClassesAndSubjcts().then(
      function(response) {
        console.log(response);
        $scope.classes = response.data.classes;
        $scope.subjects = response.data.subjects
      },
      function(error) {

      }
    )
  };

  $scope.getAllClassAndSubjects();
}])

.controller('TeacherAttendanceController', ['$scope', 'AssignmentService', 'AttendanceService', function($scope, AssignmentService, AttendanceService) {
  $scope.seletecdClass = {
    value: '',
    session: ''
  };
  $scope.showForms = {
    classSelectForm : true,
    studentsDisplayForm: false
  };

  $scope.attendiesList = [];
  // $scope.attendiesList1 = [];

  $scope.getListOfClassesAndSubjects = function() {
    AssignmentService.getListOfClassesAndSubjcts().then(
      function(response) {
        $scope.classes = response.data.classes;
      },
      function(error) {
        console.log(error);
      }
    )
  }

  $scope.getListOfClassesAndSubjects();

  $scope.fetchChildren = function(selectedClass) {

    AttendanceService.getStudentsByClassId(selectedClass.value.class_id, selectedClass.session).then(
      function(response) {
        console.log(response);
        if(response.data.students.length > 0) {
          $scope.insertOrUpdateAttendance = response.data.attType
          $scope.currentSession = selectedClass.session;
          var attendiesList = response.data.students;
          var iteratedvalue = 0;

          attendiesList.forEach(function(value, key) {
            iteratedvalue++;
            $scope.attendiesList['attendie' + (key + 1)] = value.attendance;

            if(iteratedvalue === attendiesList.length) {
              console.log($scope.attendiesList);
              $scope.students = response.data.students;
              console.log($scope.students);
            }

          })

          $scope.showForms.classSelectForm = false;
          $scope.showForms.studentsDisplayForm = true;

        }
      },
      function(error) {

      }
    )

  };

  $scope.showResults = function(list) {

    var attendiesStatus = [];

    for(var i=0; i<Object.keys(list).length; i++) {
      var obj = {
        status: list[Object.keys(list)[i]],
        studentId: $scope.students[i].student_id
      }
      attendiesStatus.push(obj);
    }

    var students = attendiesStatus;
    var absenties = '';
    var presenties = '';
    var lateComers = '';

    for(var student in students) {
      var studentId = students[student].studentId;
      var status = students[student].status;

      if(status == 'P') {
        presenties += studentId + ':0,';
      }
      else if(status == 'A') {
        absenties += studentId + ',';
      }
      else {
        presenties += studentId + ':1,';
      }
    }

    absenties = absenties.substring(0, absenties.length-1);
    presenties = presenties.substring(0, presenties.length-1);

    console.log(`Absenties : ${absenties}, Presenties : ${presenties}, session: ${$scope.currentSession}, teacherId: ${JSON.parse(window.localStorage.getItem('loginDetails')).object_id}`);
    $scope.submitAttendance($scope.insertOrUpdateAttendance, absenties, presenties, $scope.currentSession, JSON.parse(window.localStorage.getItem('loginDetails')).object_id);
  };

  $scope.submitAttendance = function(type, a, p, s, t_id) {
    var requestParams = {
      date: new Date(),
      absentees: a,
      presentees: p,
      session: s,
      teacherId: t_id
    }
    if(type === 'Insert') {
      AttendanceService.insertStudentAttendance(requestParams).then(
        function(response) {
          console.log(response);
        },
        function(error) {
          console.log(error);
        }
      )
    } else {
      AttendanceService.updateStudentAttendance(requestParams).then(
        function(response) {
          console.log(response)
        },
        function(error) {
          console.log(error);
        }
      )
    }
  };

}])

.controller('ContactUsController', ["$scope", "ContactusService", function($scope, ContactusService) {
  var schoolId = window.localStorage.getItem('schoolId');
  console.log(schoolId);
  $scope.getSchoolContact = function() {
    ContactusService.contactUs(schoolId).then(
      function(response) {
        $scope.schoolDetails = response.data.schoolDetails[0];
      },
      function(error) {
        console.log(error);
      }
    )
  };

  $scope.getSchoolContact();

}])



/*
,
"proxies": [
  {
    "path": "/webservices",
    "proxyUrl": "http://www.frobelsedu.com/webservices"
  }
]

*/
