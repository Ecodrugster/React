import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import UserCard from './components/UserCard'
import Box from './components/Box'
import ProductCard from './components/ProductCard'

function App() {
  const name = "Макс"
  const year = new Date().getFullYear()
  const isLoggedIn = true

  return (
    <>
      <h1>Мой первый React-проект</h1>
      <p>Имя: {name}</p>
      <p>Год: {year}</p>
      <p>{isLoggedIn ? "Вы вошли в систему" : "Вы не вошли в систему"}</p>

      <Header />
      <Main />
      <Footer />

      <h2>Пользователи</h2>
      <UserCard name="Ауреан" age={18} city="Алматы" isStudent={true} />
      <UserCard name="Вова" age={27} city="Астана" isStudent={false} />
      <UserCard name="Маша" age={19} city="Шымкент" isStudent={true} />

      <Box>
        <p>Children</p>
      </Box>

      <h2>Товары</h2>
      <ProductCard title="Ноутбук" price={500000} inStock={true} />
      <ProductCard title="Телефон" price={130000} inStock={false} />
      <ProductCard title="Наушники" price={20000} inStock={true} />
    </>
  )
}

export default App
