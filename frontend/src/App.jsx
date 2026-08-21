import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CampaignProvider } from './context/CampaignContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DonationModal from './components/donations/DonationModal';
import DonationVoucherModal from './components/donations/DonationVoucherModal';
import ReceiptModal from './components/donations/ReceiptModal';

// Pages
import HomePage from './pages/HomePage';
import CampaignsPage from './pages/CampaignsPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import DonatePage from './pages/DonatePage';
import TrackingPage from './pages/TrackingPage';
import ImpactPage from './pages/ImpactPage';
import VolunteerPage from './pages/VolunteerPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LegalPage from './pages/LegalPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <CampaignProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[#fcfbf7] text-slate-850 font-sans selection:bg-emerald-200 selection:text-emerald-950">
            
            {/* Navigation Header */}
            <Navbar />

            {/* Main Application Routes */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/campaigns" element={<CampaignsPage />} />
                <Route path="/campaigns/:slug" element={<CampaignDetailPage />} />
                <Route path="/donate" element={<DonatePage />} />
                <Route path="/tracking" element={<TrackingPage />} />
                <Route path="/impact" element={<ImpactPage />} />
                <Route path="/volunteer" element={<VolunteerPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/legal" element={<LegalPage />} />
              </Routes>
            </main>

            {/* Global Modals */}
            <DonationModal />
            <DonationVoucherModal />
            <ReceiptModal />

            {/* Footer */}
            <Footer />

          </div>
        </Router>
      </CampaignProvider>
    </AuthProvider>
  );
}
