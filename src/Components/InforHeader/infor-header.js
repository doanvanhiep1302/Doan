import './infor-header.css';
import {FaTruck} from 'react-icons/fa';
import {MdOutlineGppGood} from 'react-icons/md';
import {IoIosSwap} from 'react-icons/io';
import {useTranslation} from 'react-i18next'
function Infor() {
    const { t } = useTranslation();
    return(
        <>
            <div className='container-fluid overInfortext'>
                <div className='allIn'>
                    <div className='index1'>
                    <span className="navbar-brand info" id='one' href="#"><i className='icons mr-2'>
                        <FaTruck className="mr-2 pr-2"/></i><span className="ml-2" ml={2} pl={2}>{t('info-1')}</span></span>
                    </div>
                    <div className='text-center index1'>
                    <span className="navbar-brand info" id='two' href="#"><i className='icons'>
                        <MdOutlineGppGood className="ml-2"/></i>{t('info-2')}</span>
                    </div>
                    <div className='text-end index1'>
                    <span className="navbar-brand info" id='three' href="#"><i className='icons'>
                        <IoIosSwap className="ml-2"/></i>{t('info-3')}</span>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Infor;