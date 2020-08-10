import React, { FC, useState, ChangeEvent } from "react";
import styled, { css } from "styled-components";

const Count = styled.div`
  display: flex;

  flex-direction: row;
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
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }

  flex-shrink: 1;
  width: 30px;
  border-color: #e4e4e4 transparent;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  text-align: center;
  outline: none;
`;

interface ProductQuantityProps {
  value: number; // 初始的数量
  onChange: (value: number) => void; // 数量改变
}

const ProductQuantityProps: FC<ProductQuantityProps> = ({
  value,
  onChange,
}) => {
  return (
    <>
      <Count>
        <Button onClick={() => onChange(value - 1)}>-</Button>
        <Input type="number" value={value} />
        <Button onClick={() => onChange(value + 1)}>+</Button>
      </Count>
    </>
  );
};

export default ProductQuantityProps;
