import { Navbar, Button } from "keep-react";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

export const NavbarComponent = () => {
  const { logOut } = useAuth();

  return (
    <Navbar fluid={true} className="shadow">
      <Navbar.Container className="flex items-center justify-between">
        <Navbar.Container className="flex items-center">
          <Navbar.Brand className="font-Libre font-bold text-lg text-purple-700">
            PDF Verse
          </Navbar.Brand>
          <Navbar.Divider></Navbar.Divider>
          <Navbar.Container
            tag="ul"
            className="lg:flex hidden items-center justify-between gap-8"
          >
            <Link to="/">
              <Navbar.Link linkName="PDF Books" href="#" />
            </Link>
            <Link to="/add-new-pdf">
              <Navbar.Link linkName="Add New PDF" />
            </Link>
            <Navbar.Link linkName="Users" href="#" />
          </Navbar.Container>
          <Navbar.Collapse collapseType="sidebar">
            <Navbar.Container tag="ul" className="flex flex-col gap-5">
              <Link to="/">
                <Navbar.Link linkName="PDF Books" href="#" />
              </Link>
              <Link to="/add-new-pdf">
                <Navbar.Link linkName="Add New PDF" />
              </Link>
              <Navbar.Link linkName="Users" href="#" />
            </Navbar.Container>
          </Navbar.Collapse>
        </Navbar.Container>

        <Navbar.Container className="flex gap-2">
          <Button size="sm" color="error" variant="outline" onClick={logOut}>
            Logout
          </Button>
          <Navbar.Toggle />
        </Navbar.Container>
      </Navbar.Container>
    </Navbar>
  );
};
