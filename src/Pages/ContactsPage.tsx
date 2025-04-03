import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"


const ContactPage = () => {
    return(
        <>
        <Header showSearch={false} />
        <h1>Контакты:</h1>
        <p>contact@basepracticeshop.ru</p>
        <p>support@basepracticeshop.ru</p>
        <Footer />
        </>
    )
}


export default ContactPage;