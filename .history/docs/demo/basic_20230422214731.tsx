import '../../assets/style.less';
import React from 'react';
import Segmented from 'rc-segmented';

export default function App() {
  return (
    <div>
      <div className="wrapper">
        <Segmented
          options={[
            {
              label: 'IOS',
            },
            'Android',
            'Web',
          ]}
        />
      </div>
    </div>
  );
}
