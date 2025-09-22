import {
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Paper,
  Text,
  Anchor,
  rem,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { LoginCredentials } from "../types/auth";
import { loginSchema } from "../schemas/login.schema";
import GuestLayout from "../layouts/GuestLayout";

export default function Login() {
  const navigate = useNavigate();
  const { mutate: login, isPending, error } = useLogin();

  const form = useForm<LoginCredentials>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(loginSchema),
  });

  const handleSubmit = (values: LoginCredentials) => {
    login(values, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  };

  return (
    <GuestLayout>
      <Paper
        radius="md"
        p="xl"
        withBorder
        shadow="xl"
        style={{ maxWidth: rem(400), width: "100%" }}
      >
        <Title ta="center" fw={900}>
          Login
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Email"
              placeholder="your@email.com"
              size="md"
              radius="md"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              size="md"
              radius="md"
              {...form.getInputProps("password")}
            />

            <Button type="submit" fullWidth size="md" loading={isPending}>
              Sign in
            </Button>
          </Stack>
        </form>

        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Don’t have an account?{" "}
          <Anchor component={Link} to="/signup">
            Sign up
          </Anchor>
        </Text>
      </Paper>
    </GuestLayout>
  );
}
