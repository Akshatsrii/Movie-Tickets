import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js"; // ✅ ensure this model exists

// ✅ 1. Get Now Playing Movies (OMDb)
export const getNowPlayingMovies = async (req, res) => {
  try {
    const moviesList = ["Dune", "Avatar", "Inception", "The Batman", "Oppenheimer"];
    const moviePromises = moviesList.map(title =>
      axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${process.env.OMDB_API_KEY}`)
    );

    const movieResponses = await Promise.all(moviePromises);
    const movies = movieResponses.map(r => r.data);

    res.json({ success: true, movies });
  } catch (error) {
    console.error("Error fetching OMDb movies:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ 2. Add Show
export const addShow = async (req, res) => {
  try {
    const { movieTitle, showsInput, showPrice } = req.body;

    let movie = await Movie.findOne({ title: movieTitle });

    if (!movie) {
      const { data: movieDetails } = await axios.get(
        `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${process.env.OMDB_API_KEY}`
      );

      if (movieDetails.Response === "False") {
        return res.json({ success: false, message: "Movie not found in OMDb" });
      }

      movie = new Movie({
        title: movieDetails.Title,
        overview: movieDetails.Plot,
        poster_path: movieDetails.Poster,
        cast: movieDetails.Actors?.split(", ") || [],
        release_date: movieDetails.Released,
      });

      await movie.save();
    }

    const newShow = new Show({
      movie: movie._id,
      showDateTime: showsInput,
      price: showPrice,
    });

    await newShow.save();
    res.json({ success: true, movie, show: newShow });
  } catch (error) {
    console.error("Error adding show:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ 3. Get All Upcoming Shows
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({
      showDateTime: { $gte: new Date() },
    })
      .populate("movie")
      .sort({ showDateTime: 1 });

    const uniqueShows = new Set(shows.map(show => show.movie));
    res.json({ success: true, shows: Array.from(uniqueShows) });
  } catch (error) {
    console.error("Error fetching shows:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ 4. Get a Single Movie’s Shows (Grouped by Date)
export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;

    // find all future shows for this movie
    const shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() },
    });

    const movie = await Movie.findById(movieId);
    const dateTime = {};

    // group shows by date
    shows.forEach(show => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({
        time: show.showDateTime,
        showId: show._id,
      });
    });

    res.json({ success: true, movie, dateTime });
  } catch (error) {
    console.error("Error fetching single show:", error);
    res.json({ success: false, message: error.message });
  }
};

