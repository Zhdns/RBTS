import style from './AppHeader.module.css'
import { NavLink, useLocation, Location, useNavigate} from 'react-router-dom'
import { ReactElement} from 'react'
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'




const AppHeader = (): ReactElement  =>  {

    const location: Location = useLocation();
    const navigate = useNavigate()

  

    return (
        <header className={style.header}>
                <nav className={style.nav}>
                    <NavLink to='/' className={({isActive}) => isActive ? style.navLinksActive  : style.navLinks}> 
                    <BurgerIcon type={location.pathname === '/' ? "primary" : "secondary"}/><span className={`text text_type_main-default`}>Конструктор</span> 
                    </NavLink>
                    <NavLink to='/feed' className={({isActive}) => isActive ? style.navLinksActive  : style.navLinks}  > 
                    <ListIcon type={location.pathname.startsWith('/feed') ? "primary" : "secondary"}/> <span className={`text text_type_main-default `}>Лента заказов</span> 
                    </NavLink>
                </nav>
                <div className={style.logo} onClick={() =>  navigate('/')}>
                    <Logo/>
                </div>
                <NavLink to='/profile' className={({isActive}) => isActive ? style.navLinksActive  : style.navLinks}>
                    <ProfileIcon type={location.pathname === '/' || location.pathname.startsWith('/ingredients/') || location.pathname.startsWith('/feed') ?
                    "secondary" : "primary"}/><span className={ location.pathname === '/' || location.pathname.startsWith('/ingredients/') || location.pathname.startsWith('/feed') ? 
                    `text text_type_main-default ${style.navLinks}` : `text text_type_main-default ${style.navLinksActive}`}>Личный кабинет </span>
                    </NavLink>  
        </header>
    )
}


export default AppHeader