import {
  Gear,
  List,
  MagnifyingGlass,
  FilePdf,
  SignIn,
  Users,
} from "phosphor-react";
import { Button, Icon, Input, Sidebar, Typography } from "keep-react";

export const SideBar = () => {
  return (
    <Sidebar className="h-svh">
      <Sidebar.Header className="space-y-2.5">
        <div className="flex items-center justify-between">
          <Typography
            variant="heading-5"
            className="font-bold text-primary-500"
          >
            PDF Verse
          </Typography>
          <Button
            variant="outline"
            shape="icon"
            color="primary"
            className="border-none"
          >
            <List size={24} />
          </Button>
        </div>
        <div>
          <fieldset className="relative max-w-md">
            <Input placeholder="Search here" className="ps-11" />
            <Icon>
              <MagnifyingGlass size={18} color="#AFBACA" />
            </Icon>
          </fieldset>
        </div>
      </Sidebar.Header>
      <Sidebar.Body>
        <Sidebar.Item>
          <FilePdf size={24} />
          Pdf Books
        </Sidebar.Item>

        <Sidebar.Item>
          <Gear size={24} />
          Settings
        </Sidebar.Item>
        <Sidebar.Item>
          <Users size={24} />
          Users
        </Sidebar.Item>
        <Sidebar.Item>
          <SignIn size={24} />
          Log Out
        </Sidebar.Item>
      </Sidebar.Body>
      <div className="absolute bottom-2">
        <Sidebar.Footer className="flex items-center gap-2">
          <div>
            <Typography
              variant="p"
              className="mb-0 text-body-3 font-medium text-metal-600"
            >
              MD. Shimul
            </Typography>
            <Typography
              variant="p"
              className="text-body-4 font-normal text-metal-400"
            >
              Web Developer
            </Typography>
          </div>
        </Sidebar.Footer>
      </div>
    </Sidebar>
  );
};
