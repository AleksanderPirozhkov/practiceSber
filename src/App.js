import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Modal from 'react-modal';
import BrowsingUsers from './components/BrowsingUsers/BrowsingUsers';
import SearchPreorders from './components/SearchPreorders/SearchPreorders';
import SearchConfigurations from './components/SearchConfigurations/SearchConfigurations';
import SearchDatacenters from './components/SearchDatacenters/SearchDatacenters';
import SearchEnvironments from './components/SearchEnvironments/SearchEnvironments';
import NavbarHeader from './components/NavbarHeader/NavbarHeader';
import NavbarLinks from './components/NavbarLinks/NavbarLinks';

Modal.setAppElement('#root');

function App() {
  const [isOpenSearchBar, setOpenSearchBar] = React.useState(false);

  const elementOnPageCount = 6;

  return (
    <Router>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '250px 1670px',
        gridTemplateRows: '250px 600px',
      }}
      >
        <NavbarHeader />
        <BrowsingUsers />
        <NavbarLinks />
        <Routes>
          <Route path="/" element={<Navigate to="/preorders" />} />
          <Route path="/preorders" element={<SearchPreorders elementOnPageCount={elementOnPageCount} isOpenSearchBar={isOpenSearchBar} setOpenSearchBar={setOpenSearchBar} />} />
          <Route path="/configurations" element={<SearchConfigurations elementOnPageCount={elementOnPageCount} isOpenSearchBar={isOpenSearchBar} setOpenSearchBar={setOpenSearchBar} />} />
          <Route path="/datacenters" element={<SearchDatacenters elementOnPageCount={elementOnPageCount} isOpenSearchBar={isOpenSearchBar} setOpenSearchBar={setOpenSearchBar} />} />
          <Route path="/environments" element={<SearchEnvironments elementOnPageCount={elementOnPageCount} isOpenSearchBar={isOpenSearchBar} setOpenSearchBar={setOpenSearchBar} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
