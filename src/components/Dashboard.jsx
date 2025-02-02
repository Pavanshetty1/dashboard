import React, { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";
import { FaRegListAlt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";

const StatusToggle = ({ isActive, onToggle }) => {
  return (
    <div
      className={`flex items-center w-21 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
        isActive ? "bg-red-700" : "bg-gray-300"
      }`}
      onClick={onToggle}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isActive ? "translate-x-15 " : "translate-x-0"
        }`}
      ></div>
      <span
        className={`ml-2 text-sm font-medium transition-colors ${
          isActive ? "text-white" : "text-gray-700"
        }`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
};

const SidebarItem = ({ icon, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className="px-4 py-2 hover:bg-red-600 cursor-pointer">
      <div
        className="flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-3">{title}</span>
        </div>
        {children && (
          <FiChevronDown
            className={`${isOpen ? "rotate-180" : ""} transition-transform`}
          />
        )}
      </div>
      {isOpen && children && (
        <ul className="mt-2 ml-6 space-y-1 text-sm text-gray-200">
          {children}
        </ul>
      )}
    </li>
  );
};

const Dashboard = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      image: "https://picsum.photos/40",
      name: "Personal Loan",
      category: "Loan",
      commissionType: "VARIABLE",
      commissionValue: "5%",
      labelTag: "Popular",
      status: true,
    },
    {
      id: 2,
      image: "https://picsum.photos/41",
      name: "Car Insurance",
      category: "Insurance",
      commissionType: "FIXED",
      commissionValue: "$50",
      labelTag: "New",
      status: false,
    },
    {
      id: 3,
      image: "https://picsum.photos/42",
      name: "Credit Card",
      category: "Banking",
      commissionType: "VARIABLE",
      commissionValue: "3%",
      labelTag: "Trending",
      status: true,
    },
  ]);

  const [isFormVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    category: "",
    commissionType: "",
    commissionValue: "",
    labelTag: "",
    status: true,
  });


  
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setProducts((prev) => [
      ...prev,
      { id: prev.length + 1, ...formData },
    ]);
    setFormData({
      image: "",
      name: "",
      category: "",
      commissionType: "",
      commissionValue: "",
      labelTag: "",
      status: true,
    });
    setFormVisible(false);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-red-700 text-white flex flex-col">
      <SidebarItem
              icon={<RiDashboardFill size={20} />}
              >    
              </SidebarItem>    
        <div className="px-6 py-4 text-2xl font-bold">Dashboard</div>
        <nav className="flex-1 py-4">
          <ul className="space-y-2">
            <SidebarItem
              icon={<RiDashboardFill size={20} />}
              title="Product Management"
            >
              <li className="p-2 bg-red-600 rounded-lg">Product</li>
              <li className="p-2 bg-red-600 rounded-lg">Create Product</li>
              <li className="p-2 bg-red-600 rounded-lg">Categories</li>
            </SidebarItem>
            <SidebarItem
              icon={<AiOutlineUser size={20} />}
              title="Merchant Management"
              >
                <li>  </li>
            </SidebarItem>
            <SidebarItem
              icon={<FaRegListAlt size={20} />}
              title="Lead Management"
              
              >
              <li>  </li>
          </SidebarItem>
            <SidebarItem
              icon={<AiOutlineUser size={20} />}
              title="User Management"
              >
              <li>  </li>
          </SidebarItem>
            <li className="flex items-center px-4 py-2 hover:bg-red-600 cursor-pointer">
              <FiTrash2 className="mr-3" size={20} />
              <span>Banners</span>
            </li>
            <SidebarItem
              icon={<AiOutlineUser size={20} />}
              title="Training Management"
              >
              <li>  </li>
          </SidebarItem>
            <li className="flex items-center px-4 py-2 hover:bg-red-600 cursor-pointer">
              <FiEdit className="mr-3" size={20} />
              <span>Code Upload Management</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-30">
        {/* Dashboard Header */}
        <div className="bg-white rounded-lg shadow-lg p-3 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={handleRefresh}
                className="bg-red-700 text-white px-4 py-2 rounded-lg shadow hover:bg-red-800"
              >
                Refresh
              </button>
              <button
                onClick={() => setFormVisible(true)}
                className="bg-red-700 text-white px-4 py-2 rounded-lg shadow hover:bg-red-800"
              >
                + Add Product
              </button>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-lg shadow-lg p-4 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700 border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Commission Type</th>
                  <th className="px-4 py-2">Commission Value</th>
                  <th className="px-4 py-2">Label Tag</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="px-4 py-2">
                      <img
                        src={product.image}
                        alt="Product"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">{product.category}</td>
                    <td className="px-4 py-2">{product.commissionType}</td>
                    <td className="px-4 py-2">{product.commissionValue}</td>
                    <td className="px-4 py-2">{product.labelTag}</td>
                    <td className="px-4 py-2">
                      <StatusToggle
                        isActive={product.status}
                        onToggle={() =>
                          setProducts((prev) =>
                            prev.map((p) =>
                              p.id === product.id
                                ? { ...p, status: !p.status }
                                : p
                            )
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => alert("Edit functionality here")}
                        className="text-blue-600 hover:underline"
                      >
                        <FiEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Product Form */}
        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <h2 className="text-xl font-bold mb-4">Add Product</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="commissionType"
                    placeholder="Commission Type"
                    value={formData.commissionType}
                    onChange={handleFormChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="commissionValue"
                    placeholder="Commission Value"
                    value={formData.commissionValue}
                    onChange={handleFormChange}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="labelTag"
                    placeholder="Label Tag"
                    value={formData.labelTag}
                    onChange={handleFormChange}
                    className="border p-2 rounded"
                  />
                  <div>
                    <label className="block mb-2">Upload Image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          image: URL.createObjectURL(e.target.files[0]),
                        }))
                      }
                      className="border p-2 rounded w-full"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="mr-2">Status</label>
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormVisible(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded shadow"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-red-700 text-white px-4 py-2 rounded shadow hover:bg-red-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
