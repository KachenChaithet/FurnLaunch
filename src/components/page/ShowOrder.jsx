import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, MapPin, Phone, Building, User, Clock, Package, Eye, Edit, Trash2, X, Save, RefreshCw, Settings } from 'lucide-react';
import axios from 'axios';

const ShowOrder = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'view', 'edit', 'delete', 'editStatus'
    const [editFormData, setEditFormData] = useState({});
    const [actionLoading, setActionLoading] = useState(false);
    const [productByid, setProductByid] = useState({ items: [] });
    const [statusFormData, setStatusFormData] = useState('');
    console.log(productByid);


    const fetchOrderByID = async (id) => {
        console.log(id);

        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:5000/orders/${id}`)

            const data = response.data
            setProductByid(data)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    const fetchbilling = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/billing-details");
            const data = response.data;

            setOrders(data);
            setFilteredOrders(data);
            console.log("fetchbilling pass");
        } catch (error) {
            console.error("Error fetching billing data:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteOrder = async (id) => {
        try {
            setActionLoading(true);
            await axios.delete(`http://localhost:5000/billing-details/${id}`);

            const updatedOrders = orders.filter((order) => order.id !== id);
            setOrders(updatedOrders);
            setFilteredOrders(updatedOrders);

            setShowModal(false);
            setSelectedOrder(null);

            alert("ลบคำสั่งซื้อเรียบร้อยแล้ว");
            fetchbilling()
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("เกิดข้อผิดพลาดในการลบคำสั่งซื้อ: " + error.message);
        } finally {
            setActionLoading(false);
        }
    };

    const updateOrder = async (id, updatedData) => {
        try {
            setActionLoading(true);
            const response = await axios.put(
                `http://localhost:5000/billing-details/${id}`,
                updatedData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            const updatedOrder = response.data;

            const updatedOrders = orders.map((order) =>
                order.id === id ? updatedOrder : order
            );
            setOrders(updatedOrders);
            setFilteredOrders(updatedOrders);

            setShowModal(false);
            setSelectedOrder(null);
            setEditFormData({});

            alert("แก้ไขคำสั่งซื้อเรียบร้อยแล้ว");
        } catch (error) {
            console.error("Error updating order:", error);
            alert("เกิดข้อผิดพลาดในการแก้ไขคำสั่งซื้อ: " + error.message);
        } finally {
            setActionLoading(false);
        }
    };

    // ฟังก์ชันใหม่สำหรับอัพเดทสถานะ
    const updateOrderStatus = async (id, newStatus) => {
        try {
            setActionLoading(true);
            const response = await axios.put(
                `http://localhost:5000/billing-details/${id}`,
                { status: newStatus },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            // อัพเดท state โดยการเปลี่ยนแปลงเฉพาะสถานะ
            const updatedOrders = orders.map((order) => {
                if (order.id === id) {
                    return {
                        ...order,
                        order: {
                            ...order.order,
                            status: newStatus
                        }
                    };
                }
                return order;
            });

            setOrders(updatedOrders);
            setFilteredOrders(updatedOrders);

            setShowModal(false);
            setSelectedOrder(null);
            setStatusFormData('');

            alert("แก้ไขสถานะคำสั่งซื้อเรียบร้อยแล้ว");
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("เกิดข้อผิดพลาดในการแก้ไขสถานะ: " + error.message);
        } finally {
            setActionLoading(false);
        }
    };

    const openModal = (type, order) => {
        setModalType(type);
        setSelectedOrder(order);
        if (type === 'edit') {
            setEditFormData({
                FirstName: order.FirstName || '',
                LastName: order.LastName || '',
                company: order.company || '',
                country: order.country || '',
                address: order.address || '',
                city: order.city || '',
                province: order.province || '',
                zip: order.zip || '',
                phone: order.phone || '',
                note: order.note || '',
            });
        } else if (type === 'editStatus') {
            setStatusFormData(order.order?.status || 'pending');
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
        setEditFormData({});
        setStatusFormData('');
        setModalType('');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleStatusChange = (e) => {
        setStatusFormData(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedOrder) {
            updateOrder(selectedOrder.id, editFormData);
        }
    };

    const handleStatusSubmit = (e) => {
        e.preventDefault();
        if (selectedOrder) {
            updateOrderStatus(selectedOrder.id, statusFormData);
        }
    };

    useEffect(() => {
        fetchbilling();
    }, []);

    useEffect(() => {
        let filtered = orders;

        if (searchTerm) {
            filtered = filtered.filter(order =>
                `${order.FirstName} ${order.LastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.order.id.toString().includes(searchTerm)
            );
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(order => order.order.status === statusFilter);
        }

        filtered.sort((a, b) => {
            if (sortBy === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortBy === 'oldest') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
            return 0;
        });

        setFilteredOrders(filtered);
    }, [orders, searchTerm, statusFilter, sortBy]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'รอดำเนินการ';
            case 'completed':
                return 'เสร็จสิ้น';
            case 'cancelled':
                return 'ยกเลิก';
            default:
                return 'ไม่ทราบ';
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการคำสั่งซื้อ</h1>
                        <p className="text-gray-600">จำนวนคำสั่งซื้อทั้งหมด: {filteredOrders.length} รายการ</p>
                    </div>
                    <button
                        onClick={fetchbilling}
                        disabled={loading}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        <span>{loading ? 'กำลังโหลด...' : 'รีเฟรช'}</span>
                    </button>
                </div>
            </div>

            {/* ส่วนค้นหาและกรอง */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="ค้นหาชื่อ บริษัท หรือหมายเลขคำสั่งซื้อ..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">สถานะทั้งหมด</option>
                            <option value="pending">รอดำเนินการ</option>
                            <option value="completed">เสร็จสิ้น</option>
                            <option value="cancelled">ยกเลิก</option>
                        </select>
                    </div>

                    <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <select
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="oldest">ใหม่สุดก่อน</option>
                            <option value="newest">เก่าสุดก่อน</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* รายการคำสั่งซื้อ */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                    <span className="ml-3 text-lg text-gray-600">กำลังโหลดข้อมูล...</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                    {filteredOrders?.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 w-[600px]">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center space-x-2">
                                    <Package className="w-5 h-5 text-blue-600" />
                                    <span className="font-semibold text-lg">คำสั่งซื้อ #{order.order?.id || 'N/A'}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.order?.status || 'unknown')}`}>
                                        {getStatusText(order.order?.status)}
                                    </span>
                                    <button
                                        onClick={() => openModal('editStatus', order)}
                                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                        title="แก้ไขสถานะ"
                                    >
                                        <Settings className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>
                            </div>

                            {/* ข้อมูลลูกค้า */}
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center space-x-2">
                                    <User className="w-4 h-4 text-gray-400" />
                                    <span className="font-medium">{order.FirstName} {order.LastName}</span>
                                </div>

                                {order.company && (
                                    <div className="flex items-center space-x-2">
                                        <Building className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">{order.company}</span>
                                    </div>
                                )}

                                <div className="flex items-start space-x-2">
                                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div className="text-sm text-gray-600">
                                        <div>{order.address}</div>
                                        <div>{order.city}, {order.province} {order.zip}</div>
                                        <div>{order.country}</div>
                                    </div>
                                </div>

                                {order.phone && (
                                    <div className="flex items-center space-x-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="text-gray-600">{order.phone}</span>
                                    </div>
                                )}
                            </div>

                            {/* หมายเหตุ */}
                            {order.note && (
                                <div className="bg-gray-50 p-3 rounded-md mb-4">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">หมายเหตุ: </span>
                                        {order.note}
                                    </p>
                                </div>
                            )}

                            {/* วันที่ */}
                            <div className="border-t pt-4">
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>สร้างเมื่อ:</span>
                                    </div>
                                    <span>{formatDate(order.createdAt)}</span>
                                </div>
                                {order.updatedAt !== order.createdAt && (
                                    <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
                                        <span>แก้ไขล่าสุด:</span>
                                        <span>{formatDate(order.updatedAt)}</span>
                                    </div>
                                )}
                            </div>

                            {/* ปุ่มการดำเนินการ */}
                            <div className="mt-4 flex space-x-2">
                                <button
                                    onClick={() => openModal('view', order)}
                                    className="flex items-center justify-center space-x-1 flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm"
                                >
                                    <Eye className="w-3 h-3" />
                                    <span>ดูรายละเอียดลูกค้า</span>
                                </button>
                                <button
                                    onClick={() => {
                                        fetchOrderByID(order.order.id);
                                        openModal('viewproduct', order);
                                    }}
                                    className="flex items-center justify-center space-x-1 flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm"
                                >
                                    <Eye className="w-3 h-3" />
                                    <span>ดูรายละเอียดสินค้า</span>
                                </button>
                                <button
                                    onClick={() => openModal('edit', order)}
                                    className="flex items-center justify-center space-x-1 flex-1 bg-amber-600 text-white py-2 px-3 rounded-md hover:bg-amber-700 transition-colors text-sm"
                                >
                                    <Edit className="w-3 h-3" />
                                    <span>แก้ไข</span>
                                </button>
                                <button
                                    onClick={() => openModal('delete', order)}
                                    className="flex items-center justify-center space-x-1 bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700 transition-colors text-sm"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* กรณีไม่มีข้อมูล */}
            {!loading && filteredOrders.length === 0 && (
                <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบคำสั่งซื้อ</h3>
                    <p className="text-gray-500">ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองของคุณ</p>
                </div>
            )}

            {/* Modal */}
            {showModal && filteredOrders && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">
                                {modalType === 'view' && `รายละเอียดคำสั่งซื้อ #${selectedOrder.order?.id}`}
                                {modalType === 'viewproduct' && `รายละเอียดสินค้า #${selectedOrder.order?.id}`}
                                {modalType === 'edit' && `แก้ไขคำสั่งซื้อ #${selectedOrder.order?.id}`}
                                {modalType === 'editStatus' && `แก้ไขสถานะคำสั่งซื้อ #${selectedOrder.order?.id}`}
                                {modalType === 'delete' && `ลบคำสั่งซื้อ #${selectedOrder.order?.id}`}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {modalType === 'editStatus' && (
                                <form onSubmit={handleStatusSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-4">สถานะปัจจุบัน</label>
                                        <div className="mb-6">
                                            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.order?.status || 'unknown')}`}>
                                                {getStatusText(selectedOrder.order?.status)}
                                            </span>
                                        </div>

                                        <label className="block text-sm font-medium text-gray-700 mb-2">เปลี่ยนเป็นสถานะ</label>
                                        <select
                                            value={statusFormData}
                                            onChange={handleStatusChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            <option value="pending">รอดำเนินการ</option>
                                            <option value="completed">เสร็จสิ้น</option>
                                            <option value="cancelled">ยกเลิก</option>
                                        </select>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-medium text-blue-900 mb-2">ข้อมูลคำสั่งซื้อ</h4>
                                        <p className="text-sm text-blue-800">ลูกค้า: {selectedOrder.FirstName} {selectedOrder.LastName}</p>
                                        <p className="text-sm text-blue-800">บริษัท: {selectedOrder.company || '-'}</p>
                                        <p className="text-sm text-blue-800">วันที่สร้าง: {formatDate(selectedOrder.createdAt)}</p>
                                    </div>
                                </form>
                            )}

                            {modalType === 'view' && (
                                <div className="space-y-6">
                                    {/* Order Status */}
                                    <div className="flex items-center space-x-4">
                                        <span className="font-medium">สถานะ:</span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.order?.status || 'unknown')}`}>
                                            {getStatusText(selectedOrder.order?.status)}
                                        </span>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-lg mb-4 text-gray-900">ข้อมูลลูกค้า</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
                                                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.FirstName} {selectedOrder.LastName}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">บริษัท</label>
                                                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.company || '-'}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
                                                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.phone || '-'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-lg mb-4 text-gray-900">ที่อยู่</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">ที่อยู่</label>
                                                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.address || '-'}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">เมือง/จังหวัด</label>
                                                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.city}, {selectedOrder.province}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">รหัสไปรษณีย์/ประเทศ</label>
                                                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.zip} - {selectedOrder.country}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    {selectedOrder.note && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">หมายเหตุ</label>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-sm text-gray-700">{selectedOrder.note}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Dates */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">วันที่สร้าง</label>
                                            <p className="mt-1 text-sm text-gray-900">{formatDate(selectedOrder.createdAt)}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">แก้ไขล่าสุด</label>
                                            <p className="mt-1 text-sm text-gray-900">{formatDate(selectedOrder.updatedAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {modalType === 'viewproduct' && (
                                <div className="space-y-6 max-h-[70vh] overflow-y-auto p-4">
                                    {/* Order Status */}
                                    <div className="flex items-center space-x-4">
                                        <span className="font-medium">สถานะ:</span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.order?.status || 'unknown')}`}>
                                            {getStatusText(selectedOrder.order?.status)}
                                        </span>
                                    </div>

                                    {/* Product Details */}
                                    {productByid?.items?.length > 0 && (
                                        <div>
                                            <h3 className="font-semibold text-lg mb-4 text-gray-900">รายการสินค้า</h3>
                                            <div className="space-y-3">
                                                {productByid.items.map((item, idx) => (
                                                    <div key={item.id || idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                                        <div className="flex items-center gap-3">
                                                            <img src={item.img || '/placeholder.png'} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                                                            <div>
                                                                <p className="font-medium text-gray-900">{item.name}</p>
                                                                <p className="text-sm text-gray-700">จำนวน: {item.quantity}</p>
                                                            </div>
                                                        </div>
                                                        <p className="font-semibold text-gray-900">{item.price} TH</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Dates */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">วันที่สร้าง</label>
                                            <p className="mt-1 text-sm text-gray-900">{formatDate(selectedOrder.createdAt)}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">แก้ไขล่าสุด</label>
                                            <p className="mt-1 text-sm text-gray-900">{formatDate(selectedOrder.updatedAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {modalType === 'edit' && (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ</label>
                                            <input
                                                type="text"
                                                name="FirstName"
                                                value={editFormData.FirstName}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">นามสกุล</label>
                                            <input
                                                type="text"
                                                name="LastName"
                                                value={editFormData.LastName}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">บริษัท</label>
                                            <input
                                                type="text"
                                                name="company"
                                                value={editFormData.company}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={editFormData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">ที่อยู่</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={editFormData.address}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">เมือง</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={editFormData.city}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">จังหวัด</label>
                                            <input
                                                type="text"
                                                name="province"
                                                value={editFormData.province}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">รหัสไปรษณีย์</label>
                                            <input
                                                type="text"
                                                name="zip"
                                                value={editFormData.zip}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">ประเทศ</label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={editFormData.country}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">หมายเหตุ</label>
                                            <textarea
                                                name="note"
                                                value={editFormData.note}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                    </div>
                                </form>
                            )}

                            {modalType === 'delete' && (
                                <div className="text-center py-6">
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                        <Trash2 className="h-6 w-6 text-red-600" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">คุณแน่ใจหรือไม่?</h3>
                                    <p className="text-sm text-gray-500 mb-6">
                                        การลบคำสั่งซื้อนี้จะไม่สามารถกู้คืนได้ คุณต้องการดำเนินการต่อหรือไม่?
                                    </p>
                                    <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                                        <p className="text-sm"><span className="font-medium">คำสั่งซื้อ:</span> #{selectedOrder.order?.id}</p>
                                        <p className="text-sm"><span className="font-medium">ลูกค้า:</span> {selectedOrder.FirstName} {selectedOrder.LastName}</p>
                                        <p className="text-sm"><span className="font-medium">บริษัท:</span> {selectedOrder.company || '-'}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                ยกเลิก
                            </button>

                            {modalType === 'editStatus' && (
                                <button
                                    onClick={handleStatusSubmit}
                                    disabled={actionLoading}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                                >
                                    {actionLoading ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                            <span>กำลังบันทึก...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Settings className="w-4 h-4" />
                                            <span>อัพเดทสถานะ</span>
                                        </>
                                    )}
                                </button>
                            )}

                            {modalType === 'edit' && (
                                <button
                                    onClick={handleSubmit}
                                    disabled={actionLoading}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {actionLoading ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                            <span>กำลังบันทึก...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            <span>บันทึก</span>
                                        </>
                                    )}
                                </button>
                            )}

                            {modalType === 'delete' && (
                                <button
                                    onClick={() => deleteOrder(selectedOrder.id)}
                                    disabled={actionLoading}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
                                >
                                    {actionLoading ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                            <span>กำลังลบ...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-4 h-4" />
                                            <span>ลบคำสั่งซื้อ</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowOrder;