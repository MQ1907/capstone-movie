import { AppBar, Box, CssBaseline, IconButton, Menu, MenuItem, Toolbar, Typography, Button, Container } from '@mui/material'
import React, { useState } from 'react'
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext/UserContext';



export default function HeaderAdmin() {
    const navigate = useNavigate()

    const pagesAdmin = [
        { id: "managerMovies", label: "Quản Lý Phim" ,url: "/admin/movies"},
        { id: "managerUser", label: "Quản Lý Người Dùng",url:"/admin/users" }
    ]



const handleNavigateAdmin = (url)=>{
    navigate(url)
}


    return (
        <>
            <CssBaseline />
            <AppBar color='default'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <MovieFilterIcon
                            sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
                            color="error"
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: "flex", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "#d32f2f",
                                textDecoration: "none",
                            }}
                        >
                            Admin
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                            justifyContent="center"
                        >
                            {pagesAdmin.map((page) => (
                                <Button
                                    key={page.id}
                                    onClick={() => handleNavigateAdmin(page.url)}
                                    sx={{
                                        my: 2,
                                        color: "black",
                                        display: "block",
                                        margin: "0 10px",
                                    }}
                                >
                                    {page.label}
                                </Button>
                            ))}
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}
