import { useNavigate, Link } from "react-router-dom";
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
} from "@mantine/core";
import DashboardLayout from "../layouts/Dashboard.layout";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { useForm, yupResolver } from "@mantine/form";
import { ProjectSchema } from "../types/auth";
import { createProjectSchema } from "../schemas/project.schema";
import { useCreateProject, useGetProjects } from "../hooks/useProject";
import { useState } from "react";
export default function Projects() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [opened, { open, close }] = useDisclosure();
  const { mutate: createProject, isPending } = useCreateProject();
  const { data, isLoading } = useGetProjects({ page: 1, per_page: 50 });

  const form = useForm<ProjectSchema>({
    initialValues: {
      name: "",
      description: "",
    },
    validate: yupResolver(createProjectSchema),
  });
  const handleSubmit = (values: ProjectSchema) => {
    try {
      createProject(values);
      form.reset();
      close();
    } catch (error) {}
  };
  return (
    <DashboardLayout page="Projects">
      <Box px={38} py={27} w={"100%"}>
        <Flex justify="end" align="center" gap={10} mb={24}>
          <Button
            id="masters-doctype-create-btn"
            onClick={() => {
              open();
            }}
          >
            Create Project
          </Button>
        </Flex>
        {isLoading ? (
          <Flex>
            <Loader />
          </Flex>
        ) : (
          <SimpleGrid cols={3} spacing="md">
            {data?.data?.records.map((i: any) => (
              <Card withBorder shadow="md">
                <Group justify="space-between">
                  <Text>{i.name}</Text>
                  <ActionIcon
                    onClick={() => navigate(`/project/${i.id}`)}
                    variant="transparent"
                  >
                    <IconChevronRight width={16} height={16} />
                  </ActionIcon>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Box>
      <Modal
        opened={opened}
        onClose={close}
        title="Create Project"
        styles={{
          header: {
            backgroundColor: "#e9edf1ff",
          },
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              placeholder="Project Title"
              label="Project Title"
              {...form.getInputProps("name")}
            />
            <TextInput
              placeholder="Project Description"
              label="Project Description"
              {...form.getInputProps("description")}
            />
            <Flex justify="center">
              <Button type="submit" loading={isPending}>
                Submit
              </Button>
            </Flex>
          </Stack>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
