import React from 'react';


const CatDropdown = (props) => {
    const { data: categoryData } = props;


    return (
        <>
            {categoryData.map((categoryObj) => (
                <option
                    value={categoryObj.catid}
                > {categoryObj.catname}
                </option>
            ))}
        </>
    );
}

export default CatDropdown;
