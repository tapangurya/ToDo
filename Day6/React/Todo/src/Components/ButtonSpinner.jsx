import { Oval } from 'react-loader-spinner';

const ButtonSpinner = () => {
  return (
    <Oval
      height={20}
      width={20}
      color="#ffffff"
      secondaryColor="#000000"
      strokeWidth={5}
      strokeWidthSecondary={5}
      ariaLabel="loading"
    />
  );
};

export default ButtonSpinner;
