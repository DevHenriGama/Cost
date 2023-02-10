import styles from './NavBar.module.css'
import Logo from '../../img/costs_logo.png'
import {Link} from 'react-router-dom'
import Container from './Container'


function NavBar(){
    return(
        <nav className={styles.navbar}>
            <Container>
            <Link to='/'><img src={Logo} alt='Menu'></img></Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                    <Link to='/'>Home</Link> 
                    </li>
                    <li className={styles.item}>
                    <Link to='/projects'>Projects</Link>
                    </li>
                    <li className={styles.item}>
                    <Link to='/contact'>Contact</Link>
                    </li>
                    <li className={styles.item}>
                    <Link to='/company'>Company</Link>
                    </li>
                </ul>                                         
            </Container>
        </nav>

    )
}

export default NavBar