import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/siteData';

const DataContext = createContext(null);

const BACKEND_URL = 'http://localhost:5000/api';

const INITIAL_CENTERS = [
  {
    id: "tc-1",
    city: "Bhubaneswar",
    area: "Khandagiri Center",
    state: "Odisha",
    address: "Plot No. 124/A, Near Khandagiri Square, Jagamara Road, Bhubaneswar",
    phone: "+91 94371 88200",
    timing: "Mon–Sat: 8:00 AM – 5:00 PM",
    status: "Active · 100% Free Daily Therapy",
    dailyCapacity: "180+ Patients/Day"
  },
  {
    id: "tc-2",
    city: "Bhubaneswar",
    area: "Patia Infocity Center",
    state: "Odisha",
    address: "HIG-45, Phase-2, Near Infocity Square, Patia, Bhubaneswar",
    phone: "+91 94371 88205",
    timing: "Mon–Sat: 8:00 AM – 5:00 PM",
    status: "Active · 100% Free Daily Therapy",
    dailyCapacity: "160+ Patients/Day"
  },
  {
    id: "tc-3",
    city: "Cuttack",
    area: "Badambadi Center",
    state: "Odisha",
    address: "Link Road, Opp. Reliance Trends, Badambadi, Cuttack",
    phone: "+91 98610 33410",
    timing: "Mon–Sat: 8:30 AM – 5:00 PM",
    status: "Active · 100% Free Daily Therapy",
    dailyCapacity: "150+ Patients/Day"
  },
  {
    id: "tc-4",
    city: "New Delhi",
    area: "Nawada Corporate Center & Factory",
    state: "Delhi NCR",
    address: "Metro Pillar 734, Main Najafgarh Road, Nawada, New Delhi - 110059",
    phone: "1800-419-5278",
    timing: "Mon–Sat: 9:00 AM – 6:00 PM",
    status: "Active · India HQ & Free Therapy",
    dailyCapacity: "220+ Patients/Day"
  },
  {
    id: "tc-5",
    city: "New Delhi",
    area: "Rohini Sector 7 Center",
    state: "Delhi NCR",
    address: "Ayodhya Chowk, Sector 7, Rohini, New Delhi",
    phone: "+91 98110 55432",
    timing: "Mon–Sat: 8:00 AM – 5:00 PM",
    status: "Active · 100% Free Daily Therapy",
    dailyCapacity: "140+ Patients/Day"
  },
  {
    id: "tc-6",
    city: "Kolkata",
    area: "Salt Lake Sector 1 Center",
    state: "West Bengal",
    address: "Block BD, Sector 1, Salt Lake City, Kolkata",
    phone: "+91 98300 44120",
    timing: "Mon–Sat: 8:00 AM – 5:00 PM",
    status: "Active · 100% Free Daily Therapy",
    dailyCapacity: "175+ Patients/Day"
  },
  {
    id: "tc-7",
    city: "Kolkata",
    area: "Howrah Center",
    state: "West Bengal",
    address: "Grand Trunk Road South, Shibpur, Howrah",
    phone: "+91 98310 99870",
    timing: "Mon–Sat: 8:30 AM – 5:00 PM",
    status: "Active · 100% Free Daily Therapy",
    dailyCapacity: "130+ Patients/Day"
  },
  {
    id: "tc-8",
    city: "Rourkela",
    area: "Panposh Road Center",
    state: "Odisha",
    address: "Civil Township, Near Daily Market, Rourkela",
    phone: "+91 94370 66521",
    timing: "Mon–Sat: 8:00 AM – 5:00 PM",
    status: "Active · 100% Free Daily Therapy",
    dailyCapacity: "120+ Patients/Day"
  },
  {
    id: "tc-9",
    city: "Ranchi",
    area: "Harmu Bypass Center",
    state: "Jharkhand",
    address: "Harmu Housing Colony, Near Patel Chowk, Ranchi",
    phone: "+91 94311 77650",
    timing: "Mon–Sat: 8:00 AM – 5:00 PM",
    status: "Active · 100% Free Daily Therapy",
    dailyCapacity: "110+ Patients/Day"
  },
  {
    id: "tc-10",
    city: "Patna",
    area: "Kankarbagh Center",
    state: "Bihar",
    address: "Main Colony Road, Near Tiwary Bechar, Kankarbagh, Patna",
    phone: "+91 93341 22980",
    timing: "Mon–Sat: 8:30 AM – 5:00 PM",
    status: "Active · 100% Free Daily Therapy",
    dailyCapacity: "140+ Patients/Day"
  },
  {
    id: "tc-11",
    city: "Lucknow",
    area: "Gomti Nagar Center",
    state: "Uttar Pradesh",
    address: "Vikas Khand, Gomti Nagar, Lucknow",
    phone: "+91 94150 99821",
    timing: "Mon–Sat: 9:00 AM – 5:30 PM",
    status: "Active · 100% Free Daily Therapy",
    dailyCapacity: "150+ Patients/Day"
  },
  {
    id: "tc-12",
    city: "Jaipur",
    area: "Mansarovar Center",
    state: "Rajasthan",
    address: "Madhyam Marg, Sector 5, Mansarovar, Jaipur",
    phone: "+91 98290 66543",
    timing: "Mon–Sat: 8:30 AM – 5:00 PM",
    status: "Active · 100% Free Daily Therapy",
    dailyCapacity: "120+ Patients/Day"
  },
  {
    id: "tc-13",
    city: "Ahmedabad",
    area: "Navrangpura Center",
    state: "Gujarat",
    address: "Near University Road, Navrangpura, Ahmedabad",
    phone: "+91 98250 11234",
    timing: "Mon–Sat: 9:00 AM – 5:30 PM",
    status: "Active · 100% Free Daily Therapy",
    dailyCapacity: "130+ Patients/Day"
  },
  {
    id: "tc-14",
    city: "Bengaluru",
    area: "Jayanagar Center",
    state: "Karnataka",
    address: "4th Block, 11th Main Road, Jayanagar, Bengaluru",
    phone: "+91 98450 77890",
    timing: "Mon–Sat: 8:30 AM – 5:30 PM",
    status: "Active · 100% Free Daily Therapy",
    dailyCapacity: "170+ Patients/Day"
  },
  {
    id: "tc-15",
    city: "Hyderabad",
    area: "Kukatpally Center",
    state: "Telangana",
    address: "KPHB Colony Phase 1, Road No. 1, Kukatpally, Hyderabad",
    phone: "+91 98490 33456",
    timing: "Mon–Sat: 8:30 AM – 5:00 PM",
    status: "Active · 100% Free Daily Therapy",
    dailyCapacity: "150+ Patients/Day"
  }
];

