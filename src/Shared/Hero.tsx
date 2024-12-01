import { Avatar, Group, Text } from "@mantine/core";
import logo from "/ladespenlogo.png";

export function Hero() {
  return (
    <Group h="100%">
      <Avatar src={logo} alt="La Despencita" h="80%" w="auto" />
      <Text fw={500}>La Despensita</Text>
    </Group>
  );
}
