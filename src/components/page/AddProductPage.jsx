import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus, Save, X, ShoppingBag, DollarSign, Package, Star, Image, Tag } from 'lucide-react';
import axios from 'axios';

const ProductManager = () => {
    const [products, setProducts] = useState([]);


    const [editingId, setEditingId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        description: '',
        price: '',
        discountPercent: '',
        imageUrl: '',
        category: '',
        stock: '',
        badge: ''
    });


    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        discountPercent: '',
        imageUrl: '',
        category: '',
        stock: '',
        badge: ''
    });


    const categories = [
        'Electronics',
        'Clothing',
        'Home & Garden',
        'Sports & Outdoors',
        'Books',
        'Toys & Games',
        'Health & Beauty',
        'Food & Beverages',
        'Automotive',
        'Pet Supplies',
        'Office Supplies',
        'Jewelry & Accessories',
        'Art & Crafts',
        'Music & Instruments',
        'Baby & Kids'
    ];

    const badges = [
        '',
        'New',
        'Hot',
        'Sale',
        'Featured',
        'Limited',
        'Bestseller',
        'Premium'
    ];

    const getBadgeColor = (badge) => {
        switch (badge) {
            case 'New': return 'bg-green-100 text-green-800 border-green-200';
            case 'Hot': return 'bg-red-100 text-red-800 border-red-200';
            case 'Sale': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Featured': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Limited': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Bestseller': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Premium': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const calculateDiscountedPrice = (price, discountPercent) => {
        if (discountPercent > 0) {
            return price - (price * discountPercent / 100);
        }
        return price;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB'
        }).format(price);
    };

    const handleEdit = async (product) => {
        setEditingId(product.id);
        setEditForm({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            discountPercent: product.discountPercent.toString(),
            imageUrl: product.imageUrl || '',
            category: product.category,
            stock: product.stock.toString(),
            badge: product.badge || ''
        });



    };

    const handleSave = async (id) => {
        const updatedProduct = {
            name: editForm.name,
            description: editForm.description,
            price: parseFloat(editForm.price) || 0,
            discountPercent: parseFloat(editForm.discountPercent) || 0,
            imageUrl: editForm.imageUrl,
            category: editForm.category,
            stock: parseInt(editForm.stock) || 0,
            badge: editForm.badge
        };

        // update UI ก่อน
        setProducts(products.map(product =>
            product.id === editingId ? { ...product, ...updatedProduct } : product
        ));

        try {
            const res = await axios.put(`http://localhost:5000/product/update/${id}`, updatedProduct);
            console.log("Update response:", res.data);
            fetchDataProduct();
        } catch (error) {
            console.error("Update error:", error.response?.data || error.message);
        }

        setEditingId(null);
        setEditForm({
            name: '', description: '', price: '', discountPercent: '',
            imageUrl: '', category: '', stock: '', badge: ''
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({
            name: '', description: '', price: '', discountPercent: '',
            imageUrl: '', category: '', stock: '', badge: ''
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/product/delete/${id}`)
            fetchDataProduct()
        } catch (error) {
            console.log(error);

        }
    };

    const handleAddProduct = async () => {
        const payload = {
            name: newProduct.name,
            description: newProduct.description,
            price: parseFloat(newProduct.price) || 0,
            discountPercent: parseFloat(newProduct.discountPercent) || 0,
            imageUrl: newProduct.imageUrl,
            category: newProduct.category,
            stock: parseInt(newProduct.stock) || 0,
            badge: newProduct.badge,
        };

        try {
            // เรียก API
            const res = await axios.post("http://localhost:5000/product/add", payload);



            // เคลียร์ฟอร์ม
            setNewProduct({
                name: "",
                description: "",
                price: "",
                discountPercent: "",
                imageUrl: "",
                category: "",
                stock: "",
                badge: "",
            });
            fetchDataProduct()
            setShowAddForm(false);
            // console.log("Product added:", res.data);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };



    const handleInputChange = (e, isEdit = false) => {
        const { name, value } = e.target;
        if (isEdit) {
            setEditForm(prev => ({ ...prev, [name]: value }));
        } else {
            setNewProduct(prev => ({ ...prev, [name]: value }));
        }
    };


    const fetchDataProduct = async () => {
        try {
            const res = await axios.get("http://localhost:5000/product/get");
            setProducts(res.data); // 👈 เก็บข้อมูลสินค้าใน state
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchDataProduct()
    }, [])



    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">

            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <ShoppingBag className="h-8 w-8 text-white" />
                                <h1 className="text-3xl font-bold text-white">จัดการสินค้า</h1>
                            </div>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all backdrop-blur-sm"
                            >
                                <Plus size={20} />
                                เพิ่มสินค้าใหม่
                            </button>
                        </div>
                    </div>

                    {/* Add Product Form */}
                    {showAddForm && (
                        <div className="m-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                            <div className="flex items-center space-x-2 mb-6">
                                <Plus className="h-6 w-6 text-blue-600" />
                                <h3 className="text-xl font-bold text-blue-800">เพิ่มสินค้าใหม่</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อสินค้า *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newProduct.name}
                                        onChange={(e) => handleInputChange(e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="กรอกชื่อสินค้า"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">หมวดหมู่ *</label>
                                    <select
                                        name="category"
                                        value={newProduct.category}
                                        onChange={(e) => handleInputChange(e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">เลือกหมวดหมู่</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">รายละเอียด *</label>
                                <textarea
                                    name="description"
                                    value={newProduct.description}
                                    onChange={(e) => handleInputChange(e)}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="กรอกรายละเอียดสินค้า"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">ราคา *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={newProduct.price}
                                        onChange={(e) => handleInputChange(e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">ส่วนลด (%)</label>
                                    <input
                                        type="number"
                                        name="discountPercent"
                                        value={newProduct.discountPercent}
                                        onChange={(e) => handleInputChange(e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">สต็อก *</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={newProduct.stock}
                                        onChange={(e) => handleInputChange(e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">ป้ายกำกับ</label>
                                    <select
                                        name="badge"
                                        value={newProduct.badge}
                                        onChange={(e) => handleInputChange(e)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {badges.map((badge, index) => (
                                            <option key={index} value={badge}>
                                                {badge || 'ไม่มีป้าย'}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">URL รูปภาพ</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={newProduct.imageUrl}
                                    onChange={(e) => handleInputChange(e)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="https://example.com/image.jpg"
                                />
                                {newProduct.imageUrl && (
                                    <div className="mt-2">
                                        <img
                                            src={newProduct.imageUrl}
                                            alt="Preview"
                                            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddProduct}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                                >
                                    บันทึก
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setNewProduct({
                                            name: '', description: '', price: '', discountPercent: '',
                                            imageUrl: '', category: '', stock: '', badge: ''
                                        });
                                    }}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                                >
                                    ยกเลิก
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mt-3">
                                <span className="text-red-500">*</span> หมายถึงข้อมูลที่จำเป็นต้องกรอก
                            </p>
                        </div>
                    )}

                    {/* Products Grid/Cards */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                                    {/* Product Image */}
                                    <div className="relative h-48 bg-gray-100">
                                        {product.imageUrl ? (
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Image className="w-16 h-16 text-gray-400" />
                                            </div>
                                        )}

                                        {/* Badge */}
                                        {product.badge && (
                                            <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded-full border ${getBadgeColor(product.badge)}`}>
                                                {product.badge}
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            {editingId === product.id ? (
                                                <>
                                                    <button
                                                        onClick={() => handleSave(product.id)}
                                                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg transition-colors"
                                                        title="บันทึก"
                                                    >
                                                        <Save size={16} />
                                                    </button>
                                                    <button
                                                        onClick={handleCancel}
                                                        className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition-colors"
                                                        title="ยกเลิก"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
                                                        title="แก้ไข"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors"
                                                        title="ลบ"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-5">
                                        {/* Product Name */}
                                        {editingId === product.id ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editForm.name}
                                                onChange={(e) => handleInputChange(e, true)}
                                                className="w-full text-lg font-bold mb-2 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                                                {product.name}
                                            </h3>
                                        )}

                                        {/* Description */}
                                        {editingId === product.id ? (
                                            <textarea
                                                name="description"
                                                value={editForm.description}
                                                onChange={(e) => handleInputChange(e, true)}
                                                rows="2"
                                                className="w-full text-sm text-gray-600 mb-3 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                {product.description}
                                            </p>
                                        )}

                                        {/* Price */}
                                        <div className="mb-3">
                                            {editingId === product.id ? (
                                                <div className="flex gap-2">
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        value={editForm.price}
                                                        onChange={(e) => handleInputChange(e, true)}
                                                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                        placeholder="ราคา"
                                                    />
                                                    <input
                                                        type="number"
                                                        name="discountPercent"
                                                        value={editForm.discountPercent}
                                                        onChange={(e) => handleInputChange(e, true)}
                                                        className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                        placeholder="ส่วนลด%"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    {product.discountPercent > 0 ? (
                                                        <>
                                                            <span className="text-lg font-bold text-red-600">
                                                                {formatPrice(calculateDiscountedPrice(product.price, product.discountPercent))}
                                                            </span>
                                                            <span className="text-sm text-gray-500 line-through">
                                                                {formatPrice(product.price)}
                                                            </span>
                                                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                                                -{product.discountPercent}%
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="text-lg font-bold text-green-600">
                                                            {formatPrice(product.price)}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Category & Stock */}
                                        <div className="flex justify-between items-center mb-3">
                                            {editingId === product.id ? (
                                                <div className="flex gap-2 w-full">
                                                    <select
                                                        name="category"
                                                        value={editForm.category}
                                                        onChange={(e) => handleInputChange(e, true)}
                                                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                                                    >
                                                        {categories.map((category) => (
                                                            <option key={category} value={category}>{category}</option>
                                                        ))}
                                                    </select>
                                                    <input
                                                        type="number"
                                                        name="stock"
                                                        value={editForm.stock}
                                                        onChange={(e) => handleInputChange(e, true)}
                                                        className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                                                        placeholder="สต็อก"
                                                    />
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                                        {product.category}
                                                    </span>
                                                    <span className={`font-medium text-sm ${product.stock > 50 ? 'text-green-600' :
                                                        product.stock > 20 ? 'text-yellow-600' : 'text-red-600'
                                                        }`}>
                                                        สต็อก: {product.stock}
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* Image URL & Badge for editing */}
                                        {editingId === product.id && (
                                            <div className="space-y-2">
                                                <input
                                                    type="url"
                                                    name="imageUrl"
                                                    value={editForm.imageUrl}
                                                    onChange={(e) => handleInputChange(e, true)}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                                                    placeholder="URL รูปภาพ"
                                                />
                                                <select
                                                    name="badge"
                                                    value={editForm.badge}
                                                    onChange={(e) => handleInputChange(e, true)}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                                                >
                                                    {badges.map((badge, index) => (
                                                        <option key={index} value={badge}>
                                                            {badge || 'ไม่มีป้าย'}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        {/* Product ID */}
                                        <div className="text-xs text-gray-400 mt-2">
                                            ID: #{product.id}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {products.length === 0 && (
                            <div className="text-center py-12">
                                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-xl text-gray-500 mb-2">ไม่มีสินค้าในระบบ</p>
                                <p className="text-gray-400">คลิก "เพิ่มสินค้าใหม่" เพื่อเริ่มต้น</p>
                            </div>
                        )}
                    </div>

                    {/* Footer Info */}
                    <div className="bg-gray-50 px-8 py-6 border-t">
                        <div className="text-sm text-gray-600">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">📝 วิธีการใช้งาน</h4>
                                    <ul className="space-y-1 text-xs">
                                        <li>• คลิก "เพิ่มสินค้าใหม่" เพื่อเพิ่มสินค้า</li>
                                        <li>• คลิกปุ่มดินสอบนการ์ดเพื่อแก้ไขสินค้า</li>
                                        <li>• คลิกปุ่มถังขยะเพื่อลบสินค้า</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-2">🏷️ ป้ายกำกับ</h4>
                                    <div className="flex flex-wrap gap-1 text-xs">
                                        {badges.slice(1).map((badge) => (
                                            <span key={badge} className={`px-2 py-1 rounded-full border ${getBadgeColor(badge)}`}>
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductManager;