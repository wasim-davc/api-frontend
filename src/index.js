import React, {Component} from "react";
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//css
import "./css/style.scss";

//common components
import Header from "./components/Header";
import Footer from "./components/Footer";

//pages
import Home from "./pages/Home";
import Download from "./pages/Download";
import Page404 from "./pages/Page404";

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="category/:categorySlug" element={<Home />} />
              <Route path="search/:searchText" element={<Home />} />
              <Route path="download/:slug" element={<Download />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
