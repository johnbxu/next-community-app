import headerStyles from '../styles/Header.module.css'

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>I'm a <span>Header</span></h1>
      <p className={headerStyles.description}>Keep up to date</p>
    </div>
  )
}

export default Header
