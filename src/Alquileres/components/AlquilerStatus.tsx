import { Badge, Button, Group, Stack, StackProps, Text, Title } from "@mantine/core";
import { ALQUILER_STATUS, AlquilerEntity } from "../entities";
import { APP_STATE, useAppStateContext } from "@/Common";

export const AlquilerStatus = ({
  alquiler,
  onChangeStatus,
  ...props
}: {
  alquiler: AlquilerEntity;
  onChangeStatus: (id: number, status: ALQUILER_STATUS) => void;
} & StackProps) => {
  const { appState } = useAppStateContext();
  const getBadgeColor = (status: ALQUILER_STATUS) => {
    switch (status) {
      case ALQUILER_STATUS.PENDING:
        return "gray";
      case ALQUILER_STATUS.BUDGETED:
        return "orange";
      case ALQUILER_STATUS.ACTIVE:
        return "blue";
      case ALQUILER_STATUS.COMPLETED:
        return "green";
      case ALQUILER_STATUS.CANCELLED:
        return "red";
    }
  };

  return (
    <Stack {...props}>
      <Group component="div">
        <Text>Status</Text>
        <Badge
          size="lg"
          style={{ textTransform: "uppercase" }}
          color={getBadgeColor(alquiler.status)}
        >
          {alquiler.status}
        </Badge>
      </Group>
      <Group>
        <Text>Change to</Text>
        {Object.values(ALQUILER_STATUS)
          .filter((status) => status !== alquiler.status)
          .map((status) => (
            <Button
              key={status}
              disabled={appState === APP_STATE.loading}
              style={{ textTransform: "capitalize" }}
              color={getBadgeColor(status)}
              onClick={() => onChangeStatus(alquiler.id, status)}
            >
              {status}
            </Button>
          ))}
      </Group>
    </Stack>
  );
};
