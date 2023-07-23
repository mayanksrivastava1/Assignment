import React, {  useState } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { Checkbox, FormControlLabel } from '@mui/material';

const Secondcomponent: React.FC = () => {


    const departments = [
        {
          id: 'dep1',
          name: 'Customer_service',
          subDepartments: [
            { id: 'subDep1', name: 'Support' },
            { id: 'subDep2', name: 'Customer_Success' },
          ],
        },
        {
          id: 'dep2',
          name: 'Design',
          subDepartments: [
            { id: 'subDep3', name: 'graphic_design' },
            { id: 'subDep4', name: 'product_design' },
            {id : 'subDep5' , name: 'web_design'}
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
        <div>
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

export default Secondcomponent