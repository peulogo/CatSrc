import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CatItem } from './components/CatItem';
import { Footer } from './components/Footer';
import { Header } from './components/Header'
function App() {

  const [items, setItems] = useState([])
  const [favorite, setFavorite] = useState([])
  const [fetching, setFetching] = useState(true)
  const limit = 20
  const apiKey = "506c3183-5a31-4c41-9f7b-116fa324ede2"
  const doc = document.documentElement

  useEffect(() => {
    if (fetching) {
      getAllCatsImg(setItems)
    }
  }, [fetching])

  useEffect(() => {
    if (localStorage.length !== 0) {
      let arr = []
      for (let i = 0; i < localStorage.length; i++) {
        arr.push(getCatImg(setFavorite, localStorage.key(i)))
      }
    }

    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = () => {
    if (doc.scrollHeight - (doc.scrollTop + window.innerHeight) < 50) {
      setFetching(true)
    }
  }

  function getAllCatsImg(stateConf) {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&mime_types=jpg&api_key=${apiKey}`)
      .then(resp => resp.json())
      .then(data => stateConf(prev => [...prev, ...data]))
      .finally(() => setFetching(false))
  }

  function changeFav(id) {
    if (favorite.find(item => item.id === id)) {
      setFavorite(prev => prev.filter(item => item.id !== id))
      localStorage.removeItem(id)
    } else {
      getCatImg(setFavorite, id)
      localStorage.setItem(id, id)
    }
  }

  const getCatImg = (stateConf, id) => {
    fetch(`https://api.thecatapi.com/v1/images/${id}`)
      .then(resp => resp.json())
      .then(data => stateConf(prev => [...prev, data]))
  }

  return (
    <>
      <Header />
      <main className='main'>
        {items.length ?
          <Routes>
            <Route path='/' element={items.length ?
              <div className='catList__container'>
                {items.map(item => <CatItem item={item} changeFav={changeFav} />)}
              </div>
              :
              null
            }
            />
            <Route path='/favorite' element={favorite.length ?
              <div className='catList__container'>
                {favorite.map(item => <CatItem item={item} changeFav={changeFav} />)}
              </div>
              :
              <div className='emty__fav'><span>Список котиков пуст.</span> <span>Добавте котиков.</span></div>
            }
            />
          </Routes>
          :
          <div className="circle_wraper"> <div className='circle' /></div>
        }
      </main>
      {fetching && items.length ? <Footer /> : null}
    </>
  );
}

export default App;
