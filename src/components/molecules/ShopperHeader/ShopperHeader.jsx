import React from 'react';

import './ShopperHeader.css';
import Logo from '../../atoms/Logo/Logo';
import Banner from '../../atoms/Banner/Banner';
import Title from '../../atoms/Title/Title';
import Timer from '../../atoms/Timer/Timer';

const ShopperHeader = () => (
  <section className="shopper-header">
    <Logo />
    <Title/>
    <Banner />
    <Timer />
  </section>
);



export default ShopperHeader;
