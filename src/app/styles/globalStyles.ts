import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #1F1F1F;
    color: #FFFFFF; 
  }

  a {
    color: #1890ff;
  }

  .ant-btn {
    background-color: #333; 
    color: #fff; 
  }

  .ant-table {
    background-color: #222;
  }

  .ant-select-selector {
    color: #FFFFFF !important;
    background-color: #333; 
  }

  .ant-select-dropdown .ant-select-item {
    color: #000000 !important;
  }

  .ant-pagination-item-active a {
    color: #FFFFFF !important;
  }

  .ant-typography, .ant-input, .ant-select-single .ant-select-selector {
    color: #ffffff !important;
  }

  .ant-input::placeholder, .ant-select-selection-placeholder {
    color: #bfbfbf !important;
  }

  .ant-rate-star {
    color: #bbbbbb !important;
  }

  .ant-rate-star-full {
    color: #5a9bd5 !important;
  }

  .ant-rate-star-first,
  .ant-rate-star-second,
  .ant-rate-star-third,
  .ant-rate-star-fourth,
  .ant-rate-star-fifth {
    color: #bbbbbb !important;
  }

  .ant-rate-star-full .ant-rate-star-first,
  .ant-rate-star-full .ant-rate-star-second,
  .ant-rate-star-full .ant-rate-star-third,
  .ant-rate-star-full .ant-rate-star-fourth,
  .ant-rate-star-full .ant-rate-star-fifth {
    color: #5a9bd5 !important;
  }
`;
