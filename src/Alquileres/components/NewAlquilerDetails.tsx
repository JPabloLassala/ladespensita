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
import { useEffect, useState } from "react";
import { useAlquilerContext } from "../stores";
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
  onCreateAlquiler: (a: AlquilerCreate, p: AlquilerProductoCreate[]) => void;
}) {
  const { productos } = useProductosContext();
  const { setNewAlquiler } = useAlquilerContext();
  const { sendGetStock, stockData } = useAlquilerProductoRepository();
  const [nameFilter, setNameFilter] = useState("");
  const [selectedProducto, setSelectedProducto] = useState<
    AlquilerProductoCreate | AlquilerProductoUpdate | AlquilerProductoEntity | undefined
  >(undefined);
  const [datesTouched, setDatesTouched] = useState<{ inicio: boolean; fin: boolean }>({
    inicio: false,
    fin: false,
  });

  const form = useForm<AlquilerCreate & { fechas: (Date | null)[] }>({
    initialValues: {
      productora: "Nueva productora",
      proyecto: "Nuevo proyecto",
      status: ALQUILER_STATUS.PENDING,
      fechaInicio: null,
      fechaFin: null,
      fechas: [null, null],
      fechaPresupuesto: new Date(),
    },
    onValuesChange: (values) => {
      setDatesTouched({
        inicio: values.fechas[0] !== null,
        fin: values.fechas[1] !== null,
      });

      setNewAlquiler(values);
    },
  });

  useEffect(() => {
    if (!datesTouched.inicio || !datesTouched.fin) return;

    sendGetStock(form.values.fechaInicio!, form.values.fechaFin!);
    setDatesTouched({ inicio: false, fin: false });
  }, [datesTouched]);

  const productosForm = useForm<{ productos: Record<number, AlquilerProductoCreate> }>({
    initialValues: { productos: {} },
  });

  const handleCreateAlquiler = (e: React.FormEvent) => {
    e.preventDefault();
    const alquilerProductos = Object.values(productosForm.values.productos).filter(
      (ap) => ap.cantidad! > 0,
    );

    onCreateAlquiler(form.values, alquilerProductos);
  };

  function handleSelectProducto(producto: ProductoEntity) {
    if (selectedProducto?.productoId === producto.id) return;
    const alquilerProducto = productosForm.values.productos[producto.id];
    setSelectedProducto(alquilerProducto);
  }

  const filteredProductos = productos
    .filter((producto) => {
      if (nameFilter === "") return true;
      return producto.nombre.toLowerCase().includes(nameFilter.toLowerCase());
    })
    .map((producto, index) => {
      const remaining = stockData?.find((s) => s.productoId === producto.id)?.remaining || "-";
      return (
        <AlquilerProductoItem
          key={producto.id}
          producto={producto}
          form={productosForm}
          isSelected={selectedProducto?.productoId === producto.id}
          onSelectProducto={() => handleSelectProducto(producto)}
          remaining={remaining}
          tabIndex={index + 3}
        />
      );
    });

  return (
    <Stack component="div" h="100%" mih="100%" w="100%" id="alquiler-details-outer-flex">
      <Title order={2}>Detalle</Title>
      <form
        id="alquiler-details-form"
        style={{ height: "100%", overflowY: "auto" }}
        onSubmit={handleCreateAlquiler}
      >
        <Group component="div" h="100%" style={{ overflowY: "auto" }} align="flex-start" gap="md">
          <Stack component="div" mih="100%" h="100%" id="alquiler-details-inner-flex" gap="md">
            <AlquilerDetailsForm form={form} />
            <TextInput
              onChange={(event) => setNameFilter(event.currentTarget.value)}
              value={nameFilter}
              placeholder="Buscar producto..."
              radius="md"
              rightSection={<FontAwesomeIcon icon={faClose} onClick={() => setNameFilter("")} />}
              leftSection={<FontAwesomeIcon icon={faSearch} />}
            />
            <AlquilerProductosScrollContainer>{filteredProductos}</AlquilerProductosScrollContainer>
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
