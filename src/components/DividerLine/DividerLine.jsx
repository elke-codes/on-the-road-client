/// --- DIVIDERLINE JSX --- ///
import React from "react";
import "../../App.scss";
import "./DividerLine.scss";

const DividerLine = (props) => {
    const { addedDividerClass } = props;
    let dividerClass = "";
    if (addedDividerClass) {
        dividerClass = " " + addedDividerClass;
    }

    return <div className={"Divider" + dividerClass}></div>;
};

export default DividerLine;
