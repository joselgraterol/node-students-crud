
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

import Home from './pages/Home.jsx'
import AddEdit from './pages/AddEdit.jsx'
import View from './pages/View.jsx'

function App() {

  const notify = () => toast("Wow so easy!");

  return (

    <Router>
      <div>
        {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addStudent" element={<AddEdit />} />
          <Route exact path="/update/:id" element={<AddEdit />} />
          <Route exact path="/view/:id" element={<View />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App
