import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage';
import FavoritesPage from '../pages/FavoritesPage';
import Popular from './pages/Popular';
import Recipes from './pages/Recipes';
import LoginModal from './pages/LoginModal';
import RegisterModal from './pages/RegisterModal';
import { UserProvider } from './context/UserContext';
import * as serviceWorker from './serviceworker.js';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <UserProvider>
      <div>
        <Navbar onLoginClick={openLoginModal} onRegisterClick={openRegisterModal} />
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
        <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
        <div className="flex">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
}
serviceWorker.register();
export default App;