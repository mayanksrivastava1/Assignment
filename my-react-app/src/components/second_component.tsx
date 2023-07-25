import React, { useState, useEffect } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { Checkbox, FormControlLabel } from '@mui/material';

const Secondcomponent : React.FC = () => {
  const [departmentData, setDepartmentData] = useState<JSX.Element[]>([]);

  const departments = [
    {
      id: 'dep1',
      name: 'Customer_service',
      isChecked: false,
      subDepartments: [
        { id: 'subDep1', name: 'Support', isChecked: false },
        { id: 'subDep2', name: 'Customer_Success', isChecked: false },
      ],
    },
    {
      id: 'dep2',
      name: 'Design',
      isChecked: false,
      subDepartments: [
        { id: 'subDep3', name: 'graphic_design', isChecked: false },
        { id: 'subDep4', name: 'product_design', isChecked: false },
        { id: 'subDep5', name: 'web_design', isChecked: false }
      ],
    },
  ];


// Function to handle inner checkboxes and if all inner checkboxes are checked then also updates to outer checkbox (parent Checkbox)

  function checkIt(outerId: string, innerId: string) {
    let countCheck = 0;
    let mainSize = 0;
    departments.map((main) => {
      if (main.id === outerId) {
        mainSize = main.subDepartments.length;

        main.subDepartments.map((inmain) => {
          if (inmain.id === innerId) {
            if (inmain.isChecked === false) {
              inmain.isChecked = true;
            }
            else {
              inmain.isChecked = false;
            }
          }
          if (inmain.isChecked === true) {
            countCheck = countCheck + 1;
          }
        })
        if (mainSize === countCheck) {
          main.isChecked = true;
        }
        else {
          main.isChecked = false;
        }
      }
      setDepartmentData(data);
    })
  }


 // Function to handle outer checkbox

  function handleOuterCheckBox(outerId : string) {
    departments.map((main) => {
      if (main.id === outerId) {
        if (main.isChecked === false) {
          main.isChecked = true;
          main.subDepartments.map((inmain) => {
            inmain.isChecked = true;
          })
        }
        else {
          main.isChecked = false;
          main.subDepartments.map((inmain) => {
            inmain.isChecked = false;
          })
        }
      }
      setDepartmentData(data);
    })
  }

  const data = () => {
    return departments.map((department) => (
      <TreeItem
        key={department.id}
        nodeId={department.id}
        label={
          <FormControlLabel
            control={<Checkbox checked={department.isChecked} onClick={() => { handleOuterCheckBox(department.id) }} />}
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
                control={<Checkbox checked={subDepartment.isChecked} onClick={() => { checkIt(department.id, subDepartment.id) }} />}
                label={subDepartment.name}
              />
            }
          />
        ))}
      </TreeItem>
    ));
  };


  
  useEffect(() => {
    setDepartmentData(data);
  }, []);


  return (
    <div>
      <div className="departments-container">
        <h2>List of Departments and Sub-Departments</h2>
        <TreeView
          defaultCollapseIcon={<span>-</span>}
          defaultExpandIcon={<span>+</span>}
          multiSelect
        >

          {departmentData}
        </TreeView>
      </div>
    </div>
  );
};

export default Secondcomponent
