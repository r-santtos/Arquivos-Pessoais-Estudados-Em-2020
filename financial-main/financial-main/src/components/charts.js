import React from 'react';
import {Text} from 'react-native-svg';
import {PieChart} from 'react-native-svg-charts';
import { useAtivePorc, usePassivePorc } from '../context/updateList';

function Pizza() {
  const {ativesPorc} = useAtivePorc();
  const {passivesPorc} = usePassivePorc();

  const data = [
      {
          key: 1,
          amount: passivesPorc,
          svg: { fill: '#E0867E' },
      },
      {
          key: 2,
          amount: ativesPorc,
          svg: { fill: '#345f9c' },
      },
  ]

  const Labels = ({ slices }) => {
      return slices.map((slice, index) => {
          const { pieCentroid, data } = slice;
          return (
              <Text
                  key={index}
                  x={pieCentroid[ 0 ]}
                  y={pieCentroid[ 1 ]}
                  fill={'white'}
                  textAnchor={'middle'}
                  alignmentBaseline={'middle'}
                  fontSize={16}
                  stroke={'black'}
                  strokeWidth={0.2}
              >
              </Text>
          )
      })
  }

  return (
    <PieChart
        style={{ height: 125, width: '100%' }}
        valueAccessor={({ item }) => item.amount}
        data={data}
        spacing={0}
        outerRadius={'100%'}
    >
        <Labels/>
    </PieChart>
  );
}

export default Pizza;