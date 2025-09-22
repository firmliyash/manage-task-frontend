import {
  TextInput,
  Button,
  Text,
  Stack,
  Flex,
  Box,
  SimpleGrid,
  Modal,
  Loader,
  Select,
} from "@mantine/core";
import DashboardLayout from "../layouts/Dashboard.layout";
import { useDisclosure } from "@mantine/hooks";
import { useForm, yupResolver } from "@mantine/form";
import { CreateTaskSchema } from "../types/auth";
import {
  useCreateTask,
  useDeleteTask,
  useGetMyTasks,
  useTaskStatusUpdate,
} from "../hooks/useTask";
import { createTaskSchema } from "../schemas/task.schema";
import {
  useGetProjectDropdown,
  useGetDropdownProjectMembers,
} from "../hooks/useProject";
import { DatePickerInput } from "@mantine/dates";
import { TaskCard } from "../components/Task.component";
import { useState } from "react";
import { startCase } from "lodash";
export default function Tasks() {
  const [opened, { open, close }] = useDisclosure();
  const { mutate: createTask, isPending } = useCreateTask();
  const [selectedTask, setSeletedTask] = useState<number>(0);
  const [modalType, setModalType] = useState("Update");
  const [taskStatus, setTaskStatus] = useState<"In-Progress" | "Done">(
    "In-Progress"
  );
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure();
  const { data, isLoading } = useGetMyTasks({ page: 1, per_page: 50 });
  const { data: projectDropdown, isLoading: projectDropdownLoading } =
    useGetProjectDropdown({
      enable: opened,
    });
  const { mutate: deleteTask, isPending: deleteTaskPending } = useDeleteTask();
  const { mutate: updateTaskStatus, isPending: updateTaskStatusPending } =
    useTaskStatusUpdate();

  const form = useForm<CreateTaskSchema>({
    initialValues: {
      project_id: 0,
      title: "",
      description: "",
      assigned_to: 0,
      deadline: "",
    },
    validate: yupResolver(createTaskSchema),
  });

  const { data: projectMembers } = useGetDropdownProjectMembers({
    project_id: form.values.project_id,
  });

  const handleSubmit = (values: CreateTaskSchema) => {
    try {
      createTask(values);
      form.reset();
      close();
    } catch (error) {}
  };
  const handleDeleteTask = async () => {
    try {
      deleteTask({ id: selectedTask });
      closeModal();
      setSeletedTask(0);
      setModalType("Update");
    } catch (error) {}
  };
  const handleTaskStatusUpdate = async () => {
    try {
      updateTaskStatus({ id: selectedTask, status: taskStatus });

      closeModal();
      setSeletedTask(0);
      setModalType("Update");
    } catch (error) {}
  };
  return (
    <DashboardLayout page="Tasks">
      <Box px={38} py={27} w={"100%"}>
        <Flex justify="end" align="center" gap={10} mb={24}>
          <Button
            id="masters-doctype-create-btn"
            onClick={() => {
              open();
            }}
          >
            Create new Task
          </Button>
        </Flex>
        {isLoading ? (
          <Flex>
            <Loader />
          </Flex>
        ) : data?.data?.records.length > 0 ? (
          <SimpleGrid cols={3} spacing="md">
            {data?.data?.records.map((task: any) => (
              <TaskCard
                task={task}
                onStatusUpdate={(id) => {
                  setSeletedTask(id);
                  setModalType("update");
                  openModal();
                  // Call API here
                }}
                onDelete={(id) => {
                  setSeletedTask(id);
                  setModalType("delete");
                  openModal();
                  // Call API here
                }}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Flex mt={20} justify="center">
            <Text>No Tasks Found</Text>
          </Flex>
        )}
      </Box>
      <Modal
        opened={opened}
        onClose={close}
        title="Create Task"
        styles={{
          header: {
            backgroundColor: "#e9edf1ff",
          },
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Title"
              placeholder="Title"
              {...form.getInputProps("title")}
            />
            <TextInput
              label="Description"
              placeholder="Description"
              {...form.getInputProps("description")}
            />
            <Select
              label="Project"
              placeholder="Project"
              {...form.getInputProps("project_id")}
              data={projectDropdown?.data || []}
            />
            <Select
              label="Assigned to"
              placeholder="Assigned to"
              {...form.getInputProps("assigned_to")}
              data={projectMembers?.data || []}
            />
            <DatePickerInput
              label="Deadline"
              placeholder="Deadline"
              {...form.getInputProps("deadline")}
            />
            <Flex justify="center">
              <Button type="submit" loading={isPending}>
                Submit
              </Button>
            </Flex>
          </Stack>
        </form>
      </Modal>
      <Modal
        opened={modalOpened}
        onClose={() => {
          closeModal();
          setSeletedTask(0);
          setModalType("Update");
        }}
        title={`${startCase(modalType)} Task`}
        styles={{
          header: {
            backgroundColor: "#e9edf1ff",
          },
        }}
      >
        {modalType === "update" ? (
          <Stack>
            <Select
              label="Status"
              placeholder="Status"
              data={[
                { value: "In-Progress", label: "In-Progress" },
                { value: "Done", label: "Done" },
              ]}
              onChange={(value: any) => {
                if (!value) return;
                setTaskStatus(value);
              }}
            />
            <Flex justify="center">
              <Button
                loading={updateTaskStatusPending}
                onClick={handleTaskStatusUpdate}
              >
                Update
              </Button>
            </Flex>
          </Stack>
        ) : (
          <Stack mt={"md"}>
            <Text>Are you sure you want to delete this task?</Text>
            <Flex justify="center">
              <Button loading={deleteTaskPending} onClick={handleDeleteTask}>
                Yes
              </Button>
            </Flex>
          </Stack>
        )}
      </Modal>
    </DashboardLayout>
  );
}
