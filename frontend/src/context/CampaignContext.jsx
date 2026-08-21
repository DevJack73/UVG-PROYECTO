import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const CampaignContext = createContext();

export function CampaignProvider({ children }) {
  const [campaigns, setCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [impactStats, setImpactStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Active donation modal state
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [selectedCampaignForDonation, setSelectedCampaignForDonation] = useState(null);
  const [activeDonationType, setActiveDonationType] = useState('in_kind'); // 'in_kind' or 'monetary'

  // Digital voucher modal state (after completing an in-kind pledge)
  const [voucherModalOpen, setVoucherModalOpen] = useState(false);
  const [currentVoucherData, setCurrentVoucherData] = useState(null);

  // Monetary receipt modal state
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [currentReceiptData, setCurrentReceiptData] = useState(null);

  const refreshAll = useCallback(async () => {
    try {
      const [cList, catList, points, stats] = await Promise.all([
        api.getCampaigns(),
        api.getCategories(),
        api.getCollectionPoints(),
        api.getImpactStats()
      ]);
      setCampaigns(cList);
      setCategories(catList);
      setCollectionPoints(points);
      setImpactStats(stats);
    } catch (err) {
      console.error('Error fetching campaign data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  const openDonationModal = (campaign = null, defaultType = 'in_kind') => {
    setSelectedCampaignForDonation(campaign || campaigns[0] || null);
    setActiveDonationType(defaultType);
    setDonationModalOpen(true);
  };

  const closeDonationModal = () => {
    setDonationModalOpen(false);
  };

  const showVoucher = (donationRecord) => {
    setCurrentVoucherData(donationRecord);
    setVoucherModalOpen(true);
    refreshAll();
  };

  const showReceipt = (donationRecord) => {
    setCurrentReceiptData(donationRecord);
    setReceiptModalOpen(true);
    refreshAll();
  };

  const value = {
    campaigns,
    categories,
    collectionPoints,
    impactStats,
    loading,
    refreshAll,
    // Modal states
    donationModalOpen,
    selectedCampaignForDonation,
    activeDonationType,
    openDonationModal,
    closeDonationModal,
    setActiveDonationType,
    // Voucher & Receipt
    voucherModalOpen,
    currentVoucherData,
    setVoucherModalOpen,
    showVoucher,
    receiptModalOpen,
    currentReceiptData,
    setReceiptModalOpen,
    showReceipt
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaigns() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
}
