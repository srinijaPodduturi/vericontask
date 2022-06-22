import MaterialTable from 'material-table';
import React from 'react';
import { Columns } from './Columns';
import { TableWrapper } from './styles';

export const Table = ({ deviceType, data }: any) => {
  if (deviceType === '') {
    return <div> Please click on any Device type to see the devices</div>;
  }

  return (
    <TableWrapper>
      <MaterialTable
        title={`Data of device type ${deviceType}`}
        columns={Columns}
        data={data}
      />
    </TableWrapper>
  );
};
