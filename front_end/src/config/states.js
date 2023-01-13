import Login from '../components/login/Login';
import MyMovies from '../components/movies/myMovies';

/* ==================================================
The states are the different views of the application. (PAGES)
================================================== */
const login = {
    name: 'login',
    url: '/login',
    component: Login
};

const myMovies = {
    name: 'myMovies',
    url: '/myMovies',
    component: MyMovies
};

const states = [ login, myMovies ];
export default states;