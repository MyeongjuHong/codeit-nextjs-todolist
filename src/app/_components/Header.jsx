import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between'>
      Home
      <div className='flex gap-4'>
        <Link href='todolist'>TODO LISTS</Link>
        <Link href='new-todo'>CREATE TODO</Link>
        {/* <Link href='todolist/:id'>TODO DETAIL</Link>
        // FIXME: todo 텍스트에 표시*/}
      </div>
    </div>
  )
}

export default Header