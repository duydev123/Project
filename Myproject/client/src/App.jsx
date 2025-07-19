import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import FileUpload from './components/FileUpload';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/file" element={<FileUpload />} />
    </Routes>
  );
}

export default App;
