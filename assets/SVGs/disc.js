import Svg, { Path } from "react-native-svg";
const Disc = ({ color, ...otherProps }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={22}
    fill="none"
    {...otherProps}
  >
    <Path
      fill={color}
      d="M21 11a10.5 10.5 0 1 1-21 0 10.5 10.5 0 0 1 21 0Zm-7.875 0a2.625 2.625 0 1 0-5.25 0 2.625 2.625 0 0 0 5.25 0ZM5.25 11a5.25 5.25 0 0 1 5.25-5.25.656.656 0 1 0 0-1.313A6.563 6.563 0 0 0 3.937 11a.656.656 0 1 0 1.313 0Zm11.813 0a.656.656 0 1 0-1.313 0 5.25 5.25 0 0 1-5.25 5.25.656.656 0 1 0 0 1.313A6.563 6.563 0 0 0 17.063 11Z"
    />
  </Svg>
);
export default Disc;
