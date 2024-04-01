import React from 'react';
import '../../assets/style.less';
import Segmented from '../../src/index';

export default function App() {
  return (
    <div>
      <div className="wrapper">
        <Segmented
          defaultValue="Android"
          options={[
            {
              label: 'Android',
              value: 'Android',
            },
            {
              label: '11111111',
              value: '11111111',
            },
            {
              label: '222222',
              value: '222222',
            },
            {
              label: '333333333',
              value: '333333333',
            },
            {
              label: '55555',
              value: '55555',
            },
          ]}
        />
      </div>
    </div>
  );
}
