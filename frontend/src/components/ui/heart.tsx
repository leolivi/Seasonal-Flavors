import React from "react";

/*
  @desc Heart component 
*/
const Heart = ({ ...props }) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 42 36"
      xmlns="http://www.w3.org/2000/svg"
      className={`fill-${props.color}`}
    >
      <mask
        id="mask0_389_1749"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
      >
        <path
          d="M41.6387 0.0891113H0.638672V35.0891H41.6387V0.0891113Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_389_1749)">
        <mask
          id="mask1_389_1749"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
        >
          <path
            d="M41.6387 0.0891113H0.638672V35.0891H41.6387V0.0891113Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask1_389_1749)">
          <mask
            id="mask2_389_1749"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
          >
            <path
              d="M41.6387 0.0891113H0.638672V35.0891H41.6387V0.0891113Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask2_389_1749)">
            <g opacity="0.9">
              <mask
                id="mask3_389_1749"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
              >
                <path
                  d="M41.6387 0.0891113H0.638672V35.0891H41.6387V0.0891113Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask3_389_1749)">
                <path d="M22.1811 34.6403L38.5287 18.1395C38.6828 17.9861 38.8486 17.8212 38.9796 17.6409C40.6907 15.7346 41.6271 13.2414 41.6387 10.6677C41.6387 10.3609 41.6271 10.0924 41.6001 9.78555C41.3959 7.30391 40.313 4.97569 38.5287 3.19596C36.5517 1.20144 33.8387 0.0891113 31.037 0.0891113C28.2084 0.0891113 25.5223 1.20144 23.5184 3.17295L21.1406 5.3861L18.7359 3.17295C17.256 1.70007 15.3561 0.70281 13.2982 0.296235C11.2557 -0.0988339 9.12077 0.104454 7.17848 0.909933C5.23619 1.71541 3.59064 3.07322 2.42296 4.79925C1.26683 6.53678 0.638672 8.56966 0.638672 10.6677C0.638672 12.0486 0.919995 13.4294 1.4364 14.7105C1.97592 15.9916 2.76209 17.1538 3.74864 18.1395L20.0962 34.6442C20.2388 34.7861 20.393 34.8858 20.5702 34.9625C20.7514 35.0392 20.9441 35.0776 21.1367 35.0891C21.3294 35.0776 21.5221 35.0392 21.7032 34.9625C21.8844 34.8858 22.0385 34.7823 22.1773 34.6442" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Heart;
