import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { themeToggle } from '../redux/themeSlice';
import { registerUser } from '../redux/authThunk';
import { useNavigate } from 'react-router';
import { LuUtensilsCrossed, LuPackage, LuTrendingUp, LuRocket } from 'react-icons/lu';

export default function SignupPage() {
  const dispatch = useDispatch();
  const dark = useSelector(state => state.theme.dark);
  const { isLoading: loading, user, errors } = useSelector(state => state.auth);
  const toggleTheme = () => dispatch(themeToggle());
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  });

  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState(1); // 2-step signup

  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    if (user) {
      navigate('/dashboard');
    }

    return () => document.head.removeChild(link);
  }, [user, navigate]);

  const passStrength = (p) => {
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };
  const strength = passStrength(form.password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'][strength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }

    try {

      const formData = new FormData();

      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('password', form.password);
      formData.append('address', form.address);

      if (image) {
        formData.append('image', image);
      }

      const res = await dispatch(registerUser(formData));

      console.log(res);

    } catch (e) {
      console.log(e);
    }
  };

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    // preview image
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div style={{ fontFamily: '\'Outfit\', sans-serif' }} className={dark ? 'dark' : ''}>
      <div className="min-h-screen flex bg-gray-50 dark:bg-[#0f0f0f]">

        {/* ── Left Panel ── */}
        <div className="hidden lg:flex lg:w-[48%] bg-[#E23744] relative overflow-hidden flex-col items-center justify-center p-14 select-none">
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -right-12 w-96 h-96 rounded-full bg-white/10" />
          <div className="absolute top-16 right-10 w-32 h-32 rounded-full bg-white/5" />

          <div className="relative z-10 text-white text-center max-w-xs">
            <div className="flex items-center justify-center gap-2 mb-10">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-[#E23744] text-xl font-black">Z</span>
              </div>
              <span className="text-3xl font-bold">zomato<span className="text-red-200 text-sm ml-1">partner</span></span>
            </div>

            <h2 className="text-3xl font-bold mb-3 leading-snug">Register your restaurant</h2>
            <p className="text-red-100 mb-10 text-sm leading-relaxed">
              Get your restaurant online, manage your menu in real-time, and start receiving orders today.
            </p>

            {/* Perks */}
            <div className="space-y-4 text-left">
              {[
                { icon: LuUtensilsCrossed, title: 'Easy menu management', desc: 'Add, edit & organise your dishes' },
                { icon: LuPackage, title: 'Real-time order tracking', desc: 'Accept & manage incoming orders' },
                { icon: LuTrendingUp, title: 'Business dashboard', desc: 'Revenue, stats & performance data' },
                { icon: LuRocket, title: 'Grow your reach', desc: 'Reach millions of hungry customers' },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="flex items-start gap-3 bg-white/10 rounded-xl p-3 border border-white/20">
                    <div className="text-white"><Icon className="w-5 h-5" /></div>
                    <div>
                      <p className="text-white font-semibold text-sm">{p.title}</p>
                      <p className="text-red-100 text-xs">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right Form Panel ── */}
        <div className="w-full lg:w-[52%] flex flex-col items-center justify-center p-8 lg:p-16 bg-white dark:bg-[#141414] relative">
          {/* Dark toggle */}
          <button
            onClick={toggleTheme}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 dark:bg-[#2a2a2a] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform"
          >
            {dark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.707.707M5.636 18.364l-.707.707M18.364 18.364l-.707-.707M5.636 5.636l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-[#E23744] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">Z</span>
            </div>
            <span className="text-[#E23744] text-2xl font-bold">zomato</span>
          </div>

          <div className="w-full max-w-sm">
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s
                      ? 'bg-[#E23744] text-white'
                      : 'bg-gray-100 dark:bg-[#2a2a2a] text-gray-400'
                    }`}
                  >
                    {step > s ? '✓' : s}
                  </div>
                  <span className={`text-xs font-medium ${step >= s ? 'text-[#E23744]' : 'text-gray-400'}`}>
                    {s === 1 ? 'Basic Info' : 'Security'}
                  </span>
                  {s === 1 && <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-[#E23744]' : 'bg-gray-200 dark:bg-[#2e2e2e]'}`} />}
                </div>
              ))}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {step === 1 ? 'Create your account' : 'Secure your account'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-7 text-sm">
              {step === 1 ? 'Start your food journey today' : 'Set a strong password to protect your account'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  {/* profile Image */}
                  <div className='flex flex-col justify-center items-center'>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Restaurant Logo
                    </label>

                    <div className="flex items-center gap-4">

                      {/* Preview */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200 dark:border-[#2e2e2e] bg-gray-100 dark:bg-[#1e1e1e] flex items-center justify-center">
                        {preview ? (
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-400 text-center px-2">
                            No Image
                          </span>
                        )}
                      </div>

                      {/* Upload */}
                      <label className="cursor-pointer px-4 py-3 rounded-xl bg-[#E23744] text-white text-sm font-medium hover:bg-[#c8202d] transition-all">
                        +

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Full name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Restaurant name</label>
                    <input
                      type="text" name='name' value={form.name} onChange={(e) => update('name', e.target.value)}
                      placeholder="e.g. Spice Garden" required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent text-sm transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email address</label>
                    <input
                      type="email" name='email' value={form.email} onChange={(e) => update('email', e.target.value)}
                      placeholder="you@example.com" required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent text-sm transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Restaurant address</label>
                    <textarea
                      type="text" name='address' value={form.address} onChange={(e) => update('address', e.target.value)}
                      placeholder="Full restaurant address" required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent text-sm transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone number</label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 px-3 rounded-xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-700 dark:text-gray-300 text-sm font-medium whitespace-nowrap">
                        🇮🇳 +91
                      </div>
                      <input
                        type="tel" name='phone' value={form.phone} onChange={(e) => update('phone', e.target.value)}
                        placeholder="98765 43210" required
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent text-sm transition-all"
                      />
                    </div>
                  </div>
                  {errors && <p className='text-center text-red-500'>{errors}</p>}
                </>
              ) : (
                <>
                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'} name='password' value={form.password}
                        onChange={(e) => update('password', e.target.value)}
                        placeholder="Create a strong password" required
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent text-sm transition-all"
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          {showPass
                            ? <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            : <><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>}
                        </svg>
                      </button>
                    </div>

                    {/* Strength meter */}
                    {form.password && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : 'bg-gray-200 dark:bg-[#2e2e2e]'}`} />
                          ))}
                        </div>
                        <p className={`text-xs font-medium ${['', 'text-red-400', 'text-orange-400', 'text-yellow-400', 'text-green-500'][strength]}`}>
                          {strengthLabel} password
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm password</label>
                    <input
                      type="password" placeholder="Re-enter your password" required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E23744] focus:border-transparent text-sm transition-all"
                    />
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 accent-[#E23744] w-4 h-4 rounded"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      I agree to Zomato's{' '}
                      <a href="#" className="text-[#E23744] hover:underline">Terms of Service</a>{' '}
                      and{' '}
                      <a href="#" className="text-[#E23744] hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                  {errors && <p className='text-center text-red-500'>{errors}</p>}
                </>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 pt-1">
                {step === 2 && (
                  <button
                    type="button" onClick={() => setStep(1)}
                    className="flex-1 py-3.5 border border-gray-200 dark:border-[#2e2e2e] text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-all text-sm"
                  >
                    ← Back
                  </button>
                )}
                <button
                  type="submit" disabled={loading || (step === 2 && !agreed)}
                  className="flex-1 py-3.5 bg-[#E23744] hover:bg-[#c8202d] active:scale-95 text-white font-semibold rounded-xl transition-all text-sm shadow-lg shadow-red-200 dark:shadow-none disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                      Creating...
                    </span>
                  ) : step === 1 ? 'Continue →' : 'Create Account'}
                </button>
              </div>
            </form>

            {step === 1 && (
              <>
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-gray-200 dark:bg-[#2e2e2e]" />
                  <span className="text-xs text-gray-400 font-medium">OR</span>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-[#2e2e2e]" />
                </div>
                <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 dark:border-[#2e2e2e] rounded-xl hover:bg-gray-50 dark:hover:bg-[#1e1e1e] transition-all text-sm font-medium text-gray-700 dark:text-gray-300">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  Continue with Google
                </button>
              </>
            )}

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Already have an account?{' '}
              <span onClick={() => navigate('/login')} className="text-[#E23744] font-semibold hover:underline cursor-pointer">Sign in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
