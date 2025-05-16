import './menu.scss'
import { Link } from 'react-router-dom'
import { menu } from '../../menu'

const Menu = () => {
  return (
    <div className='menu'>
      {menu.map(section => (
        <div className='item' key={section.id}>
          <span className='title'>{section.title.toUpperCase()}</span>
          {section.listItems.map(item => (
            <Link to={item.url} key={item.id}>
              <img src={`/${item.icon}`} alt={item.title} />
              <span className='listItemTitle'>{item.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Menu
