import React, { useEffect, useState, useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import BookmarkIcon from "../../../../assets/bookmark-icon.svg";
import BookmarkIconActive from "../../../../assets/bookmark-icon-active.svg";
import Active from "../../../../assets/active.svg";
// import EditIcon from "../../../assets/edit-icon.svg";
import ReminderIcon from "../../../../assets/reminder-icon.svg";
import CopyLinkIcon from "../../../../assets/copy-link-icon.svg";
// import DeleteIcon from "../../../assets/delete-icon.svg";
// import MoreMessage from "../../../assets/more-messages-icon.svg";
import "./UserMenu.css";
import axios from "axios";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { useHistory } from "react-router";
import { DataContext } from "../../../../App";
import { UserContext } from "../../../../Data-fetcing";
import { UserInfoContext } from "../../../../App";
import { UserBookmarkContext } from "../UserBookmarkContext";
import UserBookmarkButton from "./UserBookmarkButton";

function AdminMenu({ noticeID }) {
  const _globalData = useContext(DataContext);
  const { selectedNotice, setSelectedNotice } = useContext(UserContext);
  const org_id = _globalData.Organizations[0];

  const [openModal, setOpenModal] = React.useState(false);
  const [noticeList, setNoticeList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [toast, setToast] = useState(false);
  const history = useHistory();

  const openDeleteModal = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

<<<<<<< HEAD
  ///Bookmark
  const [bookmarkStatus, setBookmarkStatus] = useState();
  const UserData = useContext(UserInfoContext);
  // useEffect(() => {
  //   bookmarkDetails
  //     ? bookmarkDetails.data.filter((data) => data.notice_id === noticeID)
  //       ? setBookmarkStatus(true)
  //       : setBookmarked(false)
  //     : "";
  // }, [bookmarkDetails]);

  const bookmarkNotice = () => {
    axios
      .post(
        `https://noticeboard.zuri.chat/api/v1/organisation/${UserData?.org_id}/bookmark`,
        {
          notice_id: noticeID,
          user_id: UserData?._id,
        }
      )
      .then((data) => {
        console.log(data);
        setBookmarkStatus(true);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
=======
  const AdminMenuStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
>>>>>>> fc52f79c95cb1b05a938a036874395d1a3b5bdc9
  };

  const DialogStyle = {
    padding: "1em",
  };

  const MenuIconStyle = {
    paddingRight: "10px",
  };

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const openMenu = (evt) => {
    setAnchorEl(evt.currentTarget);
  };

  // const copy = (noticeID) => {
  //   fetch(
  //     `https://noticeboard.zuri.chat/api/v1/organisation/614679ee1a5607b13c00bcb7/notices`
  //   )
  //     .then((res) => {
  //       if (res.status >= 200 && res.status <= 299) {
  //         return res.json();
  //       } else {
  //         setLoading(false);
  //         setIsError(true);
  //       }
  //     })
  //     .then((data) => {
  //       setNoticeList(data.data);
  //     })
  //     .catch((error) => console.log(error));

  //   const currentNoticeID = noticeList?.find((element) => {
  //     return element._id === noticeID;
  //   });

  //   setSelectedNotice(currentNoticeID);
  //   navigator.clipboard.writeText(location.href`/${currentNoticeID._id}`);
  // };

  const closeMenu = () => {
    setAnchorEl(false);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={openMenu}
        disableRipple
      >
        <img src={Active} alt="active" />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={closeMenu}
        PaperProps={{
          style: {
            width: "16rem",
            boxShadow:
              "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 3px 3px 1px rgb(0 0 0 / 14%), 0px 3px 10px 2px rgb(0 0 0 / 12%)",
          },
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem className="overrideHeight" disableRipple>
          <div style={AdminMenuStyle}>
            <UserBookmarkButton noticeID={noticeID} />
          </div>
        </MenuItem>
        <MenuItem onClick={closeMenu} className="overrideHeight" disableRipple>
          <div style={AdminMenuStyle}>
            <img src={CopyLinkIcon} alt="Copy link" style={MenuIconStyle} />
            <span
              style={{
                color: "#999999",
                width: "100%",
              }}
              // onClick={copy(noticeID)}
            >
              Copy link
            </span>
          </div>
        </MenuItem>

        <MenuItem onClick={closeMenu} className="overrideHeight" disableRipple>
          <div style={AdminMenuStyle}>
            <img
              src={ReminderIcon}
              alt="Remind me about this"
              style={MenuIconStyle}
            />
            <span
              style={{
                color: "#999999",
                width: "100%",
              }}
              onClick={openDeleteModal}
            >
              Remind me about this
            </span>
          </div>
        </MenuItem>
      </Menu>
      {openModal && (
        <Dialog
          open={openModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Notice?"}</DialogTitle>
          <DialogContent style={DialogStyle}>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete notice, this action cannot be
              undone once you delete it. Kindly proceed while you click on the
              delete button
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              style={{
                textTransform: "none",
                padding: "1em 3em",
                backgroundColor: "#FCF8F7",
                color: "black",
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              autoFocus
              style={{
                textTransform: "none",
                padding: "1em 2em",
                backgroundColor: "red",
                color: "white",
              }}
              onClick={deleteNoticeFunc}
            >
              Delete Notice
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {loader && (
        <Backdrop
          sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
          onClick={handleClose}
          style={{ zIndex: "2" }}
        >
          <CircularProgress color="primary" style={{ color: "white" }} />

          <p style={{ color: "white" }}>
            Please wait, this might take few seconds.{" "}
          </p>
        </Backdrop>
      )}
      {toast && (
        <Snackbar
          open={toast}
          autoHideDuration={6000}
          onClose={() => setLoader(false)}
          message="Notice Deleted"
          severity="success"
        />
      )}
    </div>
  );
}
export default AdminMenu;
