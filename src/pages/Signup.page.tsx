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
import { useForm, yupResolver } from "@mantine/form";
import { IconInfoCircle } from "@tabler/icons-react";
import { useSignup } from "../hooks/useAuth";
import { SignupCredentials } from "../types/auth";
import GuestLayout from "../layouts/GuestLayout";
import { signupSchema } from "../schemas/signup.schema";

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
    validate: yupResolver(signupSchema),
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
              {...form.getInputProps("firstName")}
            />

            <TextInput
              label="Last Name"
              placeholder="Doe"
              {...form.getInputProps("lastName")}
            />

            <TextInput
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Your password"
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
