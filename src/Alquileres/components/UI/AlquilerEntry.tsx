import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { AlquilerSummaryItem } from "@/Alquileres/entities";
import { Card, Group, Stack, Text } from "@mantine/core";

export function AlquilerEntry({
  alquiler,
  dateRange,
  isSelected,
  onSelectAlquiler,
  onDeleteAlquiler,
}: {
  alquiler: AlquilerSummaryItem;
  dateRange: string;
  isSelected: boolean;
  onSelectAlquiler: () => void;
  onDeleteAlquiler: () => void;
}) {
  return (
    <Card
      key={alquiler.productora}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w="100%"
      maw="100%"
      onClick={onSelectAlquiler}
    >
      <Card.Section color="red" withBorder py="1rem">
        <Group justify="space-between" px="1rem" wrap="nowrap">
          <Group wrap="nowrap">
            {isSelected && <FontAwesomeIcon icon={faChevronRight} />}
            <Text fw={700}>{alquiler.proyecto}</Text>
          </Group>
          <FontAwesomeIcon icon={faTrash} onClick={onDeleteAlquiler} className="p-4" />
        </Group>
      </Card.Section>
      <Card.Section p="md">
        <Stack gap="0.5rem">
          <Text>{alquiler.productora}</Text>
          <Text>{dateRange}</Text>
          <Text>
            Cantidad de productos: <span className="font-semibold">{0}</span>
          </Text>
        </Stack>
      </Card.Section>
    </Card>
    // <div
    //   className={`
    //     flex flex-row shrink-0 border p-4 rounded-xl
    //     gap-4 shadow-md ${selectedClass} hover:cursor-pointer
    //     [transition:color_0.2s,transform_0.5s]
    //   `}
    // >
    //   <div
    //     key={alquiler.productora}
    //     className="flex flex-col font-body transition-colors duration-1000 grow"
    //     onClick={onSelectAlquiler}
    //   >
    //     <p className="text-2xl font-semibold">{alquiler.productora}</p>
    //     <p className="text-xl">{alquiler.proyecto}</p>
    //     <p className="italic">{dateRange}</p>
    //     <p>
    //       Cantidad de productos: <span className="font-semibold">{alquiler.totalProductos}</span>
    //     </p>
    //   </div>
    //   <div className="flex flex-col justify-center items-end">
    //     <FontAwesomeIcon icon={faTrash} onClick={onDeleteAlquiler} />
    //   </div>
    // </div>
  );
}
