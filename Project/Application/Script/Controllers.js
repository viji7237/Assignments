
app.controller("IndexCtrl", function ($scope, $cookies, templateService, $routeParams, $route, $location, DataManagementService) {
    var success = function (data) {
        $scope.IsUserLoggedIn = data != undefined;
        $scope.User = data;
    }
    var failure = function (data) {
        $scope.IsUserLoggedIn = false;
    }

    $scope.path = "/";

    $scope.Logout = function () {

        DataManagementService.Logout(function (data) {
            $scope.IsUserLoggedIn = false;
            $scope.User = null;
            $location.path($scope.path);
        },
        function (data) {
        });
    }
    DataManagementService.IsUserLoggedIn(success, failure);
});

app.controller("HomeCtrl", function ($scope, $cookies, $routeParams, $route, $location, userService) {
    function init() {
        $scope.Constant = {
            Title: "ET Store for Bootstrap",
            Description: "ET Store is an online web template store. Here we sell industry standard Web Page templates. Click View Template to see the Templates."
        }
        $scope.$parent.active = 'Home';

        $scope.$parent.path = $location.path();

    }
    init();
});

app.controller("LoginCtrl", function ($scope, $cookies, $routeParams, $route, $location, templateService, userService) {
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

    $scope.Cancel = function () {
        $location.path($scope.$parent.path);
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
                $location.path($scope.$parent.path);
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

app.controller("EditUserCtrl", function ($scope, $cookies, $routeParams, $route, $location, templateService, userService, cartService, orderService, DataManagementService) {
    function init() {
        $scope.Constant = {
            Title: "Update User Info",
            Description: ""
        }

        $scope.User = {
            Id: null,
            Email: null,
            Password: null,
            Name: null,
            CreatedDate: null
        };
        $scope.Response = {
            Message: "",
            Status: 'Successful'
        };
        $scope.$parent.active = 'Update User';

        $scope.setUserDetails();
    }

    $scope.setUserDetails = function () {
        DataManagementService.IsUserLoggedIn(function (data) {
            $scope.User = data;
            console.log(data);
        }, function (data) {
        });
    }

    $scope.CancelItem = function (item) {

        cartService.DeleteItemInCart(item.id,
            function (data) {
                userService.ResetSession(
                         data.Email,
                         function (data) {
                             $scope.User = data;
                         },
                         function (data) {
                         });
            },
            function (data) {
            });
    }

    $scope.BuyItem = function (item) {

        var dateObj = new Date();
        var createdDate = dateObj.getMonth() + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();

        var success = function (data) {
            cartService.DeleteItemInCart(item.id,
                function (data) {
                    userService.ResetSession(
                             data.Email,
                             function (data) {
                                 $scope.User = data;
                             },
                             function (data) {
                             });
                },
                function (data) {
                });
        }

        orderService.AddOrder($scope.User.id, item.template.id, item.template.Price, createdDate, item.template.Name, item.template.DownloadUrl, success, function (data) { });
    }

    init();
});

app.controller("RegisterCtrl", function ($scope, $cookies, $routeParams, $route, $location, templateService, userService) {
    function init() {
        $scope.Constant = {
            Title: "Register",
            Description: ""
        }
        var _date = new Date();
        $scope.User = {
            Email: null,
            Password: null,
            Name: null,
            CreatedDate: _date.getMonth() + "/" + _date.getDate() + "/" + _date.getFullYear()
        };
        $scope.Response = {
            Message: "",
            Status: 'Successful'
        };
        $scope.$parent.active = 'Sign Up';
    }

    $scope.Cancel = function () {
        $location.path($scope.$parent.path);
    }

    $scope.RegisterUser = function () {
        var success = function (data) {
            if (data == undefined) {
                $scope.Response.Message = "Please enter valid registration details.";
                $scope.Response.Status = 'Failed';
                $scope.$parent.IsUserLoggedIn = false;
                $scope.$parent.User = null;
            } else {
                $scope.Response.Message = "";
                $scope.Response.Status = 'Successful';
                $scope.$parent.IsUserLoggedIn = true;
                $scope.$parent.User = data;
                console.log(data);
                $location.path($scope.$parent.path);
            }
        }
        var failure = function (data) {
            $scope.Response.Message = "Please enter valid Registration details.";
            $scope.Response.Status = 'Failed';
        }

        userService.Register($scope.User, success, failure);
    }

    init();
});

app.controller("ContactCtrl", function ($scope, $cookies, $routeParams, $route, $location, templateService) {
    function init() {
        $scope.Constant = {
            Title: "Contact Us",
            Description: "Please contact Admin@etstore.com incase of any queries or concerns."
        }
        $scope.$parent.active = 'Content';
        $scope.$parent.path = $location.path();
    }
    init();
});

app.controller("AboutCtrl", function ($scope, $cookies, $routeParams, $route, $location, templateService) {
    function init() {
        $scope.Constant = {
            Title: "About Us",
            Description: "Purchase Template Page"
        }
        $scope.$parent.active = "About";
        $scope.$parent.path = $location.path();

    }
    init();
});

app.controller("TemplateListCtrl", function ($scope, $cookies, $routeParams, $route, $location, templateService) {
    function init() {
        $scope.Constant = {
            Title: "Home Page",
            Description: "Purchase Template Page"
        }

        $scope.$parent.active = "Template";
        $scope.Items = [];
        $scope.$parent.path = $location.path();

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

app.controller("TemplateCtrl", function ($scope, $cookies, $routeParams, $route, $location, templateService, userService) {
    function init() {
        $scope.Constant = {
            Title: "Template Page",
            Description: "Purchase Template Page"
        }

        $scope.active = "Template";
        $scope.Item = [];
        $scope.$parent.path = $location.path();

        var user = $cookies.getObject("user");

        templateService.getTemplateById($routeParams.id,
        	function (data) {
        	    $scope.Item = data;
        	    $scope.Item.ShowDownload = false;

        	    if (user != undefined) {
        	        var result = user.orders.find(function (item) {
        	            return item.TemplateID == $scope.Item.id;
        	        });

        	        if (result != undefined) {
        	            $scope.Item.ShowDownload = true;
        	        }
        	    }

        	},
	        function (failed) {
	            console.log(failed);
	        });
    }

    init();
});

app.controller("CartCtrl", function ($scope, $cookies, $routeParams, $route, $location, templateService, cartService, userService, orderService) {
    function init() {
        $scope.Constant = {
            Title: "Template Page",
            Description: "Purchase Template Page"
        }

        $scope.active = "Template";
        $scope.Item = [];
        $scope.$parent.path = $location.path();

        var success = function (data) {
            if (data == undefined) {
                $location.path("/login");
            }
            else {
                var dateObj = new Date();
                var createdDate = dateObj.getMonth() + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();

                var addItemFlag = false;
                var itemInOrder = data.orders.find(function (item) {
                    return item.TemplateID == $routeParams.id;
                });

                addItemFlag = itemInOrder != undefined || itemInOrder != null;

                if (!addItemFlag) {
                    var itemInCart = data.cartitems.find(function (item) {
                        return item.TemplateID == $routeParams.id;
                    });

                    addItemFlag = itemInCart != undefined || itemInCart != null;
                }
                if (!addItemFlag) {
                    cartService.AddItemToCart(
                        data.id,
                        $routeParams.id,
                        createdDate,
                        function (success) {
                            userService.ResetSession(
                                data.Email,
                                function (data) {
                                    $scope.CartItems = data.cartitems;
                                },
                                function (data) {
                                });
                        },
                        function (failure) {
                        });
                } else {
                    $scope.CartItems = data.cartitems;
                }
            }
        }
        var failure = function (data) {
            $location.path("/login");
        }

        userService.IsUserLoggedIn(success, failure);
    }

    $scope.CancelItem = function (item) {

        cartService.DeleteItemInCart(item.id,
            function (data) {
                userService.ResetSession(
                         data.Email,
                         function (data) {
                             $scope.CartItems = data.cartitems;
                         },
                         function (data) {
                         });
            },
            function (data) {
            });
    }

    $scope.BuyItem = function (item) {

        var dateObj = new Date();
        var createdDate = dateObj.getMonth() + "/" + dateObj.getDate() + "/" + dateObj.getYear();

        var success = function (data) {
            cartService.DeleteItemInCart(item.id,
                function (data) {
                    userService.ResetSession(
                             data.Email,
                             function (data) {
                                 $location.path("/userdata")
                             },
                             function (data) {
                             });
                },
                function (data) {
                });
        }

        orderService.AddOrder($scope.User.id, item.template.id, item.template.Price, createdDate,item.template.Name, item.template.DownloadUrl, success, function (data) { });

    }

    init();
});