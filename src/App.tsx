import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPA_URL = 'https://rnzuaqprdjyfrnydvwsp.supabase.co';
const SUPA_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuenVhcXByZGp5ZnJueWR2d3NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MDg5ODgsImV4cCI6MjA5MjQ4NDk4OH0.-U80qPkOS3BKDr9dnzMssAoMI03yW3Ce0fWQQdOv1-g';
const supabase = createClient(SUPA_URL, SUPA_KEY);

// ─── Data Ibadah ───────────────────────────────────────────────────────────────
const IBADAH = [
  { id: 'subuh', label: 'Shalat Subuh', cat: 'fardhu', icon: '🌅', poin: 20 },
  { id: 'dzuhur', label: 'Shalat Dzuhur', cat: 'fardhu', icon: '☀️', poin: 20 },
  { id: 'ashar', label: 'Shalat Ashar', cat: 'fardhu', icon: '🌤️', poin: 20 },
  {
    id: 'maghrib',
    label: 'Shalat Maghrib',
    cat: 'fardhu',
    icon: '🌇',
    poin: 20,
  },
  { id: 'isya', label: 'Shalat Isya', cat: 'fardhu', icon: '🌙', poin: 20 },
  { id: 'dhuha', label: 'Shalat Dhuha', cat: 'sunnah', icon: '🌞', poin: 15 },
  {
    id: 'tahajjud',
    label: 'Shalat Tahajjud',
    cat: 'sunnah',
    icon: '⭐',
    poin: 20,
  },
  {
    id: 'rawatib',
    label: 'Shalat Rawatib',
    cat: 'sunnah',
    icon: '🕌',
    poin: 10,
  },
  { id: 'witir', label: 'Shalat Witir', cat: 'sunnah', icon: '🌠', poin: 10 },
  {
    id: 'quran',
    label: "Baca Al-Qur'an",
    cat: 'quran',
    icon: '📖',
    poin: 15,
    hasInput: true,
    unit: 'halaman',
    defaultVal: 1,
  },
  {
    id: 'hafalan',
    label: "Hafalan / Muraja'ah",
    cat: 'quran',
    icon: '🧠',
    poin: 15,
    hasInput: true,
    unit: 'ayat',
    defaultVal: 5,
  },
  { id: 'dzpagi', label: 'Dzikir Pagi', cat: 'dzikir', icon: '🌄', poin: 10 },
  {
    id: 'dzpetang',
    label: 'Dzikir Petang',
    cat: 'dzikir',
    icon: '🌆',
    poin: 10,
  },
  {
    id: 'dzshalat',
    label: 'Dzikir Setelah Shalat',
    cat: 'dzikir',
    icon: '📿',
    poin: 10,
  },
  {
    id: 'istighfar',
    label: 'Istighfar 100x',
    cat: 'dzikir',
    icon: '🙏',
    poin: 10,
  },
  { id: 'shalawat', label: 'Shalawat', cat: 'dzikir', icon: '✨', poin: 10 },
  { id: 'puasa_sn', label: 'Puasa Sunnah', cat: 'puasa', icon: '🌙', poin: 25 },
  {
    id: 'sedekah',
    label: 'Sedekah',
    cat: 'sedekah',
    icon: '💝',
    poin: 20,
    hasInput: true,
    unit: 'ribu Rp',
    defaultVal: 10,
  },
  {
    id: 'infaq',
    label: 'Infaq / Wakaf',
    cat: 'sedekah',
    icon: '🤲',
    poin: 20,
    hasInput: true,
    unit: 'ribu Rp',
    defaultVal: 10,
  },
  {
    id: 'silaturahmi',
    label: 'Silaturahmi',
    cat: 'lainnya',
    icon: '🤝',
    poin: 10,
  },
  {
    id: 'ilmu',
    label: 'Kajian / Baca Islami',
    cat: 'lainnya',
    icon: '📚',
    poin: 10,
  },
  {
    id: 'jariyah',
    label: 'Amal Jariyah',
    cat: 'lainnya',
    icon: '🌱',
    poin: 15,
  },
];

const CATS: Record<string, { label: string; color: string }> = {
  fardhu: { label: 'Shalat Fardhu', color: '#1D9E75' },
  sunnah: { label: 'Shalat Sunnah', color: '#0F6E56' },
  quran: { label: "Al-Qur'an", color: '#185FA5' },
  dzikir: { label: 'Dzikir & Wirid', color: '#534AB7' },
  puasa: { label: 'Puasa', color: '#BA7517' },
  sedekah: { label: 'Sedekah & Infaq', color: '#D85A30' },
  lainnya: { label: 'Ibadah Lainnya', color: '#5F5E5A' },
};

const MOODS = [
  { id: 'semangat', label: 'Semangat', icon: '🔥' },
  { id: 'tenang', label: 'Tenang', icon: '😌' },
  { id: 'bersyukur', label: 'Bersyukur', icon: '🤲' },
  { id: 'lelah', label: 'Lelah', icon: '😴' },
  { id: 'sedih', label: 'Sedih', icon: '😢' },
];

const SHALAT_TIMES = [
  { name: 'Subuh', time: '05:00' },
  { name: 'Dzuhur', time: '12:00' },
  { name: 'Ashar', time: '15:15' },
  { name: 'Maghrib', time: '18:00' },
  { name: 'Isya', time: '19:15' },
];

