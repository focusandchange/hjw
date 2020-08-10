import React, { FC, useState } from "react";
import CountDown from "../components/CountDown";
import Product from "../components/Product";

const CountDownAndProducts: FC = () => {
  const [viewProductState, setViewProductState] = useState(false);

  const [discountRate, setDiscountRate] = useState(0.9);
  // const [discountPrice, setDiscountPrice] = useState(0.9);
  return (
    <div>
      <Product
        viewProductState={viewProductState}
        setViewProductState={setViewProductState}
        discountRate={discountRate}
        setDiscountRate={setDiscountRate}
      />
      <CountDown
        viewProductState={viewProductState}
        setViewProductState={setViewProductState}
      />
    </div>
  );
};

export default CountDownAndProducts;