const INITIAL_TESTIMONIALS = [
  {
    id: "p1",
    name: "Smt. Kmamari Sahoo",
    age: "55 Years",
    location: "Maa Mangala Sahi, Bhubaneswar, Odisha",
    disease: "Severe Back Pain & Blood Pressure",
    diseaseKo: "만성 요통 및 고혈압 완치",
    duration: "Suffering for 5 Years",
    treatment: "BEDRO Smart-1 & Thermal Acupressure",
    image: "/assets/testimonials/patient-kmamari-sahoo.jpg",
    rating: 5,
    docPage: 14,
    quote: "After suffering for 5 years with severe Back Pain and High BP, I spent huge amounts on hospital tests with zero relief. At Dooroomi, after 3 months of continuous free therapy, all my problems are cured and now I am living a healthy and happy life!",
    fullStory: "My name is Kmamari Sahoo and my age is 55yrs, I am a resident of Maa Mangala Sahi, Bhubaneswar. Since last 5 yrs, I was suffering from the problem of severe Back Pain & Blood Pressure. After taking continuous therapy on BEDRO Smart-1 for 3 months, all my problems are cured and now I am living a healthy and happy life."
  },
  {
    id: "p2",
    name: "Sri Ramesh Chandra Jena",
    age: "74 Years",
    location: "Jagamara, Bhubaneswar, Odisha",
    disease: "Asthma, Blood Pressure & Knee Pain",
    diseaseKo: "천식 · 혈압 및 무릎 관절염 완치",
    duration: "Suffering for 6 Years",
    treatment: "BEDRO Smart-1 (2 Months Therapy)",
    image: "/assets/testimonials/patient-ramesh-jena.jpg",
    rating: 5,
    docPage: 14,
    quote: "I spent 2-3 lakhs rupees across Allopathic, Homeopathy and Ayurveda with no positive results. At Dooroomi Khandagiri Center on BEDRO Smart-1, my pain got cured, my body regained vitality, and my memory power returned!",
    fullStory: "My name is Ramesh Chandra Jena and my age is 74 yrs, I am a resident of Jagamara, Bhubaneswar. Taking therapy on BEDRO Smart-1 for 2 months cured my chronic knee pain and asthma, and returned my energy."
  },
  {
    id: "p3",
    name: "Sri Tapan Kumar Dhal",
    age: "48 Years",
    location: "Khandagiri Bari, Bhubaneswar, Odisha",
    disease: "Blood Pressure & Chronic Insomnia",
    diseaseKo: "고혈압 및 만성 불면증 극복",
    duration: "Suffering for 3 Years",
    treatment: "Taeyangsuk Bio-Mineral Mat",
    image: "/assets/testimonials/patient-tapan-dhal.jpg",
    rating: 5,
    docPage: 14,
    quote: "Insomnia for 1 year and high BP for 3 years left my whole family depressed. After coming to DOOROOMI centre and taking Taeyangsuk therapy, my sleeplessness vanished and my blood pressure normalized completely!",
    fullStory: "My name is Tapan Kumar Dhal, Age: 48, Khandagiri Bari. After taking regular Taeyangsuk therapy at Dooroomi, my insomnia completely vanished."
  },
  {
    id: "p4",
    name: "Smt. Snehalata Sahu",
    age: "54 Years",
    location: "K4/ LIG-622, Kalinga Vihar, Bhubaneswar",
    disease: "Thyroid, Joint Pain, Overweight & Asthma",
    diseaseKo: "갑상선 · 관절통 · 과체중 · 천식 완치",
    duration: "Suffering for 12 Years",
    treatment: "BEDRO Smart-1 & Taeyangsuk Mat",
    image: "/assets/testimonials/patient-snehalata-sahu.jpg",
    rating: 5,
    docPage: 14,
    quote: "Suffering for 12 years with joint pain, thyroid and shortness of breath, I was helpless. 3 months at Dooroomi center gave me a new life, reduced my weight, and healed my breathing!",
    fullStory: "My name is Snehalata Sahu, 54 yrs, Kalinga Vihar. Suffering for 12 years with joint pain, thyroid and asthma. At Dooroomi, using BEDRO Smart-1 and Taeyangsuk Mat cured my joint pains and restored my normal breathing without inhalers."
  },
  {
    id: "p5",
    name: "Sri Ullash Chandra Mohapatra",
    age: "72 Years",
    location: "Pokhariput (Near D.A.V. School), Bhubaneswar",
    disease: "Knee Osteoarthritis, High BP & Constipation",
    diseaseKo: "무릎 관절염 · 고혈압 · 소화기 개선",
    duration: "Suffering for 1+ Years",
    treatment: "Natural Taeyangsuk Sintered Therapy",
    image: "/assets/testimonials/patient-ullash-mohapatra.jpg",
    rating: 5,
    docPage: 15,
    quote: "Suffering from severe knee pain for over a year, I couldn't walk peacefully. At the Pokhariput Dooroomi center, I became 100% free from knee pain! Taeyangsuk natural therapy replaced my anxiety with immense happiness.",
    fullStory: "My name is Ullash Chandra Mohapatra, Age 72 years, At-Pokhariput, Near D.A.V. Public School, P.O- Pokhariput, Bhubaneswar. I was suffering from knee pain for about one year. Now I am 100% free from knee pain! I have not taken any other treatment before coming to DOOROOMI centre for knee pain. I got information through Ramesh Chandra Panda who was taking treatment from DOOROOMI centre.\n\nI felt happiness emerge from anxiety. All the people of DOOROOMI centre are gentle, excellent and helpful. DOOROOMI is an auspicious organization. It gives treatment through TAEYANGSUK. TAEYANGSUK is a natural substance prepared from several sacred natural minerals. I will go door to door and tell everyone about DOOROOMI."
  },
  {
    id: "p6",
    name: "Sri Ramesh Chandra Sahu",
    age: "58 Years",
    location: "Chandapur, Dist- Nayagarh, Odisha",
    disease: "Chronic Slipped Disc, Back Pain & High BP",
    diseaseKo: "만성 허리 디스크 및 고혈압 완치",
    duration: "Suffering for 5 Years",
    treatment: "Dooroomi Thermal Spine Realignment",
    image: "/assets/testimonials/patient-ramesh-sahu.jpg",
    rating: 5,
    docPage: 15,
    quote: "After 5 years of painful injections and medicines for back pain and high blood pressure, Dooroomi therapy made me completely fine. I can now do my daily work with full strength and joy!",
    fullStory: "My name is Ramesh Chandra Sahu, Age 58 years, At-Chandapur, P.O- Chandapur, Dist- Nayagarh, Odisha. I had Back Pain and Blood Pressure problems since 5 years. I have taken many medicines and injections and many types of treatments before coming to DOOROOMI.\n\nThen I heard about DOOROOMI Medical Treatments from a known person. I went to the DOOROOMI center, and now I am perfectly fine and can do my work on a regular basis. I would heartily like to thanks DOOROOMI Medical and would pray that may DOOROOMI Medical get succeed in their work and keep helping people like me."
  }
];

