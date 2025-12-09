import { Button, Center, CopyButton, Modal, Text } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { AlquilerEntity, AlquilerProductoCreate, AlquilerProductoUpdate } from "../entities";
import { useDisclosure } from "@mantine/hooks";
import { ProductoEntity } from "@/Productos";
// @ts-ignore pdfkit standalone build has no types
import PDFDocument from "pdfkit/js/pdfkit.standalone.js";
import dayjs from "dayjs";

type AlquilerProductosFormType = UseFormReturnType<
  {
    productos: Record<number, AlquilerProductoUpdate | AlquilerProductoCreate>;
  },
  (values: { productos: Record<number, AlquilerProductoUpdate | AlquilerProductoCreate> }) => {
    productos: Record<number, AlquilerProductoUpdate | AlquilerProductoCreate>;
  }
>;

type AlquilerFormType = UseFormReturnType<
  Omit<Partial<AlquilerEntity>, "updatedAt" | "productos"> & {
    id: number;
  } & { fechas: (Date | null)[] },
  (
    values: Omit<Partial<AlquilerEntity>, "updatedAt" | "productos"> & {
      id: number;
    } & { fechas: (Date | null)[] },
  ) => Omit<Partial<AlquilerEntity>, "updatedAt" | "productos"> & {
    id: number;
  } & { fechas: (Date | null)[] }
>;

