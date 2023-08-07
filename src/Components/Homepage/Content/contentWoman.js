import { useState, useEffect } from "react";
import './content.css';
import axios from 'axios';
import { Link } from 'react-router-dom'

function ContentWoman() {
  

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3004/products`)
    .then(res => {
      const persons = res.data;
      setData(persons);
    })
    .catch(error => console.log(error));
  }, []);
  
 
  return (
    <>
    <div className="men-title">
        <h1 style={{fontWeight: 'bold', letterSpacing: '5px', color: 'darkblue'}}>BỘ SƯU TẬP ĐỒNG HỒ CHO NỮ</h1>
    </div>
    
      <div className="content-product container">
        <div className="row" style={{textAlign: 'center'}}>
          {data && data.length && data.map((product) => (
              <div key={product.id} className="col-lg-3 hit">
                  <span className="saleOff">{product.saleOff}%</span>
                <div className="card">
                  <Link to="/detail/product">
                <img src={product.image} className="card-img-top product-img" alt="..." />
                  </Link>
                  </div>
                  <div className="card-body">
                    <button className="btn-addStore" type="button">THÊM VÀO GIỎ</button>
                    <div className="cardBrand">{product.brand}</div>
                    <div> <h4 className="cardTitle">{product.title}</h4></div>
                    <div> 
                    <span className="cardPrice">${product.price}</span>
                      <span className="cardOldPrice ">{product.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                    </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ContentWoman;
