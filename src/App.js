import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CatItem } from './components/CatItem';
import { Footer } from './components/Footer';
import { Header } from './components/Header'
import { changeFavorite, setFavorite, setItemsAction } from './components/store/actions';
function App() {

  const dispatch = useDispatch()
  const items = useSelector(state => state.reducer.items)
  const favorite = useSelector(state => state.reducer.favorite)
  const [fetching, setFetching] = useState(true)
  const limit = 20
  const apiKey = "506c3183-5a31-4c41-9f7b-116fa324ede2"
  const doc = document.documentElement

  useEffect(() => {
    if (fetching) {
      getAllCatsImg()
    }
  }, [fetching])

  useEffect(() => {
    if (localStorage.length !== 0) {
      for (let i = 0; i < localStorage.length; i++) {
        getCatImg(localStorage.key(i))
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
      .then(data => dispatch(setItemsAction(data)))
      .finally(() => setFetching(false))
  }

  function changeFav(id) {
    if (favorite.find(item => item.id === id)) {
      dispatch(changeFavorite(id))
      localStorage.removeItem(id)
      console.log('dsa');
    } else {
      getCatImg(id)
      localStorage.setItem(id, id)
    }
  }

  const getCatImg = (id) => {
    fetch(`https://api.thecatapi.com/v1/images/${id}`)
      .then(resp => resp.json())
      .then(data => dispatch(setFavorite(data)))
  }

  return (
    <>
      <Header />
      <main className='main'>
        {items.length ?
          <Routes>
            <Route path='/' element={items.length ?
              <div className='catList__container'>
                {items.map(item => <CatItem key={item.id} item={item} changeFav={changeFav} />)}
              </div>
              :
              null
            }
            />
            <Route path='/favorite' element={favorite.length ?
              <div className='catList__container'>
                {favorite.map(item => <CatItem key={item.id} item={item} changeFav={changeFav} />)}
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
