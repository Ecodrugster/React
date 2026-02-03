function UserCard({ name, age, city, isStudent }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Возраст: {age}</p>
      <p>Город: {city}</p>
      <p>{isStudent ? "Студент" : "Не студент"}</p>
    </div>
  )
}
export default UserCard
