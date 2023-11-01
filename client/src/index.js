import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
//import App from './App';
import Home from './Home';
import Listing from './Listing';
import Layout from './Layout';
import reportWebVitals from './reportWebVitals';

class App extends Component {
  componentDidMount(){
    document.title = "Music Listings"
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Listing/:id" element={<Listing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
