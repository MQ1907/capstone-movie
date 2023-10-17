import React, { useState } from 'react'
import AddMovie from './AddMovie/AddMovie'
import { Box, Button, Container, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Query, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteMovie, getMovie } from '../../apis/movieAPI'
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditMovie from './EditMovie'
import { StyledTableCell, StyledTableRow } from './User/UserManagement/styledTable'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




export default function AdminMovie() {

  const queryClient = useQueryClient()


  // Add Movie
  const [openNewMovie, setOpenNewMovie] = useState(false);
  const handleOpenNewMovie = () => setOpenNewMovie(true);
  const handleCloseNewMovie = () => setOpenNewMovie(false);

  // Edit movie
  const [openEditMovie, setOpenEditMovie] = useState(false);
  const [editMovieId, setEditMovieId] = useState(0);
  const handleOpenEditMovie = (movieId) => {
    setOpenEditMovie(true)
    setEditMovieId(movieId)
  };
  const handleCloseEditMovie = () => setOpenEditMovie(false);


  const { data = [], isLoading } = useQuery({
    queryKey: ["listMovie", openNewMovie, openEditMovie,],
    queryFn: () => getMovie(),
  })



  console.log(data)



  const { mutate: handleDeleteMovie } = useMutation({
    mutationFn: (values) => deleteMovie(values),

    onSuccess: () => {
      queryClient.invalidateQueries('listMovie')
    },
    onError: () => {
    },
  });



  return (
    <div>
      <Container maxWidth="xl" >
      <Box height={100} />
        <div style={{marginBottom:"20px"}}>
          <Button variant="contained"
          color="success" onClick={handleOpenNewMovie} >Thêm Phim Mới</Button>
        </div>
        <TableContainer sx={{ paddingBottom: "20px", width: "100%" }} component={Paper}>
          <Table sx={{ minWidth: 500 }}  >
            <TableHead>
              <StyledTableRow >
                <StyledTableCell  >Mã Phim</StyledTableCell>
                <StyledTableCell align='right'>Hình Ảnh</StyledTableCell>
                <StyledTableCell align='right'>Tên Phim</StyledTableCell>
                <StyledTableCell align='right'>Mô Tả</StyledTableCell>
                <StyledTableCell align='right'>Hành Động</StyledTableCell>
              </StyledTableRow>

            </TableHead>
            <TableBody>
              {data.map((movie) => {
                return (
                  <StyledTableRow
                    key={movie.maPhim}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {movie.maPhim}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <img src={movie.hinhAnh} height={50} />
                    </StyledTableCell>
                    <StyledTableCell align="right">{movie.tenPhim}</StyledTableCell>
                    <StyledTableCell align="right">{movie.moTa}</StyledTableCell>
                    <StyledTableCell align="right" style={{ display: "flex" }} >
                      <EditIcon
                        sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
                        color="error" style={{ cursor: "pointer" }} onClick={() => handleOpenEditMovie(movie.maPhim)}
                      />
                      <DeleteIcon
                        sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
                        color="error" style={{ cursor: "pointer" }} onClick={() => handleDeleteMovie(movie.maPhim)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                )
              })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Add Movie */}
      <Modal keepMounted
        open={openNewMovie}
        onClose={handleCloseNewMovie}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box
          sx={style}
        >
          <h1>Thêm Phim Mới</h1>
          <AddMovie handleClose={handleCloseNewMovie} />

        </Box>

      </Modal>

      {/* Edit Movie */}
      <Modal keepMounted
        open={openEditMovie}
        onClose={handleCloseEditMovie}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description">
        <Box
          sx={style}
        >
          <h1>Edit Movie</h1>
          <EditMovie handleClose={handleCloseEditMovie} id={editMovieId} />

        </Box>

      </Modal>



    </div>
  )
}
