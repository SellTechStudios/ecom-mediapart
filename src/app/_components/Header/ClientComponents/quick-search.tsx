'use client'

import { UserIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const QuickSearchComponent = () => {
  return (
    <form action="/products/search" className="max-w-md mx-auto relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <MagnifyingGlassIcon className="size-5" />
      </div>
      <input
        type="search"
        name="text"
        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-md"
        placeholder="Search"
        required
      />
    </form>
  )
}

export default QuickSearchComponent
