import React from 'react';
import { Col, DropdownButton, Dropdown } from "react-bootstrap";


const SearchCatBar = (props) => {
    const { onChange: setCategory, data: categoryData } = props;

    const handleSelect = (e) => {
        //console.log(e);
        setCategory(e);
    }
    

    return (
        <Col>
            <DropdownButton
                id="dropdown-basic-button"
                title="Select a category..."
                className="mx-auto"
                onSelect={handleSelect}
                variant="info"
            >
                <Dropdown.Item
                    eventKey="All"
                    href="#"
                > All
                </Dropdown.Item>

                {categoryData.map((categoryObj) => (
                    <Dropdown.Item
                        eventKey={categoryObj.catid}
                        href="#"
                    > {categoryObj.catname}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </Col>

    );
}

export default SearchCatBar;
