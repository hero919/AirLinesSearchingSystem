/**
 * Created by zeqingzhang on 1/16/16.
 */

    console.log("This is the message");
var app = angular.module("movieApp",[]);

var movies = [{title:"Avatar01", year:"2009", rating:"PG-13", plot:"Come cool blue guys"},
    {title:"Avatar02", year:"2009", rating:"PG-13", plot:"Come cool blue guys"},
    {title:"Avatar03", year:"2009", rating:"PG-13", plot:"Come cool blue guys"},
    {title:"Avatar04", year:"2009", rating:"PG-13", plot:"Come cool blue guys"}]

app.controller("listController",function($scope){
    //alert("This is the alert");
    $scope.hello = "Hello From Controller";
    $scope.movies = movies;

    $scope.remove = function(movie){

        var index = $scope.movies.indexOf(movie);


        $scope.movies.splice(index,1);

    }

    $scope.add = function(){

        $scope.movies.push($scope.movie);
    }

    $scope.update = function(movie2){
        var index = movies.indexOf(movie2);
        movies[index] = $scope.movie;


    }

    $scope.edit = function(movie1){

        console.log(movie1);
        $scope.movie = movie1;




    }

})

