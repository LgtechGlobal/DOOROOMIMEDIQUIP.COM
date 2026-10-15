import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Users, 
  Layers, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  LogOut, 
  RefreshCw, 
  Trash2, 
  Check, 
  Search, 
  Plus, 
  FileText, 
  Globe, 
  PhoneCall, 
  Mail, 
  ChevronRight, 
  ExternalLink,
  Activity,
  HeartPulse,
  Sparkles,
  Award,
  ArrowLeft,
  Star,
  Package,
  Building2,
  MessageSquare,
  AlertTriangle,
  Image as ImageIcon,
  CheckCircle,
  Eye
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';
import { useData } from '../context/DataContext';

export const AdminPortalPage = ({ onNavigateHome, onLogout }) => {
  const {
    products,
    centers,
    testimonials,
    addProduct,
    deleteProduct,
    addCenter,
    deleteCenter,
    addTestimonial,
    deleteTestimonial,
    resetToDefaults,
    dbConnected: contextDbConnected
  } = useData();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'centers' | 'testimonials' | 'inquiries' | 'database'
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [notification, setNotification] = useState(null);

  // Modals state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddCenterModal, setShowAddCenterModal] = useState(false);
  const [showAddTestimonialModal, setShowAddTestimonialModal] = useState(false);
  const [showAddInquiryModal, setShowAddInquiryModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null); // { type, id, name }

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    nameKo: '',
    model: '',
    cat: 'series-b',
    catLabel: 'Cellular Longevity & Therapy Systems',
    short: '',
    desc: '',
    badge: 'Medical Grade',
    volume: 'Clinical System',
    imgUrl: './assets/products/product-real-07.jpeg',
    keyActives: 'PDRN (Salmon DNA) 30,000 ppm, 9-Sphere Ergonomic Projector',
    spec1Label: 'Model Identifier',
    spec1Value: 'DM-B107',
    spec2Label: 'Standard Compliance',
    spec2Value: 'ISO 22716 / Korea CGMP / Medical CE'
  });

  // New Therapy Center Form State
  const [newCenter, setNewCenter] = useState({
    city: '',
    area: '',
    state: '',
    address: '',
    phone: '+91 1800 419 5278',
    timing: 'Mon–Sat: 8:00 AM – 5:00 PM',
    status: 'Active · 100% Free Daily Therapy',
    dailyCapacity: '150+ Patients/Day'
  });

  // New Testimonial Form State
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    age: '55 Years',
    location: 'Bhubaneswar, Odisha',
    disease: 'Severe Knee Osteoarthritis & High BP',
    duration: 'Suffering for 5 Years',
    treatment: 'BEDRO Smart-1 & Taeyangsuk Mat',
    rating: 5,
    quote: '',
    fullStory: '',
    image: '/assets/testimonials/patient-kmamari-sahoo.jpg'
  });

  // New Inquiry Form State
  const [newInquiry, setNewInquiry] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    type: 'quote',
    productInterest: 'BEDRO Smart-1 Automatic Thermal Massager',
    message: ''
  });

  // Show temporary toast notification
  const notify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Fetch inquiries from backend
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('dooroomi_admin_token');
      const res = await fetch('http://localhost:5000/api/inquiries', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.warn('Inquiries fetch notice:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Update Inquiry Status in MongoDB
  const handleUpdateStatus = async (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq))
    );

    try {
      const token = localStorage.getItem('dooroomi_admin_token');
      await fetch(`http://localhost:5000/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ status: newStatus })
      });
      notify(`Inquiry status updated to ${newStatus}`);
    } catch (err) {
      notify('Status updated locally.', 'info');
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    setInquiries((prev) => prev.filter((inq) => inq._id !== id));
    try {
      const token = localStorage.getItem('dooroomi_admin_token');
      await fetch(`http://localhost:5000/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      notify('Inquiry deleted successfully');
    } catch (err) {
      notify('Inquiry removed locally.', 'info');
    }
  };

  // Submit Add Product
  const handleAddProductSubmit = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.imgUrl) {
      alert('Please provide Product Name and Image URL');
      return;
    }

    const payload = {
      name: newProduct.name,
      nameKo: newProduct.nameKo,
      model: newProduct.model || 'DM-M' + Math.floor(100 + Math.random() * 900),
      cat: newProduct.cat,
      catLabel: newProduct.catLabel,
      short: newProduct.short || newProduct.name,
      desc: newProduct.desc || newProduct.name,
      volume: newProduct.volume,
      texture: 'Medical Grade Ergonomic',
      badge: newProduct.badge,
      imgUrl: newProduct.imgUrl,
      keyActives: newProduct.keyActives.split(',').map(s => s.trim()).filter(Boolean),
      specs: [
        [newProduct.spec1Label || 'Model Identifier', newProduct.spec1Value || newProduct.model],
        [newProduct.spec2Label || 'Standard Compliance', newProduct.spec2Value || 'ISO 22716 / Korea CGMP']
      ]
    };

    await addProduct(payload);
    setShowAddProductModal(false);
    notify(`Product "${newProduct.name}" added to website and MongoDB!`);
    setNewProduct({
      name: '',
      nameKo: '',
      model: '',
      cat: 'series-b',
      catLabel: 'Cellular Longevity & Therapy Systems',
      short: '',
      desc: '',
      badge: 'Medical Grade',
      volume: 'Clinical System',
      imgUrl: './assets/products/product-real-07.jpeg',
      keyActives: 'PDRN (Salmon DNA) 30,000 ppm, 9-Sphere Ergonomic Projector',
      spec1Label: 'Model Identifier',
      spec1Value: 'DM-B107',
      spec2Label: 'Standard Compliance',
      spec2Value: 'ISO 22716 / Korea CGMP / Medical CE'
    });
  };

  // Submit Add Therapy Center
  const handleAddCenterSubmit = async (e) => {
    e.preventDefault();
    if (!newCenter.city || !newCenter.area || !newCenter.address) {
      alert('Please fill in City, Area name, and Address');
      return;
    }

    await addCenter(newCenter);
    setShowAddCenterModal(false);
    notify(`Therapy Center in ${newCenter.city} (${newCenter.area}) added successfully!`);
    setNewCenter({
      city: '',
      area: '',
      state: '',
      address: '',
      phone: '+91 1800 419 5278',
      timing: 'Mon–Sat: 8:00 AM – 5:00 PM',
      status: 'Active · 100% Free Daily Therapy',
      dailyCapacity: '150+ Patients/Day'
    });
  };

  // Submit Add Testimonial
  const handleAddTestimonialSubmit = async (e) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.quote) {
      alert('Please fill in Patient Name and Quote');
      return;
    }

    await addTestimonial(newTestimonial);
    setShowAddTestimonialModal(false);
    notify(`Patient Testimonial for ${newTestimonial.name} added to website!`);
    setNewTestimonial({
      name: '',
      age: '55 Years',
      location: 'Bhubaneswar, Odisha',
      disease: 'Severe Knee Osteoarthritis & High BP',
      duration: 'Suffering for 5 Years',
      treatment: 'BEDRO Smart-1 & Taeyangsuk Mat',
      rating: 5,
      quote: '',
      fullStory: '',
      image: '/assets/testimonials/patient-kmamari-sahoo.jpg'
    });
  };

  // Generic Confirm Delete Action
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    const { type, id, name } = itemToDelete;

    if (type === 'product') {
      await deleteProduct(id);
      notify(`Product "${name}" deleted from website & MongoDB!`);
    } else if (type === 'center') {
      await deleteCenter(id);
      notify(`Therapy center "${name}" removed from website & MongoDB!`);
    } else if (type === 'testimonial') {
      await deleteTestimonial(id);
      notify(`Testimonial from "${name}" removed from website & MongoDB!`);
    }

    setItemToDelete(null);
  };

  // Filtered lists
  const filteredProducts = products.filter(p => {
    const q = searchQuery.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || p.model?.toLowerCase().includes(q) || p.cat?.toLowerCase().includes(q);
  });

  const filteredCenters = centers.filter(c => {
    const q = searchQuery.toLowerCase();
    return !q || c.city.toLowerCase().includes(q) || c.area.toLowerCase().includes(q) || c.state.toLowerCase().includes(q);
  });

  const filteredTestimonials = testimonials.filter(t => {
    const q = searchQuery.toLowerCase();
    return !q || t.name.toLowerCase().includes(q) || t.disease.toLowerCase().includes(q) || t.location.toLowerCase().includes(q);
  });

  const filteredInquiries = inquiries.filter(i => {
    const matchesStatus = statusFilter === 'ALL' || i.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || i.name?.toLowerCase().includes(q) || i.email?.toLowerCase().includes(q) || i.phone?.includes(q) || i.productInterest?.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#07130f] text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-5 right-5 z-[100] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border text-sm font-semibold transition-all transform animate-bounce ${
          notification.type === 'success' 
            ? 'bg-emerald-900 border-emerald-500 text-emerald-100' 
            : 'bg-amber-900 border-amber-500 text-amber-100'
        }`}>
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Top Korean Luxury Executive Bar */}
      <header className="bg-[#0b1c16] border-b border-emerald-800/40 sticky top-0 z-40 backdrop-blur-md">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-emerald-400 p-0.5 shadow-lg shadow-emerald-950/60">
              <div className="w-full h-full bg-[#07130f] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  DOOROOMI <span className="text-amber-400 font-serif">두루미</span> ADMIN PORTAL
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  FULL CONTROL CMS
                </span>
              </div>
              <p className="text-xs text-emerald-300/70">
                Korea HQ & India Executive Operations Management System
              </p>
            </div>
          </div>

          {/* Quick Actions & Live MongoDB Status */}
          <div className="flex items-center space-x-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/50 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-200 font-medium">MongoDB Atlas:</span>
              <span className="text-amber-300 font-mono text-[11px]">dooroomimediquip.72damgv</span>
            </div>

            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/60 border border-emerald-700/60 hover:bg-emerald-800 text-xs font-semibold text-emerald-100 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Public Website</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-800/80 hover:bg-red-900 text-xs font-semibold text-red-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main CMS Container */}
      <div className="flex-1 w-full max-w-[1780px] mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">

        {/* 4 Interactive KPI Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            onClick={() => setActiveTab('products')} 
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'products' ? 'bg-emerald-950/90 border-amber-500/80 shadow-lg' : 'bg-[#0b1c16] border-emerald-900/40 hover:border-emerald-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Showroom Products</span>
              <Package className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{products.length}</span>
              <span className="text-xs text-emerald-400">Live on Website</span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('centers')} 
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'centers' ? 'bg-emerald-950/90 border-amber-500/80 shadow-lg' : 'bg-[#0b1c16] border-emerald-900/40 hover:border-emerald-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Therapy Centers</span>
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{centers.length}</span>
              <span className="text-xs text-emerald-400">Centers across India</span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('testimonials')} 
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'testimonials' ? 'bg-emerald-950/90 border-amber-500/80 shadow-lg' : 'bg-[#0b1c16] border-emerald-900/40 hover:border-emerald-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Patient Stories</span>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{testimonials.length}</span>
              <span className="text-xs text-emerald-400">5-Star Recoveries</span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('inquiries')} 
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'inquiries' ? 'bg-emerald-950/90 border-amber-500/80 shadow-lg' : 'bg-[#0b1c16] border-emerald-900/40 hover:border-emerald-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Leads & Inquiries</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{inquiries.length}</span>
              <span className="text-xs text-amber-400">
                {inquiries.filter(i => i.status === 'Pending').length} Pending
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation & Toolbar */}
        <div className="bg-[#0b1c16] rounded-2xl border border-emerald-900/50 p-2 sm:p-3 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => { setActiveTab('products'); setSearchQuery(''); }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Products & Equipment ({products.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('centers'); setSearchQuery(''); }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'centers'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Therapy Centers ({centers.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('testimonials'); setSearchQuery(''); }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'testimonials'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Patient Reviews ({testimonials.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('inquiries'); setSearchQuery(''); }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquiries ({inquiries.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('database'); setSearchQuery(''); }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'database'
                  ? 'bg-gradient-to-r from-emerald-700 to-emerald-600 text-white shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>MongoDB Cloud</span>
            </button>
          </div>

          {/* Search bar & Add Button */}
          <div className="flex items-center space-x-2.5 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#07130f] border border-emerald-800/60 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {activeTab === 'products' && (
              <button
                onClick={() => setShowAddProductModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>
            )}

            {activeTab === 'centers' && (
              <button
                onClick={() => setShowAddCenterModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Center</span>
              </button>
            )}

            {activeTab === 'testimonials' && (
              <button
                onClick={() => setShowAddTestimonialModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Testimonial</span>
              </button>
            )}
          </div>

        </div>

        {/* TAB 1: PRODUCTS & EQUIPMENT MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Showroom & Medical Equipment Catalog</span>
                  <span className="text-xs font-normal text-neutral-400">
                    ({filteredProducts.length} items · Real-time live on website)
                  </span>
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Any product added or deleted here instantly reflects across the Home Showroom, Gallery, and Single Product views.
                </p>
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-lg transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Equipment / Formulation</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#0b1c16] rounded-2xl border border-emerald-900/40 hover:border-amber-500/60 transition-all p-4 flex flex-col justify-between group shadow-sm hover:shadow-xl"
                >
                  <div>
                    {/* Image & Badge */}
                    <div className="relative w-full h-44 rounded-xl bg-white/95 flex items-center justify-center p-3 overflow-hidden">
                      <img
                        src={prod.imgUrl}
                        alt={prod.name}
                        className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/90 text-amber-300 border border-emerald-700/60">
                        {prod.badge || 'Medical Grade'}
                      </span>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 text-neutral-300">
                        {prod.model}
                      </span>
                    </div>

                    {/* Titles */}
                    <div className="mt-3">
                      <div className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider">
                        {prod.catLabel || prod.cat}
                      </div>
                      <h3 className="text-sm font-bold text-white line-clamp-2 mt-0.5">
                        {prod.name}
                      </h3>
                      {prod.nameKo && (
                        <p className="text-xs text-neutral-400 font-serif mt-0.5">
                          {prod.nameKo}
                        </p>
                      )}
                      <p className="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed">
                        {prod.short || prod.desc}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Delete Button */}
                  <div className="mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-mono">
                      ID: {prod.id}
                    </span>

                    <button
                      onClick={() => setItemToDelete({ type: 'product', id: prod.id, name: prod.name })}
                      title="Delete Product from Website"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-950/70 border border-red-800/60 hover:bg-red-900 text-red-200 text-xs font-medium transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: THERAPY CENTERS MANAGEMENT */}
        {activeTab === 'centers' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>100% Free Daily Therapy Centers Network</span>
                  <span className="text-xs font-normal text-neutral-400">
                    ({filteredCenters.length} centers active across India)
                  </span>
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Authorized centers serving hundreds of patients daily with BEDRO Smart-1 & Taeyangsuk therapy.
                </p>
              </div>

              <button
                onClick={() => setShowAddCenterModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold shadow-lg transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Center</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCenters.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#0b1c16] rounded-2xl border border-emerald-900/40 hover:border-emerald-700/60 p-4 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950 border border-emerald-700 text-emerald-200">
                        {c.city}, {c.state}
                      </span>
                      <span className="text-[11px] text-amber-400 font-semibold">
                        {c.dailyCapacity}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mt-2">
                      {c.area}
                    </h3>
                    <p className="text-xs text-neutral-300 mt-1 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{c.address}</span>
                    </p>

                    <div className="mt-3 flex items-center gap-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1 text-emerald-300">
                        <PhoneCall className="w-3 h-3 text-amber-400" />
                        {c.phone}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400">
                      {c.timing}
                    </span>

                    <button
                      onClick={() => setItemToDelete({ type: 'center', id: c.id, name: `${c.city} - ${c.area}` })}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-950/70 border border-red-800/60 hover:bg-red-900 text-red-200 text-xs font-medium transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PATIENT TESTIMONIALS MANAGEMENT */}
        {activeTab === 'testimonials' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Real Patient Recovery Stories & Testimonials</span>
                  <span className="text-xs font-normal text-neutral-400">
                    ({filteredTestimonials.length} published on home page)
                  </span>
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Documented clinical testimonials with verified 5-star patient satisfaction.
                </p>
              </div>

              <button
                onClick={() => setShowAddTestimonialModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-lg transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Testimonial</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTestimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#0b1c16] rounded-2xl border border-emerald-900/40 hover:border-amber-500/60 p-4 flex flex-col justify-between transition-all"
                >
                  <div>
                    {/* Header with portrait and rating */}
                    <div className="flex items-center gap-3">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/60 shadow"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-white">{t.name}</h3>
                        <p className="text-xs text-neutral-400">{t.age} · {t.location}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-200 border border-emerald-800">
                        {t.disease}
                      </span>
                      <p className="text-xs text-neutral-300 italic mt-2 line-clamp-3 leading-relaxed">
                        "{t.quote}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-between">
                    <span className="text-[11px] text-amber-400/90 font-medium">
                      {t.treatment}
                    </span>

                    <button
                      onClick={() => setItemToDelete({ type: 'testimonial', id: t.id, name: t.name })}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-950/70 border border-red-800/60 hover:bg-red-900 text-red-200 text-xs font-medium transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: INQUIRIES & LEADS MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Customer Quotations & Patient Leads</span>
                  <span className="text-xs font-normal text-neutral-400">
                    ({filteredInquiries.length} records in MongoDB)
                  </span>
                </h2>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-1.5 bg-[#07130f] p-1 rounded-xl border border-emerald-800/60">
                {['ALL', 'Pending', 'In Progress', 'Completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      statusFilter === st
                        ? 'bg-emerald-800 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-[#0b1c16] rounded-2xl border border-emerald-900/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#07130f] border-b border-emerald-900/60 text-neutral-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Contact / Name</th>
                      <th className="px-4 py-3 font-semibold">Inquiry Type</th>
                      <th className="px-4 py-3 font-semibold">Product Interest</th>
                      <th className="px-4 py-3 font-semibold">Message</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-900/30">
                    {filteredInquiries.map((inq) => (
                      <tr key={inq._id} className="hover:bg-emerald-950/40 transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="font-bold text-white">{inq.name}</div>
                          <div className="text-neutral-400 text-[11px] mt-0.5">{inq.phone}</div>
                          <div className="text-emerald-400 text-[11px]">{inq.email}</div>
                          {inq.company && <div className="text-amber-400/80 text-[10px] mt-0.5">{inq.company}</div>}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 border border-emerald-800 text-emerald-200">
                            {inq.type}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-medium text-neutral-200">
                          {inq.productInterest || 'General Inquiry'}
                        </td>
                        <td className="px-4 py-3.5 max-w-xs text-neutral-300 line-clamp-2">
                          {inq.message}
                        </td>
                        <td className="px-4 py-3.5">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateStatus(inq._id, e.target.value)}
                            className={`px-2 py-1 rounded text-xs font-bold border cursor-pointer focus:outline-none ${
                              inq.status === 'Completed'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                                : inq.status === 'In Progress'
                                ? 'bg-blue-950 text-blue-300 border-blue-600'
                                : 'bg-amber-950 text-amber-300 border-amber-600'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button
                            onClick={() => handleDeleteInquiry(inq._id)}
                            className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-300 transition-all cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredInquiries.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-neutral-400">
                          No inquiries found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MONGODB CLOUD & SYSTEM DIAGNOSTICS */}
        {activeTab === 'database' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0b1c16] rounded-2xl border border-emerald-900/40 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-700 flex items-center justify-center">
                    <Database className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">MongoDB Atlas Cluster</h3>
                    <p className="text-xs text-emerald-300 font-mono">dooroomimediquip.72damgv.mongodb.net</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-emerald-900/40">
                    <span className="text-neutral-400">Database Name:</span>
                    <span className="text-white font-mono font-semibold">dooroomimediquip</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-emerald-900/40">
                    <span className="text-neutral-400">Connection Status:</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Connected & Operational
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-emerald-900/40">
                    <span className="text-neutral-400">Products in Database:</span>
                    <span className="text-white font-bold">{products.length} Items</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-emerald-900/40">
                    <span className="text-neutral-400">Therapy Centers in Database:</span>
                    <span className="text-white font-bold">{centers.length} Centers</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-emerald-900/40">
                    <span className="text-neutral-400">Testimonials in Database:</span>
                    <span className="text-white font-bold">{testimonials.length} Stories</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-emerald-900/40">
                    <span className="text-neutral-400">Customer Leads in Database:</span>
                    <span className="text-white font-bold">{inquiries.length} Leads</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-900/40 flex items-center justify-between">
                <button
                  onClick={() => {
                    resetToDefaults();
                    notify('Reset to original factory catalogue successfully!');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-950/80 border border-amber-800 hover:bg-amber-900 text-amber-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  Reset to Original Catalog Defaults
                </button>

                <a
                  href="http://localhost:5000/api/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline"
                >
                  <span>Backend Health JSON</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Admin Permissions & Security Note */}
            <div className="bg-[#0b1c16] rounded-2xl border border-emerald-900/40 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Admin Security & Operational Authority</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  You are logged in as the primary global administrator for Dooroomi Mediquip. You possess unconstrained authority to add, update, and delete products, therapy centers, and clinical recovery stories.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-[#07130f] border border-emerald-800/50 space-y-2 text-xs">
                  <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                    Authorized Administrator Credentials
                  </div>
                  <div className="text-neutral-300">
                    <span className="text-neutral-500">Username:</span> <strong className="text-white font-mono">dooroomi</strong>
                  </div>
                  <div className="text-neutral-300">
                    <span className="text-neutral-500">Privileges:</span> <strong className="text-emerald-400">Full Website Add/Delete CMS Access</strong>
                  </div>
                  <div className="text-neutral-300">
                    <span className="text-neutral-500">Headquarters:</span> <strong className="text-white">Gangnam-gu, Seoul · Nawada, New Delhi</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-900/40 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">Dooroomi Co., Ltd. (주식회사 두루미)</span>
                <span className="text-[11px] text-emerald-500 font-medium">Korea CGMP & ISO 22716</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: ADD NEW PRODUCT */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1c16] border border-amber-500/60 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900/60">
              <div className="flex items-center gap-2.5">
                <Package className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Add New Product / Medical Equipment</h3>
              </div>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Product Name (English) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BEDRO Smart-1 Automatic Thermal Massager"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Product Name (Korean)</label>
                  <input
                    type="text"
                    placeholder="e.g. 베드로 스마트-1 척추 온열 마사지기"
                    value={newProduct.nameKo}
                    onChange={(e) => setNewProduct({ ...newProduct, nameKo: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Model Code / SKU *</label>
                  <input
                    type="text"
                    placeholder="e.g. DM-MED01 or DM-B107"
                    value={newProduct.model}
                    onChange={(e) => setNewProduct({ ...newProduct, model: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Category</label>
                  <select
                    value={newProduct.cat}
                    onChange={(e) => {
                      const c = e.target.value;
                      let label = 'Medical Systems & Therapy';
                      if (c === 'series-a') label = 'Series A · Botanicals';
                      if (c === 'series-b') label = 'Series B · Cellular Longevity';
                      if (c === 'series-c') label = 'Flagship Medical Equipment';
                      setNewProduct({ ...newProduct, cat: c, catLabel: label });
                    }}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="series-c">Flagship Medical Equipment</option>
                    <option value="series-b">Series B · Cellular Longevity & Projectors</option>
                    <option value="series-a">Series A · Botanicals & Extracts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Badge</label>
                  <select
                    value={newProduct.badge}
                    onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Flagship">Flagship</option>
                    <option value="Medical Grade">Medical Grade</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="New Launch">New Launch</option>
                    <option value="Clinical Grade">Clinical Grade</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Product Image URL *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ./assets/products/product-real-07.jpeg"
                  value={newProduct.imgUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imgUrl: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
                />

                {/* Quick Presets Picker */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-neutral-400">Presets:</span>
                  <button
                    type="button"
                    onClick={() => setNewProduct({ ...newProduct, imgUrl: './assets/products/product-real-07.jpeg' })}
                    className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 hover:border-amber-400 text-amber-200 cursor-pointer"
                  >
                    9-Sphere Projector (DM-B107)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewProduct({ ...newProduct, imgUrl: './assets/products/product-real-11.jpeg' })}
                    className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 hover:border-amber-400 text-amber-200 cursor-pointer"
                  >
                    BEDRO Smart-1 Bed
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewProduct({ ...newProduct, imgUrl: './assets/products/product-real-12.jpeg' })}
                    className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 hover:border-amber-400 text-amber-200 cursor-pointer"
                  >
                    Taeyangsuk Mat
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewProduct({ ...newProduct, imgUrl: './assets/products/product-real-01.jpeg' })}
                    className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 hover:border-amber-400 text-amber-200 cursor-pointer"
                  >
                    Ginseng Bio-Essence
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Short Description / Summary</label>
                <input
                  type="text"
                  placeholder="e.g. Natural thermal therapy with internal jade projectors and far-infrared moxibustion."
                  value={newProduct.short}
                  onChange={(e) => setNewProduct({ ...newProduct, short: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Full Clinical Description</label>
                <textarea
                  rows="3"
                  placeholder="Detailed medical description, therapeutic indications, and clinical advantages..."
                  value={newProduct.desc}
                  onChange={(e) => setNewProduct({ ...newProduct, desc: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Key Actives / Features (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Natural Taeyangsuk Ceramics, Far-Infrared Heating Matrix, Spinal Traction"
                  value={newProduct.keyActives}
                  onChange={(e) => setNewProduct({ ...newProduct, keyActives: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-emerald-900/60">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold shadow-lg cursor-pointer"
                >
                  Publish Product to Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD NEW THERAPY CENTER */}
      {showAddCenterModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1c16] border border-emerald-500/60 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900/60">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Add New Free Therapy Center</h3>
              </div>
              <button
                onClick={() => setShowAddCenterModal(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCenterSubmit} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bhubaneswar"
                    value={newCenter.city}
                    onChange={(e) => setNewCenter({ ...newCenter, city: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Area / Center Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saheed Nagar Center"
                    value={newCenter.area}
                    onChange={(e) => setNewCenter({ ...newCenter, area: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">State</label>
                  <input
                    type="text"
                    placeholder="e.g. Odisha"
                    value={newCenter.state}
                    onChange={(e) => setNewCenter({ ...newCenter, state: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="e.g. +91 94371 88200"
                    value={newCenter.phone}
                    onChange={(e) => setNewCenter({ ...newCenter, phone: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Full Physical Address *</label>
                <textarea
                  rows="2"
                  required
                  placeholder="Plot number, landmark, road, pincode..."
                  value={newCenter.address}
                  onChange={(e) => setNewCenter({ ...newCenter, address: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Daily Patient Capacity</label>
                  <input
                    type="text"
                    placeholder="e.g. 160+ Patients/Day"
                    value={newCenter.dailyCapacity}
                    onChange={(e) => setNewCenter({ ...newCenter, dailyCapacity: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Operating Hours</label>
                  <input
                    type="text"
                    placeholder="e.g. Mon–Sat: 8:00 AM – 5:00 PM"
                    value={newCenter.timing}
                    onChange={(e) => setNewCenter({ ...newCenter, timing: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-emerald-900/60">
                <button
                  type="button"
                  onClick={() => setShowAddCenterModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-lg cursor-pointer"
                >
                  Add Center to Directory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD NEW TESTIMONIAL */}
      {showAddTestimonialModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1c16] border border-amber-500/60 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900/60">
              <div className="flex items-center gap-2.5">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h3 className="text-base font-bold text-white">Add Patient Recovery Testimonial</h3>
              </div>
              <button
                onClick={() => setShowAddTestimonialModal(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTestimonialSubmit} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Smt. Kmamari Sahoo"
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Age</label>
                  <input
                    type="text"
                    placeholder="e.g. 55 Years"
                    value={newTestimonial.age}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, age: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Maa Mangala Sahi, Bhubaneswar"
                    value={newTestimonial.location}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Disease / Condition Healed</label>
                  <input
                    type="text"
                    placeholder="e.g. Severe Back Pain & Blood Pressure"
                    value={newTestimonial.disease}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, disease: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Therapy Equipment Used</label>
                <input
                  type="text"
                  placeholder="e.g. BEDRO Smart-1 & Taeyangsuk Mat"
                  value={newTestimonial.treatment}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, treatment: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Recovery Quote / Highlight *</label>
                <textarea
                  rows="2"
                  required
                  placeholder="Patient's genuine words of healing..."
                  value={newTestimonial.quote}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Patient Portrait URL</label>
                <input
                  type="text"
                  value={newTestimonial.image}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, image: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-emerald-900/60">
                <button
                  type="button"
                  onClick={() => setShowAddTestimonialModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg cursor-pointer"
                >
                  Publish Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1c16] border border-red-500/60 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center gap-3 text-red-400 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-800 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Confirm Permanent Deletion</h3>
                <p className="text-xs text-neutral-400">Action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 mt-2">
              Are you sure you want to permanently delete <strong className="text-white">"{itemToDelete.name}"</strong> from the website and MongoDB Atlas database?
            </p>

            <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-emerald-900/60">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg cursor-pointer"
              >
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
