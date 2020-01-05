import React, { SFC, CSSProperties } from 'react';

import './ItemBox.css';
import classnames from 'classnames';

/**
 * Multi-purpose component for displaying sections of information
 */

interface ItemBoxProps {
    styleOverride?: CSSProperties;
    classNames?: string;
}

const ItemBox: SFC<ItemBoxProps> = ({ children, styleOverride, classNames })  => (
    <div className={classnames("item-box", classNames)} style={styleOverride}>
        {children}
    </div>
);

export default ItemBox;