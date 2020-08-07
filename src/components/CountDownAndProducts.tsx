import React, { FC, useState } from "react";
import CountDown from "../components/CountDown";
import Product from "../components/Product";

const CountDownAndProducts: FC = () => {
  const [viewProductState, setViewProductState] = useState("none");

  return (
    <div>
      <Product
        viewProductState={viewProductState}
        setViewProductState={setViewProductState}
      />
      <CountDown
        viewProductState={viewProductState}
        setViewProductState={setViewProductState}
      />
    </div>
  );
};

export default CountDownAndProducts;