const BADGES = [
  {
    id: 'konsisten7',
    label: '7 Hari Konsisten',
    icon: '🏅',
    req: (s: any) => s.streak >= 7,
  },
  {
    id: 'shalat5',
    label: 'Shalat 5 Waktu',
    icon: '🕌',
    req: (s: any) => s.fardhuFull >= 3,
  },
  {
    id: 'hafidz',
    label: 'Hafidz Aktif',
    icon: '📖',
    req: (s: any) => s.quranDays >= 5,
  },
  {
    id: 'dermawan',
    label: 'Dermawan',
    icon: '💝',
    req: (s: any) => s.sedekahTotal >= 50,
  },
  {
    id: 'mujahid',
    label: 'Mujahid Ibadah',
    icon: '⚔️',
    req: (s: any) => s.poin >= 500,
  },
  {
    id: 'perfect',
    label: '100% Sehari',
    icon: '🌟',
    req: (s: any) => s.perfect >= 1,
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function todayKey() {
  return new Date().toISOString().split('T')[0];
}
function weekKeys() {
  const d = [];
  const t = new Date();
  for (let i = 6; i >= 0; i--) {
    const x = new Date(t);
    x.setDate(t.getDate() - i);
    d.push(x.toISOString().split('T')[0]);
  }
  return d;
}
function monthKeys() {
  const t = new Date();
  const y = t.getFullYear();
  const m = t.getMonth();
  const n = new Date(y, m + 1, 0).getDate();
  const d = [];
  for (let i = 1; i <= n; i++)
    d.push(new Date(y, m, i).toISOString().split('T')[0]);
  return d;
}
function dayLabel(ds: string) {
  return ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'][
    new Date(ds).getDay()
  ];
}
function scoreOf(ib: any = {}) {
  return Math.round(
    (IBADAH.filter((i) => ib[i.id]?.checked).length / IBADAH.length) * 100
  );
}
function pointsOf(ib: any = {}) {
  return IBADAH.filter((i) => ib[i.id]?.checked).reduce(
    (a, i) => a + i.poin,
    0
  );
}
function computeStats(records: any[]) {
  const streak = (() => {
    let s = 0;
    const t = new Date();
    while (s < 365) {
      const k = new Date(t);
      k.setDate(t.getDate() - s);
      const key = k.toISOString().split('T')[0];
      const r = records.find((x: any) => x.date === key);
      if (r && scoreOf(r.ibadah_data) > 0) s++;
      else break;
    }
    return s;
  })();
  const perfect = records.filter((r) => scoreOf(r.ibadah_data) === 100).length;
  const poin = records.reduce(
    (a: number, r: any) => a + pointsOf(r.ibadah_data),
    0
  );
  const fardhuFull = records.filter((r) =>
    ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'].every(
      (id) => r.ibadah_data?.[id]?.checked
    )
  ).length;
  const quranDays = records.filter((r) => r.ibadah_data?.quran?.checked).length;
  const sedekahTotal = records.reduce((a: number, r: any) => {
    const s = r.ibadah_data?.sedekah;
    const inf = r.ibadah_data?.infaq;
    return (
      a + (s?.checked ? s.val || 10 : 0) + (inf?.checked ? inf.val || 10 : 0)
    );
  }, 0);
  return { streak, perfect, poin, fardhuFull, quranDays, sedekahTotal };
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [tab, setTab] = useState('checklist');
  const [records, setRecords] = useState<any[]>([]);
  const [allRecords, setAllRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [notifMsg, setNotifMsg] = useState('');

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_, session) => setSession(session));
  }, []);

  useEffect(() => {
    if (!session) return;
    loadProfile();
    loadRecords();
  }, [session]);

  useEffect(() => {
    if (!profile) return;
    if (profile.role === 'admin') loadAllRecords();
  }, [profile]);

  useEffect(() => {
    const iv = setInterval(() => {
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;
      const match = SHALAT_TIMES.find((s) => s.time === hhmm);
      if (match) setNotifMsg(`Waktunya ${match.name}! 🕌`);
    }, 30000);
    return () => clearInterval(iv);
  }, []);

  async function loadProfile() {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    setProfile(data);
  }

  async function loadRecords() {
    setLoading(true);
    const { data } = await supabase
      .from('checkins')
      .select('*')
      .eq('user_id', session.user.id)
      .order('date', { ascending: false })
      .limit(60);
    setRecords(data || []);
    setLoading(false);
  }

  async function loadAllRecords() {
    const { data } = await supabase
      .from('checkins')
      .select('*')
      .order('date', { ascending: false })
      .limit(500);
    setAllRecords(data || []);
  }

  async function upsertRecord(ibadahData: any, mood: string, catatan: string) {
    const today = todayKey();
    const existing = records.find((r) => r.date === today);
    const payload = {
      user_id: session.user.id,
      date: today,
      ibadah_data: ibadahData,
      mood,
      catatan,
    };
    if (existing)
      await supabase.from('checkins').update(payload).eq('id', existing.id);
    else await supabase.from('checkins').insert(payload);
    loadRecords();
    if (profile?.role === 'admin') loadAllRecords();
  }

  if (!session)
    return (
      <AuthScreen mode={authMode} setMode={setAuthMode} onSuccess={() => {}} />
    );
  if (!profile)
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          fontSize: 14,
          color: '#888',
        }}
      >
        Memuat profil...
      </div>
    );

  const todayRec = records.find((r) => r.date === todayKey());
  const todayIbadah = todayRec?.ibadah_data || {};
  const stats = computeStats(records);

  return (
    <div
      style={{
        fontFamily: 'system-ui,sans-serif',
        background: '#f5f5f3',
        minHeight: '100vh',
      }}
    >
      {notifMsg && (
        <div
          style={{
            position: 'fixed',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#0F6E56',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: 20,
            fontSize: 14,
            fontWeight: 500,
            zIndex: 999,
          }}
        >
          {notifMsg}{' '}
          <button
            onClick={() => setNotifMsg('')}
            style={{
              marginLeft: 10,
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 16,
            }}
          >
            ×
          </button>
        </div>
      )}
      <TopBar
        profile={profile}
        tab={tab}
        setTab={setTab}
        onLogout={() => supabase.auth.signOut()}
      />
      <div
        style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '0.875rem 0.875rem 3rem',
        }}
      >
        {loading && (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              color: '#888',
              fontSize: 14,
            }}
          >
            Memuat data...
          </div>
        )}
        {!loading && tab === 'checklist' && (
          <Checklist
            todayIbadah={todayIbadah}
            onToggle={async (id) => {
              const prev = todayIbadah[id] || {
                checked: false,
                val: IBADAH.find((i) => i.id === id)?.defaultVal || 1,
              };
              await upsertRecord(
                { ...todayIbadah, [id]: { ...prev, checked: !prev.checked } },
                todayRec?.mood || '',
                todayRec?.catatan || ''
              );
            }}
            onSetVal={async (id, v) => {
              const prev = todayIbadah[id] || { checked: false };
              await upsertRecord(
                { ...todayIbadah, [id]: { ...prev, val: parseFloat(v) || 0 } },
                todayRec?.mood || '',
                todayRec?.catatan || ''
              );
            }}
            score={scoreOf(todayIbadah)}
            poin={pointsOf(todayIbadah)}
            streak={stats.streak}
            mood={todayRec?.mood || ''}
            catatan={todayRec?.catatan || ''}
            onSaveMoodCatatan={(m, c) => upsertRecord(todayIbadah, m, c)}
          />
        )}
        {tab === 'rapor' && (
          <Rapor records={records} stats={stats} userName={profile.full_name} />
        )}
        {tab === 'badge' && <Badges stats={stats} />}
        {tab === 'admin' && profile.role === 'admin' && (
          <AdminPanel allRecords={allRecords} onRefresh={loadAllRecords} />
        )}
      </div>
    </div>
  );
}

