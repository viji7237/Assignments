app.directive('templateList',
	function () {
	    var obj = {};
	    obj.scope = {
	        items: "=templates"
	    };
	    obj.templateUrl = "HtmlTemplate/TemplateList.html";
	    obj.link = function ($scope, element, attribute) { };
	    return obj;
	});

app.directive('templateItem',
	function () {
	    var obj = {};
	    obj.scope = {
	        item: "=templateitem"
	    };
	    obj.templateUrl = "HtmlTemplate/Template.html";
	    obj.link = function ($scope, element, attribute) { };
	    return obj;
	});

app.directive('pageMenu',
	function () {
	    var obj = {};
	    obj.templateUrl = "HtmlTemplate/Menu.html";
	    obj.link = function ($scope, element, attribute) {
	    };
	    return obj;
	});

app.directive('loginRegister', function (DataManagementService) {
    var obj = {};
    obj.templateUrl = "HtmlTemplate/Login.html";
    obj.link = function ($scope, element, attribute) {

    };
    return obj;
});


app.directive('loggedinUser', function (DataManagementService) {
    var obj = {};
    obj.templateUrl = "HtmlTemplate/LoggedIn.html";
    obj.link = function ($scope, element, attribute) {

    };
    return obj;
});