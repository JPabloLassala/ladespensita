import {
  ALQUILER_STATUS,
  AlquilerCreate,
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
} from "@/Alquileres/entities";
import { ProductoEntity, useProductosContext } from "@/Productos";
import { Button, Checkbox, Group, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAlquilerContext, useAlquilerProductoContext } from "../stores";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { AlquilerProductoItem } from "./AlquilerProductoItem";
import { AlquilerProductosScrollContainer } from "./UI";
import { useAlquilerProductoRepository } from "../repository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { AlquilerDetailsDates } from "./AlquilerDetailsDates";
import { AlquilerTotalPrice } from "./AlquilerTotalPrice";

export function NewAlquilerDetails({
  onCreateAlquiler,
}: {
  onCreateAlquiler: (a: AlquilerCreate, p: AlquilerProductoCreate[]) => void;
}) {
  const { productos } = useProductosContext();
  const { setNewAlquiler } = useAlquilerContext();
  const { createEmptyAlquilerProducto } = useAlquilerProductoContext();
  const { sendGetStock, stockData } = useAlquilerProductoRepository();
  const [nameFilter, setNameFilter] = useState("");
  const [hideZero, setHideZero] = useState(false);
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
    validate: {
      fechas: (value) => {
        console.log("value", value);
        if (!value[0] || !value[1]) return "Debe seleccionar una fecha de inicio y fin";
        if (dayjs(value[0]).isAfter(dayjs(value[1])))
          return "La fecha de inicio debe ser anterior a la de fin";
        return null;
      },
      productora: (value) => {
        if (value.trim().length === 0) return "La productora es requerida";
        if (value.trim() === "Nueva productora") return "Debe ingresar una productora válida";
        return null;
      },
      proyecto: (value) => {
        if (value.trim().length === 0) return "El proyecto es requerido";
        if (value.trim() === "Nuevo proyecto") return "Debe ingresar un proyecto válido";
        return null;
      },
    },
  });

  useEffect(() => {
    if (!datesTouched.inicio || !datesTouched.fin) return;

    sendGetStock(form.values.fechaInicio!, form.values.fechaFin!);
    setDatesTouched({ inicio: false, fin: false });
  }, [datesTouched]);

  const productosForm = useForm<{ productos: Record<number, AlquilerProductoCreate> }>({
    initialValues: {
      productos: productos.reduce(
        (acc, producto) => {
          acc[producto.id] = {
            ...createEmptyAlquilerProducto(producto),
            productoId: producto.id,
            cantidad: 0,
            precioFinal: 0,
          };
          return acc;
        },
        {} as Record<number, AlquilerProductoCreate>,
      ),
    },
    validate: (values) => {
      const productosValues = Object.values(values.productos);
      const hasQuantity = productosValues.some((producto) => (producto.cantidad ?? 0) > 0);

      if (hasQuantity) return {};

      const errors: Record<string, string> = {};
      productos.forEach((producto) => {
        errors[`productos.${producto.id}.cantidad`] = "No hay productos";
      });

      return errors;
    },
  });

  const handleCreateAlquiler = (e: React.FormEvent) => {
    e.preventDefault();
    const { hasErrors: formHasErrors } = form.validate();
    const { hasErrors: productosFormHasErrors } = productosForm.validate();
    console.log("error", formHasErrors, productosFormHasErrors);
    if (formHasErrors || productosFormHasErrors) return;
    const alquilerProductos = Object.values(productosForm.values.productos).filter(
      (ap) => ap.cantidad! > 0,
    );

    onCreateAlquiler(form.values, alquilerProductos);
  };

  const handleReset = () => {
    form.reset();
    productosForm.reset();
  };

  const handleSelectProducto = useCallback(
    (
      producto:
        | AlquilerProductoCreate
        | AlquilerProductoUpdate
        | AlquilerProductoEntity
        | undefined,
    ) => {
      if (!producto) return;
      if (selectedProducto?.productoId === producto.productoId) return;
      setSelectedProducto(producto);
    },
    [selectedProducto?.productoId],
  );

  const filteredProductos = useMemo(() => {
    return productos
      .filter((producto) => {
        const filterQuantity = (productosForm.values.productos[producto.id]?.cantidad || 0) > 0;
        const filterName =
          nameFilter === "" || producto.nombre.toLowerCase().includes(nameFilter.toLowerCase());

        if (hideZero && !filterQuantity) return false;
        if (!filterName) return false;
        return true;
      })
      .map((producto, index) => {
        const remaining = stockData?.find((s) => s.productoId === producto.id)?.remaining || "-";
        const alquilerProducto =
          productosForm.values.productos[producto.id] || createEmptyAlquilerProducto(producto);
        return (
          <AlquilerProductoItem
            key={producto.id}
            producto={producto}
            form={productosForm}
            alquilerProducto={alquilerProducto}
            isSelected={selectedProducto?.productoId === producto.id}
            onSelectProducto={handleSelectProducto}
            remaining={remaining}
            tabIndex={index + 3}
          />
        );
      });
  }, [
    productos,
    nameFilter,
    stockData,
    hideZero,
    productosForm.values.productos,
    selectedProducto?.productoId,
  ]);

  return (
    <Stack component="div" h="100%" mih="100%" w="100%" id="alquiler-details-outer-flex">
      <Title order={2}>Detalle</Title>
      <form
        id="alquiler-details-form"
        style={{ height: "100%", overflowY: "auto" }}
        onSubmit={handleCreateAlquiler}
      >
        <Group component="div" h="100%" style={{ overflowY: "auto" }} align="flex-start" gap="md">
          <Stack
            component="div"
            mih="100%"
            h="100%"
            id="alquiler-details-inner-flex"
            gap="md"
            flex={1}
            maw="60%"
          >
            <Stack>
              <AlquilerDetailsForm form={form} />
              <Group>
                <AlquilerDetailsDates form={form} />
                <AlquilerTotalPrice form={productosForm} />
              </Group>
            </Stack>
            <Group>
              <TextInput
                onChange={(event) => setNameFilter(event.currentTarget.value)}
                value={nameFilter}
                placeholder="Buscar producto..."
                radius="md"
                flex={1}
                rightSection={<FontAwesomeIcon icon={faClose} onClick={() => setNameFilter("")} />}
                leftSection={<FontAwesomeIcon icon={faSearch} />}
              />
              <Checkbox
                label="No mostrar 0"
                checked={hideZero}
                onChange={(event) => setHideZero(event.currentTarget.checked)}
              />
            </Group>
            <AlquilerProductosScrollContainer>{filteredProductos}</AlquilerProductosScrollContainer>
            <Group mb="1rem">
              <Button type="submit" color="blue" size="lg">
                Guardar
              </Button>
              <Button type="button" color="gray" size="lg" onClick={handleReset}>
                Resetear
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
