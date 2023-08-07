import Header from '../Header/header';
import Infor from '../InforHeader/infor-header';
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import ContentWoman from './Content/contentWoman';




function HomePageWoman () {


    return(
        <>  
            <Navbar />
            <Header/>
            <Infor />
            <ContentWoman />
            <Footer />
        </>
    )
}
export default HomePageWoman;