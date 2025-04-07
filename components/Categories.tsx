import Link from 'next/link'

interface CategoriesProps {
  categories: {
    id: number
    name: string
    slug: string
  }[]
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <ul className="space-y-1">
        {categories.map((category) => (
          <li key={category.id} className="bg-white rounded">
            <Link 
              href={`/categories/${category.slug}`}
              className="block px-3 py-2 text-blue-600 hover:underline font-trebuchet"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
} 