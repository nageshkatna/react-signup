import {
  Alert,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useGetContentContext } from "../hooks/useGetContentContext";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import GetContentService from "../services/GetContent.service";
import { useState } from "react";
import UpdateUser from "./UpdateUser";
import { UserT } from "../types/dashboard.types";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { users, page, rowsPerPage, totalCount, setRowsPerPage, setPage, refetchAllUsers } = useGetContentContext();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<UserT>({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleEdit = (user_id: string) => {
    const res = users.find((user) => user.id == user_id);
    if (res) {
      setEditingUser(res);
      setIsUpdatingUser(true);
    }
  };

  const onUpdateUser = (val: boolean) => {
    setIsUpdatingUser(val);
    refetchAllUsers();
  };

  const handleDelete = async (id: string) => {
    const data = await GetContentService.deleteUser(id);
    if (data.message) {
      refetchAllUsers();
    } else {
      setErrorMessage((prev) => !prev);
    }
  };

  return (
    <>
      {errorMessage && (
        <>
          <Alert severity='error'>{errorMessage}</Alert>
        </>
      )}
      {isUpdatingUser ? (
        <UpdateUser {...editingUser} handleUpdateUser={onUpdateUser} />
      ) : (
        <>
          <Button fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} onClick={() => navigate("/create")}>
            Create User
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Update</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(user.id)}>
                        <ModeIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component='div'
              count={totalCount}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </TableContainer>
        </>
      )}
    </>
  );
};

export default Dashboard;
