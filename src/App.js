import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ListMuseums from './components/listMuseums';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListMuseums></ListMuseums>}>

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;
