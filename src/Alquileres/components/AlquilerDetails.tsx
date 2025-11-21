import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  ALQUILER_STATUS,
  AlquilerCreate,
  AlquilerEntity,
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
  AlquilerUpdate,
} from "@/Alquileres/entities";

import { Button, Group, Stack, TextInput, Title } from "@mantine/core";
import { ProductoEntity, useProductosContext } from "@/Productos";
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";
import { AlquilerProductoItem } from "./AlquilerProductoItem";
import { AlquilerProductosScrollContainer } from "./UI";
import { useAlquilerContext, useAlquilerProductoContext } from "../stores";
import { useAlquilerProductoRepository } from "../repository";
import { AlquilerStatus } from "./AlquilerStatus";
import { APP_STATE, useAppStateContext } from "@/Common";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";

export function AlquilerDetails({
  onUpdateAlquiler,
  onChangeStatus,
  selectedAlquiler,
}: {
  onUpdateAlquiler: (
    a: AlquilerUpdate,
    p: (AlquilerProductoCreate | AlquilerProductoUpdate)[],
  ) => void;
  onChangeStatus: (id: number, status: ALQUILER_STATUS) => void;
  selectedAlquiler: AlquilerEntity;
}) {
  const { appState } = useAppStateContext();
  const { productos } = useProductosContext();
  const { updateAlquiler } = useAlquilerContext();
  const { createEmptyAlquilerProducto, alquilerProductos } = useAlquilerProductoContext();
  const { sendGetStock, stockData, sendList, data } = useAlquilerProductoRepository();
  const [nameFilter, setNameFilter] = useState("");
  const [selectedProducto, setSelectedProducto] = useState<
    AlquilerProductoEntity | AlquilerProductoCreate | undefined
  >(undefined);
  const [datesTouched, setDatesTouched] = useState<{ inicio: boolean; fin: boolean }>({
    inicio: false,
    fin: false,
  });

  const form = useForm<AlquilerUpdate & { fechas: (Date | null)[] }>({
    initialValues: {
      id: selectedAlquiler?.id || 0,
      status: selectedAlquiler!.status || ALQUILER_STATUS.PENDING,
      productora: selectedAlquiler!.productora || "",
      proyecto: selectedAlquiler!.proyecto || "",
      fechaInicio: selectedAlquiler!.fechaInicio || undefined,
      fechaFin: selectedAlquiler!.fechaFin || undefined,
      fechas: [
        selectedAlquiler!.fechaInicio || new Date(),
        selectedAlquiler!.fechaFin || new Date(),
      ],
      fechaPresupuesto: selectedAlquiler!.fechaPresupuesto || new Date(),
      createdAt: selectedAlquiler!.createdAt || new Date(),
    },
    onValuesChange: (values) => {
      console.log("form values", values);
      setDatesTouched({
        inicio: values.fechas[0] !== null,
        fin: values.fechas[1] !== null,
      });
      updateAlquiler(selectedAlquiler.id, values);
    },
    validate: {
      fechas: (value) => {
        console.log("value", value);
        console.log("!value[0] || !value[1]", !value[0] || !value[1]);
        if (!value[0] || !value[1]) return "Debe seleccionar una fecha de inicio y fin";
        if (dayjs(value[0]).isAfter(dayjs(value[1])))
          return "La fecha de inicio debe ser anterior a la de fin";
        return null;
      },
    },
  });

  const productosForm = useForm<{
    productos: Record<number, AlquilerProductoUpdate | AlquilerProductoCreate>;
  }>({
    initialValues: {
      productos: alquilerProductos.reduce(
        (acc, producto) => {
          acc[producto.productoId] = producto;
          return acc;
        },
        {} as Record<number, AlquilerProductoUpdate | AlquilerProductoCreate>,
      ),
    },
    validate: (values) => {
      if (Object.keys(values.productos).length > 0) return {};

      return productos.reduce(
        (errors, producto) => {
          errors[`productos.${producto.id}.cantidad`] = "Debe seleccionar al menos un producto";
          return errors;
        },
        {} as Record<string, string>,
      );
    },
  });

  useEffect(() => {
    if (!datesTouched.inicio || !datesTouched.fin) return;

    const since = dayjs(selectedAlquiler.fechaInicio).toDate();
    const until = dayjs(selectedAlquiler.fechaFin).toDate();
    if (!since || !until) return;

    sendGetStock(since, until, selectedAlquiler.id);
    setDatesTouched({ inicio: false, fin: false });
  }, [datesTouched]);

  useEffect(() => {
    form.setValues({ ...selectedAlquiler });
    const since = dayjs(selectedAlquiler.fechaInicio).toDate();
    const until = dayjs(selectedAlquiler.fechaFin).toDate();

    if (since && until) {
      sendGetStock(since, until, selectedAlquiler.id);
    }
    sendList(selectedAlquiler.id);
  }, [selectedAlquiler.id]);

  useEffect(() => {
    productosForm.setValues({
      productos: productos.reduce(
        (acc, p) => {
          const ap = data?.find((d) => d.productoId === p.id);
          acc[p.id] = ap || createEmptyAlquilerProducto(p);
          return acc;
        },
        {} as Record<number, AlquilerProductoUpdate | AlquilerProductoCreate>,
      ),
    });
  }, [data]);

  const handleUpdateAlquiler = (e: React.FormEvent) => {
    e.preventDefault();
    const { hasErrors: formHasErrors } = form.validate();
    const { hasErrors: productosFormHasErrors } = productosForm.validate();
    console.log("error", formHasErrors, productosFormHasErrors);
    if (formHasErrors || productosFormHasErrors) return;

    const alquilerProductos = Object.values(productosForm.values.productos).filter(
      (ap) => ap.cantidad! > 0,
    );

    console.log("form.values", form.values);
    onUpdateAlquiler(form.values, alquilerProductos);
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
    <Stack component="section" w="100%" h="100%" mih="100%" id="alquiler-details-outer-flex">
      <Title order={2}>Detalle</Title>
      <form
        id="alquiler-details-form"
        style={{ height: "100%", overflowY: "auto" }}
        onSubmit={handleUpdateAlquiler}
      >
        <Group
          component="div"
          h="100%"
          style={{ overflowY: "auto" }}
          align="flex-start"
          gap="md"
          wrap="nowrap"
        >
          <Stack
            component="div"
            mih="100%"
            h="100%"
            id="alquiler-details-inner-flex"
            align="center"
            gap="md"
          >
            <AlquilerStatus alquiler={selectedAlquiler} onChangeStatus={onChangeStatus} />
            <AlquilerDetailsForm form={form} />
            <TextInput
              onChange={(event) => setNameFilter(event.currentTarget.value)}
              value={nameFilter}
              placeholder="Buscar producto..."
              radius="md"
              w="100%"
              rightSection={<FontAwesomeIcon icon={faClose} onClick={() => setNameFilter("")} />}
              leftSection={<FontAwesomeIcon icon={faSearch} />}
            />
            <AlquilerProductosScrollContainer>{filteredProductos}</AlquilerProductosScrollContainer>
            <Group mb="1rem">
              <Button
                disabled={appState === APP_STATE.loading}
                type="submit"
                color="blue"
                size="lg"
              >
                {appState === APP_STATE.loading ? "Guardando..." : "Guardar"}
              </Button>
              <Button disabled={appState === APP_STATE.loading} type="button" color="red" size="lg">
                Cancelar
              </Button>
            </Group>
          </Stack>
          {selectedProducto && (
            <AlquilerProductoDetails form={productosForm} selected={selectedProducto} />
          )}
        </Group>
      </form>
    </Stack>
  );
}
