import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import ContentWoman from './Content/contentWoman';
import Decripsiton from '../DecripstionWebsite';
import BestSeller from './BestSeller';




function HomePageBestSeller () {


    return(
        <>  
            <Navbar />
            <BestSeller />
            <ContentWoman />
            <Decripsiton />
            <Footer />
        </>
    )
}
export default HomePageBestSeller;