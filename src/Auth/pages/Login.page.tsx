import { useSessionAdapter } from "@/Common";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  Button,
  Center,
  Divider,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [isErrorShown, setIsErrorShown] = useState(false);
  const { login, error, isLoggedIn } = useSessionAdapter();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      user: "",
      password: "",
    },
  });

  const handleLogin = ({ user, password }: { user: string; password: string }) => {
    login(user, password);
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log("logged in");
      return navigate("/productos");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (error) {
      setIsErrorShown(true);
    }
  }, [error]);

  return (
    <form onSubmit={form.onSubmit(handleLogin)}>
      <Center>
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" fw={500}>
            Login
          </Text>
          <Divider labelPosition="center" my="lg" />
          <Stack>
            <TextInput
              label="User"
              placeholder="hola@gmail.com"
              value={form.values.user}
              onChange={(event) => form.setFieldValue("user", event.currentTarget.value)}
              radius="md"
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
              radius="md"
            />
          </Stack>
          <Stack justify="center" align="center" mt="xl">
            {(error && isErrorShown) === true && (
              <Alert
                variant="light"
                color="red"
                title="Error"
                withCloseButton
                icon={<FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>}
                onClick={() => setIsErrorShown(false)}
              >
                {error}
              </Alert>
            )}
            <Button type="submit" radius="md">
              Login
            </Button>
          </Stack>
        </Paper>
      </Center>
    </form>
  );
}
