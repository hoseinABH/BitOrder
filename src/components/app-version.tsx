import packageJson from '../../package.json';

const AppVersion = () => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        fontSize: '12px',
        color: '#666',
        fontFamily: 'monospace',
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '4px 8px',
        borderRadius: '4px',
        backdropFilter: 'blur(4px)',
      }}
    >
      v{packageJson.version}
    </div>
  );
};

export default AppVersion;
