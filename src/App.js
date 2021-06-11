import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [resturants, setResturants] = useState()
  const [page, setPage] = useState(10)
  const [resturantPage, setResturantPage] = useState([])
  const [genre, setGenre] = useState([])
  const [genrefilterText, setGenreFilterText] = useState('All')

  const prev = () => {
    setPage(prev => prev - 10)
  }
  const next = () => {
    setPage(prev => prev + 10)
  }

  useEffect(() => {
    fetch('http://128.199.195.196:3001/', {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer iqi509189dxznal;,ggi'
      })
    })
      .then(response => response.json())
      .then(data => {
        let genreArr = ['All']
        for (let i = 0; i < data.length; i++) {
          for (let value of data[i].genre.split(',')) {

            if (genreArr.indexOf(value) === -1) {
              genreArr.push(value)
            }
          }
        }

        setGenre(genreArr)
        setResturants(data)

      })
    // eslint-disable-next-line 
  }, [])

  useEffect(() => {
    let num = 10

    if (page < 0) setPage(10)
    if (resturants && page - num < resturants.length && page > 0) {
      if (page + 10 > resturants.length && resturants.length - page > 0) {

        num = resturants.length - page

      }
      if (num > 0) {
        let nextPage = []
        for (let index = page - num; index < page; index++) {
          nextPage.push(resturants[index])
        }
        setResturantPage(prev => prev = nextPage)

      }
    }
  }, [page, genrefilterText, resturants])

  function handelChangeGenre(value) {
    setGenreFilterText(prev => prev = genre[value])
    setPage(10)
  }

  if (resturants) {

    return (
      <div className="App">
        <div className='headings'>
          <h1>Name</h1>
          <h1>City</h1>
          <h1>State</h1>
          <h1>Phn Num</h1>
          <h1>Genres</h1>
        </div>
        {resturantPage.filter(resturant =>
          genrefilterText !== 'All' ? resturant.genre.split(',').indexOf(genrefilterText) !== -1
            :
            true
        )
          .map(resturant =>
            resturant &&
            <div className='row' key={resturant.id}>

              <p>{resturant.name}</p>
              <p>{resturant.city}</p>
              <p>{resturant.state}</p>
              <p>{resturant.telephone}</p>
              <p>{resturant.genre}</p>
            </div>
          )}
        <div className='footer'>
          <button onClick={prev} className='prev'> Prev </button>
          <div className="filter" >
            <span>  Filter by Genre </span>
            <select name='genre' onChange={e => handelChangeGenre(e.target.value)}>
              {genre.map((value, i) =>
                <option key={value} value={i}>{value}</option>
              )}
            </select>
          </div>
          <button onClick={next} className='next'>Next </button>
        </div>
      </div>
    );
  }
  else {
    return (
      <h1> Loading... </h1>
    )
  }
}

export default App;
