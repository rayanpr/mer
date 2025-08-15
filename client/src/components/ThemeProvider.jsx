import React from 'react'
import { useSelector } from 'react-redux';

export default function ThemeProvider({children}) {
    const { theme } = useSelector(state => state.theme);
    console.log('theme',theme);
  return (
    <div className={theme}>
        <div className='min-h-screen bg-white   text-gray-900 dark:bg-gray-900 dark:text-white'>
            {children}
        </div>
    </div>
  )
}

