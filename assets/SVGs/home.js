import Svg, { Path } from "react-native-svg";
const SvgComponent = ({ color, ...otherProps }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...otherProps}
  >
    <Path
      fill={color}
      d="M8.382 19.05v-2.81a1.3 1.3 0 0 1 1.297-1.296h2.634a1.3 1.3 0 0 1 1.305 1.295v2.803c0 .618.502 1.12 1.125 1.125h1.797a3.172 3.172 0 0 0 2.24-.916 3.126 3.126 0 0 0 .928-2.221V9.044c0-.673-.3-1.312-.82-1.744L12.78 2.452a2.856 2.856 0 0 0-3.628.065L3.178 7.3c-.545.42-.87 1.06-.886 1.744v7.977c0 1.738 1.418 3.146 3.168 3.146h1.756c.3.002.588-.115.8-.324.213-.21.333-.495.333-.793h.033Z"
      opacity={0.25}
    />
  </Svg>
);
export default SvgComponent;