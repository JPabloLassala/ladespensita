import { Button, Group } from "@mantine/core";

export function AccountHeader() {
  return (
    <Group>
      <Button variant="light" color="gray">
        Log in
      </Button>
      <Button variant="filled" color="black">
        Sign up
      </Button>
    </Group>
  );
}
