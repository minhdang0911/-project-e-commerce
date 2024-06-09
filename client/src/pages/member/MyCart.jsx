import React from 'react';
import withBaseComponent from 'hocs/withBaseComponent';

const MyCart = (props) => {
    console.log(props);
    return <div onClick={() => props.navigate('/')}>MyCart</div>;
};

export default withBaseComponent(MyCart);
