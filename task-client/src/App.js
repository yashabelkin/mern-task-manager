import {Toaster} from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom';
import Tasks from './components/Tasks';
import Base from './components/Base';

function App() {

  return (
    <div className="container">


      <Toaster></Toaster>
      <Routes>
        
      <Route path="/" element={<Base/>} />
      <Route path="/:id" element={<Tasks/>} />
      </Routes>
    </div>
  );
}

export default App;
