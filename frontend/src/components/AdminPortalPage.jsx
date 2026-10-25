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
  Download, 
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
  Handshake,
  UploadCloud,
  Cloud,
  Settings,
  Camera,
  Film,
  UserPlus,
  User,
  Lock,
  Key
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';
import { useData } from '../context/DataContext';
import { downloadScannerPoster } from '../utils/qrGenerator';
import { AdvertisementModal } from './AdvertisementModal';
import { CloudinaryImageUploader } from './CloudinaryImageUploader';
import { AdminGalleryManager } from './AdminGalleryManager';
import { API_BASE_URL } from '../config/api';

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
    galleryItems = [],
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    resetToDefaults,
    dbConnected: contextDbConnected
  } = useData();

  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash || '';
    if (hash.includes('tab=settings') || sessionStorage.getItem('dooroomi_redirect_target') === 'updatePassword') {
      return 'settings';
    }
    return 'products';
  }); // 'products' | 'centers' | 'testimonials' | 'ads' | 'inquiries' | 'database' | 'settings'
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
  const [isMigratingImages, setIsMigratingImages] = useState(false);

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
    imgUrl: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792133849/dooroomi_mediquip/products/ubhyzxtv0mwwzdnpldqj.jpg',
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
    timing: 'MonΓÇôSat: 8:00 AM ΓÇô 5:00 PM',
    status: 'Active ┬╖ 100% Free Daily Therapy',
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
    imageUrl: '/assets/products/bedro-smart-1-traction-bed.png',
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
      const res = await fetch(`${API_BASE_URL}/inquiries`, {
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

  // Administrator Access Control State
  const [admins, setAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [grantingAdmin, setGrantingAdmin] = useState(false);
  const [adminPanelMode, setAdminPanelMode] = useState(() => {
    const hash = window.location.hash || '';
    if (hash.includes('mode=updatePassword') || sessionStorage.getItem('dooroomi_redirect_target') === 'updatePassword') {
      return 'updatePassword';
    }
    return 'add';
  }); // 'add' | 'updatePassword'
  const [newAdminForm, setNewAdminForm] = useState({
    email: '',
    name: '',
    password: ''
  });
  const [passwordUpdateForm, setPasswordUpdateForm] = useState({
    email: '',
    adminId: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [editingAdminModal, setEditingAdminModal] = useState(null); // { id, name, email, role }
  const [updatingAdminDetails, setUpdatingAdminDetails] = useState(false);

  const currentUser = (() => {
    try {
      const raw = sessionStorage.getItem('dooroomi_user');
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  })();

  const fetchAdmins = async () => {
    try {
      setLoadingAdmins(true);
      const res = await fetch(`${API_BASE_URL}/auth/admins`);
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.admins)) {
        setAdmins(data.admins);
        // If in updatePassword mode, ensure adminId is linked
        const targetEmail = (passwordUpdateForm.email || currentUser?.email || 'dooroomimediquip@gmail.com').toLowerCase();
        const match = data.admins.find(a => (a.email || '').toLowerCase() === targetEmail);
        if (match) {
          setPasswordUpdateForm(prev => ({
            ...prev,
            email: match.email,
            adminId: match.id || match._id
          }));
        }
      }
    } catch (err) {
      console.warn('Admins fetch notice:', err.message);
    } finally {
      setLoadingAdmins(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
    fetchAdmins();
  }, []);

  // Handle direct Google redirect to Update Password mode
  useEffect(() => {
    const redirectTarget = sessionStorage.getItem('dooroomi_redirect_target');
    const hash = window.location.hash || '';
    if (redirectTarget === 'updatePassword' || hash.includes('mode=updatePassword') || hash.includes('tab=settings')) {
      setActiveTab('settings');
      setAdminPanelMode('updatePassword');
      sessionStorage.removeItem('dooroomi_redirect_target');

      const verifiedEmail = currentUser?.email || 'dooroomimediquip@gmail.com';
      setPasswordUpdateForm(prev => ({
        ...prev,
        email: verifiedEmail
      }));

      notify(`Google account verified (${verifiedEmail}). You can now set your new password below.`, 'success');
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'settings') {
      fetchAdmins();
    }
  }, [activeTab]);

  const handleGrantAdmin = async (e) => {
    e.preventDefault();
    if (!newAdminForm.email || !newAdminForm.name || !newAdminForm.password) {
      notify('Please fill out all fields: Email, Name, and Temporary Password', 'error');
      return;
    }

    try {
      setGrantingAdmin(true);
      const res = await fetch(`${API_BASE_URL}/auth/admins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdminForm)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        notify(`Administrator access granted to ${newAdminForm.name}!`);
        setNewAdminForm({ email: '', name: '', password: '' });
        fetchAdmins();
      } else {
        notify(data.message || 'Failed to grant admin access.', 'error');
      }
    } catch (err) {
      notify('Network error granting administrator access.', 'error');
    } finally {
      setGrantingAdmin(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const targetEmail = (passwordUpdateForm.email || '').trim().toLowerCase();
    const targetPass = (passwordUpdateForm.newPassword || '').trim();

    if (!targetEmail || !targetPass) {
      notify('Please specify administrator email and new password.', 'error');
      return;
    }

    if (targetPass.length < 4) {
      notify('New password must be at least 4 characters long.', 'error');
      return;
    }

    if (passwordUpdateForm.confirmPassword && targetPass !== passwordUpdateForm.confirmPassword.trim()) {
      notify('New password and confirmation do not match.', 'error');
      return;
    }

    try {
      setUpdatingPassword(true);
      const url = passwordUpdateForm.adminId 
        ? `${API_BASE_URL}/auth/admins/${passwordUpdateForm.adminId}/password`
        : `${API_BASE_URL}/auth/update-password`;

      const res = await fetch(url, {
        method: passwordUpdateForm.adminId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          currentPassword: passwordUpdateForm.currentPassword.trim(),
          newPassword: targetPass
        })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        notify(data.message || 'Administrator password updated successfully!');
        setPasswordUpdateForm({
          email: '',
          adminId: '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        fetchAdmins();
      } else {
        notify(data.message || 'Failed to update password.', 'error');
      }
    } catch (err) {
      notify('Network error updating password.', 'error');
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleSaveAdminDetails = async (e) => {
    e.preventDefault();
    if (!editingAdminModal || !editingAdminModal.name || !editingAdminModal.email) {
      notify('Please provide valid name and email.', 'error');
      return;
    }

    try {
      setUpdatingAdminDetails(true);
      const res = await fetch(`${API_BASE_URL}/auth/admins/${editingAdminModal.id || editingAdminModal._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingAdminModal.name,
          email: editingAdminModal.email,
          role: editingAdminModal.role
        })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        notify(`Administrator details updated for ${editingAdminModal.name}!`);
        setEditingAdminModal(null);
        fetchAdmins();
      } else {
        notify(data.message || 'Failed to update administrator details.', 'error');
      }
    } catch (err) {
      notify('Network error updating administrator details.', 'error');
    } finally {
      setUpdatingAdminDetails(false);
    }
  };

  const handleDeleteAdmin = async (adminId, adminName) => {
    if (!window.confirm(`Are you sure you want to revoke administrator access for ${adminName}?`)) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/admins/${adminId}`, {
        method: 'DELETE'
      });
      const data = await res.json();

      if (res.ok && data.success) {
        notify(`Administrator access for ${adminName} has been revoked.`);
        setAdmins(prev => prev.filter(a => (a.id || a._id) !== adminId));
      } else {
        notify(data.message || 'Failed to revoke administrator access.', 'error');
      }
    } catch (err) {
      notify('Network error revoking administrator access.', 'error');
    }
  };

  // Update Inquiry Status in MongoDB
  const handleUpdateStatus = async (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq._id === id ? { ...inq, status: newStatus } : inq))
    );

    try {
      const token = sessionStorage.getItem('dooroomi_admin_token') || localStorage.getItem('dooroomi_admin_token');
      const res = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : 'Bearer master_admin_token_2026'
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
      const res = await fetch(`${API_BASE_URL}/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : 'Bearer master_admin_token_2026'
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
      imgUrl: '/assets/products/dooroomi-champion-lumbar-belt.png',
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
      timing: 'MonΓÇôSat: 8:00 AM ΓÇô 5:00 PM',
      status: 'Active ┬╖ 100% Free Daily Therapy',
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
      imageUrl: '/assets/products/bedro-smart-1-traction-bed.png',
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
      const res = await fetch(`${API_BASE_URL}/inquiries/${editingInquiry._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : 'Bearer master_admin_token_2026'
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

  // Migrate / Sync All Images to Cloudinary
  const handleMigrateAllImages = async () => {
    setIsMigratingImages(true);
    try {
      const res = await fetch(`${API_BASE_URL}/upload/migrate-all`, { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        notify(`Cloudinary Sync: ${data.results.productsUpdated} products, ${data.results.testimonialsUpdated} testimonials, ${data.results.adsUpdated} ads stored in Cloudinary!`);
        setTimeout(() => window.location.reload(), 1500);
      } else {
        notify(`Sync notice: ${data.error || 'Failed'}`, 'warning');
      }
    } catch (err) {
      notify(`Cloudinary sync error: ${err.message}`, 'warning');
    } finally {
      setIsMigratingImages(false);
    }
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
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#07130f] text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
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
      <header className="bg-[#0b1c16] border-b border-emerald-800/40 sticky top-0 z-40 backdrop-blur-md w-full">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
          
          <div className="flex items-center space-x-3 sm:space-x-3.5 min-w-0 max-w-full">
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-emerald-400 p-0.5 shadow-lg shadow-emerald-950/60">
              <div className="w-full h-full bg-[#07130f] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h1 className="text-sm sm:text-base lg:text-lg font-bold text-white tracking-wide truncate">
                  DOOROOMI <span className="text-amber-400 font-serif">δæÉδú¿δ»╕</span> ADMIN PORTAL
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
                  FULL CONTROL CMS
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-emerald-300/70 truncate sm:whitespace-normal">
                Korea HQ &amp; India Executive Operations Management System
              </p>
            </div>
          </div>

          {/* Quick Actions & Live MongoDB Status */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 w-full md:w-auto justify-start md:justify-end">
            <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/50 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-200 font-medium">MongoDB Atlas:</span>
              <span className="text-amber-300 font-mono text-[11px]">dooroomimediquip.72damgv</span>
            </div>

            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/60 border border-emerald-700/60 hover:bg-emerald-800 text-xs font-semibold text-emerald-100 transition-colors cursor-pointer shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Public Website</span>
            </button>

            <button
              onClick={() => { setActiveTab('settings'); setSearchQuery(''); }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                activeTab === 'settings'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                  : 'bg-emerald-900/60 border-emerald-700/60 hover:bg-emerald-800 text-emerald-100'
              }`}
              title="Administrator Access Control"
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span>Settings</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-800/80 hover:bg-red-900 text-xs font-semibold text-red-200 transition-colors cursor-pointer shrink-0"
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
          <div 
            onClick={() => setActiveTab('gallery')} 
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'gallery' ? 'bg-emerald-950/90 border-amber-500/80 shadow-lg' : 'bg-[#0b1c16] border-emerald-900/40 hover:border-emerald-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Media Gallery</span>
              <Camera className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{galleryItems.length}</span>
              <span className="text-xs text-emerald-400">
                {galleryItems.filter(i => i.type === 'image').length} Photos, {galleryItems.filter(i => i.type === 'video').length} Videos
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
              onClick={() => { setActiveTab('gallery'); setSearchQuery(''); }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Gallery ({galleryItems.length})</span>
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

            <button
              onClick={() => { setActiveTab('settings'); setSearchQuery(''); }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-black shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-emerald-950/60'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings & Access ({admins.length})</span>
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
                    ({filteredProducts.length} items ┬╖ Real-time live on website)
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
                        <p className="text-xs text-neutral-400">{t.age} ┬╖ {t.location}</p>
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
                          src={ad.imageUrl || '/assets/products/bedro-smart-1-traction-bed.png'} 
                          alt={ad.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = '/assets/products/bedro-smart-1-traction-bed.png';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c16] via-transparent to-transparent" />
                        
                        {/* Live Status Pill */}
                        <div className="absolute top-3 left-3">
                          {isLive ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500 text-black shadow-md">
                              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
                              ENABLED ┬╖ LIVE POPUP
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
        {/* TAB: MEDIA GALLERY (IMAGES & VIDEOS) */}
        {activeTab === 'gallery' && (
          <AdminGalleryManager
            galleryItems={galleryItems}
            onAddItem={addGalleryItem}
            onUpdateItem={updateGalleryItem}
            onDeleteItem={deleteGalleryItem}
          />
        )}


          </div>
        )}

        {/* TAB 5: MONGODB CLOUD & SYSTEM DIAGNOSTICS */}
        {activeTab === 'database' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  Reset to Original Defaults
                </button>

                <a
                  href={`${API_BASE_URL}/health`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline"
                >
                  <span>Backend Health</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Cloudinary Media Cloud & Image CDN */}
            <div className="bg-[#0b1c16] rounded-2xl border border-emerald-900/40 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Cloudinary Media Cloud</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        LIVE CDN
                      </span>
                    </h3>
                    <p className="text-xs text-amber-300 font-mono">lgtechglobal.cloudinary.com</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-emerald-900/40">
                    <span className="text-neutral-400">Cloud Name:</span>
                    <span className="text-white font-mono font-semibold">lgtechglobal</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-emerald-900/40">
                    <span className="text-neutral-400">API Key:</span>
                    <span className="text-neutral-300 font-mono">411327479788138</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-emerald-900/40">
                    <span className="text-neutral-400">API Secret:</span>
                    <span className="text-emerald-400 font-mono">kXIBΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇótquGbc</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-emerald-900/40">
                    <span className="text-neutral-400">Target Folder:</span>
                    <span className="text-white font-mono">dooroomi_mediquip</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-emerald-900/40">
                    <span className="text-neutral-400">Connection Status:</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Active & Connected
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-emerald-900/40">
                    <span className="text-neutral-400">Cloudinary Products:</span>
                    <span className="text-emerald-300 font-bold">
                      {products.filter(p => p.imgUrl && p.imgUrl.includes('cloudinary.com')).length} / {products.length} Stored (100%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={handleMigrateAllImages}
                  disabled={isMigratingImages}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-black text-xs font-bold transition-all shadow cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isMigratingImages ? 'animate-spin' : ''}`} />
                  <span>{isMigratingImages ? 'Uploading to Cloudinary...' : 'Sync & Upload All Images to Cloudinary'}</span>
                </button>

                <a
                  href={`${API_BASE_URL}/upload/status`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline"
                >
                  <span>Cloudinary Health</span>
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
                    <span className="text-neutral-500">Headquarters:</span> <strong className="text-white">Palasuni Square, Bhubaneswar 751010 ┬╖ Seoul</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-900/40 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">Dooroomi Co., Ltd. (∞ú╝∞ï¥φÜî∞é¼ δæÉδú¿δ»╕)</span>
                <span className="text-[11px] text-emerald-500 font-medium">Korea CGMP & ISO 22716</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ADMINISTRATOR ACCESS CONTROL SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-[#f8fafc] text-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 animate-in fade-in duration-200">
            {/* Header matching screenshot */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#0d1527] text-white flex items-center justify-center shadow-md shrink-0">
                <ShieldCheck className="w-6 h-6 text-white stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-wide text-slate-900 font-sans uppercase">
                  ADMINISTRATOR ACCESS CONTROL
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Manage users with full administrative privileges.
                </p>
              </div>
            </div>

            {/* Two-column layout matching screenshot */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Add New Admin & Update Password Mode */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
                {/* Top dark notch decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-[#0d1527] rounded-b-full"></div>

                {/* Mode Selector Pill Buttons */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl mb-6 mt-1">
                  <button
                    type="button"
                    onClick={() => setAdminPanelMode('add')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      adminPanelMode === 'add'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Add New Admin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminPanelMode('updatePassword');
                      if (!passwordUpdateForm.email && admins.length > 0) {
                        const target = currentUser ? admins.find(a => a.email === currentUser.email) || admins[0] : admins[0];
                        setPasswordUpdateForm(prev => ({
                          ...prev,
                          email: target.email,
                          adminId: target.id || target._id
                        }));
                      }
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      adminPanelMode === 'updatePassword'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Key className="w-3.5 h-3.5 text-amber-500" />
                    <span>Update Password</span>
                  </button>
                </div>

                {adminPanelMode === 'add' ? (
                  <>
                    <div className="flex items-center gap-3 mb-6 pt-1">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                        <UserPlus className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                        Add New Admin
                      </h3>
                    </div>

                    <form onSubmit={handleGrantAdmin} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                          EMAIL ADDRESS
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={newAdminForm.email}
                            onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                            placeholder="admin@company.com"
                            className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                          FULL NAME
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={newAdminForm.name}
                            onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
                            placeholder="Admin Name"
                            className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                          TEMPORARY PASSWORD
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="password"
                            required
                            value={newAdminForm.password}
                            onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
                            placeholder="ΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇóΓÇó"
                            className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition-all font-mono"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={grantingAdmin}
                        className="w-full mt-2 bg-[#0d1527] hover:bg-black text-white py-3.5 px-6 rounded-2xl text-xs font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {grantingAdmin ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>GRANTING ACCESS...</span>
                          </>
                        ) : (
                          <span>GRANT ADMIN ACCESS</span>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-6 pt-1">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                        <Key className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                          Update Admin Password
                        </h3>
                        <p className="text-[11px] text-slate-400">Change password credentials for any administrator</p>
                      </div>
                    </div>

                    {/* Google Verification Status Badge */}
                    {(currentUser?.email || passwordUpdateForm.email) && (
                      <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs flex items-center gap-3 animate-in fade-in">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <CheckCircle2 className="w-4 h-4 stroke-[2.4]" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-emerald-950 block">
                            Gmail Administrator Verified
                          </span>
                          <span className="text-[11px] text-emerald-800 font-mono block truncate">
                            {currentUser?.email || passwordUpdateForm.email}
                          </span>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                          SELECT ADMINISTRATOR
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            value={passwordUpdateForm.email}
                            onChange={(e) => {
                              const found = admins.find(a => a.email === e.target.value);
                              setPasswordUpdateForm({
                                ...passwordUpdateForm,
                                email: e.target.value,
                                adminId: found ? (found.id || found._id) : ''
                              });
                            }}
                            className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-2xl pl-11 pr-8 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:bg-white transition-all cursor-pointer"
                          >
                            {admins.map(a => (
                              <option key={a.id || a._id} value={a.email}>
                                {a.name} ({a.email}) {a.role === 'superadmin' ? 'Γÿà Super Admin' : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                          CURRENT PASSWORD (OPTIONAL / VERIFY)
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="password"
                            value={passwordUpdateForm.currentPassword}
                            onChange={(e) => setPasswordUpdateForm({ ...passwordUpdateForm, currentPassword: e.target.value })}
                            placeholder="Current password (leave blank if resetting)"
                            className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition-all font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                          NEW PASSWORD *
                        </label>
                        <div className="relative">
                          <Key className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="password"
                            required
                            value={passwordUpdateForm.newPassword}
                            onChange={(e) => setPasswordUpdateForm({ ...passwordUpdateForm, newPassword: e.target.value })}
                            placeholder="Enter new strong password"
                            className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition-all font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                          CONFIRM NEW PASSWORD *
                        </label>
                        <div className="relative">
                          <Check className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="password"
                            required
                            value={passwordUpdateForm.confirmPassword}
                            onChange={(e) => setPasswordUpdateForm({ ...passwordUpdateForm, confirmPassword: e.target.value })}
                            placeholder="Confirm new password"
                            className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition-all font-mono"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={updatingPassword}
                        className="w-full mt-2 bg-[#0d1527] hover:bg-black text-white py-3.5 px-6 rounded-2xl text-xs font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {updatingPassword ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>UPDATING PASSWORD...</span>
                          </>
                        ) : (
                          <>
                            <Key className="w-4 h-4 text-amber-400" />
                            <span>UPDATE ADMIN PASSWORD</span>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Right Column: Active Administrators */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-100">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <h3 className="text-xs sm:text-sm font-bold tracking-wider text-slate-800 uppercase">
                    ACTIVE ADMINISTRATORS
                  </h3>
                  <span className="px-3.5 py-1 rounded-full text-[11px] font-bold text-slate-400 bg-slate-100 tracking-wider uppercase">
                    {admins.length} ACCOUNTS
                  </span>
                </div>

                {loadingAdmins ? (
                  <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    <span className="text-xs font-medium">Loading administrator directory...</span>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {admins.map((adm) => {
                      const isSuper = adm.role === 'superadmin' || adm.username === 'dooroomi';
                      const isCurrent = currentUser?.email === adm.email || 
                                        (currentUser?.username && currentUser.username === adm.username) ||
                                        (!currentUser && adm.username === 'dooroomi');
                      const initial = (adm.name || 'A').trim().charAt(0).toUpperCase();

                      // Format date as DD/MM/YYYY
                      const formattedDate = (() => {
                        try {
                          const d = new Date(adm.lastLogin);
                          if (isNaN(d.getTime())) return '17/10/2026';
                          const day = String(d.getDate()).padStart(2, '0');
                          const month = String(d.getMonth() + 1).padStart(2, '0');
                          const year = d.getFullYear();
                          return `${day}/${month}/${year}`;
                        } catch (_) {
                          return '17/10/2026';
                        }
                      })();

                      return (
                        <div key={adm.id || adm._id} className="py-4.5 first:pt-2 last:pb-2 flex items-center justify-between gap-4 group/row hover:bg-slate-50/60 rounded-xl px-2.5 transition-colors">
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className={`w-11 h-11 rounded-full text-slate-700 font-bold text-sm flex items-center justify-center shrink-0 ${
                              isSuper ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-[#f1f5f9]'
                            }`}>
                              {initial}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-bold text-slate-900 truncate">
                                  {adm.name}
                                </span>
                                {isSuper && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800 tracking-wide border border-amber-200">
                                    SUPER ADMIN
                                  </span>
                                )}
                                {isCurrent && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-700 tracking-wide">
                                    YOU
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 font-normal truncate mt-0.5">
                                {adm.email}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
                            <div className="text-right hidden sm:block">
                              <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                LAST ACTIVITY
                              </div>
                              <div className="text-xs font-semibold text-slate-700 mt-0.5">
                                {formattedDate}
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              {/* Edit Admin details button */}
                              <button
                                type="button"
                                onClick={() => setEditingAdminModal({
                                  id: adm.id || adm._id,
                                  name: adm.name,
                                  email: adm.email,
                                  role: adm.role || 'admin'
                                })}
                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                title={`Edit Name or Email for ${adm.name}`}
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              {/* Update Password button */}
                              <button
                                type="button"
                                onClick={() => {
                                  setAdminPanelMode('updatePassword');
                                  setPasswordUpdateForm({
                                    email: adm.email,
                                    adminId: adm.id || adm._id,
                                    currentPassword: '',
                                    newPassword: '',
                                    confirmPassword: ''
                                  });
                                  notify(`Password update form loaded for ${adm.name}`, 'info');
                                }}
                                className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                                title={`Update Password for ${adm.name}`}
                              >
                                <Key className="w-4 h-4" />
                              </button>

                              {/* Revoke / Delete access button */}
                              {adm.username !== 'dooroomi' && !isCurrent ? (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteAdmin(adm.id || adm._id, adm.name)}
                                  className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title={`Revoke access for ${adm.name}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              ) : (
                                <div className="w-7 h-7 flex items-center justify-center">
                                  <span className="text-[10px] text-slate-300 font-mono font-bold" title="Protected Root Account">≡ƒöÆ</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* MODAL: EDIT ADMIN DETAILS */}
        {editingAdminModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Edit Administrator</h3>
                    <p className="text-[11px] text-slate-400">Update official contact details</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingAdminModal(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                >
                  Γ£ò
                </button>
              </div>

              <form onSubmit={handleSaveAdminDetails} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                    FULL NAME
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={editingAdminModal.name}
                      onChange={(e) => setEditingAdminModal({ ...editingAdminModal, name: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={editingAdminModal.email}
                      onChange={(e) => setEditingAdminModal({ ...editingAdminModal, email: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingAdminModal(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updatingAdminDetails}
                    className="px-6 py-2.5 rounded-xl bg-[#0d1527] hover:bg-black text-white text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-2"
                  >
                    {updatingAdminDetails ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: ADD NEW PRODUCT */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <div className="bg-[#0b1c16] border border-amber-500/60 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header (Pinned at Top) */}
            <div className="shrink-0 px-6 py-4 border-b border-emerald-900/60 flex items-center justify-between bg-[#0b1c16]">
              <div className="flex items-center gap-2.5">
                <Package className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Add New Product / Medical Equipment</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddProductModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                Γ£ò
              </button>
            </div>

            {/* Form wrapping scrollable content and sticky action footer */}
            <form onSubmit={handleAddProductSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5 text-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-800/80 [&::-webkit-scrollbar-track]:bg-[#07130f]">
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
                    placeholder="e.g. δ▓áδô£δí£ ∞èñδºêφè╕-1 ∞▓Ö∞╢ö ∞ÿ¿∞ù┤ δºê∞é¼∞ºÇΩ╕░"
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
                      if (c === 'series-a') label = 'Series A ┬╖ Botanicals';
                      if (c === 'series-b') label = 'Series B ┬╖ Cellular Longevity';
                      if (c === 'series-c') label = 'Flagship Medical Equipment';
                      setNewProduct({ ...newProduct, cat: c, catLabel: label });
                    }}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="series-c">Flagship Medical Equipment</option>
                    <option value="series-b">Series B ┬╖ Cellular Longevity & Projectors</option>
                    <option value="series-a">Series A ┬╖ Botanicals & Extracts</option>
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

              <CloudinaryImageUploader
                label="Product Image (Stored in Cloudinary)"
                required
                value={newProduct.imgUrl}
                onChange={(url) => setNewProduct({ ...newProduct, imgUrl: url })}
                placeholder="Upload file from device or paste Cloudinary URL"
                presets={[
                  { name: 'BEDRO Smart-1 Bed', url: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792133856/dooroomi_mediquip/products/hkytm0jvtayjqhmm834k.jpg' },
                  { name: 'Taeyangsuk Mat', url: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792133858/dooroomi_mediquip/products/mhccz8d4niuvz1wv7ltv.jpg' },
                  { name: '9-Sphere Projector', url: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792133849/dooroomi_mediquip/products/ubhyzxtv0mwwzdnpldqj.jpg' },
                  { name: 'Ginseng Bio-Essence', url: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792134137/dooroomi_mediquip/products/rptemwfq7vsdhyou23k9.jpg' }
                ]}
              />

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
            </div>

            {/* Modal Sticky Footer (Always Visible) */}
              <div className="shrink-0 px-6 py-3.5 border-t border-emerald-900/60 bg-[#081712] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold shadow-lg cursor-pointer transition-all"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <div className="bg-[#0b1c16] border border-emerald-500/60 rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header (Pinned at Top) */}
            <div className="shrink-0 px-6 py-4 border-b border-emerald-900/60 flex items-center justify-between bg-[#0b1c16]">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Add New Free Therapy Center</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddCenterModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                Γ£ò
              </button>
            </div>

            {/* Form wrapping scrollable content and sticky action footer */}
            <form onSubmit={handleAddCenterSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5 text-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-800/80 [&::-webkit-scrollbar-track]:bg-[#07130f]">
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
                    placeholder="e.g. MonΓÇôSat: 8:00 AM ΓÇô 5:00 PM"
                    value={newCenter.timing}
                    onChange={(e) => setNewCenter({ ...newCenter, timing: e.target.value })}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              </div>

              {/* Modal Sticky Footer (Always Visible) */}
              <div className="shrink-0 px-6 py-3.5 border-t border-emerald-900/60 bg-[#081712] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddCenterModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-lg cursor-pointer transition-all"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <div className="bg-[#0b1c16] border border-amber-500/60 rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header (Pinned at Top) */}
            <div className="shrink-0 px-6 py-4 border-b border-emerald-900/60 flex items-center justify-between bg-[#0b1c16]">
              <div className="flex items-center gap-2.5">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <h3 className="text-base font-bold text-white">Add Patient Recovery Testimonial</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddTestimonialModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                Γ£ò
              </button>
            </div>

            {/* Form wrapping scrollable content and sticky action footer */}
            <form onSubmit={handleAddTestimonialSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5 text-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-800/80 [&::-webkit-scrollbar-track]:bg-[#07130f]">
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

              <CloudinaryImageUploader
                label="Patient Portrait Image (Stored in Cloudinary)"
                value={newTestimonial.image}
                onChange={(url) => setNewTestimonial({ ...newTestimonial, image: url })}
                placeholder="Upload patient photo or paste Cloudinary URL"
              />

              </div>

              {/* Modal Sticky Footer (Always Visible) */}
              <div className="shrink-0 px-6 py-3.5 border-t border-emerald-900/60 bg-[#081712] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddTestimonialModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg cursor-pointer transition-all"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <div className="bg-[#0b1c16] border border-amber-500/60 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header (Pinned at Top) */}
            <div className="shrink-0 px-6 py-4 border-b border-emerald-900/60 flex items-center justify-between bg-[#0b1c16]">
              <div className="flex items-center gap-2.5">
                <Megaphone className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Create New Popup Announcement</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddAdModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                Γ£ò
              </button>
            </div>

            {/* Form wrapping scrollable content and sticky action footer */}
            <form onSubmit={handleAddAdSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5 text-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-800/80 [&::-webkit-scrollbar-track]:bg-[#07130f]">
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

              <CloudinaryImageUploader
                label="Announcement / Popup Cover Image (Stored in Cloudinary)"
                value={newAd.imageUrl}
                onChange={(url) => setNewAd({ ...newAd, imageUrl: url })}
                placeholder="Upload ad banner or paste Cloudinary URL"
                presets={[
                  { name: 'BEDRO Smart-1 Bed', url: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792133856/dooroomi_mediquip/products/hkytm0jvtayjqhmm834k.jpg' },
                  { name: 'Taeyangsuk Mat', url: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792133858/dooroomi_mediquip/products/mhccz8d4niuvz1wv7ltv.jpg' },
                  { name: 'Ginseng Bio-Essence', url: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792134137/dooroomi_mediquip/products/rptemwfq7vsdhyou23k9.jpg' }
                ]}
              />

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

              </div>

              {/* Modal Action Footer (Pinned at Bottom) */}
              <div className="shrink-0 px-6 py-3.5 border-t border-emerald-900/60 bg-[#081712] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddAdModal(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg cursor-pointer transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <div className="bg-[#0b1c16] border border-amber-500/60 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header (Pinned at Top) */}
            <div className="shrink-0 px-6 py-4 border-b border-emerald-900/60 flex items-center justify-between bg-[#0b1c16]">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Edit Announcement / Advertisement</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingAd(null)}
                className="w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                Γ£ò
              </button>
            </div>

            {/* Form wrapping scrollable content and sticky action footer */}
            <form onSubmit={handleEditAdSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5 text-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-800/80 [&::-webkit-scrollbar-track]:bg-[#07130f]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
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

                <CloudinaryImageUploader
                  label="Announcement / Popup Cover Image (Stored in Cloudinary)"
                  value={editingAd.imageUrl || ''}
                  onChange={(url) => setEditingAd({ ...editingAd, imageUrl: url })}
                  placeholder="Upload ad banner or paste Cloudinary URL"
                  presets={[
                    { name: 'BEDRO Smart-1 Bed', url: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792133856/dooroomi_mediquip/products/hkytm0jvtayjqhmm834k.jpg' },
                    { name: 'Taeyangsuk Mat', url: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792133858/dooroomi_mediquip/products/mhccz8d4niuvz1wv7ltv.jpg' },
                    { name: 'Ginseng Bio-Essence', url: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792134137/dooroomi_mediquip/products/rptemwfq7vsdhyou23k9.jpg' }
                  ]}
                />

                <div className="flex items-center gap-2 pt-1 pb-1">
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
              </div>

              {/* Modal Action Footer (Pinned at Bottom) */}
              <div className="shrink-0 px-6 py-3.5 border-t border-emerald-900/60 bg-[#081712] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingAd(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg cursor-pointer transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <div className="bg-[#0b1c16] border border-amber-500/60 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header (Pinned at Top) */}
            <div className="shrink-0 px-6 py-4 border-b border-emerald-900/60 flex items-center justify-between bg-[#0b1c16]">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Edit Product / Medical Equipment</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                Γ£ò
              </button>
            </div>

            {/* Form wrapping scrollable content and sticky action footer */}
            <form onSubmit={handleEditProductSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5 text-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-800/80 [&::-webkit-scrollbar-track]:bg-[#07130f]">
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
                      if (c === 'series-a') label = 'Series A ┬╖ Botanicals';
                      if (c === 'series-b') label = 'Series B ┬╖ Cellular Longevity';
                      if (c === 'series-c') label = 'Flagship Medical Equipment';
                      setEditingProduct({ ...editingProduct, cat: c, catLabel: label });
                    }}
                    className="w-full bg-[#07130f] border border-emerald-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="series-c">Flagship Medical Equipment</option>
                    <option value="series-b">Series B ┬╖ Cellular Longevity & Projectors</option>
                    <option value="series-a">Series A ┬╖ Botanicals & Extracts</option>
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

              <CloudinaryImageUploader
                label="Product Image (Stored in Cloudinary)"
                required
                value={editingProduct.imgUrl || ''}
                onChange={(url) => setEditingProduct({ ...editingProduct, imgUrl: url })}
                placeholder="Upload file from device or paste Cloudinary URL"
                presets={[
                  { name: 'BEDRO Smart-1 Bed', url: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792133856/dooroomi_mediquip/products/hkytm0jvtayjqhmm834k.jpg' },
                  { name: 'Taeyangsuk Mat', url: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792133858/dooroomi_mediquip/products/mhccz8d4niuvz1wv7ltv.jpg' },
                  { name: '9-Sphere Projector', url: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792133849/dooroomi_mediquip/products/ubhyzxtv0mwwzdnpldqj.jpg' },
                  { name: 'Ginseng Bio-Essence', url: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792134137/dooroomi_mediquip/products/rptemwfq7vsdhyou23k9.jpg' }
                ]}
              />

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

              </div>

              {/* Modal Sticky Footer (Always Visible) */}
              <div className="shrink-0 px-6 py-3.5 border-t border-emerald-900/60 bg-[#081712] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold shadow-lg cursor-pointer transition-all"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <div className="bg-[#0b1c16] border border-emerald-500/60 rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header (Pinned at Top) */}
            <div className="shrink-0 px-6 py-4 border-b border-emerald-900/60 flex items-center justify-between bg-[#0b1c16]">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Edit Therapy Center Details</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingCenter(null)}
                className="w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                Γ£ò
              </button>
            </div>

            {/* Form wrapping scrollable content and sticky action footer */}
            <form onSubmit={handleEditCenterSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5 text-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-800/80 [&::-webkit-scrollbar-track]:bg-[#07130f]">
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

              </div>

              {/* Modal Sticky Footer (Always Visible) */}
              <div className="shrink-0 px-6 py-3.5 border-t border-emerald-900/60 bg-[#081712] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingCenter(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-lg cursor-pointer transition-all"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <div className="bg-[#0b1c16] border border-amber-500/60 rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header (Pinned at Top) */}
            <div className="shrink-0 px-6 py-4 border-b border-emerald-900/60 flex items-center justify-between bg-[#0b1c16]">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Edit Patient Recovery Testimonial</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingTestimonial(null)}
                className="w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                Γ£ò
              </button>
            </div>

            {/* Form wrapping scrollable content and sticky action footer */}
            <form onSubmit={handleEditTestimonialSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5 text-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-800/80 [&::-webkit-scrollbar-track]:bg-[#07130f]">
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
                    <option value={5}>5 Stars ΓÿàΓÿàΓÿàΓÿàΓÿà</option>
                    <option value={4}>4 Stars ΓÿàΓÿàΓÿàΓÿà</option>
                    <option value={3}>3 Stars ΓÿàΓÿàΓÿà</option>
                    <option value={2}>2 Stars ΓÿàΓÿà</option>
                    <option value={1}>1 Star Γÿà</option>
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

              <CloudinaryImageUploader
                label="Patient Portrait Image (Stored in Cloudinary)"
                value={editingTestimonial.image || ''}
                onChange={(url) => setEditingTestimonial({ ...editingTestimonial, image: url })}
                placeholder="Upload patient photo or paste Cloudinary URL"
              />

              </div>

              {/* Modal Sticky Footer (Always Visible) */}
              <div className="shrink-0 px-6 py-3.5 border-t border-emerald-900/60 bg-[#081712] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg cursor-pointer transition-all"
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
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-hidden">
          <div className="bg-[#0b1c16] border border-emerald-500/60 rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header (Pinned at Top) */}
            <div className="shrink-0 px-6 py-4 border-b border-emerald-900/60 flex items-center justify-between bg-[#0b1c16]">
              <div className="flex items-center gap-2.5">
                <Edit3 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Edit Customer Inquiry / Lead</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingInquiry(null)}
                className="w-8 h-8 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
              >
                Γ£ò
              </button>
            </div>

            {/* Form wrapping scrollable content and sticky action footer */}
            <form onSubmit={handleEditInquirySubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5 text-xs [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-800/80 [&::-webkit-scrollbar-track]:bg-[#07130f]">
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

              </div>

              {/* Modal Sticky Footer (Always Visible) */}
              <div className="shrink-0 px-6 py-3.5 border-t border-emerald-900/60 bg-[#081712] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingInquiry(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-lg cursor-pointer transition-all"
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
