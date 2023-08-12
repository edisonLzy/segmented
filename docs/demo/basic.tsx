import '../../assets/style.less';
import React from 'react';
import { Segmented } from '../../src/tiny';

export default function App() {
  return (
    <div>
      <div className="wrapper">
        <Segmented
          options={[
            {
              label: 'IOS',
              value: 'IOS',
            },
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
