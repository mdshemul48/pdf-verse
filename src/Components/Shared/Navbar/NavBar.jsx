import { Navbar, Button } from "keep-react";

export const NavbarComponent = () => {
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
            <Navbar.Link linkName="Home" />
            <Navbar.Link linkName="Projects" />
            <Navbar.Link linkName="About" />
          </Navbar.Container>
          <Navbar.Collapse collapseType="sidebar">
            <Navbar.Container tag="ul" className="flex flex-col gap-5">
              <Navbar.Link linkName="Home" />
              <Navbar.Link linkName="Projects" />
              <Navbar.Link linkName="Blogs" />
              <Navbar.Link linkName="News" />
              <Navbar.Link linkName="Resources" />
            </Navbar.Container>
          </Navbar.Collapse>
        </Navbar.Container>

        <Navbar.Container className="flex gap-2">
          <Button size="sm" color="error" variant="outline">
            Logout
          </Button>
          <Navbar.Toggle />
        </Navbar.Container>
      </Navbar.Container>
    </Navbar>
  );
};
