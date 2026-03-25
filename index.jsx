import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, FileText, ClipboardList, CalendarDays, Info, 
  LogOut, Plus, Trash2, Download, Printer, Upload, User, MapPin, Key
} from 'lucide-react';

// --- STYLES & THEME ---
// Tailwind is used via script in actual HTML, assuming standard classes here.
const theme = {
  primary: "bg-sky-500",
  primaryHover: "hover:bg-sky-600",
  textPrimary: "text-sky-600",
  bgLight: "bg-sky-50",
};

// --- MOCK DATA ---
const mockDashboardData = [
  { id: 1, name: "Ahmad", desa: "Karang Bajo", type: "Laporan Kegiatan", date: "15 Jan 2026", status: "Selesai" },
  { id: 2, name: "Budi", desa: "Bayan", type: "F/I/Dal/13", date: "05 Feb 2026", status: "Selesai" },
  { id: 3, name: "Siti", desa: "Senaru", type: "Absensi", date: "28 Feb 2026", status: "Selesai" },
  { id: 4, name: "Ahmad", desa: "Karang Bajo", type: "F/I/Dal/13", date: "02 Mar 2026", status: "Selesai" },
];

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: '', desa: '' });
  const [currentTab, setCurrentTab] = useState('dashboard');

  const handleLogin = (username, desa) => {
    setUser({ username, desa });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ username: '', desa: '' });
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <MainLayout user={user} onLogout={handleLogout} currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {currentTab === 'dashboard' && <DashboardView mockData={mockDashboardData} />}
      {currentTab === 'laporan1' && <F1Dal13View user={user} />}
      {currentTab === 'laporan2' && <KegiatanView user={user} />}
      {currentTab === 'absen' && <AbsenView user={user} />}
      {currentTab === 'about' && <AboutView />}
    </MainLayout>
  );
}

