import { RotatingLines } from "react-loader-spinner";

const Spinner = ({ className, strokeWidth }) => {
  return (
    <div className={className}>
      <RotatingLines
        strokeColor="currentColor"
        strokeWidth="5"
        animationDuration="1"
        width={strokeWidth}
        visible={true}
      />
    </div>
  );
};

export default Spinner;
