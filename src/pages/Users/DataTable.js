import React, { useState } from "react";
import {
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { deleteuser } from "../../api/user";
import { useDispatch } from "react-redux";

function DataTable({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open1, setOpen1] = React.useState(false);
  const nav = useNavigate()
  const dispatch = useDispatch()

  const handleClose = () => setOpen1(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handelDelete = (id) => {
    dispatch(deleteuser(id));
    setOpen1(false);
  };

  return (
    <div className="mx-4">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Email ID
              </TableCell>
              <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Employee Id
              </TableCell>
              <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Department
              </TableCell>
              <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Phone No.
              </TableCell>
              <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }} >
                Role
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{item?.emp_name}</TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>{item?.employeeId}</TableCell>
                    <TableCell>{item?.department?.department_name}</TableCell>
                    <TableCell>{item?.phone_no}</TableCell>
                    <TableCell>{item?.role}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        sx={{ marginRight: "10px" }}
                        onClick={() => nav(`/editUser/${item?._id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => setOpen1(true)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <>
                      <Modal
                        open={open1}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <section class="z-40 fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-10">
                          <div class="p-4">
                            <div class="relative p-6 py-11 bg-blueGray-900 bg-opacity-30 max-w-lg text-center w-full rounded-5xl">
                              <p class="mb-8 text-white text-2xl">
                                Do you want to delete this user?
                              </p>
                              <div class="flex flex-wrap justify-center -m-2">
                                <div class="w-auto p-2">
                                  <a
                                    class="inline-block px-14 py-4 text-white font-semibold text-lg tracking-2xl hover:bg-gray-600 hover:text-white border rounded-full transition duration-300 cursor-pointer"
                                    onClick={handleClose}
                                  >
                                    Cancel
                                  </a>
                                </div>
                                <div class="w-auto p-2">
                                  <a
                                    class="inline-block px-14 py-4 font-semibold text-lg border bg-gray-100 hover:bg-red-800 text-indigo-800 hover:text-white rounded-full transition duration-300 cursor-pointer"
                                    onClick={() => handelDelete(item?._id)}
                                  >
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </Modal>
                    </>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default DataTable;
