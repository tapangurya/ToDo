import { TailSpin } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        padding: '60px',
      }}
    >
      <TailSpin
        height="50"
        width="50"
        color="#0f172a" // Professional Slate-900 color
        ariaLabel="loading"
        radius="1"
        strokeWidth={3}
        wrapperStyle={{}}
        wrapperClass=""
      />
      <p
        style={{
          fontSize: '14px',
          color: '#64748b',
          fontWeight: '500',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        Loading data...
      </p>
    </div>
  );
};
export default Spinner;
