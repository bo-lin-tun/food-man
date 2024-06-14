"use client";

interface Props {
  color?: string;
}
const WaveSvg = ({ color }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill={color ? color : "#1B9C85"}
        fill-opacity="1"
        d="M0,160L48,138.7C96,117,192,75,288,80C384,85,480,139,576,165.3C672,192,768,192,864,165.3C960,139,1056,85,1152,64C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      ></path>
    </svg>
  );
};

export default WaveSvg;
