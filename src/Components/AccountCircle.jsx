import React from "react";
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Modal } from "@mui/material";
const AccountCircle = () => {

    const [open, setOpen] = useState(false);
    const handleModalOpen = () => setOpen(true);
    const handleModalClose = () => setOpen(false);


    return (
        <div className="account-circle">
            <AccountCircleIcon onClick={handleModalOpen}/>
            <Modal
                open={open}
                onClose={handleModalClose}
                style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    padding: '40px',
                }}
            >
                <div>modal</div>
            </Modal>
        </div>

    )}
export default AccountCircle;