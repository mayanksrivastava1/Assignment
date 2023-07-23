import React, { useEffect, useState } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';


interface GridRowsProp {
    id: number;
    title: string;
    body: string;
  }
  
  const Firstcomponent: React.FC = () => {
    const [data, setData] = useState<GridRowsProp[]>([]);
  
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => setData(data));
    }, []);
  
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'title', headerName: 'Title', width: 300 },
      { field: 'body', headerName: 'Body', width: 500 },
    ];

    return (
        <div>
          <div className="datagrid-container">
            <DataGrid rows={data} columns={columns} />
          </div>
        </div>
    );
};

export default Firstcomponent 