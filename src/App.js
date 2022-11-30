import './App.css';
import State from './Context/State';
import Home from './Pages/Home/Home';

function App() {
  return (
    <>
      <State>
        <Home />
      </State>
    </>
  );
}

export default App;
