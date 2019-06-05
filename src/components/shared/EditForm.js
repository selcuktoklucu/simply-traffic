import React from 'react'
import { Link } from 'react-router-dom'

const MovieForm = ({ movie, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Movie Title</label>
    <input
      name='title'
      placeholder='Film Title'
      value={movie.title}
      onChange={handleChange}
    />
    <label>Director</label>
    <input
      name='director'
      placeholder='FilmDirector'
      value={movie.director}
      onChange={handleChange}
    />
    <label>Date Relased</label>
    <input
      type='date'
      name='year'
      placeholder='YYYY-MM-DD'
      value={movie.year}
      onChange={handleChange}
    />
    <button type='submit'>Submit</button>
    <Link to={cancelPath}><button>Cancel</button></Link>
  </form>
)

export default MovieForm
