import React from 'react'
import { useState, useEffect } from 'react';
import Select from 'react-select';
import Api from '../../_Utils/Api'
import { X } from 'feather-icons-react/build/IconComponents';
import { useStateContext } from "../../shared/Context";
import { useLocation } from 'react-router-dom';

export default function SelectPermission({select = true}) {
  const location = useLocation();
  const [ permissionsOptions, setPermissionsOptions ] = useState([])
  const { selectedPermissions, setSelectedPermissions } = useStateContext();

  console.log(permissionsOptions);


  const handlePermissionChange = (selectedOption) => {

    const isAlreadySelected = selectedPermissions.some(
      (perm) => perm.value === selectedOption.value
    );
  

    if (!isAlreadySelected) {
      setSelectedPermissions((prev) => [...prev, selectedOption]);
    }
  };
  
  useEffect(() => {
    if (!location.pathname.includes('/editstaff') && !location.pathname.includes('/staffprofile')) {
      setSelectedPermissions([]);
    }
  }, [location.pathname]);

  const removePermission = (permissionToRemove) => {
    setSelectedPermissions((prev) =>
      prev.filter((perm) => perm.value !== permissionToRemove.value)
    );
  };

  useEffect(() => {
    permissionsSelect()
  }, []);

  const permissionsSelect = () => {
    Api.permissions_select().then(res => {
      setPermissionsOptions(res.data.results);
    }).catch(error => {
      console.log(error);
    })
  };

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div className="form-group local-forms">
        <label>
          Permissions <span className="login-danger">*</span>
        </label>
        {select && (
          <Select
            placeholder="Select permissions"
            onChange={handlePermissionChange}
            options={permissionsOptions}
            id="search-commodity"
            components={{
              IndicatorSeparator: () => null,
            }}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ?'none' : '2px solid rgba(46, 55, 164, 0.1);',
                boxShadow: state.isFocused ? '0 0 0 1px #2e37a4' : 'none',
                '&:hover': {
                  borderColor: state.isFocused ? 'none' : '2px solid rgba(46, 55, 164, 0.1)',
                },
                borderRadius: '10px',
                fontSize: "14px",
                  minHeight: "45px",
              }),
              dropdownIndicator: (base, state) => ({
                ...base,
                transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
                transition: '250ms',
                width: '35px',
                height: '35px',
              }),
            }}
          />
        )}
      </div>

      {/* Display selected permissions */}
      <div className={`selected-permissions ${!select && 'profile'}`}>
        {selectedPermissions.map((permission) => (
          <div key={permission.value} className="selected-permission-item">
            {permission.label}
            <span
              className="remove-permission"
              onClick={() => removePermission(permission)}
            >
              <X className="x-icon" /> {/* This is the 'x' icon */}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}
