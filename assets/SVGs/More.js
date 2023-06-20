import Svg, { Circle, G } from "react-native-svg";

export default function More({ color }) {
  return (
    <Svg
      fill={color}
      width="14px"
      height="14px"
      viewBox="0 0 24 24"
      id="d1946b9c-e9fc-4920-ad22-a61f3f1cb4e0"
      data-name="Livello 1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G id="bde61d18-5e52-4298-8faa-925dda811c76" data-name="more vertical">
        <Circle cx="12.13" cy="21.5" r="2.5" />

        <Circle cx="12.13" cy="12" r="2.5" />

        <Circle cx="12.13" cy="2.5" r="2.5" />
      </G>
    </Svg>
  );
}
