var app = angular.module("ETApp", ['ETServices','ngCookies']);

app.controller("Home", function ($scope, $cookies, templateService, userService) {

    function init() {
        $scope.Constant = {
            Title: "Home Page",
            Description: "Purchase Template Page"
        }

        var testdata = $cookies.get('test');

        templateService.getTemplateById('1fdef11624d249c7',
        	function(data)
	    	{
	    		console.log(data);
	        },
	        function(failed)
	        {
	        	console.log(failed);
	        });

       /* templateService.getAllTemplates(
	    	function(data)
	    	{
	        	console.log("Successful Data : " +data);
	        },
	        function(failed)
	        {
	        	console.log("Failure Data : " + failed);
	        }
        );
		*/




    }

    init();

});
