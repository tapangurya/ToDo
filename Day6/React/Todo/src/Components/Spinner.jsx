// components/Spinner.jsx
import { Oval } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px',
      }}
    >
      <Oval height={60} width={60} color="#4fa94d" />
    </div>
  );
};

export default Spinner;
