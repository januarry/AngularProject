using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AngularProject.Models;
using System.Data.Entity;

namespace AngularProject.Controllers
{
    public class AngularHomeController : Controller
    {

        //
        // GET: /AngularHome/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetAllMovies()
        {
            using (MoviesEntities entity = new MoviesEntities())
            {
                var movieList = entity.Movies.ToList();
                return Json(movieList, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetMovieById(string id)
        {
            using (MoviesEntities entity = new MoviesEntities())
            {
                var movieId = Convert.ToInt32(id);
                var searchMovie = entity.Movies.Find(movieId);
                return Json(searchMovie, JsonRequestBehavior.AllowGet);
            }
        }

        public string AddMovie(Movie mv)
        {
            if (mv != null)
            {
                using (MoviesEntities entity = new MoviesEntities())
                {
                    entity.Movies.Add(mv);
                    entity.SaveChanges();
                    return "Movie record added successfully";
                }
            }
            else
            {
                return "Invalid movie record";
            }
        }

        public string UpdateMovie(Movie movie)
        {
            if (movie != null)
            {
                using (MoviesEntities entity = new MoviesEntities())
                {
                    int movieId = Convert.ToInt32(movie.Id);
                    Movie mv = entity.Movies.Where(x => x.Id == movieId).FirstOrDefault();
                    mv.Title = movie.Title;
                    mv.Genre = movie.Genre;
                    mv.Price = movie.Price;
                    mv.ReleaseDate = movie.ReleaseDate;
                    mv.Rating = movie.Rating;
                    //entity.Entry(movie).State = EntityState.Modified;
                    entity.SaveChanges();

                    return "Movie Record Update Successfully";
                }
            }
            else
            {
                return "Invalid movie record";
            }
        }

        public string DeleteMovie(string movieId)
        {
            if (!String.IsNullOrEmpty(movieId))
            {
                try
                {
                    int movieIds = Int32.Parse(movieId);
                    using (MoviesEntities entity = new MoviesEntities())
                    {
                        var mv = entity.Movies.Find(movieIds);
                        entity.Movies.Remove(mv);
                        entity.SaveChanges();
                        return "Selected movie record deleted successfully";
                    }
                }
                catch (Exception)
                {
                    return "Movie details not found";
                }
            }
            else
            {
                return "Invalid operation";
            }
        }
	}
}