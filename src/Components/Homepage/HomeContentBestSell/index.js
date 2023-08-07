import React from 'react';
import ManBestSeller from "../ManBestSeller";
import {useSelector} from "react-redux";

function HomeContentBestSell({ref, user}) {

    const listCategory = useSelector(state => state.categorySlice?.listCategory)

    return (
        <div className="container" ref={ref}>
            {listCategory && listCategory.length ? listCategory.map(cat =>
                <ManBestSeller key={cat.id} category={cat} user={user}/>
            ) : null}
        </div>
    )
}

export default HomeContentBestSell;