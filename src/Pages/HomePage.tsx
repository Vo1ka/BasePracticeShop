import { useState } from "react";
import { Main } from "../components/Main/Main"
import Header from "../components/Header/Header";


const HomePage = () =>{
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <>
        <Header onSearchChange={setSearchQuery}/>
        <Main searchQuery={searchQuery}/>
        </>
    )
}

export default HomePage;