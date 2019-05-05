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


////////////////////////////////Filter////////////////////////////////////////////
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


///////////////////////////////////Restrict/////////////////////////////////////////

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



/////////////////////////////////Template///////////////////////////////////////////

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

///////////////////////////////////Transclude TRUE/////////////////////////////////////////
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



//////////////////////////////////Template URL//////////////////////////////////////////
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


//////////////////////////////////Template cache//////////////////////////////////////////
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

////////////////////////////////////Angular Scope false////////////////////////////////////////
app.controller('controllerScopeFalse', function($scope) {
	$scope.bookForScope =  [{id: 1, name: 'AngularJS'}, {id: 2, name: 'Angular'}, {id: 3, name: 'ViewJS'}];
	$scope.getBooks = function() {
		return $scope.bookForScope;
	}
});

app.directive('scopeFalse', function() {
	return {
		scope: false,
		restrict: 'E',
		template: "<div ng-repeat='bookmark in getBooks() '><p>{{bookmark.id}}</p><p>{{bookmark.name}}</p></div>",
		link: function(scope, element, attrs) {
			var books = scope.getBooks();
			books[1] = {id: 4, name: 'Change book name from Angular to Scope in directive'};
		
		}
	}
});

//////////////////////////////////////Angular Scope true//////////////////array is changed, but should not if scope is set to true////////////////////
app.controller('controllerScopeTrue', function($scope) {
	$scope.bookForScopeTrue =  [{id: 1, name: 'AngularJS'}, {id: 2, name: 'Angular'}, {id: 3, name: 'ViewJS'}];
	$scope.name = "Harry";
	$scope.getBooks = function() {
		return $scope.bookForScopeTrue;
	}
	console.log('scope form controller', $scope.bookForScopeTrue[1].name);

	$scope.getResultScope = function() {
		console.log('scope form controller', $scope.bookForScopeTrue[1].name);
	}
});

app.directive('scopeTrue', function() {
	
	return {
		scope: true,
		restrict: 'E',
		template: "<div>Name from directive {{name}}<input type='text', ng-model='name'></div><div>Books {{bookForScopeTrue}}<input type='text', ng-change='getResult()', ng-model='$parent.bookForScopeTrue[1].name'></div>",
		link: function(scope, element, attrs) {
			console.log('scope form directive', scope);
		 	scope.getResult = function() {
				console.log('scope form directive', scope.bookForScopeTrue[1].name);
				console.log('PARENT scope form directive', this.$parent.bookForScopeTrue[1].name);
			}
		}
	}
});


//////////////////////////////////////Angular Isolated Scope//////////////////////////////////////
app.controller('controllerIsolatedScope', function($scope) {
	$scope.bookForIsolatedScope =  [{id: 1, name: 'AngularJS'}, {id: 2, name: 'Angular'}, {id: 3, name: 'ViewJS'}];
	$scope.name = "Harry";
	$scope.getBooks = function() {
		console.log('inside getBooks function');
		return $scope.bookForIsolatedScope;
	}

	$scope.writetoconsole = function() {
		console.log('inside getBooks function');
	}

	console.log('scope form controller', $scope.bookForIsolatedScope[1].name);

	$scope.getResultScope = function() {
		console.log('scope form controller', $scope.bookForIsolatedScope[1].name);
	}
});

app.directive('scopeIsolated', function() {
	
	return {
		scope: {
			bookForIsolatedScope: '@',
			writetoconsole: '&',
			name: '='
		},
		restrict: 'E',
		template: "<div><div>Name from directive {{name}}<input type='text', ng-model='name'></div>" + 
		"<div>Books {{bookForIsolatedScope}}<input type='text', ng-change='getResult()', ng-model='bookForIsolatedScope[1].name'></div>" + 
		"<div><button ng-click='writetoconsole()'>writeToConsoleFromDirective</buttorn></div>",
		link: function(scope, element, attrs) {
			console.log('scope form directive', scope);
		 	scope.getResult = function() {
				console.log('scope form directive', scope.bookForIsolatedScope[1].name);
				console.log('PARENT scope form directive', this.$parent.bookForIsolatedScope[1].name);
				scope.writetoconsole();
			}
		}
	}
});

//////////////////////////////////////Angular Transclude Element//////////////////////////////////////
app.directive('wrapIn', function($templateCache) {
	return {
		restrict : 'A',
		transclude: 'element',
		template: 'template = text from directive ',
		link: function(scope, element, attrs, ctrl, transclude) {
			var template = $templateCache.get(attrs.wrapIn);
			var templateElement = angular.element(template);
			transclude(scope, function(clone) {
				element.after(templateElement.append(clone));
			});
		}
	};
});