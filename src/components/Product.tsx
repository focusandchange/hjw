import React, { FC, useState, ChangeEvent } from "react";
import styled, { css } from "styled-components";
import data from "../data";
import ProductPriceProps from "../components/ProductPriceProps";
import ProductQuantityProps from "../components/ProductQuantityProps";
// 主体
const ProductMain = styled.div<{ viewProductState: boolean }>`
  flex-direction: column;
  padding: 1em;
  box-shadow: 1px 1px 9px -1px rgba(0, 0, 0, 0.12);
  margin: auto;
  display: ${(props) => (props.viewProductState ? "flex" : "none")};
  flex-wrap: wrap;
  justify-content: center;
`;

// 用到的几种容器样式
const ProductContainerOutside = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  margin: 0 1em;
  padding: 1em;
  width: 155px;
  max-width: 250px;
`;

const SelectAndCount = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0 0;
  justify-content: center;
  display: flex !important;
`;

const Select = styled.div`
  ::before {
    content: "↓";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 10px;
    pointer-events: none;
  }
  border: 1px solid #bbb;
  border-radius: 3px;
  position: relative;
  width: 100%;
  text-align: center;
  outline: none;
  margin-right: 10px;
`;

// 顶部容器
const ProductTopText = styled.div`
  font-size: 19.6px;
  padding: 0 0 1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  text-align: center;
  outline: none;
`;

// 下主体部分容器
const ProductBody = styled.div`
  /* margin: auto;*/
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

// 图片
const ProductImg = styled.img`
  width: 100%;
  height: 250px;
  margin: 12px 0 0;
  display: block;
  outline: none;
  /* background-image: url(https://cdn.shopify.com/s/files/1/0248/1661/5478/products/u_1122653514_2995817418_fm_26_gp_0.jpg?v=1581493211); */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;
`;

// 标题
const ProductTitle = styled.div`
  font-size: 1rem !important;
  /* height: 38px; */
  overflow: hidden;
  margin: 12px 0 0;
  display: block;
  outline: none;
  text-align: center;
`;

// 选择部分
const ProductSelect = styled.select`
  display: flex;
  border: none;
  width: 100%;
  padding: 10px 30px 10px 10px;
  align-items: center;
  justify-content: center;
  appearance: none;
  border-radius: 4px;
  outline: none;
`;

const ProductAccept = styled.button`
  color: #fff;
  background-color: #0773f1;
  padding: 1em;
  border-radius: 3px;
  margin-top: 1em;
  cursor: pointer;
  appearance: button;
  text-transform: none;
  overflow: visible;
  width: 100%;
  margin: 12px 0 0;
  outline: none;

  border: none;

  line-height: normal;
`;

interface DisplayViewProductsProps {
  viewProductState: boolean;
  setViewProductState: (value: boolean) => void;
  discountRate: number;
  setDiscountRate: (value: number) => void;
}

const Product: FC<DisplayViewProductsProps> = ({
  viewProductState,
  setViewProductState,
  discountRate,
  setDiscountRate,
}) => {
  const [title, setTitle] = useState(data.variants[0].title);
  const [image, setImage] = useState(data.images[0]);
  const [price, setPrice] = useState(data.variants[0].price);
  const [currentProduct, setCurrentProduct] = useState(data.variants[0]);
  const [number, setNumber] = useState(1);
  const [discountPrice, setDiscountPrice] = useState(price * discountRate + "");

  // const [option, setOption] = useState(
  //   data.variants[0].option1 +
  //     data.variants[0].option2 +
  //     data.variants[0].option3
  // );
  const onChange = (value: number) => {
    if (value > 0) {
      setNumber(value);
    }
  };

  const Click = () => {
    console.log("产品id：" + currentProduct.id + " 产品数量：" + number);
  };
  const handleChangeProduct = (event: ChangeEvent<HTMLSelectElement>) => {
    for (let i = 0; i < data.variants.length; i++) {
      if (data.variants[i].id === JSON.parse(event.target.value)) {
        setTitle(data.variants[i].title);
        setImage(data.images[i]);
        setCurrentProduct(data.variants[i]);
        setPrice(data.variants[i].price);
        // setOption(
        //   data.variants[i].option1 +
        //     data.variants[i].option2 +
        //     data.variants[i].option3
        // );
      }
    }
  };
  // console.log(data);
  return (
    <>
      <ProductMain viewProductState={viewProductState}>
        <ProductTopText>You have unlocked a 25% discount</ProductTopText>
        <ProductBody>
          <ProductContainerOutside>
            <ProductImg src={image} />
            <ProductTitle>{title}</ProductTitle>
            <SelectAndCount>
              <Select>
                <ProductSelect onChange={handleChangeProduct}>
                  {data?.variants?.map((variant: any) => {
                    let options = "";
                    if (variant.option1) {
                      options += variant.option1 + "/";
                    }
                    if (variant.option2) {
                      options += variant.option2;
                    }
                    if (variant.option3) {
                      options += "/" + variant.option3;
                    }
                    return (
                      <option key={variant.id} value={variant.id}>
                        {options}
                      </option>
                    );
                  })}
                </ProductSelect>
              </Select>
              <ProductQuantityProps
                value={number}
                onChange={onChange}
              ></ProductQuantityProps>
            </SelectAndCount>

            <ProductPriceProps
              originalPrice={price}
              discountPrice={discountPrice}
              discountRate={discountRate * 100}
            ></ProductPriceProps>
            <ProductAccept onClick={Click}>Accept</ProductAccept>
          </ProductContainerOutside>
        </ProductBody>
      </ProductMain>
    </>
  );
};

export default Product;
