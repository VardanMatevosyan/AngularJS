var app = angular.module('app', []);
app.controller("contDiv", function($scope) {
$scope.contrButton = "new";
});
////////////////////////////////////////////////////////////////////////////
app.controller("parrent", function($scope) {
$scope.showMsg = function() {
console.log("This is parrent child");
};
});

////////////////////////////////////////////////////////////////////////////
app.controller("firstChild", function($scope) {
$scope.showMsg = function() {
console.log("This is frst child");
};
});

////////////////////////////////////////////////////////////////////////////
app.controller("secondChild", function($scope) {

});

////////////////////////////////////////////////////////////////////////////
app.directive("direct", function() {
return {
	link : function(scope, element, attrs) {
		element.on('click', function () {
			if (element.text() === 'directive') {
				element.text('click');
			} else {
				element.text('directisve');
			}
			console.log("scope", scope);
			console.log("element", element);
			console.log("attrs", attrs);
			console.log("my attribute", attrs.attrs);
		});

	}
}
});


////////////////////////////////////////////////////////////////////////////
app.controller("filterContr", function($scope) {
	$scope.money1 = '1.12$';
	$scope.money2 = '$2.24';
	$scope.money3 = '5.52';
});


app.filter("filterMOney", function() {
	return function(str) {
	var firstChar = str.slice(0, 1);
	var lastChar = str.slice(str.length - 1, str.length);
	if (firstChar === '$') {
		var str = str.slice(1, str.length - 1);
		return  str + "$";
	} else if (lastChar === '$') {
		return str;
	} else {
		return str + "$";
	}
	}
});


////////////////////////////////////////////////////////////////////////////

app.directive("direct", function() {
	return  {
		restrict : 'AECM',
		link : function(scope, element, attrs) {
			element.on('click', function () {
				if (element.text(). includes( 'directive')) {
					element.text('click');
				} else {
					element.text('directive');
				}
				console.log("direct");
				console.log("scope", scope);
				console.log("element", element);
				console.log("attrs", attrs);
		
			});
		}
	}
});



////////////////////////////////////////////////////////////////////////////

app.directive("temp", function() {
var bookmarks = [{id: 1, name: 'AngularJS'}, {id: 2, name: 'Angular'}, {id: 2, name: 'ViewJS'}];
	return  {
		restrict : 'AECM',
		template: "<div ng-repeat='bookmark in directBookMarks'><p>{{bookmark.id}}</p><p>{{bookmark.name}}</p></div>",
		link: function(scope, element, attrs) {
			scope.directBookMarks = bookmarks;
		}
	};
});

////////////////////////////////////////////////////////////////////////////
app.controller('controllerForTransclude', function($scope) {
	$scope.name = 'Variable from controller';
});

app.directive('tran', function() {
	return {
		restrict : 'E',
		transclude: true,
		template: 'template = text from directive ',
		link: function(scope, element, attrs, ctrl, transclude) {
			transclude(scope, function(clone, scope) {
				element.append(clone);
			});
		}
	};
});



////////////////////////////////////////////////////////////////////////////
app.directive('urlTemp', function() {
var bookmarks = [{id: 1, name: 'AngularJS'}, {id: 2, name: 'Angular'}, {id: 3, name: 'ViewJS'}];
	return {
		restrict : 'E',
		templateUrl: 'bookmarks.html',
		link: function(scope, element, attrs) {
			scope.bookmarks = bookmarks;
		}
	};
});


////////////////////////////////////////////////////////////////////////////
app.directive('cache', function($templateCache) {
var bookmarksCache = [{id: 1, name: 'AngularJS'}, {id: 2, name: 'Angular'}, {id: 3, name: 'ViewJS'}];
	return {
		restrict : 'E',
		templateUrl: 'bookmarksCache.html',
		link: function(scope, element, attrs) {
			scope.bookmarksCache = bookmarksCache;
		}
	};
});

app.run(function($templateCache) {
	$templateCache.put('bookmarksCache.html', 
		"<div ng-repeat='bookmarkCache in bookmarksCache'>{{bookmarkCache.id}} - {{bookmarkCache.name}}<br></div>");
});

////////////////////////////////////////////////////////////////////////////