// ─── Auth ──────────────────────────────────────────────────────────────────────
function AuthScreen({
  mode,
  setMode,
  onSuccess,
}: {
  mode: string;
  setMode: any;
  onSuccess: any;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  async function handleSubmit() {
    setLoading(true);
    setErr('');
    setMsg('');
    if (mode === 'register') {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) {
        setErr(error.message);
        setLoading(false);
        return;
      }
      if (data.user) {
        await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: fullName,
            email,
            role: 'user',
          });
        setMsg(
          'Pendaftaran berhasil! Silakan cek email untuk konfirmasi, lalu login.'
        );
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setErr('Email atau password salah.');
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f3',
        padding: '1rem',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 18,
          border: '1px solid #e8e8e5',
          padding: '2rem 1.5rem',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🕌</div>
          <h1 style={{ fontSize: 22, fontWeight: 500, margin: '0 0 4px' }}>
            Mutabaah Yaumiah
          </h1>
          <p style={{ fontSize: 13, color: '#888', margin: 0 }}>
            Baju Terakhir — Tracker Ibadah Harian
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            marginBottom: '1.25rem',
            background: '#f5f5f3',
            borderRadius: 10,
            padding: 3,
          }}
        >
          {['login', 'register'].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setErr('');
                setMsg('');
              }}
              style={{
                flex: 1,
                padding: '7px',
                borderRadius: 8,
                border: 'none',
                background: mode === m ? '#fff' : 'transparent',
                color: mode === m ? '#0F6E56' : '#888',
                fontSize: 13,
                fontWeight: mode === m ? 500 : 400,
                cursor: 'pointer',
              }}
            >
              {m === 'login' ? 'Masuk' : 'Daftar'}
            </button>
          ))}
        </div>
        {mode === 'register' && (
          <div style={{ marginBottom: 12 }}>
            <label
              style={{
                fontSize: 12,
                color: '#888',
                display: 'block',
                marginBottom: 4,
              }}
            >
              Nama Lengkap
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nama kamu"
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 10,
                border: '1px solid #e8e8e5',
                fontSize: 14,
                boxSizing: 'border-box' as const,
                outline: 'none',
              }}
            />
          </div>
        )}
        <div style={{ marginBottom: 12 }}>
          <label
            style={{
              fontSize: 12,
              color: '#888',
              display: 'block',
              marginBottom: 4,
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@kamu.com"
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: 10,
              border: '1px solid #e8e8e5',
              fontSize: 14,
              boxSizing: 'border-box' as const,
              outline: 'none',
            }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              fontSize: 12,
              color: '#888',
              display: 'block',
              marginBottom: 4,
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 6 karakter"
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: 10,
              border: '1px solid #e8e8e5',
              fontSize: 14,
              boxSizing: 'border-box' as const,
              outline: 'none',
            }}
          />
        </div>
        {err && (
          <p
            style={{
              fontSize: 13,
              color: '#c0392b',
              margin: '0 0 10px',
              background: '#fdf0ed',
              padding: '8px 12px',
              borderRadius: 8,
            }}
          >
            {err}
          </p>
        )}
        {msg && (
          <p
            style={{
              fontSize: 13,
              color: '#0F6E56',
              margin: '0 0 10px',
              background: '#E1F5EE',
              padding: '8px 12px',
              borderRadius: 8,
            }}
          >
            {msg}
          </p>
        )}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '11px',
            borderRadius: 10,
            border: 'none',
            background: '#1D9E75',
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          {loading
            ? 'Memproses...'
            : mode === 'login'
            ? 'Masuk'
            : 'Daftar Sekarang'}
        </button>
      </div>
    </div>
  );
}

