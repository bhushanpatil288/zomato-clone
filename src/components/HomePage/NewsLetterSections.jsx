
const NewsLetterSections = () => {
  return (
    <section className="py-14 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="text-5xl mb-4">✉️</div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Never miss a deal</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-7">
          Get the latest restaurant openings, exclusive offers, and food trends delivered to your inbox every week.
        </p>
        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email..."
            className="flex-1 px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-[#2e2e2e] bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E23744] text-sm transition-all"
          />
          <button className="px-6 py-3.5 bg-[#E23744] hover:bg-[#c8202d] text-white font-bold text-sm rounded-2xl transition-all active:scale-95 shadow-lg shadow-red-200 dark:shadow-none flex-shrink-0">
            Subscribe
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-3">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </section>
  );
};

export default NewsLetterSections;
