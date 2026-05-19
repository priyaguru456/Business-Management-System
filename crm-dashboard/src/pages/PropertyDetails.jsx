import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth, ROLES } from '../context/AuthContext'
import { properties } from '../data/mockData'
import StatusBadge from '../components/common/StatusBadge'
import {
  ArrowLeftIcon,
  PencilIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  HomeIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
} from '@heroicons/react/24/outline'

const TABS = ['Overview', 'Property', 'Pricing', 'Location', 'Media', 'Contact', 'Other']

const formatPrice = (val) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val)

export default function PropertyDetails() {
  const { id } = useParams()
  const { user, getBasePath } = useAuth()
  const [activeTab, setActiveTab] = useState('Overview')
  const basePath = getBasePath()
  const property = properties.find((p) => p.id === Number(id))

  if (!property) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Property not found.</p>
        <Link to={`${basePath}/properties`} className="text-red-600 text-sm mt-2 inline-block">
          Back to {user.role === ROLES.MANAGER ? 'Listings' : 'Properties'}
        </Link>
      </div>
    )
  }

  const backLabel = user.role === ROLES.MANAGER ? 'Back to Listings' : 'Back to Properties'

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to={`${basePath}/properties`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            {backLabel}
          </Link>
        </div>
        <Link
          to={`${basePath}/properties/${id}/edit`}
          className="inline-flex items-center gap-1.5 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition shadow-sm"
        >
          <PencilIcon className="w-4 h-4" />
          Edit
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="relative h-56 bg-gray-100">
          <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-3 left-3">
            <StatusBadge status={property.status} />
          </div>
        </div>

        <div className="p-5">
          <h1 className="text-xl font-bold text-gray-900">{property.title}</h1>
          <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
            <MapPinIcon className="w-4 h-4" />
            {property.location}
          </div>
          <div className="flex items-center gap-1 mt-2 text-red-600 font-bold text-lg">
            <CurrencyRupeeIcon className="w-5 h-5" />
            {formatPrice(property.price)}
          </div>
        </div>

        <div className="border-t border-gray-200">
          <nav className="flex overflow-x-auto px-5">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-5">
          {activeTab === 'Overview' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">{property.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Type', value: property.type },
                  { label: 'Area', value: `${property.area} sq.ft` },
                  { label: 'Bedrooms', value: property.bedrooms || 'N/A' },
                  { label: 'Bathrooms', value: property.bathrooms },
                  { label: 'Furnishing', value: property.furnishing },
                  { label: 'Facing', value: property.facing },
                  { label: 'Floor', value: property.floor },
                  { label: 'Possession', value: property.possession },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((a) => (
                    <span key={a} className="bg-red-50 text-red-700 text-xs px-2.5 py-1 rounded-full font-medium">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Property' && (
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Property Type', value: property.type, icon: HomeIcon },
                { label: 'Area', value: `${property.area} sq.ft` },
                { label: 'Bedrooms', value: property.bedrooms || 'N/A' },
                { label: 'Bathrooms', value: property.bathrooms },
                { label: 'Furnishing', value: property.furnishing },
                { label: 'Facing', value: property.facing },
                { label: 'Floor', value: property.floor },
                { label: 'Age', value: property.ageOfProperty },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Pricing' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-xs text-red-600 font-medium">Total Price</p>
                  <p className="text-xl font-bold text-red-700 mt-1">{formatPrice(property.price)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500">Price per sq.ft</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{formatPrice(property.pricePerSqFt)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500">Area</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{property.area} sq.ft</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Location' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Address', value: property.address },
                  { label: 'City', value: property.city },
                  { label: 'State', value: property.state },
                  { label: 'Pincode', value: property.pincode },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center text-sm text-gray-500">
                Map view placeholder ({property.lat}, {property.lng})
              </div>
            </div>
          )}

          {activeTab === 'Media' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Property Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="h-32 rounded-lg overflow-hidden">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                </div>
                <div className="h-32 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400 border-2 border-dashed border-gray-200">
                  + Upload More
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Contact' && (
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <UserIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Agent Name</p>
                    <p className="text-sm font-semibold text-gray-900">{property.contactName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-semibold text-gray-900">{property.contactPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-semibold text-gray-900">{property.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Other' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Listed Date</p>
                  <p className="text-sm font-semibold text-gray-900">{property.listed}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Property Age</p>
                  <p className="text-sm font-semibold text-gray-900">{property.ageOfProperty}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Possession Status</p>
                  <p className="text-sm font-semibold text-gray-900">{property.possession}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Listed By</p>
                  <p className="text-sm font-semibold text-gray-900">{property.agent}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