// ─── TopBar ────────────────────────────────────────────────────────────────────
function TopBar({
  profile,
  tab,
  setTab,
  onLogout,
}: {
  profile: any;
  tab: string;
  setTab: any;
  onLogout: any;
}) {
  const tabs = [
    { id: 'checklist', label: 'Hari Ini' },
    { id: 'rapor', label: 'Rapor' },
    { id: 'badge', label: 'Badge' },
    ...(profile.role === 'admin' ? [{ id: 'admin', label: 'Tim' }] : []),
  ];
  const initials =
    profile.full_name
      ?.split(' ')
      .map((w: string) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || '??';
  return (
    <div
      style={{
        background: '#fff',
        borderBottom: '1px solid #e8e8e5',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: '0 auto',
          padding: '0.625rem 0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 18 }}>🕌</span>
        <span style={{ fontSize: 14, fontWeight: 500, flex: 1 }}>Mutabaah</span>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' as const }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '4px 12px',
                borderRadius: 20,
                border:
                  tab === t.id ? '1.5px solid #1D9E75' : '1px solid #e8e8e5',
                background: tab === t.id ? '#E1F5EE' : 'transparent',
                color: tab === t.id ? '#0F6E56' : '#888',
                fontSize: 12,
                fontWeight: tab === t.id ? 500 : 400,
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: '#1D9E75',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 500,
            color: '#fff',
            cursor: 'pointer',
            flexShrink: 0,
          }}
          onClick={onLogout}
          title="Keluar"
        >
          {initials}
        </div>
      </div>
    </div>
  );
}

// ─── Checklist ─────────────────────────────────────────────────────────────────
function Checklist({
  todayIbadah,
  onToggle,
  onSetVal,
  score,
  poin,
  streak,
  mood,
  catatan,
  onSaveMoodCatatan,
}: any) {
  const [localMood, setLocalMood] = useState(mood);
  const [localCatatan, setLocalCatatan] = useState(catatan);
  const saveTimer = useRef<any>(null);
  useEffect(() => {
    setLocalMood(mood);
    setLocalCatatan(catatan);
  }, [mood, catatan]);
  function scheduleSave(m: string, c: string) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => onSaveMoodCatatan(m, c), 800);
  }
  const done = IBADAH.filter((i) => todayIbadah[i.id]?.checked).length;
  const moodTxt =
    score >= 90
      ? 'Luar Biasa! 🌟'
      : score >= 70
      ? 'Alhamdulillah 😊'
      : score >= 50
      ? 'Terus Semangat 💪'
      : score > 0
      ? 'Yuk Tingkatkan 🙏'
      : 'Bismillah, Mulai Yuk 🤲';
  const dateStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          border: '1px solid #e8e8e5',
          padding: '1.25rem',
          marginBottom: '0.875rem',
        }}
      >
        <p style={{ fontSize: 12, color: '#888', margin: '0 0 10px' }}>
          {dateStr}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 64,
              height: 64,
              flexShrink: 0,
            }}
          >
            <svg
              viewBox="0 0 64 64"
              style={{ width: 64, height: 64, transform: 'rotate(-90deg)' }}
            >
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#f0f0ee"
                strokeWidth="6"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke={
                  score >= 80 ? '#1D9E75' : score >= 50 ? '#EF9F27' : '#F09595'
                }
                strokeWidth="6"
                strokeDasharray={`${score * 1.759} 175.9`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.5s' }}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color:
                    score >= 80
                      ? '#0F6E56'
                      : score >= 50
                      ? '#BA7517'
                      : '#993C1D',
                }}
              >
                {score}%
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 2 }}>
              {moodTxt}
            </div>
            <div style={{ fontSize: 13, color: '#888' }}>
              {done} dari {IBADAH.length} ibadah
            </div>
            <div
              style={{
                display: 'flex',
                gap: 8,
                marginTop: 8,
                flexWrap: 'wrap' as const,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  background: '#E1F5EE',
                  color: '#0F6E56',
                  padding: '2px 10px',
                  borderRadius: 20,
                }}
              >
                🔥 {streak} hari
              </span>
              <span
                style={{
                  fontSize: 12,
                  background: '#FAEEDA',
                  color: '#854F0B',
                  padding: '2px 10px',
                  borderRadius: 20,
                }}
              >
                ⭐ {poin} poin
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            height: 6,
            background: '#f0f0ee',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${score}%`,
              background:
                score >= 80 ? '#1D9E75' : score >= 50 ? '#EF9F27' : '#F09595',
              borderRadius: 4,
              transition: 'width 0.4s',
            }}
          />
        </div>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 14,
          border: '1px solid #e8e8e5',
          padding: '1rem',
          marginBottom: '0.875rem',
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: '#888',
            marginBottom: 10,
          }}
        >
          Mood hari ini
        </div>
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 12,
            flexWrap: 'wrap' as const,
          }}
        >
          {MOODS.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setLocalMood(m.id);
                scheduleSave(m.id, localCatatan);
              }}
              style={{
                padding: '6px 12px',
                borderRadius: 20,
                border:
                  localMood === m.id
                    ? '1.5px solid #1D9E75'
                    : '1px solid #e8e8e5',
                background: localMood === m.id ? '#E1F5EE' : '#f5f5f3',
                color: localMood === m.id ? '#0F6E56' : '#888',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>
        <textarea
          value={localCatatan}
          onChange={(e) => {
            setLocalCatatan(e.target.value);
            scheduleSave(localMood, e.target.value);
          }}
          placeholder="Catatan harian... muhasabah, doa, atau hal yang disyukuri hari ini"
          style={{
            width: '100%',
            minHeight: 70,
            padding: '8px 10px',
            borderRadius: 10,
            border: '1px solid #e8e8e5',
            background: '#f5f5f3',
            fontSize: 13,
            resize: 'vertical' as const,
            fontFamily: 'system-ui,sans-serif',
            boxSizing: 'border-box' as const,
            lineHeight: 1.6,
            outline: 'none',
          }}
        />
      </div>

      {Object.entries(CATS).map(([catId, cat]) => {
        const items = IBADAH.filter((i) => i.cat === catId);
        if (!items.length) return null;
        const catDone = items.filter((i) => todayIbadah[i.id]?.checked).length;
        return (
          <div key={catId} style={{ marginBottom: '0.75rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: cat.color,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.8px',
                }}
              >
                {cat.label}
              </span>
              <span style={{ fontSize: 11, color: '#aaa' }}>
                {catDone}/{items.length}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: '#f0f0ee',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${Math.round((catDone / items.length) * 100)}%`,
                    background: cat.color,
                    borderRadius: 2,
                    transition: 'width 0.3s',
                  }}
                />
              </div>
            </div>
            <div
              style={{
                background: '#fff',
                borderRadius: 14,
                border: '1px solid #e8e8e5',
                overflow: 'hidden',
              }}
            >
              {items.map((item, idx) => {
                const entry = todayIbadah[item.id] || {
                  checked: false,
                  val: item.defaultVal || 1,
                };
                const checked = entry.checked;
                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      borderBottom:
                        idx < items.length - 1 ? '1px solid #f0f0ee' : 'none',
                      background: checked ? '#F0FAF5' : 'transparent',
                      transition: 'background 0.2s',
                    }}
                  >
                    <button
                      onClick={() => onToggle(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        flex: 1,
                        padding: '13px 14px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left' as const,
                        minHeight: 54,
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          border: checked ? 'none' : '2px solid #ccc',
                          background: checked ? '#1D9E75' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.15s',
                          boxShadow: checked
                            ? '0 2px 6px rgba(29,158,117,0.3)'
                            : 'none',
                        }}
                      >
                        {checked && (
                          <svg width="14" height="14" viewBox="0 0 14 14">
                            <polyline
                              points="2,7 6,11 12,3"
                              fill="none"
                              stroke="white"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span style={{ fontSize: 16, flexShrink: 0 }}>
                        {item.icon}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 14,
                            color: checked ? '#0F6E56' : '#222',
                            fontWeight: checked ? 500 : 400,
                          }}
                        >
                          {item.label}
                        </div>
                        {!checked && (
                          <div style={{ fontSize: 11, color: '#aaa' }}>
                            +{item.poin} poin
                          </div>
                        )}
                      </div>
                    </button>
                    {item.hasInput && checked && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          paddingRight: 14,
                          flexShrink: 0,
                        }}
                      >
                        <button
                          onClick={() =>
                            onSetVal(
                              item.id,
                              Math.max(1, (entry.val || item.defaultVal) - 1)
                            )
                          }
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 6,
                            border: '1px solid #e8e8e5',
                            background: '#f5f5f3',
                            cursor: 'pointer',
                            fontSize: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#888',
                          }}
                        >
                          −
                        </button>
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            minWidth: 24,
                            textAlign: 'center' as const,
                            color: '#0F6E56',
                          }}
                        >
                          {entry.val || item.defaultVal}
                        </span>
                        <button
                          onClick={() =>
                            onSetVal(
                              item.id,
                              (entry.val || item.defaultVal) + 1
                            )
                          }
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 6,
                            border: '1px solid #e8e8e5',
                            background: '#f5f5f3',
                            cursor: 'pointer',
                            fontSize: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#888',
                          }}
                        >
                          +
                        </button>
                        <span style={{ fontSize: 11, color: '#aaa' }}>
                          {item.unit}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Rapor ─────────────────────────────────────────────────────────────────────
