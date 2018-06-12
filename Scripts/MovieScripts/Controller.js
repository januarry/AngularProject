app.controller("AngularCRUDCtrl", function ($scope, AngularCRUDSvc) {
    $scope.divMovie = false;
    GetAllMovies();
    
    function GetAllMovies() {
        debugger;
        var getMovieData = AngularCRUDSvc.getMovies();
        getMovieData.then(function (movie) {
            $scope.movies = movie.data;
        }, function () {
            alert("Error in getting movie records");
        });
    }

    $scope.editMovie = function (movie) {
        var getMovieData = AngularCRUDSvc.getMovie(movie.Id);
        getMovieData.then(function (_movie) {
            debugger;
            $scope.movie = _movie.data;
            $scope.movieId = movie.Id;
            $scope.movieTitle = movie.Title;
            //$scope.movieReleaseDate = movie.ReleaseDate;
            $scope.moviePrice = movie.Price;
            $scope.movieGenre = movie.Genre;
            $scope.movieRating = movie.Rating;
            $scope.Action = "Update";
            $scope.divMovie = true;
        }, function () {
            alert("Error in getting movie records");
        });
    };

    $scope.addUpdateMovie = function () {
        var Movie = {
            Title: $scope.movieTitle,
            ReleaseDate: $scope.movieReleaseDate,
            Genre: $scope.movieGenre,
            Price: $scope.moviePrice,
            Rating: $scope.movieRating
        };
        debugger;
        var getMovieAction = $scope.Action;
        if (getMovieAction == "Update") {
            Movie.Id = $scope.movieId;
            var getMovieData = AngularCRUDSvc.updateMovie(Movie);
            getMovieData.then(function (msg) {
                GetAllMovies();
                alert(msg.data);
                $scope.divMovie = false;
            }, function () {
                alert("Error in updating movie record");
            });
        } else {
            var getMovieData = AngularCRUDSvc.addMovie(Movie);
            getMovieData.then(function (msg) {
                GetAllMovies();
                alert(msg.data);
                $scope.divMovie = false;
            }, function () {
                alert("Error in adding movie record");
            });
        }
    }

    $scope.addMovieDiv = function () {
        ClearFields();
        $scope.Action = "Add";
        $scope.divMovie = true;
    };

    $scope.deleteMovie = function (movie) {
        var getMovieData = AngularCRUDSvc.deleteMovie(movie.Id);
        getMovieData.then(function (msg) {
            alert(msg.data);
            GetAllMovies();
        }, function () {
            alert("Error in deleting movie record");
        });
    };

    function ClearFields() {
        $scope.movieId = "";
        $scope.movieTitle = "";
        $scope.movieGenre = "";
        $scope.movieReleaseDate = "";
        $scope.moviePrice = "";
        $scope.movieRating = "";
    };

    $scope.Cancel = function () {
        $scope.divMovie = false;
    };

});