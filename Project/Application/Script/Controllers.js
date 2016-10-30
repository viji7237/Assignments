
app.controller("IndexCtrl", function ($scope, $cookies, templateService, DataManagementService) {
    var success = function (data) {
        $scope.IsUserLoggedIn = data != undefined;
        $scope.User = data;
    }
    var failure = function (data) {
        $scope.IsUserLoggedIn = false;
    }
    DataManagementService.IsUserLoggedIn(success, failure);
});

app.controller("HomeCtrl", function ($scope, $cookies, templateService) {
    function init() {
        $scope.Constant = {
            Title: "ET Store for Bootstrap",
            Description: "ET Store is an online web template store. Here we sell industry standard Web Page templates. Click View Template to see the Templates."
        }
        $scope.$parent.active = 'Home';

    }
    init();
});

app.controller("LoginCtrl", function ($scope, $cookies, templateService, userService) {
    function init() {
        $scope.Constant = {
            Title: "Login",
            Description: ""
        }
        $scope.Login = {
            Email: null,
            Password: null
        };
        $scope.Response = {
            Message: "",
            Status: 'Successful'
        };
        $scope.$parent.active = 'Sign In';
    }

    $scope.LoginUser = function () {
        var success = function (data) {
            if (data == undefined) {
                $scope.Response.Message = "Please enter valid Login details.";
                $scope.Response.Status = 'Failed';
                $scope.$parent.IsUserLoggedIn = false;
                $scope.$parent.User = null;
            } else {
                $scope.Response.Message = "";
                $scope.Response.Status = 'Successful';
                $scope.$parent.IsUserLoggedIn = true;
                $scope.$parent.User = data;
                console.log(data);
            }
        }
        var failure = function (data) {
            $scope.Response.Message = "Please enter valid Login details.";
            $scope.Response.Status = 'Failed';
        }
        userService.Login($scope.Login.Email, $scope.Login.Password, success, failure);
    }

    init();
});

app.controller("ContactCtrl", function ($scope, $cookies, templateService) {
    function init() {
        $scope.Constant = {
            Title: "Contact Us",
            Description: "Please contact Admin@etstore.com incase of any queries or concerns."
        }
        $scope.$parent.active = 'Content';
    }
    init();
});

app.controller("AboutCtrl", function ($scope, $cookies, templateService) {
    function init() {
        $scope.Constant = {
            Title: "About Us",
            Description: "Purchase Template Page"
        }
        $scope.$parent.active = "About";
    }
    init();
});

app.controller("TemplateListCtrl", function ($scope, $cookies, templateService) {
    function init() {
        $scope.Constant = {
            Title: "Home Page",
            Description: "Purchase Template Page"
        }

        $scope.$parent.active = "Template";
        $scope.Items = [];

        templateService.getAllTemplates(
        	function (data) {
        	    $scope.Items = data;
        	    console.log(data);
        	},
	        function (failed) {
	            console.log(failed);
	        });
    }
    init();
});

app.controller("TemplateCtrl", function ($scope, $cookies, $routeParams, $route, $location, templateService) {
    function init() {
        $scope.Constant = {
            Title: "Template Page",
            Description: "Purchase Template Page"
        }

        $scope.active = "Template";
        $scope.Item = [];

        templateService.getTemplateById($routeParams.id,
        	function (data) {
        	    $scope.Item = data;
        	    console.log(data);
        	},
	        function (failed) {
	            console.log(failed);
	        });
    }
    init();
});