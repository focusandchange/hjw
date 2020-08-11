import React, { FC, useState, ChangeEvent } from "react";
import styled, { css } from "styled-components";
const ProductPriceMain = styled.div`
  font-size: 1.5em;
  font-weight: 600;
  margin: 12px 0 0;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
`;

const OriginalPrice = styled.div`
  color: #0773f1;
  margin-bottom: 9px;
  margin: 5px 5px 5px 0;
  font-size: 21px;
  font-weight: 600;
  text-align: center;
`;

const DiscountPrice = styled.div`
  color: #4a3636;
  text-decoration: line-through;
  margin-bottom: 9px;
  margin: 5px 5px 5px 0;
  font-size: 21px;

  font-weight: 600;
  text-align: center;
`;

const DiscountRate = styled.div`
  font-size: 12px;
  border: 1px solid;
  border-radius: 50px;
  padding: 3px 7px;
  color: #0773f1;
  margin-bottom: 9px;
  margin: 5px 5px 5px 0;
  text-align: center;
  font-weight: 600;
`;
interface ProductPrice {
  originalPrice: string; // 原价
  discountPrice: string; // 折扣价
  discountRate: number; // 折扣率
}

const ProductPrice: FC<ProductPrice> = ({
  originalPrice,
  discountPrice,
  discountRate,
}) => {
  return (
    <>
      <ProductPriceMain>
        <OriginalPrice>${originalPrice}</OriginalPrice>
        <DiscountPrice>${discountPrice}</DiscountPrice>
        <DiscountRate>{discountRate + "% OFF"}</DiscountRate>
      </ProductPriceMain>
    </>
  );
};

export default ProductPrice;
