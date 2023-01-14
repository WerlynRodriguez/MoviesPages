// This file is used to check if the user is logged in localStorage, if not, it redirects to the login page
export default function RequireAuth(transition){
    const auth = localStorage.getItem('accessToken');

    if(!auth){
        transition.abort();
        transition.router.stateService.go('login');
    }
}