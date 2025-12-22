import { useEffect, useState } from 'react';

const AppVersion = () => {
  const [version, setVersion] = useState('');

  useEffect(() => {
    // Fetch version from package.json
    fetch('/package.json')
      .then((res) => res.json())
      .then((data) => setVersion(data.version))
      .catch(() => setVersion('unknown'));
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        fontSize: '12px',
        color: '#666',
        fontFamily: 'monospace',
      }}
    >
      v{version}
    </div>
  );
};

export default AppVersion;
