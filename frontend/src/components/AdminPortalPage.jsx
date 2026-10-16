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
  Eye,
  Megaphone,
  ToggleLeft,
  ToggleRight,
  Edit3,
  Handshake
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';
import { useData } from '../context/DataContext';
import { AdvertisementModal } from './AdvertisementModal';

export const AdminPortalPage = ({ onNavigateHome, onLogout }) => {
  const {
    products,
    centers,
    testimonials,
    ads,
    activeAd,
    addProduct,
    deleteProduct,
    updateProduct,
    addCenter,
    deleteCenter,
    updateCenter,
    addTestimonial,
    deleteTestimonial,
    updateTestimonial,
    addAd,
    updateAd,
    toggleAd,
    deleteAd,
    resetToDefaults,
    dbConnected: contextDbConnected
  } = useData();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'centers' | 'testimonials' | 'ads' | 'inquiries' | 'database'
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
  const [showAddAdModal, setShowAddAdModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCenter, setEditingCenter] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editingInquiry, setEditingInquiry] = useState(null);
  const [editingAd, setEditingAd] = useState(null);
  const [previewAdModal, setPreviewAdModal] = useState(null);
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

  // New Advertisement / Popup State
  const [newAd, setNewAd] = useState({
    title: '',
    badge: 'SPECIAL ANNOUNCEMENT',
    subtitle: '',
    description: '',
    imageUrl: '/assets/products/product-real-01.jpeg',
    buttonText: 'Inquire for Franchise',
    buttonLink: '#/therapy',
    buttonActionType: 'franchise',
    isEnabled: true,
    priority: 1,
    discountTag: '100% Free Daily Therapy Model'
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
      const token = sessionStorage.getItem('dooroomi_admin_token') || localStorage.getItem('dooroomi_admin_token');
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
      const token = sessionStorage.getItem('dooroomi_admin_token') || localStorage.getItem('dooroomi_admin_token');
      const res = await fetch(`http://localhost:5000/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
          'x-admin-key': 'dooroomi_admin_2026_master_secret',
          'x-admin-session': 'dooroomi_admin_active'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) {
        throw new Error('Server returned ' + res.status);
      }
      notify(`Inquiry status updated to ${newStatus}`);
    } catch (err) {
      notify('Status updated locally.', 'info');
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    setInquiries((prev) => prev.filter((inq) => inq._id !== id));
    try {
      const token = sessionStorage.getItem('dooroomi_admin_token') || localStorage.getItem('dooroomi_admin_token');
      const res = await fetch(`http://localhost:5000/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
          'x-admin-key': 'dooroomi_admin_2026_master_secret',
          'x-admin-session': 'dooroomi_admin_active'
        }
      });
      if (!res.ok) {
        throw new Error('Server returned ' + res.status);
      }
      notify('Inquiry deleted from MongoDB Atlas database successfully!');
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

  // Submit Add Advertisement
  const handleAddAdSubmit = async (e) => {
    e.preventDefault();
    if (!newAd.title) {
      alert('Please fill in the Announcement / Ad Title');
      return;
    }

    await addAd(newAd);
    setShowAddAdModal(false);
    notify(`Advertisement "${newAd.title}" published!`);
    setNewAd({
      title: '',
      badge: 'SPECIAL ANNOUNCEMENT',
      subtitle: '',
      description: '',
      imageUrl: '/assets/products/product-real-01.jpeg',
      buttonText: 'Inquire for Franchise',
      buttonLink: '#/therapy',
      buttonActionType: 'franchise',
      isEnabled: true,
      priority: 1,
      discountTag: '100% Free Daily Therapy Model'
    });
  };

  // Submit Edit Advertisement
  const handleEditAdSubmit = async (e) => {
    e.preventDefault();
    if (!editingAd || !editingAd.title) {
      alert('Please fill in the Announcement / Ad Title');
      return;
    }

    await updateAd(editingAd.id, editingAd);
    notify(`Advertisement "${editingAd.title}" updated successfully!`);
    setEditingAd(null);
  };

  // Submit Edit Product
  const handleEditProductSubmit = async (e) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name || !editingProduct.imgUrl) {
      alert('Please fill in Product Name and Image URL');
      return;
    }

    try {
      const prodId = editingProduct.id || editingProduct._id;
      const payload = {
        ...editingProduct,
        keyActives: Array.isArray(editingProduct.keyActives) 
          ? editingProduct.keyActives 
          : (editingProduct.keyActives ? editingProduct.keyActives.split(',').map(s => s.trim()).filter(Boolean) : [])
      };
      await updateProduct(prodId, payload);
      notify(`Product "${editingProduct.name}" updated successfully in MongoDB Atlas!`);
      setEditingProduct(null);
    } catch (err) {
      notify(`Update failed: ${err.message}`, 'warning');
    }
  };

  // Submit Edit Therapy Center
  const handleEditCenterSubmit = async (e) => {
    e.preventDefault();
    if (!editingCenter || !editingCenter.city || !editingCenter.area || !editingCenter.address) {
      alert('Please fill in City, Area name, and Address');
      return;
    }

    try {
      const centerId = editingCenter.id || editingCenter._id;
      await updateCenter(centerId, editingCenter);
      notify(`Therapy Center in ${editingCenter.city} (${editingCenter.area}) updated in MongoDB Atlas!`);
      setEditingCenter(null);
    } catch (err) {
      notify(`Update failed: ${err.message}`, 'warning');
    }
  };

  // Submit Edit Testimonial
  const handleEditTestimonialSubmit = async (e) => {
    e.preventDefault();
    if (!editingTestimonial || !editingTestimonial.name || !editingTestimonial.quote) {
      alert('Please fill in Patient Name and Quote');
      return;
    }

    try {
      const testimonialId = editingTestimonial.id || editingTestimonial._id;
      const payload = {
        ...editingTestimonial,
        rating: Number(editingTestimonial.rating) || 5
      };
      await updateTestimonial(testimonialId, payload);
      notify(`Testimonial for ${editingTestimonial.name} updated in MongoDB Atlas!`);
      setEditingTestimonial(null);
    } catch (err) {
      notify(`Update failed: ${err.message}`, 'warning');
    }
  };

  // Submit Edit Inquiry
  const handleEditInquirySubmit = async (e) => {
    e.preventDefault();
    if (!editingInquiry) return;

    try {
      const token = sessionStorage.getItem('dooroomi_admin_token') || localStorage.getItem('dooroomi_admin_token');
      const res = await fetch(`http://localhost:5000/api/inquiries/${editingInquiry._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
          'x-admin-key': 'dooroomi_admin_2026_master_secret',
          'x-admin-session': 'dooroomi_admin_active'
        },
        body: JSON.stringify(editingInquiry)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `Failed to update inquiry (Status ${res.status})`);
      }
      setInquiries((prev) => prev.map(inq => inq._id === editingInquiry._id ? { ...inq, ...editingInquiry } : inq));
      notify(`Inquiry for "${editingInquiry.name}" updated successfully in MongoDB!`);
      setEditingInquiry(null);
    } catch (err) {
      notify(`Inquiry update: ${err.message}`, 'warning');
    }
  };

  // Generic Confirm Delete Action
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    const { type, id, name } = itemToDelete;

    try {
      if (type === 'product') {
        await deleteProduct(id);
        notify(`Product "${name}" successfully deleted from MongoDB Atlas database!`);
      } else if (type === 'center') {
        await deleteCenter(id);
        notify(`Therapy center "${name}" successfully deleted from MongoDB Atlas database!`);
      } else if (type === 'testimonial') {
        await deleteTestimonial(id);
        notify(`Testimonial from "${name}" successfully deleted from MongoDB Atlas database!`);
      } else if (type === 'ad') {
        await deleteAd(id);
        notify(`Advertisement "${name}" successfully deleted from MongoDB Atlas database!`);
      }
    } catch (err) {
      notify(`Notice: ${err.message}. If backend is offline, make sure backend server is running.`, 'warning');
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

  const filteredAds = (ads || []).filter(a => {
    const q = searchQuery.toLowerCase();
    return !q || a.title?.toLowerCase().includes(q) || a.badge?.toLowerCase().includes(q) || a.description?.toLowerCase().includes(q);
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

        {/* 5 Interactive KPI Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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
            onClick={() => setActiveTab('ads')} 
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'ads' ? 'bg-emerald-950/90 border-amber-500/80 shadow-lg' : 'bg-[#0b1c16] border-emerald-900/40 hover:border-emerald-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Popup Ads / Promo</span>
              <Megaphone className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{ads?.length || 0}</span>
              {activeAd && activeAd.isEnabled ? (
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Popup Live
                </span>
              ) : (
                <span className="text-[11px] font-medium text-neutral-400">
                  Disabled
                </span>
              )}
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
              onClick={() => { setActiveTab('ads'); setSearchQuery(''); }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'ads'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Popup Ads ({ads?.length || 0})</span>
              {activeAd && activeAd.isEnabled && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>
              )}
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

            {activeTab === 'ads' && (
              <button
                onClick={() => setShowAddAdModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-bold shadow-md cursor-pointer transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Ad</span>
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

                  {/* Actions: Edit & Delete Buttons */}
                  <div className="mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-mono">
                      ID: {prod.id}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingProduct({ ...prod })}
                        title="Edit Product"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/50 hover:bg-amber-500 hover:text-black text-amber-300 text-xs font-semibold transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

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

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingCenter({ ...c })}
                        title="Edit Therapy Center"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/50 hover:bg-emerald-500 hover:text-black text-emerald-300 text-xs font-semibold transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setItemToDelete({ type: 'center', id: c.id, name: `${c.city} - ${c.area}` })}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-950/70 border border-red-800/60 hover:bg-red-900 text-red-200 text-xs font-medium transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        <span>Delete</span>
                      </button>
                    </div>
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

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingTestimonial({ ...t })}
                        title="Edit Testimonial"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/50 hover:bg-emerald-500 hover:text-black text-emerald-300 text-xs font-semibold transition-all cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setItemToDelete({ type: 'testimonial', id: t.id, name: t.name })}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-950/70 border border-red-800/60 hover:bg-red-900 text-red-200 text-xs font-medium transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        <span>Delete</span>
                      </button>
                    </div>
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
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingInquiry({ ...inq })}
                              className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-300 transition-all cursor-pointer"
                              title="Edit Lead Details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteInquiry(inq._id)}
                              className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-300 transition-all cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
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

        {/* TAB 4: POPUP ANNOUNCEMENTS & ADVERTISEMENTS MANAGEMENT */}
        {activeTab === 'ads' && (
          <div className="flex flex-col gap-6">
            
            {/* Header with Title and Create Button */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-amber-400" />
                  <span>Website Entrance Popup & Announcements</span>
                  <span className="text-xs font-normal text-neutral-400">
                    ({filteredAds.length} announcements configured)
                  </span>
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  When enabled, visitors will see this popup immediately upon opening the website. If you disable it, no popup will show on the user side.
                </p>
              </div>

              <button
                onClick={() => setShowAddAdModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-lg transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Announcement</span>
              </button>
            </div>

            {/* Master Control & Live Website Status Banner */}
            <div className={`p-5 rounded-2xl border transition-all ${
              activeAd && activeAd.isEnabled 
                ? 'bg-gradient-to-r from-emerald-950/80 via-[#0b1c16] to-[#0b1c16] border-emerald-500/60 shadow-lg'
                : 'bg-gradient-to-r from-neutral-900 via-[#0b1c16] to-[#0b1c16] border-neutral-700/60'
            }`}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                    activeAd && activeAd.isEnabled 
                      ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300' 
                      : 'bg-neutral-800 border-neutral-600 text-neutral-400'
                  }`}>
                    {activeAd && activeAd.isEnabled ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-pulse" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-amber-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {activeAd && activeAd.isEnabled ? 'Public Website Popup is Currently ACTIVE' : 'Public Website Popup is Currently DISABLED'}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        activeAd && activeAd.isEnabled 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-neutral-700 text-neutral-300'
                      }`}>
                        {activeAd && activeAd.isEnabled ? 'Live on Website' : 'Off / Hidden'}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 mt-1 max-w-2xl leading-relaxed">
                      {activeAd && activeAd.isEnabled ? (
                        <>
                          Current Active Ad: <strong className="text-amber-400 font-medium">"{activeAd.title}"</strong> ({activeAd.badge}). Visitors will see this popup on arrival and can close it with one click on the "X" cross.
                        </>
                      ) : (
                        'No advertisement popup will appear for visitors. You can enable any announcement below whenever you have an upcoming event, new center opening, or franchise campaign.'
                      )}
                    </p>
                  </div>
                </div>

                {/* Quick Master Actions */}
                <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
                  {activeAd && activeAd.isEnabled ? (
                    <>
                      <button
                        onClick={() => setPreviewAdModal(activeAd)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-900/60 border border-emerald-700/60 hover:bg-emerald-800 text-xs font-semibold text-emerald-100 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-amber-400" />
                        <span>Preview Live Popup</span>
                      </button>

                      <button
                        onClick={() => {
                          toggleAd(activeAd.id);
                          notify('Popup ads turned OFF on website!');
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/80 border border-red-700/60 hover:bg-red-900 text-xs font-bold text-red-200 transition-colors cursor-pointer"
                      >
                        <ToggleRight className="w-4 h-4 text-red-400" />
                        <span>Turn Off Popup Ads</span>
                      </button>
                    </>
                  ) : (
                    filteredAds.length > 0 && (
                      <button
                        onClick={() => {
                          toggleAd(filteredAds[0].id);
                          notify(`Activated "${filteredAds[0].title}" as live popup!`);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-bold shadow-lg transition-all cursor-pointer"
                      >
                        <ToggleLeft className="w-4 h-4" />
                        <span>Enable Featured Ad Now</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Ads Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAds.map((ad) => {
                const isLive = ad.isEnabled;
                return (
                  <div 
                    key={ad.id}
                    className={`bg-[#0b1c16] rounded-2xl border transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
                      isLive 
                        ? 'border-emerald-500 shadow-emerald-950/50' 
                        : 'border-emerald-900/40 hover:border-emerald-700'
                    }`}
                  >
                    <div>
                      {/* Image Thumbnail with Overlay Badges */}
                      <div className="relative w-full h-44 bg-neutral-900 overflow-hidden group">
                        <img 
                          src={ad.imageUrl || '/assets/products/product-real-01.jpeg'} 
                          alt={ad.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = '/assets/products/product-real-01.jpeg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c16] via-transparent to-transparent" />
                        
                        {/* Live Status Pill */}
                        <div className="absolute top-3 left-3">
                          {isLive ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-black shadow-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
                              ENABLED · LIVE POPUP
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-neutral-800/90 text-neutral-400 border border-neutral-700">
                              DISABLED / OFF
                            </span>
                          )}
                        </div>

                        {/* Discount / Highlight Tag */}
                        {ad.discountTag && (
                          <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-extrabold uppercase">
                            {ad.discountTag}
                          </div>
                        )}
                      </div>

                      {/* Content Info */}
                      <div className="p-4 sm:p-5 flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                            {ad.badge || 'SPECIAL ANNOUNCEMENT'}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            Priority #{ad.priority || 1}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white line-clamp-2 leading-snug">
                          {ad.title}
                        </h3>

                        {ad.subtitle && (
                          <p className="text-xs text-amber-200/80 font-medium line-clamp-1">
                            {ad.subtitle}
                          </p>
                        )}

                        {ad.description && (
                          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mt-1">
                            {ad.description}
                          </p>
                        )}

                        {/* Action Details Pill */}
                        <div className="mt-3 p-2 rounded-xl bg-[#07130f] border border-emerald-900/50 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-neutral-300">
                            {ad.buttonActionType === 'franchise' && <Handshake className="w-3.5 h-3.5 text-amber-400" />}
                            {ad.buttonActionType === 'whatsapp' && <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />}
                            {ad.buttonActionType === 'call' && <PhoneCall className="w-3.5 h-3.5 text-blue-400" />}
                            {ad.buttonActionType === 'link' && <ExternalLink className="w-3.5 h-3.5 text-amber-400" />}
                            <span className="text-[11px] font-medium capitalize">
                              Action: {ad.buttonActionType || 'link'}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-amber-300">
                            "{ad.buttonText || 'Learn More'}"
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="p-4 bg-[#07130f]/60 border-t border-emerald-900/50 flex items-center justify-between gap-2">
                      {/* Live Toggle Button */}
                      <button
                        onClick={() => {
                          toggleAd(ad.id);
                          notify(isLive ? `Disabled "${ad.title}"` : `Enabled "${ad.title}" as active popup!`);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isLive
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-600 hover:bg-emerald-900'
                            : 'bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700'
                        }`}
                      >
                        {isLive ? (
                          <>
                            <ToggleRight className="w-4 h-4 text-emerald-400" />
                            <span>Enabled</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-4 h-4 text-neutral-400" />
                            <span>Click to Enable</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => setPreviewAdModal(ad)}
                          className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-300 transition-all cursor-pointer"
                          title="Preview Live Modal"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setEditingAd(ad)}
                          className="p-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-800/60 text-amber-300 transition-all cursor-pointer"
                          title="Edit Advertisement"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setItemToDelete({ type: 'ad', id: ad.id, name: ad.title })}
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-300 transition-all cursor-pointer"
                          title="Delete Advertisement"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}

              {filteredAds.length === 0 && (
                <div className="col-span-full py-12 text-center bg-[#0b1c16] rounded-2xl border border-emerald-900/40 p-6">
                  <Megaphone className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-neutral-300">No advertisements found</p>
                  <p className="text-xs text-neutral-500 mt-1">Create your first special announcement or popup campaign above.</p>
                </div>
              )}
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

      {/* MODAL: CREATE NEW ADVERTISEMENT */}
      {showAddAdModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1c16] border border-amber-500/60 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900/60">
              <div className="flex items-center gap-2.5">
                <Megaphone className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Create New Popup Announcement</h3>
              </div>
              <button
                onClick={() => setShowAddAdModal(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddAdSubmit} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Badge Tag *</label>
                  <input
                    type="text"
                    value={newAd.badge}
                    onChange={(e) => setNewAd({ ...newAd, badge: e.target.value })}
                    placeholder="e.g. EXCLUSIVE OPPORTUNITY"
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Discount / Highlight Tag</label>
                  <input
                    type="text"
                    value={newAd.discountTag}
                    onChange={(e) => setNewAd({ ...newAd, discountTag: e.target.value })}
                    placeholder="e.g. 100% Free Daily Therapy Model"
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Announcement Title *</label>
                <input
                  type="text"
                  value={newAd.title}
                  onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                  placeholder="e.g. DOOROOMI Official Franchise & Health Center Partner Program 2026"
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Subtitle</label>
                <input
                  type="text"
                  value={newAd.subtitle}
                  onChange={(e) => setNewAd({ ...newAd, subtitle: e.target.value })}
                  placeholder="e.g. Expand Korea's Leading Medical Equipment & Free Daily Therapy Centers Across India"
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Description / Details</label>
                <textarea
                  rows="3"
                  value={newAd.description}
                  onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                  placeholder="Detailed announcement text..."
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Button Action Type</label>
                  <select
                    value={newAd.buttonActionType}
                    onChange={(e) => setNewAd({ ...newAd, buttonActionType: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="franchise">Open Franchise Modal (Handshake)</option>
                    <option value="whatsapp">Direct WhatsApp Chat</option>
                    <option value="link">Website Section Link</option>
                    <option value="call">Direct Phone Call</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Button Text</label>
                  <input
                    type="text"
                    value={newAd.buttonText}
                    onChange={(e) => setNewAd({ ...newAd, buttonText: e.target.value })}
                    placeholder="e.g. Inquire for Franchise"
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Target Link (if link)</label>
                  <input
                    type="text"
                    value={newAd.buttonLink}
                    onChange={(e) => setNewAd({ ...newAd, buttonLink: e.target.value })}
                    placeholder="#/therapy"
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Cover Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAd.imageUrl}
                    onChange={(e) => setNewAd({ ...newAd, imageUrl: e.target.value })}
                    className="flex-1 bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] text-neutral-500">Quick Presets:</span>
                  <button
                    type="button"
                    onClick={() => setNewAd({ ...newAd, imageUrl: '/assets/products/product-real-01.jpeg' })}
                    className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-[10px] text-emerald-300 hover:bg-emerald-900 cursor-pointer"
                  >
                    Medical Bed 01
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewAd({ ...newAd, imageUrl: '/assets/products/product-real-02.jpeg' })}
                    className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-[10px] text-emerald-300 hover:bg-emerald-900 cursor-pointer"
                  >
                    Super Mat 02
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewAd({ ...newAd, imageUrl: '/assets/products/product-real-07.jpeg' })}
                    className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-[10px] text-emerald-300 hover:bg-emerald-900 cursor-pointer"
                  >
                    Clinical Bed 07
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="enableImmediate"
                  checked={newAd.isEnabled}
                  onChange={(e) => setNewAd({ ...newAd, isEnabled: e.target.checked })}
                  className="rounded border-emerald-800 text-amber-500 focus:ring-amber-400 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="enableImmediate" className="text-neutral-200 cursor-pointer font-medium">
                  Set as Active Live Popup immediately on DOOROOMIMEDIQUIP.COM
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-emerald-900/60">
                <button
                  type="button"
                  onClick={() => setShowAddAdModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg cursor-pointer"
                >
                  Save & Publish Ad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT ADVERTISEMENT */}
      {editingAd && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1c16] border border-amber-500/60 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900/60">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Edit Announcement / Advertisement</h3>
              </div>
              <button
                onClick={() => setEditingAd(null)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditAdSubmit} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Badge Tag *</label>
                  <input
                    type="text"
                    value={editingAd.badge || ''}
                    onChange={(e) => setEditingAd({ ...editingAd, badge: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Discount / Highlight Tag</label>
                  <input
                    type="text"
                    value={editingAd.discountTag || ''}
                    onChange={(e) => setEditingAd({ ...editingAd, discountTag: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Announcement Title *</label>
                <input
                  type="text"
                  value={editingAd.title || ''}
                  onChange={(e) => setEditingAd({ ...editingAd, title: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Subtitle</label>
                <input
                  type="text"
                  value={editingAd.subtitle || ''}
                  onChange={(e) => setEditingAd({ ...editingAd, subtitle: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Description / Details</label>
                <textarea
                  rows="3"
                  value={editingAd.description || ''}
                  onChange={(e) => setEditingAd({ ...editingAd, description: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Button Action Type</label>
                  <select
                    value={editingAd.buttonActionType || 'link'}
                    onChange={(e) => setEditingAd({ ...editingAd, buttonActionType: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="franchise">Open Franchise Modal (Handshake)</option>
                    <option value="whatsapp">Direct WhatsApp Chat</option>
                    <option value="link">Website Section Link</option>
                    <option value="call">Direct Phone Call</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Button Text</label>
                  <input
                    type="text"
                    value={editingAd.buttonText || ''}
                    onChange={(e) => setEditingAd({ ...editingAd, buttonText: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Target Link (if link)</label>
                  <input
                    type="text"
                    value={editingAd.buttonLink || ''}
                    onChange={(e) => setEditingAd({ ...editingAd, buttonLink: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editingAd.imageUrl || ''}
                  onChange={(e) => setEditingAd({ ...editingAd, imageUrl: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="editEnableToggle"
                  checked={!!editingAd.isEnabled}
                  onChange={(e) => setEditingAd({ ...editingAd, isEnabled: e.target.checked })}
                  className="rounded border-emerald-800 text-amber-500 focus:ring-amber-400 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="editEnableToggle" className="text-neutral-200 cursor-pointer font-medium">
                  Enable as Live Popup on Website
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-emerald-900/60">
                <button
                  type="button"
                  onClick={() => setEditingAd(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LIVE PREVIEW OF POPUP */}
      {previewAdModal && (
        <AdvertisementModal
          forceOpen={true}
          previewAd={previewAdModal}
          onClosePreview={() => setPreviewAdModal(null)}
          onOpenFranchise={() => notify('Preview: Official Franchise Dialog opened!')}
        />
      )}

      {/* MODAL: EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1c16] border border-amber-500/60 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900/60">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Edit Product / Medical Equipment</h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditProductSubmit} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Product Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Product Name (Korean)</label>
                  <input
                    type="text"
                    value={editingProduct.nameKo || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, nameKo: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Model Code / SKU</label>
                  <input
                    type="text"
                    value={editingProduct.model || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, model: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Category</label>
                  <select
                    value={editingProduct.cat || 'series-c'}
                    onChange={(e) => {
                      const c = e.target.value;
                      let label = 'Medical Systems & Therapy';
                      if (c === 'series-a') label = 'Series A · Botanicals';
                      if (c === 'series-b') label = 'Series B · Cellular Longevity';
                      if (c === 'series-c') label = 'Flagship Medical Equipment';
                      setEditingProduct({ ...editingProduct, cat: c, catLabel: label });
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
                    value={editingProduct.badge || 'Medical Grade'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
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
                  value={editingProduct.imgUrl || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imgUrl: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
                />

                {/* Quick Presets Picker */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-neutral-400">Presets:</span>
                  <button
                    type="button"
                    onClick={() => setEditingProduct({ ...editingProduct, imgUrl: './assets/products/product-real-07.jpeg' })}
                    className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 hover:border-amber-400 text-amber-200 cursor-pointer"
                  >
                    9-Sphere Projector (DM-B107)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProduct({ ...editingProduct, imgUrl: './assets/products/product-real-11.jpeg' })}
                    className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 hover:border-amber-400 text-amber-200 cursor-pointer"
                  >
                    BEDRO Smart-1 Bed
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProduct({ ...editingProduct, imgUrl: './assets/products/product-real-12.jpeg' })}
                    className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 hover:border-amber-400 text-amber-200 cursor-pointer"
                  >
                    Taeyangsuk Mat
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProduct({ ...editingProduct, imgUrl: './assets/products/product-real-01.jpeg' })}
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
                  value={editingProduct.short || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, short: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Full Clinical Description</label>
                <textarea
                  rows="3"
                  value={editingProduct.desc || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, desc: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Key Actives / Features (comma-separated)</label>
                <input
                  type="text"
                  value={Array.isArray(editingProduct.keyActives) ? editingProduct.keyActives.join(', ') : (editingProduct.keyActives || '')}
                  onChange={(e) => setEditingProduct({ ...editingProduct, keyActives: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-emerald-900/60">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold shadow-lg cursor-pointer"
                >
                  Save Changes & Update MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT THERAPY CENTER */}
      {editingCenter && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1c16] border border-emerald-500/60 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900/60">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Edit Therapy Center Details</h3>
              </div>
              <button
                onClick={() => setEditingCenter(null)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditCenterSubmit} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={editingCenter.city || ''}
                    onChange={(e) => setEditingCenter({ ...editingCenter, city: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Area / Center Name *</label>
                  <input
                    type="text"
                    required
                    value={editingCenter.area || ''}
                    onChange={(e) => setEditingCenter({ ...editingCenter, area: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">State</label>
                  <input
                    type="text"
                    value={editingCenter.state || ''}
                    onChange={(e) => setEditingCenter({ ...editingCenter, state: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editingCenter.phone || ''}
                    onChange={(e) => setEditingCenter({ ...editingCenter, phone: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Full Physical Address *</label>
                <textarea
                  rows="2"
                  required
                  value={editingCenter.address || ''}
                  onChange={(e) => setEditingCenter({ ...editingCenter, address: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Daily Patient Capacity</label>
                  <input
                    type="text"
                    value={editingCenter.dailyCapacity || ''}
                    onChange={(e) => setEditingCenter({ ...editingCenter, dailyCapacity: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Operating Hours</label>
                  <input
                    type="text"
                    value={editingCenter.timing || ''}
                    onChange={(e) => setEditingCenter({ ...editingCenter, timing: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-emerald-900/60">
                <button
                  type="button"
                  onClick={() => setEditingCenter(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-lg cursor-pointer"
                >
                  Save Changes & Update MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT TESTIMONIAL */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1c16] border border-amber-500/60 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900/60">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Edit Patient Recovery Testimonial</h3>
              </div>
              <button
                onClick={() => setEditingTestimonial(null)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditTestimonialSubmit} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Patient Name *</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.name || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Age</label>
                  <input
                    type="text"
                    value={editingTestimonial.age || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, age: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={editingTestimonial.location || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Disease / Condition Healed</label>
                  <input
                    type="text"
                    value={editingTestimonial.disease || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, disease: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Therapy Equipment Used</label>
                  <input
                    type="text"
                    value={editingTestimonial.treatment || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, treatment: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Star Rating (1 - 5)</label>
                  <select
                    value={editingTestimonial.rating || 5}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★</option>
                    <option value={3}>3 Stars ★★★</option>
                    <option value={2}>2 Stars ★★</option>
                    <option value={1}>1 Star ★</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Recovery Quote / Highlight *</label>
                <textarea
                  rows="3"
                  required
                  value={editingTestimonial.quote || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Patient Portrait URL</label>
                <input
                  type="text"
                  value={editingTestimonial.image || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, image: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-emerald-900/60">
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg cursor-pointer"
                >
                  Save Changes & Update MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT CUSTOMER INQUIRY / LEAD */}
      {editingInquiry && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b1c16] border border-emerald-500/60 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900/60">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Edit Customer Inquiry / Lead</h3>
              </div>
              <button
                onClick={() => setEditingInquiry(null)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditInquirySubmit} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={editingInquiry.name || ''}
                    onChange={(e) => setEditingInquiry({ ...editingInquiry, name: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editingInquiry.phone || ''}
                    onChange={(e) => setEditingInquiry({ ...editingInquiry, phone: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editingInquiry.email || ''}
                    onChange={(e) => setEditingInquiry({ ...editingInquiry, email: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={editingInquiry.company || ''}
                    onChange={(e) => setEditingInquiry({ ...editingInquiry, company: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Inquiry Type</label>
                  <select
                    value={editingInquiry.type || 'General Inquiry'}
                    onChange={(e) => setEditingInquiry({ ...editingInquiry, type: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Free Therapy Session">Free Therapy Session</option>
                    <option value="Franchise / Dealership">Franchise / Dealership</option>
                    <option value="Equipment Purchase">Equipment Purchase</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Status</label>
                  <select
                    value={editingInquiry.status || 'Pending'}
                    onChange={(e) => setEditingInquiry({ ...editingInquiry, status: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400 font-semibold"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Product Interest</label>
                <input
                  type="text"
                  value={editingInquiry.productInterest || ''}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, productInterest: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Message / Inquiry Details</label>
                <textarea
                  rows="3"
                  value={editingInquiry.message || ''}
                  onChange={(e) => setEditingInquiry({ ...editingInquiry, message: e.target.value })}
                  className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-emerald-900/60">
                <button
                  type="button"
                  onClick={() => setEditingInquiry(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-lg cursor-pointer"
                >
                  Save Changes & Update MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
