var app = angular.module("ETApp", ['ETServices','ngCookies']);

app.controller("Home", function ($scope, $cookies, templateService) {

    function init() {
        $scope.Constant = {
            Title: "Home Page",
            Description: "Purchase Template Page"
        }

        $scope.Items = [];

        templateService.getAllTemplates(
        	function(data)
	    	{
	    		$scope.Items = data;
	    		console.log(data);
	        },
	        function(failed)
	        {
	        	console.log(failed);
	        });
    }

    init();

});

app.directive('templateList',
	function()
	{
		var   obj = {};
        obj.scope = {
        	items:"=templates"
    	};
        obj.templateUrl="HtmlTemplate/TemplateList.html";
	    obj.link = function ($scope, element, attribute) {};
		return obj;
    });

app.directive('pageMenu',
	function()
	{
		var   obj = {};
        obj.templateUrl="HtmlTemplate/Menu.html";
	    obj.link = function ($scope, element, attribute) {};
		return obj;
    });