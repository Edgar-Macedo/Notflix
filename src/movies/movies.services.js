const movieControllers = require("./movies.controllers")
const { success, error } = require("../utils/handleResponses")
const { addToFirebaseMovieVideo } = require("../utils/firebase")

const getAllMovies = (req, res) => {
  movieControllers
    .findAllMovies()
    .then((data) => {
      success({
        res,
        status: 200,
        data,
        message: "Getting all movies",
      });
    })
    .catch((err) => {
      error({
        err,
        status: 400,
        data: err,
        message: "Something bad",
      })
    })
}

const postMovie = async (req, res) => {
  const movieObj = req.body
  const movieFile = req.file

  try {
    const movieUrl = await addToFirebaseMovieVideo(movieFile)
    const data = await movieControllers.createMovie({ ...movieObj, movieUrl })
    success({
      res,
      status: 201,
      data,
      message: "Movie Created! :D",
    })
  } catch (err) {
    error({
      res,
      data: err,
      message: err.message,
      status: 400,
      fields: {
        title: "string",
        synopsis: "string",
        releaseYear: 2020,
        director: "string",
        duration: 180,
        trillerUrl: "a",
        coverUrl: "a",
        classification: "string",
        rating: 0.0,
      },
    })
  }
}

module.exports = {
  getAllMovies,
  postMovie,
}