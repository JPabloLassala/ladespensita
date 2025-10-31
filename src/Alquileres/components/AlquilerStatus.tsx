import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { ALQUILER_STATUS, AlquilerEntity } from "../entities";

export const AlquilerStatus = ({
  alquiler,
  onChangeStatus,
}: {
  alquiler: AlquilerEntity;
  onChangeStatus: (id: number, status: ALQUILER_STATUS) => void;
}) => {
  const getBadgeColor = (status: ALQUILER_STATUS) => {
    switch (status) {
      case ALQUILER_STATUS.PENDING:
        return "gray";
      case ALQUILER_STATUS.ACTIVE:
        return "blue";
      case ALQUILER_STATUS.COMPLETED:
        return "green";
      case ALQUILER_STATUS.CANCELLED:
        return "red";
    }
  };

  return (
    <Stack>
      <Group component="div">
        <Text>Status</Text>
        <Button style={{ textTransform: "capitalize" }} color={getBadgeColor(alquiler.status)}>
          {alquiler.status}
        </Button>
      </Group>
      <Group>
        <Text>Change to</Text>
        {Object.values(ALQUILER_STATUS)
          .filter((status) => status !== alquiler.status)
          .map((status) => {
            console.log("get", status);
            return (
              <Button
                key={status}
                style={{ textTransform: "capitalize" }}
                color={getBadgeColor(status)}
                onClick={() => onChangeStatus(alquiler.id, status)}
              >
                {status}
              </Button>
            );
          })}
      </Group>
    </Stack>
  );
};
