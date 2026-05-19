import { Link } from 'react-router-dom'
import { useAuth, ROLES } from '../context/AuthContext'
import { properties } from '../data/mockData'
import StatusBadge from '../components/common/StatusBadge'
import ThreeDotsMenu from '../components/common/ThreeDotsMenu'
import { PlusIcon, MapPinIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline'
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const formatPrice = (val) =>
  val >= 10000000
    ? `${(val / 10000000).toFixed(1)} Cr`
    : val >= 100000
    ? `${(val / 100000).toFixed(1)} L`
    : val.toLocaleString('en-IN')

export default function Properties() {
  const { user, getBasePath } = useAuth()
  const navigate = useNavigate()
  const basePath = getBasePath()
  const pageTitle = user.role === ROLES.MANAGER ? 'Listings' : 'Properties'

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All {pageTitle}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{properties.length} {pageTitle.toLowerCase()} found</p>
        </div>
        <Link
          to={`${basePath}/properties/add`}
          className="inline-flex items-center gap-1.5 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition shadow-sm"
        >
          <PlusIcon className="w-4 h-4" />
          Add {user.role === ROLES.MANAGER ? 'Listing' : 'Property'}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition group cursor-pointer"
            onClick={() => navigate(`${basePath}/properties/${property.id}`)}
          >
            <div className="relative h-40 bg-gray-100">
              <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <StatusBadge status={property.status} />
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition line-clamp-1">
                  {property.title}
                </h3>
                <ThreeDotsMenu
                  actions={[
                    { label: 'View', icon: EyeIcon, onClick: () => navigate(`${basePath}/properties/${property.id}`) },
                    { label: 'Edit', icon: PencilIcon, onClick: () => navigate(`${basePath}/properties/${property.id}/edit`) },
                    { label: 'Delete', icon: TrashIcon, onClick: () => {}, danger: true },
                  ]}
                />
              </div>

              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                <MapPinIcon className="w-3.5 h-3.5" />
                <span className="truncate">{property.location}</span>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-0.5 text-red-600 font-bold text-sm">
                  <CurrencyRupeeIcon className="w-4 h-4" />
                  {formatPrice(property.price)}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{property.area} sq.ft</span>
                  {property.bedrooms > 0 && <span>{property.bedrooms} BHK</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
