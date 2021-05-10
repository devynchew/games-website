import React from 'react';


const PlatformDropdown = (props) => {
    const { data: gamesData } = props;

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
        <>
            {unique.map((platform) => (
                <option
                    value={platform}
                > {platform}
                </option>
            ))}
        </>
    );
}

export default PlatformDropdown;
