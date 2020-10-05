import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.svg`
  fill: ${(props) => props.color};
  width: 30px;
  height: 30px;
  margin: 10px auto;
  flex-grow: 0.5;
`;

const ImageType = ({ type, color }) => {
  switch (type) {
    case 'info': {
      return (
        <Image xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" color={color}>
          <circle cx="256" cy="378.5" r="25" />
          <path d="M256 0C114.5 0 0 114.5 0 256c0 141.5 114.5 256 256 256 141.5 0 256-114.5 256-256C512 114.5 397.5 0 256 0zM256 472c-119.4 0-216-96.6-216-216 0-119.4 96.6-216 216-216 119.4 0 216 96.6 216 216C472 375.4 375.4 472 256 472z" />
          <path d="M256 128.5c-44.1 0-80 35.9-80 80 0 11 9 20 20 20s20-9 20-20c0-22.1 17.9-40 40-40 22.1 0 40 17.9 40 40 0 22.1-17.9 40-40 40 -11 0-20 9-20 20v50c0 11 9 20 20 20 11 0 20-9 20-20v-32.5c34.5-8.9 60-40.3 60-77.5C336 164.4 300.1 128.5 256 128.5z" />
        </Image>
      );
    }
    case 'warning': {
      return (
        <Image xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" color={color}>
          <path d="M503.8 395.4l-195.7-339C297.3 37.6 277.8 26.3 256 26.3c-21.8 0-41.3 11.3-52.1 30.1L8.2 395.4c-10.9 18.9-10.9 41.4 0 60.2 10.9 18.8 30.4 30.1 52.1 30.1h391.4c21.8 0 41.3-11.3 52.1-30.1C514.7 436.7 514.7 414.2 503.8 395.4zM477.9 440.6c-5.5 9.5-15.2 15.1-26.2 15.1H60.3c-10.9 0-20.7-5.6-26.2-15.1 -5.5-9.5-5.5-20.7 0-30.2L229.8 71.4c5.5-9.5 15.2-15.1 26.2-15.1 10.9 0 20.7 5.6 26.2 15.1l195.7 339C483.3 419.8 483.3 431.1 477.9 440.6z" />
          <rect x="241" y="176" width="30" height="150" />
          <path d="M256 356c-11 0-20 9-20 20s9 20 20 20c11 0 20-9 20-20S267 356 256 356z" />
        </Image>
      );
    }
    case 'error': {
      return (
        <Image xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" color={color}>
          <path d="M317.6 45.5l11-24.7c3.3-7.5 0-16.2-7.5-19.5 -7.5-3.3-16.2 0-19.5 7.5l-15.8 35.5h-59.6L210.4 8.8c-3.3-7.5-12-10.8-19.5-7.5 -7.5 3.3-10.8 12-7.5 19.5l11 24.7c-29.4 5.8-51.7 31.7-51.7 62.8v24.6h226.5v-24.6C369.2 77.2 347 51.3 317.6 45.5z" />
          <path d="M497.2 260.9h-88.6v-30.7c44.6-7.1 78.8-45.8 78.8-92.4v-19.7c0-8.2-6.6-14.8-14.8-14.8s-14.8 6.6-14.8 14.8v19.7c0 30.2-21 55.6-49.2 62.3v-13c0-13.6-11-24.6-24.6-24.6h-113.2v172.3c0 8.2-6.6 14.8-14.8 14.8 -8.2 0-14.8-6.6-14.8-14.8V162.5h-113.2c-13.6 0-24.6 11-24.6 24.6v13c-28.2-6.7-49.2-32.1-49.2-62.3v-19.7c0-8.2-6.6-14.8-14.8-14.8s-14.8 6.6-14.8 14.8v19.7c0 46.6 34.2 85.3 78.8 92.4v30.7H14.8c-8.2 0-14.8 6.6-14.8 14.8s6.6 14.8 14.8 14.8h88.6v30.7c-44.6 7.1-78.8 45.8-78.8 92.4v19.7c0 8.2 6.6 14.8 14.8 14.8s14.8-6.6 14.8-14.8v-19.7c0-30.2 21-55.6 49.2-62.3v8.1C103.4 443.5 171.8 512 256 512s152.6-68.5 152.6-152.6v-8.1c28.2 6.7 49.2 32.1 49.2 62.3v19.7c0 8.2 6.6 14.8 14.8 14.8s14.8-6.6 14.8-14.8v-19.7c0-46.6-34.2-85.3-78.8-92.4v-30.7h88.6c8.2 0 14.8-6.6 14.8-14.8S505.4 260.9 497.2 260.9z" />
        </Image>
      );
    }
    case 'success': {
      return (
        <Image xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" color={color}>
          <path d="M497.4 70c-7.5-7.5-19.8-7.6-27.3 0L238.6 300.8l-83.5-90.7c-7.2-7.8-19.4-8.3-27.3-1.1 -7.8 7.2-8.3 19.4-1.1 27.3l97.1 105.5c3.6 3.9 8.5 6.1 13.8 6.2 0.1 0 0.3 0 0.4 0 5.1 0 10-2 13.6-5.6L497.3 97.3C504.9 89.8 504.9 77.5 497.4 70z" />
          <path d="M492.7 236.7c-10.7 0-19.3 8.6-19.3 19.3 0 119.9-97.5 217.4-217.4 217.4 -119.9 0-217.4-97.5-217.4-217.4 0-119.9 97.5-217.4 217.4-217.4 10.7 0 19.3-8.6 19.3-19.3C275.3 8.6 266.7 0 256 0 114.8 0 0 114.8 0 256c0 141.2 114.8 256 256 256 141.2 0 256-114.8 256-256C512 245.3 503.4 236.7 492.7 236.7z" />
        </Image>
      );
    }
    default: {
      return (
        <Image xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" color={color}>
          <path d="M391 196v-60C391 61.6 330.6 0 256 0c-74.4 0-135 61.6-135 136v60c0 56.9 35.6 107.9 90 127.2V331h-45c-41.4 0-75 33.6-75 75v91c0 8.3 6.7 15 15 15h45v-46c0-8.3 6.7-15 15-15s15 6.7 15 15v46h150v-46c0-8.3 6.7-15 15-15s15 6.7 15 15v46h45c8.3 0 15-6.7 15-15v-91c0-41.4-33.6-75-75-75h-45v-7.8C354.5 304.5 391 253.8 391 196zM256 241c-8.3 0-15-6.7-15-15 0-8.3 6.7-15 15-15s15 6.7 15 15C271 234.3 264.3 241 256 241zM283 142C275.5 147.6 271 156.6 271 166c0 8.3-6.7 15-15 15s-15-6.7-15-15c0-18.8 9-36.7 24-48C268.8 115.1 271 110.8 271 106c0-8.3-6.7-15-15-15s-15 6.7-15 15c0 8.3-6.7 15-15 15s-15-6.7-15-15c0-24.8 20.2-45 45-45s45 20.2 45 45C301 120.1 294.3 133.6 283 142z" />
        </Image>
      );
    }
  }
};

ImageType.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default ImageType;