export const AlquilerSummaryPrice = ({
  form,
  alquiler,
  productos,
}: {
  form: AlquilerProductosFormType;
  alquiler: AlquilerFormType;
  productos: ProductoEntity[];
}) => {
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const alquilerProductos = Object.values(form.values.productos).filter((v) => v.cantidad > 0);
  const text = alquilerProductos
    .map((ap) => {
      const producto = productos.find((p) => p.id === ap.productoId);
      if (!producto) return "";
      return `${producto.nombre} x${ap.cantidad}: $${ap.precioFinal}`;
    })
    .join("\n");
  const handlePdf = () => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks: BlobPart[] = [];
    const { productora, proyecto, fechaInicio, fechaFin, fechaPresupuesto } = alquiler.values;
    const formatCurrency = (value: number) =>
      `$${value.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const formatDate = (value?: Date | string | null) =>
      value ? dayjs(value).format("DD/MM/YYYY") : "-";
    const alquilerRows = alquilerProductos.map((ap) => {
      const producto = productos.find((p) => p.id === ap.productoId);
      const unitPrice = ap.cantidad ? (ap.precioFinal || 0) / ap.cantidad : 0;

      return {
        nombre: producto?.nombre ?? `Producto ${ap.productoId}`,
        cantidad: ap.cantidad || 0,
        unitPrice,
        subtotal: ap.precioFinal || 0,
      };
    });
    const total = alquilerRows.reduce((sum, row) => sum + row.subtotal, 0);

    doc.on("data", (chunk: BlobPart) => chunks.push(chunk));
    doc.on("end", () => {
      const pdfBlob = new Blob(chunks, { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "alquiler-resumen.pdf";
      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });

    const marginLeft = doc.page.margins.left;
    const usableWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const halfWidth = usableWidth / 2;
    const rightColumnX = marginLeft + halfWidth + 10;

    doc.fontSize(18).font("Helvetica-Bold").text('Presupuesto "La despensita"', {
      align: "center",
    });
    doc.moveDown();

    const headerTop = doc.y;
    doc.fontSize(12).font("Helvetica-Bold").text("Productora: ", marginLeft, headerTop, {
      continued: true,
    });
    doc.font("Helvetica").text(productora || "-");

    doc.font("Helvetica-Bold").text("Proyecto: ", marginLeft, doc.y, { continued: true });
    doc.font("Helvetica").text(proyecto || "-");

    doc.font("Helvetica-Bold").text("Fecha presupuesto: ", rightColumnX, headerTop, {
      continued: true,
    });
    doc.font("Helvetica").text(formatDate(fechaPresupuesto));

    doc.font("Helvetica-Bold").text("Periodo: ", rightColumnX, doc.y, { continued: true });
    doc
      .font("Helvetica")
      .text(`${formatDate(fechaInicio)}${fechaFin ? ` - ${formatDate(fechaFin)}` : ""}`);

    doc.moveDown(2);

    const tableWidth = usableWidth;
    const colWidths = [tableWidth * 0.45, tableWidth * 0.15, tableWidth * 0.2, tableWidth * 0.2];
    const baseRowHeight = 24;
    let y = doc.y;

    const ensureSpace = (height: number) => {
      if (y + height > doc.page.height - doc.page.margins.bottom) {
        doc.addPage();
        y = doc.page.margins.top;
      }
    };

    const drawRow = (
      [nombre, cantidad, unit, subtotal]: (string | number)[],
      isHeader = false,
    ) => {
      doc.font(isHeader ? "Helvetica-Bold" : "Helvetica");
      const heights = [
        doc.heightOfString(String(nombre), { width: colWidths[0] - 12 }),
        doc.heightOfString(String(cantidad), { width: colWidths[1] - 12 }),
        doc.heightOfString(String(unit), { width: colWidths[2] - 12 }),
        doc.heightOfString(String(subtotal), { width: colWidths[3] - 12 }),
      ];
      const currentRowHeight = Math.max(baseRowHeight, ...heights) + 8;

      ensureSpace(currentRowHeight);
      const xPositions = [
        marginLeft,
        marginLeft + colWidths[0],
        marginLeft + colWidths[0] + colWidths[1],
        marginLeft + colWidths[0] + colWidths[1] + colWidths[2],
      ];

      doc.rect(marginLeft, y - 4, tableWidth, currentRowHeight).stroke();
      doc.text(String(nombre), xPositions[0] + 6, y, { width: colWidths[0] - 12 });
      doc.text(String(cantidad), xPositions[1] + 6, y, { width: colWidths[1] - 12 });
      doc.text(String(unit), xPositions[2] + 6, y, { width: colWidths[2] - 12 });
      doc.text(String(subtotal), xPositions[3] + 6, y, { width: colWidths[3] - 12 });

      y += currentRowHeight;
    };

    drawRow(["Producto", "Cantidad", "Precio unitario", "Subtotal"], true);
    alquilerRows.forEach((row) =>
      drawRow([row.nombre, row.cantidad, formatCurrency(row.unitPrice), formatCurrency(row.subtotal)]),
    );
    drawRow(["", "", "Total", formatCurrency(total)], true);

    doc.y = y + 6;
    doc.moveDown();

    doc.font("Helvetica-Bold").text("Aclaraciones", marginLeft, doc.y);
    doc.moveDown(0.5);
    doc.font("Helvetica").text(
      "Valores sujetos a disponibilidad y cambios sin previo aviso. Confirmar fechas y cantidades para garantizar la reserva.",
      {
        width: usableWidth,
      },
    );

    doc.end();
  };

  return (
    <>
      <Button onClick={open}>Mostrar resumen</Button>
      <Modal size="auto" opened={isModalOpen} onClose={close}>
        {alquilerProductos.map((ap) => {
          const producto = productos.find((p) => p.id === ap.productoId);
          if (!producto) return null;
          return (
            <Text key={ap.productoId}>
              {producto.nombre} x{ap.cantidad}: ${ap.precioFinal}
            </Text>
          );
        })}
        <Center w="100%" mt="lg">
          <Button onClick={handlePdf}>Descargar PDF</Button>
          <CopyButton value={text} timeout={1000}>
            {({ copied, copy }) => (
              <Button onClick={copy} color={copied ? "teal" : "blue"}>
                {copied ? "Copiado" : "Copiar al portapapeles"}
              </Button>
            )}
          </CopyButton>
        </Center>
      </Modal>
    </>
  );
};
