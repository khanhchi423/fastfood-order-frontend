import React from 'react';
import { RefreshCw, Package, Clock, MapPin, Phone, Calendar, CheckCircle, XCircle, AlertCircle, Truck, Receipt } from 'lucide-react';

const OrderHistoryPage = ({ orders, onConfirmOrder, onCancelOrder, loading }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'PLACED':
        return {
          icon: Clock,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          label: 'Pending',
          description: 'Your order is being processed'
        };
      case 'CONFIRMED':
        return {
          icon: CheckCircle,
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          label: 'Confirmed',
          description: 'Order confirmed and being prepared'
        };
      case 'CANCELLED':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          label: 'Cancelled',
          description: 'Order has been cancelled'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          label: 'Unknown',
          description: 'Status unknown'
        };
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600 mt-1">Track and manage your orders</p>
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span className="text-sm font-medium">Refresh</span>
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="text-gray-600">Loading your orders...</p>
            </div>
          </div>
        ) : orders.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">No orders yet</h3>
                <p className="text-gray-500 mt-1">When you place an order, it will appear here</p>
              </div>
            </div>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-4">
            {orders.map(order => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div key={order.orderId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Order Header */}
                  <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <Package className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order.orderId.substring(0, 8)}...
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(order.createdAt).toLocaleString('vi-VN')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.color} ${statusConfig.borderColor} border`}>
                          <StatusIcon className="h-4 w-4" />
                          <span>{statusConfig.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                          {formatCurrency(order.totalAmount || 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Content */}
                  <div className="px-6 py-4">
                    {/* Status Description */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                        <span className="text-sm font-medium text-gray-900">{statusConfig.description}</span>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        Delivery Information
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Name:</span>
                          <span className="text-sm font-medium text-gray-900">{order.customerName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{order.customerPhone}</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                          <span className="text-sm text-gray-600">{order.customerAddress}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Order Items */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-900 flex items-center">
                        <Package className="h-4 w-4 mr-2" />
                        Order Items
                      </h4>
                      <div className="space-y-2">
                        {order.items && order.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="h-25 w-25 rounded-md flex items-center justify-center">
                                <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-gray-900">
                                {formatCurrency(item.total || item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Order Total */}
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-base font-semibold text-gray-900">Total Amount</span>
                          <span className="text-xl font-bold text-gray-900">
                            {formatCurrency(order.totalAmount || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Actions */}
                  {order.status === 'PLACED' && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>Order is awaiting your action</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => onCancelOrder(order.orderId)}
                            className="inline-flex items-center px-4 py-2 border border-red-300 text-red-700 bg-white hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel Order
                          </button>
                          <button
                            onClick={() => onConfirmOrder(order.orderId)}
                            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg text-sm font-medium transition-colors shadow-sm"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Confirm Order
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;