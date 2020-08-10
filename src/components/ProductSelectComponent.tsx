import React, { FC, useState, ChangeEvent } from "react";
import styled, { css } from "styled-components";
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
interface VariantFragment {
  id: number;
  title: string;
  option1: string;
  option2: string;
  option3?: any;
}

interface ProductSelectComponent {
  variants: VariantFragment[];
  value: string;
  onChange: (value: string) => void;
}

const ProductSelectComponent: FC<ProductSelectComponent> = ({
  variants,
  value,
  onChange,
}) => {
  function handleChangeOption(e: ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value);
  }
  return (
    <>
      <ProductSelect onChange={handleChangeOption}>
        {variants?.map((variant: any) => {
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
    </>
  );
};

export default ProductSelectComponent;
