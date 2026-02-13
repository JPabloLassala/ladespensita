import {
  ALQUILER_STATUS,
  AlquilerEntity,
  AlquilerProductoCreate,
  AlquilerProductoEntity,
  AlquilerProductoUpdate,
  AlquilerUpdate,
} from "@/Alquileres/entities";
import { useForm } from "@mantine/form";
import { useEffect, useMemo, useState } from "react";

import { APP_STATE, useAppStateContext } from "@/Common";
import { useProductosContext } from "@/Productos";
import {
  faClose,
  faMagnifyingGlassMinus,
  faSearch,
  faStoreSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Center, Checkbox, Group, Stack, TextInput, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useAlquilerProductoRepository } from "../repository";
import { useAlquilerContext, useAlquilerProductoContext } from "../stores";
import { AlquilerDetailsDates } from "./AlquilerDetailsDates";
import { AlquilerDetailsForm } from "./AlquilerDetailsForm";
import { AlquilerProductoDetails } from "./AlquilerProductoDetails";
import { AlquilerProductoItem } from "./AlquilerProductoItem";
import { AlquilerStatus } from "./AlquilerStatus";
import { AlquilerSummaryExport } from "./AlquilerSummaryExport";
import { AlquilerTotalPrice } from "./AlquilerTotalPrice";
import { AlquilerProductosScrollContainer } from "./UI";

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
  const [hideZero, setHideZero] = useState(false);
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
      setDatesTouched({
        inicio: values.fechas[0] !== null,
        fin: values.fechas[1] !== null,
      });
      updateAlquiler(selectedAlquiler.id, values);
    },
    validate: {
      fechas: (value) => {
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
  }, [data, productos]);

  const handleUpdateAlquiler = (e: React.FormEvent) => {
    e.preventDefault();
    const { hasErrors: formHasErrors } = form.validate();
    const { hasErrors: productosFormHasErrors } = productosForm.validate();
    if (formHasErrors || productosFormHasErrors) return;

    const alquilerProductos = Object.values(productosForm.values.productos).filter(
      (ap) => ap.cantidad! > 0,
    );

    onUpdateAlquiler(form.values, alquilerProductos);
  };

  function handleSelectProducto(
    producto: AlquilerProductoCreate | AlquilerProductoUpdate | AlquilerProductoEntity,
  ) {
    if (selectedProducto?.productoId === producto.productoId) return;
    setSelectedProducto(producto);
  }

  const filteredProductos = useMemo(
    () =>
      productos
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
              alquilerProducto={alquilerProducto}
              form={productosForm}
              isSelected={selectedProducto?.productoId === producto.id}
              onSelectProducto={handleSelectProducto}
              remaining={remaining}
              tabIndex={index + 3}
            />
          );
        }),
    [
      productos,
      nameFilter,
      stockData,
      hideZero,
      productosForm.values.productos,
      selectedProducto?.productoId,
    ],
  );

  return (
    <Stack component="section" w="100%" h="100%" mih="100%" id="alquiler-details-outer-flex">
      <Title order={2}>Detalle</Title>
      <form
        id="alquiler-details-form"
        style={{ height: "100%", overflowY: "auto" }}
        onSubmit={handleUpdateAlquiler}
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
            <Group>
              <AlquilerStatus
                alquiler={selectedAlquiler}
                onChangeStatus={onChangeStatus}
                flex={1}
              />
            </Group>
            <Stack>
              <AlquilerDetailsForm form={form} />
              <Group>
                <AlquilerDetailsDates form={form} />
                <AlquilerTotalPrice form={productosForm} />
              </Group>
            </Stack>
            <Group component="div">
              <TextInput
                onChange={(event) => setNameFilter(event.currentTarget.value)}
                value={nameFilter}
                placeholder="Buscar producto..."
                radius="md"
                w="100%"
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
            <AlquilerProductosScrollContainer>
              {filteredProductos.length ? filteredProductos : null}
              {filteredProductos.length === 0 && (
                <Center h="100%">
                  <Title order={1} fw={800} style={{ color: "lightgray" }}>
                    <FontAwesomeIcon icon={faStoreSlash} style={{ marginRight: 10 }} />
                    No se encontraron productos
                  </Title>
                </Center>
              )}
            </AlquilerProductosScrollContainer>
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
              <AlquilerSummaryExport
                productos={productos}
                form={productosForm}
                alquilerForm={form}
              />
            </Group>
          </Stack>
          {selectedProducto && (
            <AlquilerProductoDetails form={productosForm} selected={selectedProducto} />
          )}
          {!selectedProducto && <Stack component="div" gap="0.5rem" w="20%"></Stack>}
        </Group>
      </form>
    </Stack>
  );
}
