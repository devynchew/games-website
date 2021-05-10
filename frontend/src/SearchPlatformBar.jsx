import React from 'react';
import { Col, DropdownButton, Dropdown } from "react-bootstrap";


const SearchPlatformBar = (props) => {
    const { onChange: setPlatform, data: gamesData } = props;

    const handleSelect = (e) => {
        //console.log(e);
        setPlatform(e);
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    // Get all unique platforms
    let platformArr = [];
    for (let i = 0; i < gamesData.length; i++) {
        platformArr.push(gamesData[i].platform);
    }

    var unique = platformArr.filter(onlyUnique);

    return (
        <Col>
            <DropdownButton
                id="dropdown-basic-button"
                title="Select a platform..."
                className="mx-auto"
                onSelect={handleSelect}
                variant="info"
            >
                <Dropdown.Item
                    eventKey="All"
                    href="#"
                > All
                </Dropdown.Item>

                {unique.map((platform) => (
                    <Dropdown.Item
                        eventKey={platform}
                        href="#"
                    > {platform}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </Col>

    );
}

export default SearchPlatformBar;
