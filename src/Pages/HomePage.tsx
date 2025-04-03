import { useState } from "react";
import { Main } from "../components/Main/Main"
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";


const  HomePage = () =>{
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <>
        <Header onSearchChange={setSearchQuery}/>
        <Main searchQuery={searchQuery}/>
        <Footer></Footer>
        </>
    )
}


export default HomePage;
