
//Service Module
var serviceModule = angular.module("ETServices", ["ngResource", "ngCookies"]);

//Api References
serviceModule.constant("templateApi", "http://localhost:2403/template");
serviceModule.constant("userApi", "http://localhost:2403/user");
serviceModule.constant("cartApi", "http://localhost:2403/cart");
serviceModule.constant("orderApi", "http://localhost:2403/order");

// Template Service Defenitions
serviceModule.factory("templateService",
	function ($resource, templateApi) {
	    var resource = $resource(templateApi);

	    return {
	        getAllTemplates: function (success, failure) {
	            resource.query(success, failure);
	        },
	        getTemplateById: function (id, success, failure) {
	            resource.get({ id: id }, success, failure);
	        }
	    };
	});

// User Service Defenitions
serviceModule.factory("userService",
    function ($resource, userApi, DataManagementService) {
        var resource = $resource(userApi, null, {
            'get': {
                method: 'GET',
                isArray: true
            }, 'update': {
                method: 'PUT', params: { id: '@id' }
            }
        });

        return {
            Register: function (user, success, failure) {
                resource.save({
                    Email: user.Email,
                    Password: user.Password,
                    Name: user.Name,
                    CreatedDate: user.CreatedDate
                }, function (user) {
                    DataManagementService.Login(user, success, failure);
                }, failure);
            },
            Update: function (user, success, failure) {
                resource.update({
                    id: user.Id,
                    Email: user.Email,
                    Password: user.Password,
                    Name: user.Name,
                    CreatedDate: user.CreatedDate
                }, function (user) {
                    DataManagementService.Login(user, success, failure);
                }, failure);
            },
            Login: function (email, password, success, failure) {
                var callbackSuccess = function (user, success, failure) {
                    DataManagementService.Login(user, success, failure);
                }

                resource.get({ Email: email, Password: password }, function (data) {
                    if (data.length > 0) {
                        DataManagementService.Login(data[0], success, failure);
                    } else {
                        failure("No Matching Data Found.");
                    }

                }, failure);

            },
            ResetSession: function (email, success, failure) {
                var callbackSuccess = function (user, success, failure) {
                    DataManagementService.Login(user, success, failure);
                }

                resource.get({ Email: email }, function (data) {
                    if (data.length > 0) {
                        DataManagementService.Login(data[0], success, failure);
                    } else {
                        failure("No Matching Data Found.");
                    }

                }, failure);

            },
            Logout: function (success, failure) {
                DataManagementService.Logout(success, failure);
            },
            IsUserLoggedIn: function (success, failure) {
                DataManagementService.IsUserLoggedIn(success, failure);
            },
            VerifyEmail: function (email, success, failure) {
                resource.get({ Email: email }, success, failure);
            }
        };
    });

// Cart Service Defenitions
serviceModule.factory("cartService",
	function ($resource, cartApi) {
	    var resource = $resource(cartApi);

	    return {
	        AddItemToCart: function (userId, templateID, createdDate, success, failure) {
	            resource.save({ UserID: userId, TemplateID: templateID, CreatedDate: createdDate }, success, failure);
	        },
	        GetIUserCartItems: function (userId, success, failure) {
	            resource.get({ UserId: userId }, success, failure);
	        },
	        DeleteItemInCart: function (id, success, failure) {
	            resource.delete({ id: id }, success, failure);
	        }
	    };
	});

// Order Service Defenitions
serviceModule.factory("orderService",
	function ($resource, orderApi) {
	    var resource = $resource(orderApi);

	    return {
	        AddOrder: function (userID, templateID, price, purchaseDate, name, downloadUrl, success, failure) {
	            resource.save({ UserID: userID, TemplateID: templateID, Price: price, PurchasedDate: purchaseDate, OrderStatus:'Successful', Name:name, DownloadUrl:downloadUrl }, success, failure);
	        },
	        GetUserOrders: function (userId, success, failure) {
	            resource.get({ UserId: userId }, success, failure);
	        },
	        GetOrderById: function (Id, success, failure) {
	            resource.get({ Id: Id }, success, failure);
	        }
	    };
	});


// User Data Management Service
// Remark : Sometime the cookie feature wont work in chrome, in that case try using different browser's other than chrome.
serviceModule.factory("DataManagementService",
	function ($cookies) {
	    var checkLoginData = function () {
	        return $cookies.getObject("user");
	    };

	    return {
	        Login: function (user, success, failure) {
	            try {
	                var loggedInUser = checkLoginData();
	                if (loggedInUser != undefined) {
	                    $cookies.remove("user", user);
	                }
	                $cookies.putObject("user", user);
	                success(user);
	            }
	            catch (e) {
	                var failureData = {
	                    Message: 'Couldn\'t Save User information in Cookie'
	                };
	                failure(failureData);
	            }
	        },
	        Logout: function (success, failure) {
	            var Data = { Message: 'LoggedOut Successfully' };
	            try {
	                $cookies.remove("user");
	                success(Data);
	            }
	            catch (e) {
	                Data.Message = 'Couldn\'t Remove User information from Cookie';
	                failure(Data);
	            }
	        },
	        IsUserLoggedIn: function (success, failure) {
	            try {
	                var loggedInUser = checkLoginData();
	                success(loggedInUser);
	            }
	            catch (err) {
	                failure(err);
	            }
	        }

	    };
	});

