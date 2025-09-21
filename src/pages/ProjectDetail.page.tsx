import { useNavigate, Link, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Stack,
  Alert,
  Flex,
  Box,
  SimpleGrid,
  Card,
  Modal,
  ActionIcon,
  Group,
  Loader,
  Select,
  Table,
  Divider,
  Avatar,
  Badge,
} from "@mantine/core";
import DashboardLayout from "../layouts/Dashboard.layout";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight, IconEdit, IconTrash } from "@tabler/icons-react";
import { useForm, yupResolver } from "@mantine/form";
import { ProjectSchema } from "../types/auth";
import { createProjectSchema } from "../schemas/project.schema";
import {
  useCreateProject,
  useGetProjectMembers,
  useGetProjects,
  useGetProjectTasks,
  useUserInvite,
} from "../hooks/useProject";
import { use, useState } from "react";
import { startCase } from "lodash";
import { useGetUsers } from "../hooks/useAuth";
export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [modalName, setModalName] = useState("");
  const [opened, { open: openModal, close: closeModal }] = useDisclosure();
  const { data: users } = useGetUsers({ enable: opened });
  const {
    data: projectMembers,
    isLoading: projectMembersLoading,
    refetch: refetchProjectMember,
  } = useGetProjectMembers({
    project_id: parseInt(id || "0"),
    page: 1,
    per_page: 50,
  });

  const {
    data: projectTasks,
    isLoading: projectTasksLoading,
    refetch: refetchProjectTask,
  } = useGetProjectTasks({
    project_id: parseInt(id || "0"),
    page: 1,
    per_page: 50,
  });
  console.log(projectTasks, "projectTasks");

  const inviteForm = useForm<{
    user_id: number;
  }>({
    initialValues: {
      user_id: 0,
    },
    validate(values) {
      return {
        user_id: values.user_id ? null : "User is required",
      };
    },
  });
  const { mutate: invite, isPending: invitePending } = useUserInvite();
  console.log(users, "users");
  const handleInvite = (values: { user_id: number }) => {
    console.log(inviteForm.values, "inviteForm.values");
    try {
      const payload = {
        project_id: parseInt(id || "0"),
        user_id: values.user_id,
        role: "Member",
      };
      invite(payload);
      inviteForm.reset();
      closeModal();
      refetchProjectMember();
    } catch (error) {}
  };
  const handleRemoveMember = (id: number) => {
    console.log(id, "id");
  };
  return (
    <DashboardLayout page="Project Detail">
      <Box px={38} py={27} w={"100%"}>
        {projectMembersLoading ? (
          <Flex justify={"center"} align={"center"} mt={"lg"}>
            <Loader />
          </Flex>
        ) : (
          <Box>
            {/* Project Info Card */}
            {/* Project Info Card */}
            <Card shadow="sm" radius="md" withBorder mb="lg">
              <Flex justify="space-between" align="center">
                <Title order={3}>{projectMembers.data.name}</Title>
                <Button
                  size="xs"
                  onClick={() => {
                    setModalName("Invite Users");
                    openModal();
                  }}
                >
                  Invite Users
                </Button>
              </Flex>

              <Text size="sm" c="dimmed" mt="xs">
                {projectMembers.data.description}
              </Text>
              <Text size="xs" mt="md" fw={500}>
                Created at:{" "}
                {new Date(projectMembers.data.createdAt).toLocaleDateString()}
              </Text>
            </Card>

            {/* Members Table */}
            <Title order={4} mb="md">
              Project Members
            </Title>
            <Card shadow="sm" radius="md" withBorder>
              <Table highlightOnHover withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>User</Table.Th>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Role</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {projectMembers.data.projectMembers.map((member: any) => (
                    <Table.Tr key={member.id}>
                      <Table.Td>
                        <Group>
                          <Avatar color="blue" radius="xl">
                            {/* < size={16} /> */}
                          </Avatar>
                          <Text>
                            {member.userInfo.firstName}{" "}
                            {member.userInfo.lastName}
                          </Text>
                        </Group>
                      </Table.Td>
                      <Table.Td>{member.userInfo.email}</Table.Td>
                      <Table.Td>{member.role}</Table.Td>
                      <Table.Td>
                        {member.role === "Member" && (
                          <Button
                            size="xs"
                            color="red"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            Remove
                          </Button>
                        )}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Card>
            <Title order={4} mt="lg">
              Project Tasks
            </Title>
            <Flex direction="column" gap="md" mt="lg">
              {projectTasks?.data?.tasks?.map((task: any) => (
                <Card
                  key={task.id}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                >
                  <Flex justify="space-between" align="center" mb="sm">
                    <Title order={4}>{task.title}</Title>
                    <Badge
                      color={
                        task.status === "Todo"
                          ? "blue"
                          : task.status === "InProgress"
                          ? "yellow"
                          : "green"
                      }
                      variant="light"
                    >
                      {task.status}
                    </Badge>
                  </Flex>

                  <Text size="sm" c="dimmed" mb="xs">
                    {task.description}
                  </Text>

                  <Text size="xs" c="dimmed">
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                  </Text>

                  <Group mt="md" gap="sm">
                    <Button
                      size="xs"
                      variant="light"
                      color="blue"
                      leftSection={<IconEdit size={16} />}
                    >
                      Update Status
                    </Button>
                    <Button
                      size="xs"
                      variant="light"
                      color="red"
                      leftSection={<IconTrash size={16} />}
                    >
                      Delete Task
                    </Button>
                  </Group>
                </Card>
              ))}
            </Flex>
          </Box>
        )}
      </Box>
      <Modal
        opened={opened}
        onClose={closeModal}
        title={<Title order={5}>{modalName && startCase(modalName)}</Title>}
        styles={{
          header: {
            backgroundColor: "#e9edf1ff",
          },
        }}
      >
        <form onSubmit={inviteForm.onSubmit(handleInvite)}>
          <Stack gap="md" mt={"md"}>
            <Select
              placeholder="Select User"
              data={users?.data || []}
              {...inviteForm.getInputProps("user_id")}
            />
            <Flex justify={"center"}>
              <Button type="submit" loading={invitePending}>
                Invite User
              </Button>
            </Flex>
          </Stack>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
