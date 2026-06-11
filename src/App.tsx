import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/dashboard';
import StudyProgram from '@/pages/admin/study-program'; 
import Profile from '@/pages/admin/profile';
import Login from '@/pages/admin/login';
import Register from '@/pages/admin/register';
import Contact from '@/pages/admin/contact';
import EmailPassword from '@/pages/admin/email-password';
import Loa from '@/pages/admin/loa';
import Payment from '@/pages/admin/payment';
import CustomerLogin from '@/pages/customer/login';
import CustomerRegister from '@/pages/customer/register';
import ForgotPassword from '@/pages/customer/forgot-password';
import FillBiodata from '@/pages/customer/fill-biodata';
import StudentPrograms from '@/pages/customer/study-programs';
import ProgramDetail from '@/pages/customer/program-detail';
import StudentProfile from '@/pages/customer/profile';
import StudentContact from '@/pages/customer/contact';
import StudentEmailPassword from '@/pages/customer/email-password';
import StudentLoa from '@/pages/customer/loa';
import StudentPayment from '@/pages/customer/payment';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />


        {/* Route Admin */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/study-program" element={<StudyProgram />} />
        <Route path="/admin/contact" element={<Contact />} />
        <Route path="/admin/email-password" element={<EmailPassword />} />
        <Route path="/admin/loa" element={<Loa />} />
        <Route path="/admin/payment" element={<Payment />} />

        {/* Route Customer */}
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/register" element={<CustomerRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/fill-biodata" element={<FillBiodata />} />
        <Route path="/student/programs" element={<StudentPrograms />} />
        <Route path="/student/programs/:id" element={<ProgramDetail />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/contact" element={<StudentContact />} />
        <Route path="/student/email-password" element={<StudentEmailPassword />} />
        <Route path="/student/loa" element={<StudentLoa />} />
        <Route path="/student/payment" element={<StudentPayment />} />
      </Routes>
    </BrowserRouter>
  );
}