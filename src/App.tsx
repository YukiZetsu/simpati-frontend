import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/dashboard';
import StudyProgram from '@/pages/admin/study-program'; 
import Profile from '@/pages/admin/profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/profile" element={<Profile />} />
        
        {/* 2. Tambahkan rutenya di bawah sini */}
        <Route path="/admin/study-program" element={<StudyProgram />} />
      </Routes>
    </BrowserRouter>
  );
}