function Rapor({ records, stats, userName }: any) {
  const [period, setPeriod] = useState('minggu');
  const days = period === 'minggu' ? weekKeys() : monthKeys();
  const scores = days.map((d) => {
    const r = records.find((x: any) => x.date === d) || {};
    return {
      date: d,
      sc: scoreOf(r.ibadah_data || {}),
      pt: pointsOf(r.ibadah_data || {}),
      mood: r.mood || '',
      catatan: r.catatan || '',
    };
  });
  const avg = Math.round(scores.reduce((a, b) => a + b.sc, 0) / scores.length);
  const activeDays = scores.filter((s) => s.sc > 0).length;
  const totalPt = scores.reduce((a, b) => a + b.pt, 0);
  const ibadahStats = IBADAH.map((ib) => {
    const done = days.filter((d) => {
      const r = records.find((x: any) => x.date === d);
      return r?.ibadah_data?.[ib.id]?.checked;
    }).length;
    return { ...ib, done, pct: Math.round((done / days.length) * 100) };
  }).sort((a, b) => b.pct - a.pct);

  function exportPDF() {
    const lines = [
      `RAPOR MUTABAAH YAUMIAH — ${userName?.toUpperCase()}`,
      `Periode: ${period === 'minggu' ? 'Mingguan (7 hari)' : 'Bulanan'}`,
      `Dibuat: ${new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}`,
      '',
      `RINGKASAN`,
      `Rata-rata: ${avg}%`,
      `Hari Aktif: ${activeDays}/${days.length}`,
      `Streak: ${stats.streak} hari`,
      `Total Poin: ${totalPt}`,
      '',
      `DETAIL PER IBADAH`,
      ...ibadahStats.map(
        (ib) => `${ib.icon} ${ib.label}: ${ib.done}x (${ib.pct}%)`
      ),
      '',
      `CATATAN HARIAN`,
      ...scores
        .filter((s) => s.catatan)
        .map(
          (s) =>
            `${s.date} [${MOODS.find((m) => m.id === s.mood)?.icon || ''}]: ${
              s.catatan
            }`
        ),
    ];
    const blob = new Blob([lines.join('\n')], {
      type: 'text/plain;charset=utf-8',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `mutabaah_rapor_${todayKey()}.txt`;
    a.click();
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.875rem',
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { id: 'minggu', l: 'Mingguan' },
            { id: 'bulan', l: 'Bulanan' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              style={{
                padding: '6px 16px',
                borderRadius: 20,
                border:
                  period === p.id ? '1.5px solid #1D9E75' : '1px solid #e8e8e5',
                background: period === p.id ? '#E1F5EE' : 'transparent',
                color: period === p.id ? '#0F6E56' : '#888',
                fontSize: 13,
                fontWeight: period === p.id ? 500 : 400,
                cursor: 'pointer',
              }}
            >
              {p.l}
            </button>
          ))}
        </div>
        <button
          onClick={exportPDF}
          style={{
            padding: '6px 14px',
            borderRadius: 20,
            border: '1px solid #e8e8e5',
            background: '#fff',
            color: '#888',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          📄 Export
        </button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 8,
          marginBottom: '0.875rem',
        }}
      >
        {[
          {
            l: 'Rata-rata',
            v: `${avg}%`,
            c: avg >= 70 ? '#0F6E56' : avg >= 40 ? '#BA7517' : '#993C1D',
          },
          { l: 'Hari Aktif', v: `${activeDays}/${days.length}`, c: '#185FA5' },
          { l: 'Streak', v: `${stats.streak}h`, c: '#534AB7' },
          { l: 'Poin', v: totalPt, c: '#854F0B' },
        ].map((m) => (
          <div
            key={m.l}
            style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #e8e8e5',
              padding: '10px 8px',
              textAlign: 'center' as const,
            }}
          >
            <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>
              {m.l}
            </div>
            <div style={{ fontSize: 18, fontWeight: 500, color: m.c }}>
              {m.v}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: '#fff',
          borderRadius: 14,
          border: '1px solid #e8e8e5',
          padding: '1rem',
          marginBottom: '0.875rem',
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: '#888',
            margin: '0 0 12px',
          }}
        >
          Grafik konsistensi
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: period === 'minggu' ? 8 : 2,
            height: 90,
          }}
        >
          {scores.map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column' as const,
                alignItems: 'center',
                gap: 2,
              }}
            >
              <div style={{ fontSize: 9, color: '#aaa' }}>
                {s.sc > 0 ? `${s.sc}%` : ''}
              </div>
              <div
                style={{
                  width: '100%',
                  background:
                    s.sc >= 80
                      ? '#1D9E75'
                      : s.sc >= 50
                      ? '#EF9F27'
                      : s.sc > 0
                      ? '#F09595'
                      : '#f0f0ee',
                  borderRadius: '3px 3px 0 0',
                  height: `${Math.max(s.sc, 3)}%`,
                  minHeight: 3,
                  transition: 'height 0.3s',
                  position: 'relative' as const,
                }}
                title={`${s.date}: ${s.sc}%`}
              >
                {s.mood && (
                  <span
                    style={{
                      position: 'absolute' as const,
                      top: -16,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 10,
                    }}
                  >
                    {MOODS.find((m) => m.id === s.mood)?.icon || ''}
                  </span>
                )}
              </div>
              {period === 'minggu' && (
                <span style={{ fontSize: 10, color: '#aaa' }}>
                  {dayLabel(s.date)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      {scores.filter((s) => s.catatan).length > 0 && (
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            border: '1px solid #e8e8e5',
            padding: '1rem',
            marginBottom: '0.875rem',
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#888',
              margin: '0 0 10px',
            }}
          >
            Catatan harian
          </p>
          {scores
            .filter((s) => s.catatan)
            .map((s) => (
              <div
                key={s.date}
                style={{
                  marginBottom: 10,
                  paddingBottom: 10,
                  borderBottom: '1px solid #f0f0ee',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <span style={{ fontSize: 12, color: '#aaa' }}>{s.date}</span>
                  {s.mood && (
                    <span style={{ fontSize: 13 }}>
                      {MOODS.find((m) => m.id === s.mood)?.icon}{' '}
                      {MOODS.find((m) => m.id === s.mood)?.label}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: 12,
                      background:
                        s.sc >= 80
                          ? '#E1F5EE'
                          : s.sc >= 50
                          ? '#FAEEDA'
                          : '#FAECE7',
                      color:
                        s.sc >= 80
                          ? '#0F6E56'
                          : s.sc >= 50
                          ? '#854F0B'
                          : '#993C1D',
                      padding: '1px 8px',
                      borderRadius: 20,
                      marginLeft: 'auto',
                    }}
                  >
                    {s.sc}%
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: '#333',
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {s.catatan}
                </p>
              </div>
            ))}
        </div>
      )}
      <div
        style={{
          background: '#fff',
          borderRadius: 14,
          border: '1px solid #e8e8e5',
          padding: '1rem',
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: '#888',
            margin: '0 0 12px',
          }}
        >
          Detail per ibadah
        </p>
        {ibadahStats.map((ib) => {
          const cat = CATS[ib.cat];
          return (
            <div key={ib.id} style={{ marginBottom: 10 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 3,
                }}
              >
                <span style={{ fontSize: 13 }}>
                  {ib.icon} {ib.label}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color:
                      ib.pct >= 70
                        ? '#0F6E56'
                        : ib.pct >= 40
                        ? '#BA7517'
                        : '#aaa',
                  }}
                >
                  {ib.done}x · {ib.pct}%
                </span>
              </div>
              <div
                style={{
                  height: 5,
                  background: '#f0f0ee',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${ib.pct}%`,
                    background: cat.color,
                    borderRadius: 3,
                    transition: 'width 0.3s',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Badges ────────────────────────────────────────────────────────────────────
function Badges({ stats }: any) {
  return (
    <div>
      <div
        style={{
          background: '#fff',
          borderRadius: 14,
          border: '1px solid #e8e8e5',
          padding: '1rem',
          marginBottom: '0.875rem',
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: '#888',
            margin: '0 0 4px',
          }}
        >
          Total Poin
        </p>
        <div style={{ fontSize: 32, fontWeight: 500, color: '#854F0B' }}>
          ⭐ {stats.poin}
        </div>
        <p style={{ fontSize: 12, color: '#aaa', margin: '4px 0 0' }}>
          Streak saat ini: 🔥 {stats.streak} hari
        </p>
      </div>
      <p
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: '#888',
          margin: '0 0 8px',
        }}
      >
        Pencapaian
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {BADGES.map((b) => {
          const unlocked = b.req(stats);
          return (
            <div
              key={b.id}
              style={{
                background: '#fff',
                borderRadius: 14,
                border: unlocked ? '1.5px solid #1D9E75' : '1px solid #e8e8e5',
                padding: '1rem',
                textAlign: 'center' as const,
                opacity: unlocked ? 1 : 0.5,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{b.icon}</div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: unlocked ? '#0F6E56' : '#888',
                }}
              >
                {b.label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: unlocked ? '#1D9E75' : '#aaa',
                  marginTop: 4,
                }}
              >
                {unlocked ? 'Terbuka ✓' : 'Belum terbuka'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Admin ─────────────────────────────────────────────────────────────────────
function AdminPanel({ allRecords, onRefresh }: any) {
  const [sel, setSel] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from('profiles')
      .select('*')
      .then(({ data }) => setProfiles(data || []));
  }, []);

  const members = profiles.filter((p) => p.role !== 'admin');
  const today = todayKey();
  const week = weekKeys();

  if (sel) {
    const u = profiles.find((p) => p.id === sel);
    const uRecords = allRecords.filter((r: any) => r.user_id === sel);
    const sc = scoreOf(
      uRecords.find((r: any) => r.date === today)?.ibadah_data || {}
    );
    return (
      <div>
        <button
          onClick={() => setSel(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: '#1D9E75',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 14,
            marginBottom: '0.875rem',
            padding: 0,
            fontWeight: 500,
          }}
        >
          ← Kembali ke Tim
        </button>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: '#fff',
            borderRadius: 12,
            border: '1px solid #e8e8e5',
            padding: '0.875rem 1rem',
            marginBottom: '0.875rem',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#1D9E75',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 500,
              color: '#fff',
            }}
          >
            {u?.full_name
              ?.split(' ')
              .map((w: string) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{u?.full_name}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{u?.email}</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' as const }}>
            <div style={{ fontSize: 20, fontWeight: 500, color: '#0F6E56' }}>
              {sc}%
            </div>
            <div style={{ fontSize: 11, color: '#aaa' }}>hari ini</div>
          </div>
        </div>
        <Rapor
          records={uRecords}
          stats={computeStats(uRecords)}
          userName={u?.full_name}
        />
      </div>
    );
  }

  const teamAvg =
    members.length > 0
      ? Math.round(
          members.reduce((a, u) => {
            const r = allRecords.find(
              (x: any) => x.user_id === u.id && x.date === today
            );
            return a + scoreOf(r?.ibadah_data || {});
          }, 0) / members.length
        )
      : 0;
  const active = members.filter((u) => {
    const r = allRecords.find(
      (x: any) => x.user_id === u.id && x.date === today
    );
    return scoreOf(r?.ibadah_data || {}) > 0;
  }).length;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.875rem',
        }}
      >
        <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>Panel Admin</p>
        <button
          onClick={onRefresh}
          style={{
            padding: '5px 12px',
            borderRadius: 20,
            border: '1px solid #e8e8e5',
            background: 'transparent',
            color: '#888',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          ↻ Refresh
        </button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 8,
          marginBottom: '0.875rem',
        }}
      >
        {[
          { l: 'Total Member', v: members.length, c: '#222' },
          { l: 'Aktif Hari Ini', v: active, c: '#0F6E56' },
          {
            l: 'Rata-rata Tim',
            v: `${teamAvg}%`,
            c:
              teamAvg >= 70 ? '#0F6E56' : teamAvg >= 40 ? '#BA7517' : '#993C1D',
          },
        ].map((m) => (
          <div
            key={m.l}
            style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #e8e8e5',
              padding: '10px',
              textAlign: 'center' as const,
            }}
          >
            <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>
              {m.l}
            </div>
            <div style={{ fontSize: 20, fontWeight: 500, color: m.c }}>
              {m.v}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: '#fff',
          borderRadius: 14,
          border: '1px solid #e8e8e5',
          padding: '1rem',
          marginBottom: '0.875rem',
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: '#888',
            margin: '0 0 10px',
          }}
        >
          Leaderboard minggu ini
        </p>
        {[...members]
          .sort((a, b) => {
            const sa = week.reduce((s, d) => {
              const r = allRecords.find(
                (x: any) => x.user_id === a.id && x.date === d
              );
              return s + scoreOf(r?.ibadah_data || {});
            }, 0);
            const sb = week.reduce((s, d) => {
              const r = allRecords.find(
                (x: any) => x.user_id === b.id && x.date === d
              );
              return s + scoreOf(r?.ibadah_data || {});
            }, 0);
            return sb - sa;
          })
          .map((u, i) => {
            const wAvg = Math.round(
              week.reduce((s, d) => {
                const r = allRecords.find(
                  (x: any) => x.user_id === u.id && x.date === d
                );
                return s + scoreOf(r?.ibadah_data || {});
              }, 0) / week.length
            );
            return (
              <div
                key={u.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '7px 0',
                  borderBottom:
                    i < members.length - 1 ? '1px solid #f0f0ee' : 'none',
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    width: 20,
                    textAlign: 'center' as const,
                  }}
                >
                  {i === 0
                    ? '🥇'
                    : i === 1
                    ? '🥈'
                    : i === 2
                    ? '🥉'
                    : `${i + 1}`}
                </div>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#1D9E75',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 500,
                    color: '#fff',
                  }}
                >
                  {u.full_name
                    ?.split(' ')
                    .map((w: string) => w[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>
                    {u.full_name}
                  </div>
                  <div
                    style={{
                      height: 4,
                      background: '#f0f0ee',
                      borderRadius: 2,
                      overflow: 'hidden',
                      marginTop: 3,
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${wAvg}%`,
                        background: '#1D9E75',
                        borderRadius: 2,
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{ fontSize: 14, fontWeight: 500, color: '#1D9E75' }}
                >
                  {wAvg}%
                </div>
              </div>
            );
          })}
      </div>
      <p
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: '#888',
          margin: '0 0 8px',
        }}
      >
        Detail per anggota
      </p>
      {members.map((u) => {
        const todayRec = allRecords.find(
          (x: any) => x.user_id === u.id && x.date === today
        );
        const sc = scoreOf(todayRec?.ibadah_data || {});
        const wAvg = Math.round(
          week.reduce((s, d) => {
            const r = allRecords.find(
              (x: any) => x.user_id === u.id && x.date === d
            );
            return s + scoreOf(r?.ibadah_data || {});
          }, 0) / week.length
        );
        return (
          <button
            key={u.id}
            onClick={() => setSel(u.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              width: '100%',
              padding: '12px 14px',
              marginBottom: 8,
              background: '#fff',
              borderRadius: 14,
              border: '1px solid #e8e8e5',
              cursor: 'pointer',
              textAlign: 'left' as const,
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.borderColor =
                '#1D9E75')
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.borderColor =
                '#e8e8e5')
            }
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#1D9E75',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 500,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {u.full_name
                ?.split(' ')
                .map((w: string) => w[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500 }}>
                  {u.full_name}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: sc >= 70 ? '#0F6E56' : sc >= 40 ? '#BA7517' : '#aaa',
                  }}
                >
                  {sc}%
                </span>
              </div>
              <div
                style={{
                  height: 5,
                  background: '#f0f0ee',
                  borderRadius: 3,
                  overflow: 'hidden',
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${sc}%`,
                    background: '#1D9E75',
                    borderRadius: 3,
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 11, color: '#aaa' }}>
                  Minggu ini: {wAvg}%
                </span>
                {todayRec?.mood && (
                  <span style={{ fontSize: 11 }}>
                    {MOODS.find((m) => m.id === todayRec.mood)?.icon}
                  </span>
                )}
              </div>
            </div>
            <span style={{ color: '#aaa', fontSize: 16 }}>›</span>
          </button>
        );
      })}
    </div>
  );
}
