import Link from 'next/link'

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
      <ul className="space-y-3">
        {categories.map((category) => (
          <li key={category.id}>
            <Link 
              href={`/categories/${category.slug}`} 
              className="text-blue-600 hover:underline flex items-center"
            >
              <svg className="h-4 w-4 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
} 