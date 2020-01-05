import React, { CSSProperties, SFC } from 'react';

import './ItemBox.css';
import classnames from 'classnames';

/**
 * Multi-purpose component for displaying sections of information
 */

interface ItemBoxProps {
    styleOverride?: CSSProperties;
    classNames?: string;
    hoverEffect?: boolean;
}

const ItemBox: SFC<ItemBoxProps> = ({ children, styleOverride, classNames, hoverEffect })  => {
    // hoverEffect default: false
    hoverEffect = (typeof hoverEffect === "undefined") ? false : hoverEffect;
    // hover effect set by addition/omission of item-box-hover-effect class
    const hoverEffectClass = hoverEffect ? "item-box-hover-effect" : "";

    return (
        <div className={classnames("item-box", hoverEffectClass, classNames)} 
            style={styleOverride}

        >
            {children}
        </div>
    );
}

export default ItemBox;