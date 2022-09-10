import axios from 'axios';
import './App.css';
import { Outlet, Link } from "react-router-dom";


function App(props) {
  return (<>

    <div className="App">
      <div className='nav-wrapper'>
        <nav>
          <div className='menu-wrapper'>
            <Link to="/" className='menu-link'>Pokedex</Link>
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  </>
  );
}


export default App;
