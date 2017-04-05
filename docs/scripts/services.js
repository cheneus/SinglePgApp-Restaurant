'use strict';

angular.module('confusionApp')

    .constant("baseURL", "https://cheneus.github.io/SinglePgApp-Restaurant/")
    .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        // ];

        // this.getDishes = function() {

        //     return dishes;

        // };

        // this.getDish = function(index) {

        //     return dishes[index];
        // };
        this.getDishes = function() {
            return $resource(baseURL + "dishes/:id", null, { 'update': { method: 'PUT' } });
        // .update is introduce >>>>>> so as method put to ease coding.
        };

        this.getPromotion = function() {
            return $resource(baseURL + "promotions/:id", null, { 'update': { method: 'PUT' } });
        };
        // implement a function named getPromotion
        // that returns a selected promotion.


    }])

.factory('corporateFactory', ['$resource', 'baseURL',function($resource, baseURL) {

    var corpfac = {};


    corpfac.getLeaders = function() {
        return $resource(baseURL + "leadership/:id", null, { 'update': { method: 'PUT' } });
    };
    return corpfac;
    // Implement two functions, one named getLeaders,
    // the other named getLeader(index)
    // Remember this is a factory not a service


}])

.service('feedbackService', ['$resource', function($resource) {

     this.getFeedback = function() {
            return $resource( "http://localhost:3000/feedback/:id", null, { 'update': { method: 'PUT' } });
        // .update is introduce >>>>>> so as method put to ease coding.
        };

}])