// --- LOGIN SCREEN ---
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [desa, setDesa] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && desa && password) {
      onLogin(username, desa);
    } else {
      alert("Mohon lengkapi semua data login.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <div className="bg-sky-500 p-6 flex justify-between items-center text-white">
          {/* Placeholder for Logos */}
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sky-500 font-bold text-xs p-1 text-center leading-tight shadow-inner">
            Logo SPMD
          </div>
          <h1 className="text-2xl font-bold tracking-wider">SPMD Report</h1>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sky-500 font-bold text-xs p-1 text-center leading-tight shadow-inner">
            Logo BKKBN
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-gray-700 text-lg font-medium">Selamat Datang Semeton!</h2>
            <p className="text-gray-400 text-sm">Silakan masuk ke akun Anda</p>
          </div>

          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" placeholder="Username" required
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              value={username} onChange={e => setUsername(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" placeholder="Asal Desa" required
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              value={desa} onChange={e => setDesa(e.target.value)}
            />
          </div>

          <div className="relative">
            <Key className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="password" placeholder="Kata Sandi" required
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              value={password} onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            Masuk
          </button>
        </form>
        <div className="text-center pb-6 text-xs text-gray-400">
          Program dari BKKBN Kabupaten Lombok Utara
        </div>
      </div>
    </div>
  );
}

// --- MAIN LAYOUT ---
function MainLayout({ children, user, onLogout, currentTab, setCurrentTab }) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'laporan1', icon: FileText, label: 'F/I/Dal/13' },
    { id: 'laporan2', icon: ClipboardList, label: 'Kegiatan' },
    { id: 'absen', icon: CalendarDays, label: 'Absen' },
    { id: 'about', icon: Info, label: 'Tentang' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Top Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold text-[8px] p-1 text-center leading-tight">
                  SPMD
                </div>
              <h1 className="text-xl font-bold text-sky-600 hidden sm:block">SPMD Report</h1>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${currentTab === item.id ? 'bg-sky-100 text-sky-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800">{user.username}</p>
                <p className="text-xs text-gray-500">SPMD Desa {user.desa}</p>
              </div>
              <button onClick={onLogout} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition" title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 pb-24 md:pb-6 overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center text-sm print:hidden hidden md:block mt-auto">
        <p>spmdklu © 2026 - By semetonweb.store</p>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-5px_15px_rgba(0,0,0,0.1)] z-50 rounded-t-2xl pb-safe print:hidden">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${isActive ? 'text-sky-500 transform -translate-y-1' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <item.icon size={isActive ? 24 : 20} className={isActive ? 'drop-shadow-md' : ''} />
                <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- COMPONENTS ---

// 1. Dashboard
function DashboardView({ mockData }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl p-6 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Dashboard Rekapitulasi</h2>
        <p className="opacity-90">Melihat aktivitas pelaporan terbaru dari seluruh anggota SPMD KLU.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Riwayat Laporan Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Nama Anggota</th>
                <th className="px-6 py-3 font-medium">Desa</th>
                <th className="px-6 py-3 font-medium">Jenis Laporan</th>
                <th className="px-6 py-3 font-medium">Tanggal</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockData.map((row, i) => (
                <tr key={i} className="hover:bg-sky-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{row.name}</td>
                  <td className="px-6 py-4 text-gray-600">{row.desa}</td>
                  <td className="px-6 py-4 text-sky-600 font-medium">
                    <span className="bg-sky-100 px-2 py-1 rounded-md">{row.type}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{row.date}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Helper to Print Form
const PrintControls = () => (
  <div className="flex flex-wrap gap-3 mb-6 print:hidden">
    <button onClick={() => window.print()} className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl shadow-md transition">
      <Printer size={18} /> Cetak / PDF
    </button>
    <button onClick={() => { /* Logic to clear forms can be added here */ alert('Isi form secara manual setelah dicetak kosong.'); window.print(); }} className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl shadow-sm transition">
      <Download size={18} /> Download Form Kosong
    </button>
  </div>
);

const SignaturePad = ({ label }) => {
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <p className="mb-16 font-semibold text-sm">{label}</p>
      {image ? (
        <div className="relative group">
           <img src={image} alt="TTD" className="h-20 object-contain" />
           <button onClick={() => setImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition print:hidden">
             <Trash2 size={12} />
           </button>
        </div>
      ) : (
        <label className="cursor-pointer text-blue-500 hover:text-blue-700 text-xs flex flex-col items-center border border-dashed border-blue-300 p-2 rounded print:hidden">
          <Upload size={16} className="mb-1" />
          Upload TTD
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
      )}
      <input type="text" placeholder="Nama Terang" className="mt-4 border-b border-black text-center focus:outline-none w-48 text-sm font-bold bg-transparent" />
    </div>
  );
}

// 2. Form F/I/Dal/13
function F1Dal13View({ user }) {
  // Simplified state for demonstration
  return (
    <div className="animate-fade-in">
      <PrintControls />
      <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-sm border border-gray-100 print:shadow-none print:border-none print:p-0 doc-container text-sm">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
          <div className="font-bold text-xl">F/I/Dal/13</div>
          <div className="text-center">
            <h2 className="font-bold text-lg">LAPORAN BULANAN PENGENDALIAN LAPANGAN</h2>
            <h2 className="font-bold text-lg">TINGKAT DESA/KELURAHAN</h2>
            <p className="font-semibold">SISTEM INFORMASI KEPENDUDUKAN DAN KELUARGA</p>
          </div>
          <div></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 font-semibold">
          <div className="flex items-center gap-2">
            <span>BULAN:</span> <input type="text" className="border-b border-gray-400 focus:outline-none flex-1" defaultValue="Maret" />
          </div>
          <div className="flex items-center gap-2">
            <span>TAHUN:</span> <input type="text" className="border-b border-gray-400 focus:outline-none flex-1" defaultValue="2026" />
          </div>
          <div className="flex items-center gap-2">
            <span>DESA:</span> <input type="text" className="border-b border-gray-400 focus:outline-none flex-1" defaultValue={user.desa} />
          </div>
          <div className="flex items-center gap-2">
            <span>KODE DESA:</span> <input type="text" className="border-b border-gray-400 focus:outline-none flex-1" />
          </div>
          <div className="flex items-center gap-2">
            <span>KECAMATAN:</span> <input type="text" className="border-b border-gray-400 focus:outline-none flex-1" />
          </div>
          <div className="flex items-center gap-2">
            <span>KODE KEC:</span> <input type="text" className="border-b border-gray-400 focus:outline-none flex-1" />
          </div>
        </div>

        {/* Section I */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">I. KEADAAN UMUM</h3>
          <table className="w-full border-collapse border border-black text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-1 w-10">NO</th>
                <th className="border border-black p-1">URAIAN</th>
                <th className="border border-black p-1 w-24">JUMLAH YANG ADA</th>
                <th className="border border-black p-1 w-24">JUMLAH YANG LAPOR</th>
              </tr>
              <tr className="text-xs">
                <th className="border border-black p-1">(1)</th>
                <th className="border border-black p-1">(2)</th>
                <th className="border border-black p-1">(3)</th>
                <th className="border border-black p-1">(4)</th>
              </tr>
            </thead>
            <tbody>
              {["PPKBD", "Sub PPKBD", "Kelompok KB", "Kelompok Kegiatan BKB", "Kelompok Kegiatan BKR", "Kelompok Kegiatan BKL", "Kelompok Kegiatan UPPKS"].map((item, idx) => (
                <tr key={idx}>
                  <td className="border border-black p-1">{idx + 1}</td>
                  <td className="border border-black p-1 text-left px-2">{item}</td>
                  <td className="border border-black p-1 p-0"><input type="number" className="w-full text-center focus:outline-none" /></td>
                  <td className="border border-black p-1 p-0"><input type="number" className="w-full text-center focus:outline-none" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section II */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">II. KEGIATAN OPERASIONAL</h3>
          <table className="w-full border-collapse border border-black text-center">
             <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-1 w-10">NO</th>
                <th className="border border-black p-1">URAIAN</th>
                <th className="border border-black p-1 w-32">JUMLAH</th>
              </tr>
             </thead>
             <tbody>
                {[
                  "Frekwensi Rakor Program KB tingkat Desa/Kelurahan",
                  "Frekwensi Penyuluhan oleh PLKB/PKB",
                  "Frekwensi KIE dengan menggunakan KIE Kit",
                  "Jumlah Tokoh Masyarakat/Agama/Adat yang Aktif melakukan KIE KB"
                ].map((item, idx) => (
                  <tr key={idx}>
                    <td className="border border-black p-1">{idx + 1}</td>
                    <td className="border border-black p-1 text-left px-2">{item}</td>
                    <td className="border border-black p-1 p-0"><input type="number" className="w-full text-center focus:outline-none" /></td>
                  </tr>
                ))}
             </tbody>
          </table>
        </div>

        <div className="text-center text-gray-500 italic my-4 print:hidden">
          -- Scroll ke bawah untuk bagian Tanda Tangan (Form disederhanakan untuk tampilan layar) --
        </div>

        {/* Signatures */}
        <div className="flex justify-end mt-12">
            <div className="w-64">
               <div className="mb-2">Mengetahui,</div>
               <SignaturePad label="PLKB/PKB/Petugas KB Desa" />
            </div>
        </div>

      </div>
    </div>
  );
}

// 3. Form Laporan Kegiatan SPMD
function KegiatanView({ user }) {
  const [rows, setRows] = useState([
    { id: 1, date: '', desc: '', percent: '', img: null }
  ]);

  const addRow = () => {
    setRows([...rows, { id: Date.now(), date: '', desc: '', percent: '', img: null }]);
  };

  const removeRow = (id) => {
    setRows(rows.filter(r => r.id !== id));
  };

  const handleImgUpload = (id, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRows(rows.map(r => r.id === id ? { ...r, img: reader.result } : r));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate-fade-in">
      <PrintControls />
      <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-sm border border-gray-100 print:shadow-none print:border-none print:p-0">
        <div className="text-center mb-8">
          <h2 className="font-bold text-xl uppercase">LAPORAN KEGIATAN SARJANA PENGGERAK MEMBANGUN DESA (SPMD)</h2>
          <h2 className="font-bold text-lg uppercase">KABUPATEN LOMBOK UTARA</h2>
          <div className="flex justify-center items-center gap-2 mt-2 font-semibold">
             <span>BULAN</span>
             <input type="text" className="border-b border-black focus:outline-none text-center uppercase" placeholder="JANUARI-FEBRUARI 2026" />
          </div>
        </div>

        <div className="mb-6 space-y-2">
          <div className="flex gap-4"><span className="w-20 font-semibold">Nama</span><span>: <input type="text" className="border-b border-gray-400 focus:outline-none uppercase" defaultValue={user.username} /></span></div>
          <div className="flex gap-4"><span className="w-20 font-semibold">NIK</span><span>: <input type="text" className="border-b border-gray-400 focus:outline-none" /></span></div>
          <div className="flex gap-4"><span className="w-20 font-semibold">Jabatan</span><span>: <input type="text" className="border-b border-gray-400 focus:outline-none w-64" defaultValue="SPMD/PLKB Non PNS" /></span></div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-black mb-4">
            <thead>
              <tr className="bg-gray-100 text-center font-bold">
                <th className="border border-black p-2 w-10">No</th>
                <th className="border border-black p-2 w-32">Hari/tanggal</th>
                <th className="border border-black p-2">Uraian Kegiatan</th>
                <th className="border border-black p-2 w-24">Persentase</th>
                <th className="border border-black p-2 w-48">Dokumentasi</th>
                <th className="border border-black p-2 w-10 print:hidden">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id}>
                  <td className="border border-black p-2 text-center align-top">{index + 1}</td>
                  <td className="border border-black p-2 align-top">
                    <textarea className="w-full min-h-[60px] resize-none focus:outline-none bg-transparent" placeholder="Senin, 05 Jan 2026"></textarea>
                  </td>
                  <td className="border border-black p-2 align-top">
                    <textarea className="w-full min-h-[60px] resize-none focus:outline-none bg-transparent" placeholder="Deskripsi kegiatan..."></textarea>
                  </td>
                  <td className="border border-black p-2 text-center align-top">
                    <input type="text" className="w-full text-center focus:outline-none bg-transparent" placeholder="100%" />
                  </td>
                  <td className="border border-black p-2 text-center align-top relative">
                     {row.img ? (
                       <div className="relative group flex justify-center">
                          <img src={row.img} alt="Doc" className="h-20 object-cover rounded" />
                          <button onClick={() => setRows(rows.map(r => r.id === row.id ? {...r, img: null} : r))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition print:hidden">
                            <Trash2 size={12} />
                          </button>
                       </div>
                     ) : (
                        <label className="cursor-pointer text-gray-400 hover:text-sky-500 flex flex-col items-center justify-center h-20 border-2 border-dashed border-gray-200 rounded print:hidden">
                          <Upload size={20} /> <span className="text-xs mt-1">Upload</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImgUpload(row.id, e.target.files[0])} />
                        </label>
                     )}
                     <div className="hidden print:block h-20"></div> {/* Spacer for print if no image */}
                  </td>
                  <td className="border border-black p-2 text-center align-top print:hidden">
                    <button onClick={() => removeRow(row.id)} className="text-red-500 hover:bg-red-50 p-1 rounded transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-8 print:hidden">
           <button onClick={addRow} className="flex items-center gap-2 text-sky-600 bg-sky-50 px-3 py-1.5 rounded-lg hover:bg-sky-100 transition text-sm font-medium">
             <Plus size={16} /> Tambah Kegiatan
           </button>
        </div>

        <div className="flex justify-end mt-12">
            <div className="w-64">
               <div className="mb-2">Pelaksana Kegiatan</div>
               <SignaturePad label="" />
            </div>
        </div>
      </div>
    </div>
  );
}

// 4. Form Absen
function AbsenView({ user }) {
  const days = Array.from({length: 31}, (_, i) => i + 1);
  const [rows, setRows] = useState([
    { id: 1, name: user.username }
  ]);

  const addRow = () => setRows([...rows, { id: Date.now(), name: '' }]);
  const removeRow = (id) => setRows(rows.filter(r => r.id !== id));

  return (
    <div className="animate-fade-in">
      <PrintControls />
      <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-sm border border-gray-100 print:shadow-none print:border-none print:p-0 overflow-x-auto">
        <div className="text-center mb-8">
          <h2 className="font-bold text-xl uppercase">DAFTAR HADIR</h2>
          <h2 className="font-bold text-lg uppercase">SARJANA PENGGERAK MASYARAKAT DESA (SPMD)/PLKB NON PNS</h2>
          <div className="flex justify-center items-center gap-2 mt-2 font-semibold uppercase">
             <span>KABUPATEN LOMBOK UTARA TAHUN</span>
             <input type="text" className="border-b border-black focus:outline-none text-center w-24" defaultValue="2026" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 font-semibold text-sm">
          <div className="flex items-center gap-2"><span>Desa:</span> <input type="text" className="border-b border-black focus:outline-none flex-1 uppercase" defaultValue={user.desa} /></div>
          <div className="flex items-center gap-2"><span>Kecamatan:</span> <input type="text" className="border-b border-black focus:outline-none flex-1 uppercase" /></div>
          <div className="flex items-center gap-2"><span>Bulan:</span> <input type="text" className="border-b border-black focus:outline-none flex-1 uppercase" /></div>
        </div>

        <div className="min-w-max">
          <table className="border-collapse border border-black text-xs text-center w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-1 w-8" rowSpan="2">No</th>
                <th className="border border-black p-1 w-48" rowSpan="2">Nama</th>
                <th className="border border-black p-1" colSpan="31">Tanggal</th>
                <th className="border border-black p-1 w-10 print:hidden" rowSpan="2">Aksi</th>
              </tr>
              <tr className="bg-gray-100">
                {days.map(d => (
                  <th key={d} className="border border-black p-1 w-6">{d.toString().padStart(2, '0')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
               {rows.map((row, index) => (
                <tr key={row.id}>
                  <td className="border border-black p-1">{index + 1}</td>
                  <td className="border border-black p-1 text-left px-2">
                    <input type="text" className="w-full focus:outline-none bg-transparent uppercase" defaultValue={row.name} />
                  </td>
                  {days.map(d => (
                    <td key={d} className="border border-black p-0">
                      <input type="text" className="w-full text-center focus:outline-none font-semibold uppercase bg-transparent hover:bg-sky-50" maxLength="2" />
                    </td>
                  ))}
                  <td className="border border-black p-1 print:hidden">
                     <button onClick={() => removeRow(row.id)} className="text-red-500 hover:text-red-700"><Trash2 size={14}/></button>
                  </td>
                </tr>
               ))}
            </tbody>
          </table>
        </div>

        <div className="mt-2 mb-8 print:hidden">
           <button onClick={addRow} className="text-sky-600 bg-sky-50 px-2 py-1 rounded text-xs font-medium hover:bg-sky-100">
             + Tambah Baris
           </button>
        </div>

        <div className="flex justify-between mt-8 text-sm">
           <div>
             <h4 className="font-bold underline mb-2">Keterangan:</h4>
             <ul className="space-y-1">
               <li><span className="font-bold inline-block w-8">S</span> : Sakit</li>
               <li><span className="font-bold inline-block w-8">I</span> : Izin</li>
               <li><span className="font-bold inline-block w-8">C</span> : Cuti</li>
               <li><span className="font-bold inline-block w-8">TK</span> : Tanpa Keterangan</li>
             </ul>
           </div>

           <div className="flex gap-16 text-center">
              <div>
                 <SignaturePad label="KEPALA DESA" />
              </div>
              <div>
                 <div className="mb-2 uppercase text-left w-full pl-8">
                   ....................., 20...
                 </div>
                 <SignaturePad label="PLKB/SPMD" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// 5. About
function AboutView() {
  return (
    <div className="animate-fade-in flex justify-center py-10">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl w-full text-center border-t-4 border-sky-400 relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-sky-50 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-50 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white mb-6 shadow-lg transform hover:scale-110 transition duration-300">
            <Info size={40} />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Tentang SPMD Report</h2>
          <div className="w-16 h-1 bg-sky-400 mx-auto rounded-full mb-6"></div>
          
          <p className="text-gray-600 mb-8 leading-relaxed text-sm sm:text-base">
            Aplikasi website ini dibuat dengan tujuan untuk mempermudah teman-teman SPMD (Sarjana Penggerak Membangun Desa) atau PLKB Non ASN di daerah Kabupaten Lombok Utara dalam membuat laporan dan mengisi absensi kapanpun dan dimanapun berada.
          </p>

          <div className="bg-sky-50 rounded-2xl p-6 text-left shadow-inner mb-8">
             <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><User size={18} className="text-sky-500"/> Informasi Pengembang</h3>
             <ul className="space-y-3 text-sm text-gray-600">
               <li className="flex items-center gap-3">
                 <span className="font-semibold w-20">Pembuat</span>: Ahmad Yani
               </li>
               <li className="flex items-center gap-3">
                 <span className="font-semibold w-20">Email</span>: <a href="mailto:ahmadstimik15@gmail.com" className="text-sky-500 hover:underline">ahmadstimik15@gmail.com</a>
               </li>
               <li className="flex items-center gap-3">
                 <span className="font-semibold w-20">WhatsApp</span>: <a href="https://wa.me/6285956684081" className="text-sky-500 hover:underline">085956684081</a>
               </li>
             </ul>
          </div>

          <p className="text-sm text-gray-500 font-medium">
            Tertarik membuat website? Kunjungi: <br/>
            <a href="https://semetonweb.store" target="_blank" rel="noopener noreferrer" className="text-sky-600 font-bold hover:underline text-lg mt-1 inline-block">semetonweb.store</a>
          </p>
        </div>
      </div>
    </div>
  );
}