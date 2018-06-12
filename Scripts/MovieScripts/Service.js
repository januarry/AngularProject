app.service("AngularCRUDSvc",function ($http) {
    this.getMovies = function () {
        return $http.get("/AngularHome/GetAllMovies");
    };

    this.getMovie = function (movieId) {
        return $http({
            method: "post",
            url: "/AngularHome/GetMovieById",
            params: {
                id: JSON.stringify(movieId)
            }
        });
    };

    this.updateMovie = function (movie) {
        var response = $http({
            method: "post",
            url: "/AngularHome/UpdateMovie",
            data: JSON.stringify(movie),
            dataType:"json"
        });
        return response;
    };

    this.addMovie = function (movie) {
        var response = $http({
            method: "post",
            url: "/AngularHome/AddMovie",
            data: JSON.stringify(movie),
            dataType:"json"
        });
        return response;
    };

    this.deleteMovie = function (movieId) {
        var response = $http({
            method: "post",
            url: "/AngularHome/DeleteMovie",
            params: {
                movieId: JSON.stringify(movieId)
            }
        });
        return response;
    };
});