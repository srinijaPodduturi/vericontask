import React, { FC, useEffect, useState } from 'react';
import { Title, Wrapper } from './styles';
import { PieCharts } from 'containers/PieCharts/PieCharts';
import { Table } from 'containers/Table/Table';
import { getDevicesData } from 'services/devices';
import { Device } from './types';

export const Dashboard: FC = () => {
  const [data, setData] = useState<Device[]>([]);
  const [deviceTypeData, setDeviceTypeData] = useState<Device[]>([]);
  const [deviceType, setDeviceType] = useState<string>('');
  const [deviceTypeSummary, setDeviceTypeSummary] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDevicesData();
      setData(data);
      const obj: any = {};
      console.log(data);
      data.forEach((device: any) => {
        if (obj[device.deviceType] == null) {
          obj[device.deviceType] = {
            Ok: 0,
            Failed: 0,
          };
        }
        obj[device.deviceType][device.status] =
          obj[device.deviceType][device.status] + 1;
      });
      setDeviceTypeSummary(obj);
      console.log(obj);
    };
    fetchData();
  }, []);

  const onDeviceClick = (deviceType: string) => {
    const filteredData = data.filter(
      (device) => device.deviceType === deviceType,
    );
    setDeviceTypeData([...filteredData]);
    setDeviceType(deviceType);
  };

  return (
    <>
     
      
      <Wrapper>
      <Title>Percentage of Ok/ Failed based ond device type </Title>
        <PieCharts data={deviceTypeSummary} onDeviceClick={onDeviceClick} />
        <Table data={deviceTypeData} deviceType={deviceType} />
      </Wrapper>
    </>
  );
};
