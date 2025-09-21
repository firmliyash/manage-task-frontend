import {
  Container,
  Title,
  Text,
  Button,
  Card,
  Group,
  Stack,
  Badge,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useLogout } from "../hooks/useAuth";
import { useAppSelector } from "../hooks/redux";
import DashboardLayout from "../layouts/Dashboard.layout";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css"; 

export default function Dashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const { mutate: logout, isPending: logoutPending } = useLogout();
  return (
    <DashboardLayout page="Dashboard">
      <Container size="md" py="xl">
        <Stack gap="md">
          <Card withBorder radius="md" p="xl">
            <Stack gap="sm">
              <Title order={3}>Welcome to Task Manager</Title>
              <Text c="dimmed">
                This is your dashboard. You can manage your tasks and projects
                from here. More features will be added soon!
              </Text>
            </Stack>
          </Card>
          <Card withBorder radius="md" p="xl">
            <Stack gap="sm">
              <Title order={3}>User Information</Title>
              <Group>
                <Text fw={500}>Name:</Text>
                <Text>
                  {user?.firstName} {user?.lastName}
                </Text>
              </Group>
              <Group>
                <Text fw={500}>Email:</Text>
                <Text>{user?.email}</Text>
              </Group>
              <Group>
                <Text fw={500}>Role:</Text>
                <Badge
                  color={user?.role === "admin" ? "red" : "blue"}
                  variant="filled"
                >
                  {user?.role}
                </Badge>
              </Group>
              <Group>
                <Text fw={500}>User ID:</Text>
                <Text>{user?.id}</Text>
              </Group>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </DashboardLayout>
  );
}
