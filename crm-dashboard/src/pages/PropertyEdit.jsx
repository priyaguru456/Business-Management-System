import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth, ROLES } from '../context/AuthContext'
import { properties } from '../data/mockData'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function PropertyEdit() {
  const { id } = useParams()
  const { user, getBasePath } = useAuth()
  const navigate = useNavigate()
  const basePath = getBasePath()
  const isNew = !id || id === 'add'
  const property = isNew ? null : properties.find((p) => p.id === Number(id))

  const [form, setForm] = useState({
    title: property?.title || '',
    type: property?.type || 'Apartment',
    location: property?.location || '',
    price: property?.price || '',
    area: property?.area || '',
    bedrooms: property?.bedrooms || '',
    bathrooms: property?.bathrooms || '',
    description: property?.description || '',
    furnishing: property?.furnishing || 'Unfurnished',
    facing: property?.facing || 'North',
    address: property?.address || '',
    city: property?.city || '',
    state: property?.state || '',
    pincode: property?.pincode || '',
    contactName: property?.contactName || '',
    contactPhone: property?.contactPhone || '',
    contactEmail: property?.contactEmail || '',
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`${basePath}/properties`)
  }

  const backLabel = user.role === ROLES.MANAGER ? 'Back to Listings' : 'Back to Properties'
  const pageTitle = isNew
    ? user.role === ROLES.MANAGER ? 'Add Listing' : 'Add Property'
    : user.role === ROLES.MANAGER ? 'Edit Listing' : 'Edit Property'

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link
          to={isNew ? `${basePath}/properties` : `${basePath}/properties/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {isNew ? backLabel : 'Back to Details'}
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
        <div className="p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
              <input name="title" value={form.title} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
              <select name="type" value={form.type} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400">
                {['Apartment', 'Villa', 'Penthouse', 'Studio', 'Commercial', 'Plot'].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Price (INR)</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Area (sq.ft)</label>
              <input name="area" type="number" value={form.area} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Bedrooms</label>
              <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Bathrooms</label>
              <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="3" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
          </div>
        </div>

        <div className="p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Furnishing</label>
              <select name="furnishing" value={form.furnishing} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400">
                {['Unfurnished', 'Semi-Furnished', 'Fully Furnished', 'Bare Shell'].map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Facing</label>
              <select name="facing" value={form.facing} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400">
                {['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'].map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Address</label>
              <input name="address" value={form.address} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
              <input name="city" value={form.city} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">State</label>
              <input name="state" value={form.state} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Contact Name</label>
              <input name="contactName" value={form.contactName} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
              <input name="contactPhone" value={form.contactPhone} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input name="contactEmail" value={form.contactEmail} onChange={handleChange} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
          </div>
        </div>

        <div className="p-5 flex items-center justify-end gap-3">
          <Link
            to={isNew ? `${basePath}/properties` : `${basePath}/properties/${id}`}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition shadow-sm"
          >
            {isNew ? 'Create' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
