import React from 'react'
import Link from 'next/link'
import Search from '@/components/Search'
import styles from '@/styles/Navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Search />
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.li}>
          <Link href="/two-column">Two Column</Link>
        </li>
        <li className={styles.li}>
          <Link href="/blogs">Blogs</Link>
        </li>
      </ul>
    </nav>
  )
}
