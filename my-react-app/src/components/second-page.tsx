import React, { useEffect, useState } from 'react';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { TreeView, TreeItem } from '@mui/lab';
import { Checkbox, FormControlLabel } from '@mui/material';
import './second-page.css'
interface GridRowData {
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const [data, setData] = useState<GridRowData[]>([]);

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

  const departments = [
    {
      id: 'dep1',
      name: 'Department 1',
      subDepartments: [
        { id: 'subDep1', name: 'Sub Department 1' },
        { id: 'subDep2', name: 'Sub Department 2' },
      ],
    },
    {
      id: 'dep2',
      name: 'Department 2',
      subDepartments: [
        { id: 'subDep3', name: 'Sub Department 3' },
        { id: 'subDep4', name: 'Sub Department 4' },
      ],
    },
  ];
  // State to store the selected departments and sub-departments
  const [selected, setSelected] = useState<string[]>([]);

  // Function to handle the checkbox change event
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (event.target.checked) {
      // If the checkbox is checked, add the ID to the selected array
      setSelected([...selected, id]);
    } else {
      // If the checkbox is unchecked, remove the ID from the selected array
      setSelected(selected.filter((itemId) => itemId !== id));
    }
  };

  // Function to check if all sub-departments of a department are selected
  const areAllSubDepartmentsSelected = (subDepartments: { id: string }[]) => {
    return subDepartments.every((subDep) => selected.includes(subDep.id));
  };

  // Function to handle the department checkbox change event
  const handleDepartmentCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (event.target.checked) {
      // If the checkbox is checked, add the department and its sub-departments to the selected array
      const subDepartmentsIds = departments.find((dep) => dep.id === id)?.subDepartments.map((subDep) => subDep.id);
      if (subDepartmentsIds) {
        setSelected([...selected, id, ...subDepartmentsIds]);
      }
    } else {
      // If the checkbox is unchecked, remove the department and its sub-departments from the selected array
      const subDepartmentsIds = departments.find((dep) => dep.id === id)?.subDepartments.map((subDep) => subDep.id);
      if (subDepartmentsIds) {
        setSelected(selected.filter((itemId) => !subDepartmentsIds.includes(itemId)));
      }
    }
  };
  
  return (
    <div className="container">
      <h1>Second Page</h1>
      <div className="datagrid-container">
        <DataGridPro rows={data} columns={columns} />
      </div>
      <div className="departments-container">
        <h2>List of Departments and Sub-Departments</h2>
        <TreeView
          defaultCollapseIcon={<span>-</span>}
          defaultExpandIcon={<span>+</span>}
          multiSelect
        >
          {departments.map((department) => (
            <TreeItem
              key={department.id}
              nodeId={department.id}
              label={
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selected.includes(department.id)}
                      onChange={(event) => handleDepartmentCheckboxChange(event, department.id)}
                    />
                  }
                  label={department.name}
                />
              }
            >
              {department.subDepartments.map((subDepartment) => (
                <TreeItem
                  key={subDepartment.id}
                  nodeId={subDepartment.id}
                  label={
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selected.includes(subDepartment.id)}
                          onChange={(event) => handleCheckboxChange(event, subDepartment.id)}
                        />
                      }
                      label={subDepartment.name}
                    />
                  }
                />
              ))}
            </TreeItem>
          ))}
        </TreeView>
      </div>
    </div>
  );
};

export default SecondPage
