import React from "react";
import "../../App.css";
import styled from "styled-components";
import DesignHandler from "./DesignHandler";
import ThumbDisplay from "./ThumbDisplay";
import Swatch from "./Swatch";

const DesignInputPanel = ({
  design,
  setDesign,
  thumbRender,
  setThumbRender,
  garment,
  setGarment,
  handleScalableMockup,
  addProduct
}) => {
  return (
    <Panel>
      <DesignHandler
        design={design}
        setDesign={setDesign}
        setThumbRender={setThumbRender}
      />
      <ThumbDisplay
        garment={garment}
        setGarment={setGarment}
        thumbRender={thumbRender}
      />

      <Swatch garment={garment} setGarment={setGarment} />

      <ButtonContainer>
        <button
          className="designBtn btn btn-primary"
          onClick={handleScalableMockup}>
          Preview Design
        </button>
        <button className="designBtn btn btn-primary" onClick={addProduct}>
          Add To Store
        </button>
      </ButtonContainer>
    </Panel>
  );
};

export default DesignInputPanel;

const ButtonContainer = styled.div`
  // padding: 10px;
  display: flex;
  max-width: 300px;
  flex-direction: row;
  justify-content: space-around;
`;
const Panel = styled.div`
  margin: 63px 0 0 15px;

  button {
    margin-bottom: 8px;
  }
`;
