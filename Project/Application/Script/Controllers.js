
app.controller("IndexCtrl", function ($scope, $cookies, templateService) {
    function init() {
        $scope.Constant = {
            Title: "Index Page",
            Description: "Purchase Template Page"
        }
    }
    init();
});

app.controller("HomeCtrl", function ($scope, $cookies, templateService) {
    function init() {
        $scope.Constant = {
            Title: "ET Store for Bootstrap",
            Description: "ET Store is an online web template store. Here we sell industry standard Web Page templates. Click View Template to see the Templates."
        }
        $scope.active = "Home";
    }
    init();
});

app.controller("ContactCtrl", function ($scope, $cookies, templateService) {
    function init() {
        $scope.Constant = {
            Title: "Contact Us",
            Description: "Please contact Admin@etstore.com incase of any queries or concerns."
        }
        $scope.active = "Contact";
    }
    init();
});

app.controller("AboutCtrl", function ($scope, $cookies, templateService) {
    function init() {
        $scope.Constant = {
            Title: "About Us",
            Description: "Purchase Template Page"
        }
        $scope.active = "About";
    }
    init();
});

app.controller("TemplateListCtrl", function ($scope, $cookies, templateService) {
    function init() {
        $scope.Constant = {
            Title: "Home Page",
            Description: "Purchase Template Page"
        }

        $scope.active = "Template";
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