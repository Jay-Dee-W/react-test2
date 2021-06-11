import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [resturants, setResturants] = useState()
  const [page, setPage] = useState(10)
  const [resturantPage, setResturantPage] = useState([])

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
      .then(data => setResturants(data))
  }, [])

  useEffect(() => {
    if (resturants && page < resturants.length) {
      let nextPage = []
      for (let index = page - 10; index < page; index++) {
        nextPage.push(resturants[index])
      }
      setResturantPage(prev => prev = nextPage)
    }
  }, [page, resturants])
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
        { resturantPage.map(resturant =>
          <div className='row' key={resturant.id}>
            <p>{resturant.name}</p>
            <p>{resturant.city}</p>
            <p>{resturant.state}</p>
            <p>{resturant.telephone}</p>
            <p>{resturant.genre}</p>
          </div>
        )}
        <button onClick={prev}> Prev </button>
        <button onClick={next}>Next </button>
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
