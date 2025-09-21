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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle } from "@tabler/icons-react";
import { useSignup } from "../hooks/useAuth";
import { SignupCredentials } from "../types/auth";
import GuestLayout from "../layouts/GuestLayout";

export default function Signup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending, error } = useSignup();

  const form = useForm<SignupCredentials>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      firstName: (value) =>
        value.length < 2 ? "First name must be at least 2 characters" : null,
      lastName: (value) =>
        value.length < 2 ? "Last name must be at least 2 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = (values: SignupCredentials) => {
    signup(values, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <GuestLayout>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
         <Title ta="center" fw={900}>
          Sign Up
        </Title>
         <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?
          <Anchor component={Link} to="/login">
            Sign In
          </Anchor>
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="First Name"
              placeholder="John"
              required
              {...form.getInputProps("firstName")}
            />

            <TextInput
              label="Last Name"
              placeholder="Doe"
              required
              {...form.getInputProps("lastName")}
            />

            <TextInput
              label="Email"
              placeholder="your@email.com"
              required
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              {...form.getInputProps("password")}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Your password"
              required
              {...form.getInputProps("confirmPassword")}
            />
            <Button
              type="submit"
              fullWidth
              loading={isPending}
              disabled={isPending}
            >
              Create Account
            </Button>
          </Stack>
        </form>
      </Paper>
    </GuestLayout>
  );
}
