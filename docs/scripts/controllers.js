'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;

    $scope.showMenu = true;
    $scope.message = "Loading ...";
    menuFactory.getDishes().query(
        function(response) {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });


    $scope.select = function(setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function(checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };
}])

.controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };

    var channels = [{ value: "tel", label: "Tel." }, { value: "Email", label: "Email" }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

}])

.controller('FeedbackController', ['$scope', '$resource', 'feedbackService', function($scope, $resource, feedbackService) {

    console.log($scope.feedback);
    $scope.sendFeedback = function() {
        if ($scope.feedback.agree && ($scope.feedback !== "")) {
            console.log($scope.feedback);
            feedbackService.getFeedback().save($scope.feedback);
            $scope.invalidChannelSelection = false;
            $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: "", email: "" };
            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        } else if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
            // } else {
            //     $scope.invalidChannelSelection = false;
            //     $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: "", email: "" };
            //     $scope.feedback.mychannel = "";
            //     $scope.feedbackForm.$setPristine();
            //     console.log($scope.feedback);
            //     // return $resource(baseURL + "dishes/:id", null, { 'update': { method: 'PUT' } });

        }
    }

}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

    $scope.dish = {};
    $scope.showDish = false;
    $scope.message = "Loading ...";
    $scope.dish = menuFactory.getDishes().get({ id: parseInt($stateParams.id, 10) })
        .$promise.then(
            function(response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
}])

.controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

    $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };

    $scope.submitComment = function() {
        $scope.mycomment.date = new Date().toISOString();
        console.log($scope.mycomment);
        $scope.dish.comments.push($scope.mycomment);

        menuFactory.getDishes().update({ id: $scope.dish.id }, $scope.dish);
        $scope.commentForm.$setPristine();
        $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };
    }
}])

// implement the IndexController and About Controller here
.controller('IndexController', ['$scope', '$stateParams', 'menuFactory', 'corporateFactory', function($scope, $stateParams, menuFactory, corporateFactory) {

    // $scope.promotions = menuFactory.getPromotion();

    $scope.showDish = true;
    $scope.message = "Loading ...";
    $scope.dish = menuFactory.getDishes().get({ id: 0 })
        .$promise.then(
            function(response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.leadership = corporateFactory.getLeaders().get({ id: 3 })
        .$promise.then(
            function(response) {
                $scope.leadership = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.promotions = menuFactory.getPromotion().get({ id: 0 })
        .$promise.then(
            function(response) {
                $scope.promotions = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    // $scope.leader = corporateFactory.getLeader(3);


}])

.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

    $scope.message = "Loading ...";
    // $scope.leadership = corporateFactory.getLeaders();
    corporateFactory.getLeaders().query(
        function(response) {
            $scope.leadership = response;
            // $scope.showMenu = true;
        },
        function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
}])

;
