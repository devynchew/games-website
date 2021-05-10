import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
    const token = localStorage.getItem("token");
    const loggedInUserID = parseInt(localStorage.getItem("loggedInUserID"));
    const loggedInUserName = localStorage.getItem("loggedInUserName");
    const loggedInRole = localStorage.getItem("loggedInRole");


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUserID");
        localStorage.removeItem("loggedInUserName");
        localStorage.removeItem("loggedInRole");
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Navbar.Brand>SP Games</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Games</Nav.Link>
                    {loggedInRole == "admin" ? (
                        <>
                            <Nav.Link href="/addgame">Add game</Nav.Link>
                            <Nav.Link href="/addcategory">Add category</Nav.Link>
                        </>
                    ) : (
                            <></>
                        )}
                </Nav>
                {token === null || isNaN(loggedInUserID) ? (
                    <Nav>
                        <Nav.Link href="/login">Log in</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                    </Nav>
                ) : (
                        <Nav>

                            <Nav.Link >Welcome back, {loggedInUserName}</Nav.Link>
                            <Nav.Link href="/" onClick={logout}>Log Out</Nav.Link>
                        </Nav>
                    )}
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Navigation;