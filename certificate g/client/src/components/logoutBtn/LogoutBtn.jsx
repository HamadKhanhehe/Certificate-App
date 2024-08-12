import { useLocation, useNavigate } from "react-router-dom";


export const LogoutBtn = () => {
const navigate = useNavigate();
const location = useLocation();

if (location.pathname === '/' || location.pathname === '/register') {
    return null
}
    const handleLogout = () => {
        // Clear the local storage
        localStorage.clear();
    
        // Navigate to the home page
        navigate('/');
      };
    return(
        <>
        <div className='absolute top-10 right-16 py-2 px-8 text-1xl text-center bg-green-500 text-white rounded'>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
        </>
    )
}