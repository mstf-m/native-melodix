import Svg, { Path, G } from "react-native-svg";
const Search = ({ color = "#E5FFFD" }) => (
  <Svg
    id="Layer_2"
    data-name="Layer 2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18.85 19"
    width={20}
    height={20}
  >
    <G id="Layer_1-2" data-name="Layer 1">
      <Path
        fill={color}
        class="cls-1"
        d="m8.5,17C3.8,17,0,13.2,0,8.5S3.8,0,8.5,0s8.5,3.8,8.5,8.5-3.8,8.5-8.5,8.5ZM8.5,1C4.4,1,1,4.4,1,8.5s3.4,7.5,7.5,7.5,7.5-3.4,7.5-7.5S12.6,1,8.5,1Z"
      />
      <Path
        fill={color}
        class="cls-1"
        d="m18.4,19c-.1,0-.3,0-.4-.1l-4.4-4.3c-.2-.2-.2-.5,0-.7s.5-.2.7,0l4.4,4.3c.2.2.2.5,0,.7,0,0-.1.1-.3.1Z"
      />
    </G>
  </Svg>
);
export default Search;
