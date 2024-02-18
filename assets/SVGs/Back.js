import Svg, { Path } from "react-native-svg";
const Back = ({ color, ...otherProps }) => (
  <Svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M16.8666 6.51667V14.4917C16.8666 16.125 15.0916 17.15 13.675 16.3333L10.2166 14.3417L6.7583 12.3417C5.34163 11.525 5.34163 9.48334 6.7583 8.66667L10.2166 6.66667L13.675 4.67501C15.0916 3.85834 16.8666 4.87501 16.8666 6.51667Z"
      fill="white"
    />
    <Path
      d="M3.1333 16.275C2.79163 16.275 2.5083 15.9917 2.5083 15.65V5.35001C2.5083 5.00834 2.79163 4.72501 3.1333 4.72501C3.47497 4.72501 3.7583 5.00834 3.7583 5.35001V15.65C3.7583 15.9917 3.47497 16.275 3.1333 16.275Z"
      fill="white"
    />
  </Svg>
);
export default Back;