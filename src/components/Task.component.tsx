import { Card, Text, Group, Badge, ActionIcon, Stack } from "@mantine/core";
import { IconPencil, IconRefresh, IconTrash } from "@tabler/icons-react";

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    status: string;
    deadline: string;
    Project: { id: number; name: string };
  };
  onStatusUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TaskCard({ task, onStatusUpdate, onDelete }: TaskCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="sm">
        <Text fw={600}>{task.title}</Text>
        <Badge color={task.status === "Todo" ? "red" : "green"}>
          {task.status}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed" mb="sm">
        {task.description}
      </Text>

      {/* <Group justify="space-between" align="center"> */}
      <Text size="sm" fw={500}>
        Project: {task.Project?.name}
      </Text>
      <Text size="xs" c="dimmed">
        Deadline: {new Date(task.deadline).toLocaleDateString()}
      </Text>
      {/* </Group> */}

      <Group justify="flex-end" mt="md" gap="xs">
        {/* Update status icon */}
        <ActionIcon
          variant="light"
          color="blue"
          onClick={() => onStatusUpdate(task.id)}
          title="Update status"
        >
          <IconRefresh size={18} />
        </ActionIcon>

        {/* Delete task icon */}
        <ActionIcon
          variant="light"
          color="red"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
