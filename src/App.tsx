
import './App.css'
import Header from './components/Header/Header'
import { Main } from './components/Main/Main'
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Header onSearchChange={setSearchQuery}/>
      <Main searchQuery={searchQuery}/>
    </>
  )
}

export default App