const INITIAL_ADS = [
  {
    id: "ad-franchise-2026",
    title: "DOOROOMI Official Franchise & Health Center Partner Program 2026",
    badge: "EXCLUSIVE OPPORTUNITY",
    subtitle: "Expand Korea's Leading Medical Equipment & Free Daily Therapy Centers Across India",
    description: "Join hands with DOOROOMIMEDIQUIP and SKS International. Open a high-demand, fully certified Korean Medical Therapy Center in your city with complete technical guidance, certified equipment, and brand support.",
    imageUrl: "/assets/products/product-real-01.jpeg",
    buttonText: "Inquire for Franchise",
    buttonLink: "#/therapy",
    buttonActionType: "franchise",
    isEnabled: true,
    priority: 1,
    discountTag: "100% Free Daily Therapy Model"
  },
  {
    id: "ad-free-therapy-camp",
    title: "100% Free Daily Thermal Acupressure Therapy Across All Centers",
    badge: "PUBLIC HEALTH MISSION",
    subtitle: "Experience Genuine Korean Medical Bed Technology at Zero Cost",
    description: "Visit any of our 15+ Dooroomi centers across Bhubaneswar, Cuttack, New Delhi, Kolkata, and more. Take complimentary daily therapy sessions on BEDRO Smart-1 and Taeyangsuk Bio-Mat.",
    imageUrl: "/assets/products/product-real-02.jpeg",
    buttonText: "Explore Therapy Centers",
    buttonLink: "#/therapy",
    buttonActionType: "link",
    isEnabled: false,
    priority: 2,
    discountTag: "Zero Consultation Fee"
  },
  {
    id: "ad-korean-bedro-smart",
    title: "BEDRO Smart-1 Spine & Far-Infrared Master Therapy System",
    badge: "KOREAN MEDICAL INNOVATION",
    subtitle: "FDA & CE Approved Thermal Spinal Care for Chronic Pain Relief",
    description: "Discover revolutionary Korean medical technology integrating acupressure, moxibustion, chiropractic alignment, and deep far-infrared heat for arthritis, disc herniation, and hypertension.",
    imageUrl: "/assets/products/product-real-03.jpeg",
    buttonText: "Chat on WhatsApp",
    buttonLink: "+919153697636",
    buttonActionType: "whatsapp",
    isEnabled: false,
    priority: 3,
    discountTag: "Direct Import From Korea"
  }
];

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const cached = localStorage.getItem('dooroomi_products');
      return cached ? JSON.parse(cached) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [centers, setCenters] = useState(() => {
    try {
      const cached = localStorage.getItem('dooroomi_centers');
      return cached ? JSON.parse(cached) : INITIAL_CENTERS;
    } catch {
      return INITIAL_CENTERS;
    }
  });

  const [testimonials, setTestimonials] = useState(() => {
    try {
      const cached = localStorage.getItem('dooroomi_testimonials');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_TESTIMONIALS.length) {
          return parsed;
        }
      }
      return INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [ads, setAds] = useState(() => {
    try {
      const cached = localStorage.getItem('dooroomi_ads');
      return cached ? JSON.parse(cached) : INITIAL_ADS;
    } catch {
      return INITIAL_ADS;
    }
  });

  const activeAd = ads.find(a => a.isEnabled) || null;

  const [isSyncing, setIsSyncing] = useState(false);
  const [dbConnected, setDbConnected] = useState(true);

  // Sync with MongoDB backend on initial load
  const syncWithBackend = async () => {
    setIsSyncing(true);
    try {
      // 1. Fetch products
      const pRes = await fetch(`${BACKEND_URL}/products`);
      if (pRes.ok) {
        const pData = await pRes.json();
        if (pData.success && pData.products && pData.products.length > 0) {
          setProducts(pData.products);
          localStorage.setItem('dooroomi_products', JSON.stringify(pData.products));
        }
      }

      // 2. Fetch centers
      const cRes = await fetch(`${BACKEND_URL}/centers`);
      if (cRes.ok) {
        const cData = await cRes.json();
        if (cData.success && cData.centers && cData.centers.length > 0) {
          setCenters(cData.centers);
          localStorage.setItem('dooroomi_centers', JSON.stringify(cData.centers));
        }
      }

      // 3. Fetch testimonials
      const tRes = await fetch(`${BACKEND_URL}/testimonials`);
      if (tRes.ok) {
        const tData = await tRes.json();
        if (tData.success && tData.testimonials && tData.testimonials.length > 0) {
          setTestimonials(tData.testimonials);
          localStorage.setItem('dooroomi_testimonials', JSON.stringify(tData.testimonials));
        }
      }

      // 4. Fetch ads
      const aRes = await fetch(`${BACKEND_URL}/ads`);
      if (aRes.ok) {
        const aData = await aRes.json();
        if (aData.success && aData.ads && aData.ads.length > 0) {
          setAds(aData.ads);
          localStorage.setItem('dooroomi_ads', JSON.stringify(aData.ads));
        }
      }

      setDbConnected(true);
    } catch (err) {
      console.warn('Backend connection notice (running with local cache):', err.message);
      setDbConnected(false);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    syncWithBackend();
  }, []);

  // Helper for admin authorization headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem('dooroomi_admin_token') || 'master_admin_token_2026';
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'x-admin-key': 'dooroomi_admin_2026_master_secret',
      'x-admin-session': 'dooroomi_admin_active'
    };
  };

  // --- PRODUCT CRUD ---
  const addProduct = async (newProd) => {
    const tempId = newProd.id || 'p-' + Date.now();
    const formatted = {
      ...newProd,
      id: tempId,
      slug: (newProd.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4),
      badge: newProd.badge || 'Medical Grade',
      cat: newProd.cat || 'series-a',
      catLabel: newProd.catLabel || 'Medical Systems & Therapy'
    };

    // Optimistic UI update
    setProducts((prev) => {
      const updated = [formatted, ...prev];
      localStorage.setItem('dooroomi_products', JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await fetch(`${BACKEND_URL}/products`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formatted)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.product) {
          setProducts((prev) => {
            const replaced = prev.map(p => p.id === tempId ? data.product : p);
            localStorage.setItem('dooroomi_products', JSON.stringify(replaced));
            return replaced;
          });
        }
      }
    } catch (err) {
      console.warn('Saved locally, background MongoDB sync failed:', err.message);
    }
  };

  const deleteProduct = async (productId) => {
    // Optimistic UI update
    setProducts((prev) => {
      const filtered = prev.filter(p => p.id !== productId && p.slug !== productId && p._id !== productId);
      localStorage.setItem('dooroomi_products', JSON.stringify(filtered));
      return filtered;
    });

    try {
      const res = await fetch(`${BACKEND_URL}/products/${productId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `Failed to delete product from database (Status ${res.status})`);
      }
      return data;
    } catch (err) {
      console.warn('MongoDB sync notice:', err.message);
      throw err;
    }
  };

  const updateProduct = async (productId, updatedFields) => {
    setProducts((prev) => {
      const updated = prev.map(p => p.id === productId ? { ...p, ...updatedFields } : p);
      localStorage.setItem('dooroomi_products', JSON.stringify(updated));
      return updated;
    });

    try {
      await fetch(`${BACKEND_URL}/products/${productId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      });
    } catch (err) {
      console.warn('Updated locally, background MongoDB sync failed:', err.message);
    }
  };

  // --- CENTERS CRUD ---
  const addCenter = async (newCenter) => {
    const tempId = newCenter.id || 'tc-' + Date.now();
    const formatted = {
      ...newCenter,
      id: tempId,
      timing: newCenter.timing || 'Mon–Sat: 8:00 AM – 5:00 PM',
      status: newCenter.status || 'Active · 100% Free Daily Therapy',
      dailyCapacity: newCenter.dailyCapacity || '120+ Patients/Day'
    };

    setCenters((prev) => {
      const updated = [formatted, ...prev];
      localStorage.setItem('dooroomi_centers', JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await fetch(`${BACKEND_URL}/centers`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formatted)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.center) {
          setCenters((prev) => {
            const replaced = prev.map(c => c.id === tempId ? data.center : c);
            localStorage.setItem('dooroomi_centers', JSON.stringify(replaced));
            return replaced;
          });
        }
      }
    } catch (err) {
      console.warn('Saved locally, background MongoDB sync failed:', err.message);
    }
  };

  const deleteCenter = async (centerId) => {
    setCenters((prev) => {
      const filtered = prev.filter(c => c.id !== centerId && c._id !== centerId);
      localStorage.setItem('dooroomi_centers', JSON.stringify(filtered));
      return filtered;
    });

    try {
      const res = await fetch(`${BACKEND_URL}/centers/${centerId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `Failed to delete center from database (Status ${res.status})`);
      }
      return data;
    } catch (err) {
      console.warn('Center delete MongoDB sync notice:', err.message);
      throw err;
    }
  };

  // --- TESTIMONIALS CRUD ---
  const addTestimonial = async (newTestimonial) => {
    const tempId = newTestimonial.id || 'p' + Date.now();
    const formatted = {
      ...newTestimonial,
      id: tempId,
      rating: Number(newTestimonial.rating) || 5,
      docPage: 14,
      image: newTestimonial.image || '/assets/testimonials/patient-kmamari-sahoo.jpg'
    };

    setTestimonials((prev) => {
      const updated = [formatted, ...prev];
      localStorage.setItem('dooroomi_testimonials', JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await fetch(`${BACKEND_URL}/testimonials`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formatted)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.testimonial) {
          setTestimonials((prev) => {
            const replaced = prev.map(t => t.id === tempId ? data.testimonial : t);
            localStorage.setItem('dooroomi_testimonials', JSON.stringify(replaced));
            return replaced;
          });
        }
      }
    } catch (err) {
      console.warn('Saved testimonial locally, background sync failed:', err.message);
    }
  };

  const deleteTestimonial = async (testimonialId) => {
    setTestimonials((prev) => {
      const filtered = prev.filter(t => t.id !== testimonialId && t._id !== testimonialId);
      localStorage.setItem('dooroomi_testimonials', JSON.stringify(filtered));
      return filtered;
    });

    try {
      const res = await fetch(`${BACKEND_URL}/testimonials/${testimonialId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `Failed to delete testimonial from database (Status ${res.status})`);
      }
      return data;
    } catch (err) {
      console.warn('Testimonial delete MongoDB sync notice:', err.message);
      throw err;
    }
  };

  // --- ADS / POPUP CRUD ---
  const clearAdDismissalFlags = () => {
    try {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('dooroomi_ad_dismissed_')) {
          sessionStorage.removeItem(key);
        }
      });
    } catch {
      // ignore
    }
  };

  const addAd = async (newAd) => {
    const tempId = newAd.id || 'ad-' + Date.now();
    const formatted = {
      ...newAd,
      id: tempId,
      badge: newAd.badge || 'SPECIAL ANNOUNCEMENT',
      buttonText: newAd.buttonText || 'Explore Now',
      buttonLink: newAd.buttonLink || '#/therapy',
      buttonActionType: newAd.buttonActionType || 'link',
      isEnabled: newAd.isEnabled !== undefined ? newAd.isEnabled : true,
      priority: Number(newAd.priority) || 1
    };

    if (formatted.isEnabled) {
      clearAdDismissalFlags();
    }

    setAds((prev) => {
      // If newAd is enabled, disable others
      const updated = formatted.isEnabled 
        ? [formatted, ...prev.map(a => ({ ...a, isEnabled: false }))]
        : [formatted, ...prev];
      localStorage.setItem('dooroomi_ads', JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await fetch(`${BACKEND_URL}/ads`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formatted)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.ad) {
          setAds((prev) => {
            const replaced = prev.map(a => (a.id === tempId || a.id === data.ad.id) ? data.ad : a);
            localStorage.setItem('dooroomi_ads', JSON.stringify(replaced));
            return replaced;
          });
        }
      }
    } catch (err) {
      console.warn('Saved ad locally, background sync failed:', err.message);
    }
  };

  const updateAd = async (adId, updatedFields) => {
    if (updatedFields.isEnabled) {
      clearAdDismissalFlags();
    }

    setAds((prev) => {
      const updated = prev.map(a => {
        if (a.id === adId || a._id === adId) {
          return { ...a, ...updatedFields };
        }
        // If enabling this ad, set other ads isEnabled to false
        if (updatedFields.isEnabled) {
          return { ...a, isEnabled: false };
        }
        return a;
      });
      localStorage.setItem('dooroomi_ads', JSON.stringify(updated));
      return updated;
    });

    try {
      await fetch(`${BACKEND_URL}/ads/${adId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      });
    } catch (err) {
      console.warn('Updated ad locally, background sync failed:', err.message);
    }
  };

  const toggleAd = async (adId) => {
    let willBeEnabled = false;
    setAds((prev) => {
      const target = prev.find(a => a.id === adId || a._id === adId);
      if (!target) return prev;
      willBeEnabled = !target.isEnabled;

      if (willBeEnabled) {
        clearAdDismissalFlags();
      }

      const updated = prev.map(a => {
        if (a.id === adId || a._id === adId) {
          return { ...a, isEnabled: willBeEnabled };
        }
        // If toggling on, turn off all others
        if (willBeEnabled) {
          return { ...a, isEnabled: false };
        }
        return a;
      });
      localStorage.setItem('dooroomi_ads', JSON.stringify(updated));
      return updated;
    });

    try {
      await fetch(`${BACKEND_URL}/ads/${adId}/toggle`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.warn('Toggled ad locally, background sync failed:', err.message);
    }
  };

  const deleteAd = async (adId) => {
    setAds((prev) => {
      const filtered = prev.filter(a => a.id !== adId && a._id !== adId);
      localStorage.setItem('dooroomi_ads', JSON.stringify(filtered));
      return filtered;
    });

    try {
      const res = await fetch(`${BACKEND_URL}/ads/${adId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `Failed to delete ad from database (Status ${res.status})`);
      }
      return data;
    } catch (err) {
      console.warn('Ad delete MongoDB sync notice:', err.message);
      throw err;
    }
  };

  // Factory reset to initial defaults
  const resetToDefaults = () => {
    localStorage.removeItem('dooroomi_products');
    localStorage.removeItem('dooroomi_centers');
    localStorage.removeItem('dooroomi_testimonials');
    localStorage.removeItem('dooroomi_ads');
    setProducts(INITIAL_PRODUCTS);
    setCenters(INITIAL_CENTERS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setAds(INITIAL_ADS);
    syncWithBackend();
  };

  return (
    <DataContext.Provider
      value={{
        products,
        centers,
        testimonials,
        ads,
        activeAd,
        isSyncing,
        dbConnected,
        addProduct,
        deleteProduct,
        updateProduct,
        addCenter,
        deleteCenter,
        addTestimonial,
        deleteTestimonial,
        addAd,
        updateAd,
        toggleAd,
        deleteAd,
        syncWithBackend,
        resetToDefaults
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
