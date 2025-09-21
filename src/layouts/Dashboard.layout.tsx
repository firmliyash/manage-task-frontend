import {
  AppShell,
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  MantineProvider,
  Menu,
  Paper,
  rem,
  Skeleton,
  Stack,
  Title,
} from "@mantine/core";
import { theme } from "../App";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { DatesProvider } from "@mantine/dates";
import { useAppSelector } from "../hooks/redux";
import { useLogout } from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { startCase } from "lodash";
export default function DashboardLayout({
  children,
  page,
}: {
  children: React.ReactNode;
  page: string;
}) {
  const { user } = useAppSelector((state) => state.auth);
  const { mutate: logout, isPending: logoutPending } = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    
    <DatesProvider settings={{}}>
      <ModalsProvider>
        <AppShell
          layout="alt"
          header={{ height: { base: 70, md: 90 } }}
          navbar={{
            width: 280,
            breakpoint: "sm",
          }}
          padding="0"
          bg="transparent"
        >
          <AppShell.Header bg="#1c3363ff" withBorder={true}>
            <Flex
              bg="#FFF"
              justify="space-between"
              align="center"
              px={{
                base: 16,
                md: 38,
              }}
              h={{ base: 70, md: 90 }}
            >
              <Title order={1} fz={26} fw={700}>
                {page}
              </Title>
              <Menu shadow="md" width={200} closeOnItemClick={false}>
                <Menu.Target>
                  <Flex
                    gap={12}
                    align="center"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <Avatar src={user?.firstName} size={32}>
                      {user?.firstName.charAt(0)}
                    </Avatar>
                    <Text>{user?.firstName} {user?.lastName}</Text>
                  </Flex>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>
          </AppShell.Header>
          <AppShell.Navbar
            p={0}
            style={{ transition: "all 0.5s ease-in-out" }}
            bg="#0E1D3E"
            withBorder={false}
          >
            <Box my={28} mx={23}>
              <Title ta={"center"} order={2} fw={700} c="#FFF">
                TaskManager
              </Title>
            </Box>
            <Stack className="scrollbar-change" gap={5}>
              {["Dashboard", "Projects", "my-tasks"].map((item) => (
                <NavLink to={`/${item.toLowerCase()}`} key={item}>
                  <Button color="#182e5fff" radius="xl" size="md" fullWidth>
                    {startCase(item)}
                  </Button>
                </NavLink>
              ))}
            </Stack>
          </AppShell.Navbar>
          <AppShell.Main bg="#F1F3F4">{children}</AppShell.Main>
        </AppShell>
      </ModalsProvider>
    </DatesProvider>
  );
}
