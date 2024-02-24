import { useNavigate } from "react-router-dom"

const Header = (props) => {

  const navigate = useNavigate()

  const logoutHandler = (e) => {
    sessionStorage.clear()
    navigate('/account/login')
  }

  const authButtons = () => {
    if(sessionStorage.authToken) {
      return <div className="flex flex-row justify-end items-center w-full gap-4 text-sm">
        <button onClick={logoutHandler}>Log Out</button>
      </div>
    } else {
      return <div className="flex flex-row justify-end items-center w-full gap-4 text-sm">
        <li className="hover:text-red-700"><a href='/account/register'>Register</a></li>
        <li className="hover:text-red-700"><a href='/account/login'>Login</a></li>
      </div>
    }

  }

  return (
    <nav className="flex flex-row flex-nowrap p-4">
      {/* Logo Section */}
      <div>
        <a href='/'>LOGO</a>
      </div>

      {/* link lists */}
      <ul className="flex w-full">
        {authButtons()}
      </ul>
    </nav>
  );
}
export default Header;