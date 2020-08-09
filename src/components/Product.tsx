import React, { FC, useState, ChangeEvent } from "react";
import styled, { css } from "styled-components";
import data from "../data";
// 主体
const ProductMain = styled.div`
  flex-direction: column;
  padding: 1em;
  box-shadow: 1px 1px 9px -1px rgba(0, 0, 0, 0.12);
  margin: auto;
  /* display: flex; */
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

const Count = styled.div`
  display: flex;

  flex-direction: row;
`;

const PriceAndDiscount = styled.div`
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

const Button = styled.button`
  padding: 5px 10px;
  height: 39px;
  background: #ececec;

  font-size: 17px;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Input = styled.input`
  flex-shrink: 1;
  width: 30px;
  border-color: #e4e4e4 transparent;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  text-align: center;
  outline: none;
`;

const ProductPrice = styled.div`
  color: #0773f1;
  margin-bottom: 9px;
  margin: 5px 5px 5px 0;
  font-size: 21px;
  font-weight: 600;
  text-align: center;
`;

const AfterDiscount = styled.div`
  color: #4a3636;
  text-decoration: line-through;
  margin-bottom: 9px;
  margin: 5px 5px 5px 0;
  font-size: 21px;

  font-weight: 600;
  text-align: center;
`;

const ProductDiscount = styled.div`
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
}
const Product: FC<DisplayViewProductsProps> = ({
  viewProductState,
  setViewProductState,
}) => {
  const [title, setTitle] = useState(data.variants[0].title);
  const [image, setImage] = useState(data.images[0]);
  const [price, setPrice] = useState(data.variants[0].price);
  const [currentProduct, setCurrentProduct] = useState(data.variants[0]);
  const [number, setNumber] = useState(1);

  const Minus = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };
  const Plus = () => {
    setNumber(number + 1);
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
      }
    }
  };
  console.log(data);
  return (
    <>
      <ProductMain style={{ display: viewProductState ? "flex" : "none" }}>
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
              <Count>
                <Button onClick={Minus}>-</Button>
                <Input type="tel" min={number} value={number} />
                <Button onClick={Plus}>+</Button>
              </Count>
            </SelectAndCount>
            <PriceAndDiscount>
              <ProductPrice>${price}</ProductPrice>
              <AfterDiscount>${price * 0.9}</AfterDiscount>
              <ProductDiscount>90% OFF</ProductDiscount>
            </PriceAndDiscount>
            <ProductAccept onClick={Click}>Accept</ProductAccept>
          </ProductContainerOutside>
        </ProductBody>
      </ProductMain>
    </>
  );
};

export default Product;
