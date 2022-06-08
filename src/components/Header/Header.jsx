import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import s from './Header.module.css'


function Header() {
  const [headerFixed, setHeaderFixed] = useState(false)
  const ref = useRef(null)
  window.onscroll = () => {
    if (window.scrollY > ref.current.offsetHeight) {
      return setHeaderFixed(true)
    }
    else {
      return setHeaderFixed(false)
    }

  }
  return (
    <header ref={ref} className={!headerFixed ? s.header : s.header + ' ' + s._active}>
        <div className={s.header__container}>
            <Link to='/' className={s.all_cats__button}>Все котики</Link>
            <Link to='/favorite' className={s.fav_cats__button}>Любимые котики</Link>
        </div>
    </header>
  )
}

export { Header }