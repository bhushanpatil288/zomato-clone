import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateOrderStatus } from '../../redux/authThunk';

const STATUS_FLOW = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
const STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};
const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
  confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  preparing: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
  out_for_delivery: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400',
  delivered: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
};

const TABS = [
  { label: 'All', key: '' },
  { label: 'Pending', key: 'pending' },
  { label: 'Confirmed', key: 'confirmed' },
  { label: 'Preparing', key: 'preparing' },
  { label: 'Out for Delivery', key: 'out_for_delivery' },
  { label: 'Delivered', key: 'delivered' },
  { label: 'Cancelled', key: 'cancelled' },
];

const OrdersPanel = () => {
  const dispatch = useDispatch();
  const { data: orders, total, page, pages, isLoading, errors } = useSelector((state) => state.orders);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const baseUrl = import.meta.env.VITE_BASE_URL?.replace('/api', '') || '';

  useEffect(() => {
    const params = { page: currentPage, limit: 10 };
    if (statusFilter) params.status = statusFilter;
    dispatch(getOrders(params));
  }, [dispatch, statusFilter, currentPage]);

  const handleStatusUpdate = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  const getNextStatus = (current) => {
    const idx = STATUS_FLOW.indexOf(current);
    if (idx === -1 || idx === STATUS_FLOW.length - 1) return null;
    return STATUS_FLOW[idx + 1];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {total} total order{total !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => { setStatusFilter(t.key); setCurrentPage(1); }}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${statusFilter === t.key
              ? 'bg-[#E23744] text-white border-[#E23744]'
              : 'bg-white dark:bg-[#1e1e1e] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-[#2e2e2e] hover:border-[#E23744]/40'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Loading / Error */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-3 border-[#E23744] border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading orders...</p>
        </div>
      )}

      {errors && (
        <div className="text-center py-12">
          <p className="text-red-500 text-sm">{errors}</p>
        </div>
      )}

      {/* Orders List */}
      {!isLoading && !errors && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">📦</div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">No orders found</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                {statusFilter ? 'Try a different status filter' : 'Orders will appear here when customers place them'}
              </p>
            </div>
          ) : orders.map((order) => {
            const nextStatus = getNextStatus(order.status);
            return (
              <div key={order._id} className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-[#2e2e2e] p-5 hover:shadow-md transition-all">
                {/* Top row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">#{order._id?.slice(-8)}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">
                      ₹{order.totalAmount?.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status] || ''}`}>
                    {STATUS_LABELS[order.status] || order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2 mb-4">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-[#252525] rounded-xl p-2.5">
                      {item.foodId?.image ? (
                        <img src={`${baseUrl}${item.foodId.image}`} alt={item.foodId?.title} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-[#333] flex items-center justify-center text-lg">🍔</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                          {item.foodId?.title || item.title || 'Food Item'}
                        </p>
                        <p className="text-xs text-gray-400">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Delivery address */}
                {order.deliveryAddress && (
                  <div className="flex items-start gap-2 mb-4 text-xs text-gray-500 dark:text-gray-400">
                    <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#E23744]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span>{order.deliveryAddress}</span>
                  </div>
                )}

                {/* Date + Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[#2e2e2e]">
                  <p className="text-xs text-gray-400">
                    {order.createdAt ? new Date(order.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : ''}
                  </p>
                  <div className="flex gap-2">
                    {order.status !== 'cancelled' && order.status !== 'delivered' && (
                      <button
                        onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all"
                      >
                        Cancel
                      </button>
                    )}
                    {nextStatus && (
                      <button
                        onClick={() => handleStatusUpdate(order._id, nextStatus)}
                        className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#E23744] text-white hover:bg-[#c8202d] active:scale-95 transition-all shadow-sm"
                      >
                        → {STATUS_LABELS[nextStatus]}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-[#2e2e2e] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1e1e1e] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            ← Prev
          </button>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Page {page} of {pages}
          </span>
          <button
            disabled={currentPage >= pages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-[#2e2e2e] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1e1e1e] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPanel;
