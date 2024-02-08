import { Avatar, Button } from '@mui/material';
import React, { useState } from 'react';
import './Sidebar.css';
import CreateNewTaskForm from '../Task/CreateTask';
import { useLocation, useNavigate } from 'react-router-dom';

const menu = [
  { name: "Home", value: "Home", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "DONE", value: "DONE", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "ASSIGNED", value: "ASSIGNED", role: ["ROLE_ADMIN"] },
  { name: "NOT ASSIGNED", value: "PENDING", role: ["ROLE_ADMIN"] },
  { name: "Create New Task", value: "", role: ["ROLE_ADMIN"] },
  { name: "Notification", value: "NOTIFICATION", role: ["ROLE_CUSTOMER"] }
];

const role = "ROLE_ADMIN";

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState("DONE");
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false)

  const handleCloseCreateTaskModal = () => {
    setOpenCreateTaskModal(false)
  }
  const handleOpenCreateTaskModal = () => {
    setOpenCreateTaskModal(true)
  }

  const handleMenuChange = (item) => {
    const updatedParams = new URLSearchParams(location.search)
    if (item.name === "Create New Task") {
      handleOpenCreateTaskModal()
    } else if (item.name === "Home") {
      updatedParams.delete("filter")
      const queryString = updatedParams.toString();
      const updatedPath = queryString ? `${location.pathname}?${queryString}` : location.pathname
      navigate(updatedPath)
    } else {
      updatedParams.set("filter", item.value)
      navigate(`${location.pathname}?${updatedParams.toString()}`)
    }
    setActiveMenu(item);
  };

  const handleLogout = () => {
    console.log("Handle logout")
  }

  return (
    <>
      <div className='card min-h-[85vh] flex flex-col justify-center fixed w-[20vw]'>
        <div className="space-y-5 h-full">
          <div className="flex justify-center">
            <Avatar
              src='https://cdn.pixabay.com/photo/2024/01/24/19/06/leaves-8530206_640.jpg'
              sx={{ width: "8rem", height: "8rem" }}
              className='border-2 border-[#c24dd0]'
            />
          </div>
          {menu.filter((item) => item.role.includes(role)).map((item) => (
            <p
              key={item.value}
              className={`py-3 px-5 rounded-full text-center cursor-pointer
             ${activeMenu === item ? "activeMenuItem" : "menuItem"}`}
              onClick={() => handleMenuChange(item)}
            >
              {item.name}
            </p>
          ))}

          <Button
            sx={{ padding: ".7rem", borderRadius: "2rem" }}
            fullWidth
            className='logoutButton'
            onClick={handleLogout}
          >
            Logout
          </Button>

        </div>
      </div>

      <CreateNewTaskForm open={openCreateTaskModal} handleClose={handleCloseCreateTaskModal} />
    </>
  );
};

export default Sidebar;
