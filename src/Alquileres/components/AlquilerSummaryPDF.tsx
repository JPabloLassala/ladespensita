import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { AlquilerFormType, AlquilerProductosFormType } from "../types";
import { ProductoEntity } from "@/Productos";
import dayjs from "dayjs";

const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";
const jpegCache = new Map<string, Promise<string>>();

const isJpegOrPng = (url: string) => /\.(jpe?g|png)(\?.*)?$/i.test(url);

const blobToCanvas = async (blob: Blob): Promise<HTMLCanvasElement> => {
  if (typeof createImageBitmap === "function") {
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close?.();
      throw new Error("Canvas not supported");
    }
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close?.();
    return canvas;
  }

  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    const objectUrl = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Canvas not supported"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Image decode failed"));
    };
    img.src = objectUrl;
  });
};

const getJpegImageSource = (url?: string) => {
  if (!url) return "";
  if (!isBrowser || isJpegOrPng(url)) return url;

  const cached = jpegCache.get(url);
  if (cached) return cached;

  const promise = (async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Image fetch failed: ${response.status}`);
      }
      const blob = await response.blob();
      const canvas = await blobToCanvas(blob);
      return canvas.toDataURL("image/jpeg", 0.9);
    } catch (error) {
      console.warn("Failed to convert image to JPEG, using original URL.", error);
      jpegCache.delete(url);
      return url;
    }
  })();

  jpegCache.set(url, promise);
  return promise;
};

export const AlquilerSummaryPDF = ({
  alquilerForm,
  productos,
  alquilerProductos,
}: {
  alquilerForm: AlquilerFormType;
  productos: ProductoEntity[];
  alquilerProductos: AlquilerProductosFormType;
}) => {
  Font.register({
    family: "Impact",
    fonts: [
      { src: "/fonts/Impact.ttf", fontWeight: "normal" },
      { src: "/fonts/Impact.ttf", fontWeight: "bold" },
    ],
  });

  const pagePadding = 40;
  const headerHeight = 70;
  const headerGap = 12;
  const tableHeaderHeight = 28;
  const tableHeaderTop = pagePadding + headerHeight + headerGap;
  const contentTopPadding = tableHeaderTop + tableHeaderHeight + 5;
  const footerHeight = 110;

  const styles = StyleSheet.create({
    table: {
      width: "100%",
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#F1F4F5",
      borderColor: "black",
      borderLeftWidth: 0.5,
      borderRightWidth: 0.5,
      borderBottomWidth: 0.5,
    },
    headerRow: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#aad0d6ff",
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: 0.5,
    },
    cell: {
      flex: 1,
      minWidth: 0,
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 4,
      paddingRight: 4,
      borderStyle: "solid",
      borderColor: "black",
      borderRightWidth: 0.5,
      borderBottomWidth: 0,
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13,
    },
    headerSeparator: {
      width: "100%",
      height: 0.5,
      backgroundColor: "black",
    },
    cellLast: { borderRightWidth: 0 },
    colImage: { flex: 1.2 },
    colProducto: { flex: 2.5 },
    colNarrow: { flex: 0.9 },
    page: {
      paddingTop: contentTopPadding,
      paddingBottom: pagePadding + footerHeight,
      paddingLeft: pagePadding,
      paddingRight: pagePadding,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#ffffff",
    },
    pageHeader: {
      position: "absolute",
      top: pagePadding,
      left: pagePadding,
      right: pagePadding,
      display: "flex",
      flexDirection: "row",
      gap: 20,
      alignItems: "center",
    },
    tableHeader: {
      position: "absolute",
      top: tableHeaderTop,
      left: pagePadding,
      right: pagePadding,
    },
    imageSection: { flexGrow: 0 },
    image: { width: 50, aspectRatio: "1 / 1" },
    alquilerSection: { flexGrow: 1 },
    alquilerInnerSection: { display: "flex", flexDirection: "column", gap: 10 },
    impact: { fontFamily: "Impact", fontWeight: "bold" },
    productImage: { width: 40, height: 40, objectFit: "cover", display: "flex" },
    textHeader: { fontSize: 6, textAlign: "center" },
    textCell: { textAlign: "center", fontSize: 8 },
    textTitle: { fontSize: 8 },
    aclaracionesContainer: {
      width: "100%",
      fontSize: 7,
      display: "flex",
      flexDirection: "column",
      gap: 4,
    },
    footer: {
      position: "absolute",
      bottom: pagePadding,
      left: pagePadding,
      right: pagePadding,
    },
    aclaracionesTitleText: { fontSize: 7, textDecoration: "underline", fontWeight: "bold" },
    aclaracionesText: { fontSize: 6 },
  });

  const formatValue = (value?: string | number | null) => {
    if (value === null || value === undefined || value === "") return "-";
    return String(value);
  };

  const formatCurrency = (value?: number) => {
    if (value === null || value === undefined) return "-";
    return `$${value}`;
  };

  const headerCells = [
    "IMAGEN",
    "PRODUCTO",
    "METRO LINEAL",
    "ALTURA",
    "UNIDADES",
    "DISPONIBLES",
    "UNIDADES",
    "COTIZADAS",
    "VALOR UNITARIO",
    "GARANTÍA",
    "VALOR TOTAL",
    "GARANTÍA",
    "VALOR UNITARIO",
    "ALQUILER SUBTOTAL ALQUILER",
  ];

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.pageHeader} fixed>
          <View style={styles.imageSection}>
            <Image style={styles.image} src={"/ladespenlogo.png"} />
          </View>
          <View style={styles.alquilerSection}>
            <View style={styles.alquilerInnerSection}>
              <Text style={{ ...styles.impact, ...styles.textTitle }}>
                Presupuesto "La Despensita"
              </Text>
              <Text style={{ ...styles.impact, ...styles.textTitle }}>
                Fecha {dayjs().format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
          <View style={styles.alquilerSection}>
            <View style={styles.alquilerInnerSection}>
              <Text style={{ ...styles.impact, ...styles.textTitle }}>
                Productora {alquilerForm.values.productora}
              </Text>
              <Text style={{ ...styles.impact, ...styles.textTitle }}>
                Proyecto {alquilerForm.values.proyecto}
              </Text>
              <Text style={{ ...styles.impact, ...styles.textTitle }}>
                Alquiler {dayjs(alquilerForm.values.fechaInicio).format("DD/MM/YYYY")}
                {" - "}
                {dayjs(alquilerForm.values.fechaFin).format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.tableHeader} fixed>
          <View style={styles.headerRow}>
            {headerCells.map((c, i, h) => {
              const isLast = i + 1 === h.length;
              const isImage = i === 0;
              const isProducto = i === 1;
              return (
                <View
                  key={`${c}-${i}`}
                  style={[
                    styles.cell,
                    isImage ? styles.colImage : {},
                    isProducto ? styles.colProducto : {},
                    !isImage && !isProducto ? styles.colNarrow : {},
                    isLast ? styles.cellLast : {},
                  ]}
                >
                  <Text style={styles.textHeader}>{c}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.headerSeparator} />
        </View>
        <View style={styles.table}>
          {Object.values(alquilerProductos.values.productos)
            .filter((ap) => ap.cantidad > 0)
            .map((ap, i) => {
              const rowKey = `${ap.productoId}-${i}`;
              const product = productos.find((p) => p.id === ap.productoId);
              const productImageUrl = product?.images?.[0]?.url;
              const availableUnits =
                typeof product?.totales === "number" ? product.totales - ap.cantidad : undefined;
              const garantiaTotal =
                ap.valorTotalGarantia > 0
                  ? ap.valorTotalGarantia
                  : ap.valorUnitarioGarantia * ap.cantidad;
              const alquilerUnitario =
                ap.cantidad > 0 && ap.precioFinal
                  ? ap.precioFinal / ap.cantidad
                  : ap.valorUnitarioAlquiler;

              return (
                <View key={rowKey} style={styles.row} wrap={false}>
                  <View style={[styles.cell, styles.colImage]}>
                    {productImageUrl ? (
                      <Image
                        style={styles.productImage}
                        src={getJpegImageSource(productImageUrl)}
                      />
                    ) : (
                      <Text style={styles.textCell}>-</Text>
                    )}
                  </View>
                  <View style={[styles.cell, styles.colProducto]}>
                    <Text style={styles.textCell}>{formatValue(product?.nombre)}</Text>
                  </View>
                  <View style={[styles.cell, styles.colNarrow]}>
                    <Text style={styles.textCell}>{formatValue(product?.unidadesMetroLineal)}</Text>
                  </View>
                  <View style={[styles.cell, styles.colNarrow]}>
                    <Text style={styles.textCell}>{formatValue(product?.medidasAltura)}</Text>
                  </View>
                  <View style={[styles.cell, styles.colNarrow]}>
                    <Text style={styles.textCell}>{formatValue(product?.totales)}</Text>
                  </View>
                  <View style={[styles.cell, styles.colNarrow]}>
                    <Text style={styles.textCell}>{formatValue(availableUnits)}</Text>
                  </View>
                  <View style={[styles.cell, styles.colNarrow]}>
                    <Text style={styles.textCell}>{formatValue(ap.cantidad)}</Text>
                  </View>
                  <View style={[styles.cell, styles.colNarrow]}>
                    <Text style={styles.textCell}>{formatValue(ap.cantidad)}</Text>
                  </View>
                  <View style={[styles.cell, styles.colNarrow]}>
                    <Text style={styles.textCell}>{formatCurrency(ap.valorUnitarioGarantia)}</Text>
                  </View>
                  <View style={[styles.cell, styles.colNarrow]}>
                    <Text style={styles.textCell}>{formatCurrency(ap.valorUnitarioGarantia)}</Text>
                  </View>
                  <View style={[styles.cell, styles.colNarrow]}>
                    <Text style={styles.textCell}>{formatCurrency(garantiaTotal)}</Text>
                  </View>
                  <View style={[styles.cell, styles.colNarrow]}>
                    <Text style={styles.textCell}>{formatCurrency(garantiaTotal)}</Text>
                  </View>
                  <View style={[styles.cell, styles.colNarrow]}>
                    <Text style={styles.textCell}>{formatCurrency(alquilerUnitario)}</Text>
                  </View>
                  <View style={[styles.cell, styles.colNarrow, styles.cellLast]}>
                    <Text style={styles.textCell}>{formatCurrency(ap.precioFinal)}</Text>
                  </View>
                </View>
              );
            })}
        </View>
        <View style={styles.footer} fixed>
          <View style={styles.aclaracionesContainer}>
            <Text style={styles.aclaracionesTitleText}>ACLARACIONES:</Text>
            <Text style={styles.aclaracionesText}>
              Presupuesto válido por 15 días desde la fecha de emisión.
            </Text>
            <Text style={styles.aclaracionesText}>
              En caso de cancelación de un alquiler confirmado se cobrará el 50% del total del
              alquiler.
            </Text>
            <Text style={styles.aclaracionesText}>
              Para retirar los productos es necesario entregar la garantía sin excepción. Cheque a
              nombre de Sofia Sosa Escalada, Cuit 27-37140378-2
            </Text>
            <Text style={styles.aclaracionesText}>
              El monto del alquiler detalla pago al día (esto significa que el pago podrá hacerse
              hasta 10 días luego de emitida la factura).
            </Text>
            <Text style={styles.aclaracionesText}>
              Si el pago resultara ser entre 10 a 30 días de emitida la factura, el valor se
              incrementará un 30% más del total. De 30 a 60 días se incrementará en un 45%.
            </Text>
            <Text style={styles.aclaracionesText}>
              Los productos no son aptos para consumir. En caso de requerirlo como prop para
              consumo, se deberá avisar previamente para su correcta preparación.
            </Text>
            <Text style={styles.aclaracionesText}>
              En caso de consumir algun producto sin avisar, será bajo su propia consideración, y se
              deberá pagar la garantía por el producto en cuestión,
            </Text>
            <Text style={styles.aclaracionesText}>
              Los productos deberan devolverse embalados correctamente para que no se abollen.
              Productos abollados se cobra un 50% de la garantía.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
