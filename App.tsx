import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import VideoUpload from './components/VideoUpload';
import ComparisonPage from './components/ComparisonPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f3f0ff]">
        <NavigationBar />
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<VideoUpload />} />
            <Route path="/compare/pretrained" element={<ComparisonPage defaultMode="pretrained" />} />
            <Route path="/compare/reference" element={<ComparisonPage defaultMode="reference" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;