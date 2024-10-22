const express = require('express');
const Movie = require('../models/Movie');
const User = require('./src/models/User');

const router = express.Router();

// Search Movies
router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Book a Movie
router.post('/book/:movieId', async (req, res) => {
  const userId = req.user.id; // Assuming you have middleware to verify JWT
  const { showtime, seats } = req.body;
  const movie = await Movie.findById(req.params.movieId);

  if (movie) {
    // Check if seats are available, then book
    const showtimeDetails = movie.showtimes.find(st => st.date === showtime);
    if (showtimeDetails && showtimeDetails.seatsAvailable >= seats) {
      showtimeDetails.seatsAvailable -= seats;
      movie.bookedBy.push(userId);
      await movie.save();
      res.send('Booking successful');
    } else {
      res.status(400).send('Not enough seats available');
    }
  } else {
    res.status(404).send('Movie not found');
  }
});

// Get User's Booked Movies
router.get('/my-bookings', async (req, res) => {
  const userId = req.user.id; // Assuming you have middleware to verify JWT
  const user = await User.findById(userId).populate('bookedMovies');
  res.json(user.bookedMovies);
});

module.exports = router;
