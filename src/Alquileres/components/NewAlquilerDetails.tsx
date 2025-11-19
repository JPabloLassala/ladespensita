import {
  ALQUILER_STATUS,
  AlquilerCreate,
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
} from "@/Alquileres/entities";
import { ProductoEntity, useProductosContext } from "@/Productos";
import { Button, Group, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAlquilerContext, useAlquilerProductoContext } from "../stores";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { AlquilerProductoItem } from "./AlquilerProductoItem";
import { AlquilerProductosScrollContainer } from "./UI";
import { useAlquilerProductoRepository } from "../repository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";

export function NewAlquilerDetails({
  onCreateAlquiler,
}: {
  onCreateAlquiler: (a: AlquilerCreate) => void;
}) {
  const { productos } = useProductosContext();
  const { newAlquiler, setNewAlquiler } = useAlquilerContext();
  const { selectedAlquiler } = useAlquilerContext();
  const { createEmptyAlquilerProducto, alquilerProductos, setAlquilerProductos } =
    useAlquilerProductoContext();
  const { sendGetStock, stockData } = useAlquilerProductoRepository();
  const [nameFilter, setNameFilter] = useState("");
  const [selectedProducto, setSelectedProducto] = useState<
    AlquilerProductoCreate | AlquilerProductoUpdate | AlquilerProductoEntity | undefined
  >(undefined);
  const [datesTouched, setDatesTouched] = useState<{ inicio: boolean; fin: boolean }>({
    inicio: false,
    fin: false,
  });

  useEffect(() => {
    setAlquilerProductos(productos.map((producto) => createEmptyAlquilerProducto(producto)));
  }, [productos]);

  useEffect(() => {
    if (!datesTouched.inicio || !datesTouched.fin) return;

    sendGetStock(newAlquiler?.fechaInicio!, newAlquiler?.fechaFin!);
    setDatesTouched({ inicio: false, fin: false });
  }, [datesTouched]);

  const form = useForm<
    Omit<AlquilerCreate, "fechaInicio" | "fechaFin"> & { fechas: (Date | null)[] }
  >({
    initialValues: {
      productora: newAlquiler?.productora!,
      proyecto: newAlquiler?.proyecto!,
      status: ALQUILER_STATUS.PENDING,
      fechas: [null, null],
      fechaPresupuesto: newAlquiler?.fechaPresupuesto || new Date(),
    },
    onValuesChange: (values) => {
      const newAlquilerValues = {
        ...selectedAlquiler,
        ...values,
        fechaInicio: values.fechas[0] ? dayjs(values.fechas[0]).startOf("day").toDate() : null,
        fechaFin: values.fechas[1] ? dayjs(values.fechas[1]).startOf("day").toDate() : null,
      };

      setNewAlquiler(newAlquilerValues);
    },
  });
  const productosForm = useForm<{ productos: Record<number, AlquilerProductoCreate> }>({
    initialValues: { productos: {} },
    onValuesChange: (values) => {
      setAlquilerProductos((prev) => {
        return prev.map((ap) => {
          const updated = values.productos[ap.productoId];
          return updated ? { ...ap, ...updated } : ap;
        });
      });
    },
  });

  const handleCreateAlquiler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlquiler) return;

    onCreateAlquiler(newAlquiler);
  };

  function handleSelectProducto(producto: ProductoEntity) {
    if (selectedProducto?.productoId === producto.id) return;
    const alquilerProducto = alquilerProductos?.find((p) => p.productoId === producto.id);
    setSelectedProducto(alquilerProducto);
  }

  console.log("asdasd", alquilerProductos);

  const filteredProductos = productos.filter((producto) => {
    if (nameFilter === "") return true;
    return producto.nombre.toLowerCase().includes(nameFilter.toLowerCase());
  });

  return (
    <Stack component="div" h="100%" mih="100%" id="alquiler-details-outer-flex">
      <Title order={2}>Detalle</Title>
      <form
        id="alquiler-details-form"
        style={{ height: "100%", overflowY: "auto" }}
        onSubmit={handleCreateAlquiler}
      >
        <Group component="div" h="100%" style={{ overflowY: "auto" }} align="flex-start" gap="md">
          <Stack component="div" mih="100%" h="100%" id="alquiler-details-inner-flex" gap="md">
            <AlquilerDetailsForm form={form} setDatesTouched={setDatesTouched} />
            <TextInput
              onChange={(event) => setNameFilter(event.currentTarget.value)}
              value={nameFilter}
              placeholder="Buscar producto..."
              radius="md"
              rightSection={<FontAwesomeIcon icon={faClose} onClick={() => setNameFilter("")} />}
              leftSection={<FontAwesomeIcon icon={faSearch} />}
            />
            <AlquilerProductosScrollContainer>
              {filteredProductos.map((producto, index) => {
                const remaining =
                  stockData?.find((s) => s.productoId === producto.id)?.remaining || "-";
                return (
                  <AlquilerProductoItem
                    key={producto.id}
                    producto={producto}
                    isSelected={selectedProducto?.productoId === producto.id}
                    productosForm={productosForm}
                    onSelectProducto={() => handleSelectProducto(producto)}
                    remaining={remaining}
                    tabIndex={index + 3}
                  />
                );
              })}
            </AlquilerProductosScrollContainer>
            <Group mb="1rem">
              <Button type="submit" color="blue" size="lg">
                Guardar
              </Button>
              <Button type="button" color="red" size="lg">
                Cancelar
              </Button>
            </Group>
          </Stack>
          {selectedProducto && (
            <AlquilerProductoDetails selected={selectedProducto} form={productosForm} />
          )}
        </Group>
      </form>
    </Stack>
  );
}
