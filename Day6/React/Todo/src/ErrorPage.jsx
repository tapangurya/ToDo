// ErrorPage.jsx
export default function ErrorPage({
  title = 'Something went wrong',
  message = 'We couldn’t load the data. Please try again later.',
  onRetry,
}) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{title}</h1>
      <p style={styles.message}>{message}</p>

      {onRetry && (
        <button style={styles.button} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '1rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  message: {
    color: '#666',
    marginBottom: '1.5rem',
  },
  button: {
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
  },
};
