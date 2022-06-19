import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Scrolling from './components/Scrolling';

function App() {
  return (
    <div className="">
      <h1 className="text-danger text-center mb-4">Infinite Scroll</h1>
      <Scrolling />
    </div>
  );
}

export default App;
