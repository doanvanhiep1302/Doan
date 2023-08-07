import { Link } from 'react-router-dom';
import productImg1  from '../../../Images/trangsucnu3.jpg';
import '../Content/content.css';

function WomanBestSeller() {
  return (
    <>
      <div className="men-title" style={{marginTop:'30px'}}>
        <h1>WOMAN'S BEST SELLERS</h1>
        <Link className="showall" to="/product/woman">
          XEM TẤT CẢ ➾
        </Link>
      </div>
      <div className="content-product container">
        <div className="row" style={{textAlign: 'center'}}>
              <div className="col-lg-3 hit">
                  <span className="saleOff">-15%</span>
                <div className="card">
                  <Link to="/detail/product">
                <img src={productImg1} className="card-img-top product-img" alt="..." />
                  </Link>
                  </div>
                  <div className="card-body">
                    <button className="btn-addStore" type="button">THÊM VÀO GIỎ</button>
                    <div className="cardBrand">POLJOT</div>
                    <div> <h4 className="cardTitle">HONISORDA</h4></div>
                    <div> 
                      <span className="cardPrice">1.890.000 đ</span>
                      <span className="cardOldPrice">1.890.000 đ</span>
                    </div>
                </div>
              </div>
        </div>
      </div>
    </>
  );
}

export default WomanBestSeller;
