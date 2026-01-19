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
  alquiler,
  productos,
  alquilerProductos,
}: {
  alquiler: AlquilerFormType;
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

  const styles = StyleSheet.create({
    table: {
      width: "100%",
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#eee", // light gray
      display: "flex",
      flexDirection: "column",
      borderStyle: "solid",
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#F1F4F5",
      borderStyle: "solid",
      borderColor: "black",
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
    },
    rowLast: {
      borderBottomWidth: 0,
    },
    headerRow: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#aad0d6ff",
      borderStyle: "solid",
      borderColor: "black",
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
    },
    cell: {
      flexGrow: 1,
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 4,
      paddingRight: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "black",
      borderRightWidth: 1,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      textAlign: "center",
      fontSize: 13,
      fontWeight: 700,
    },
    cellLast: { borderRightWidth: 0, borderBottomWidth: 0, borderTopWidth: 0 },
    page: { padding: 40, display: "flex", flexDirection: "column", gap: 20 },
    pageHeader: { display: "flex", flexDirection: "row", gap: 20 },
    imageSection: { flexGrow: 0 },
    image: { width: 50, aspectRatio: "1 / 1" },
    alquilerSection: { flexGrow: 1 },
    alquilerInnerSection: { display: "flex", flexDirection: "column", gap: 10 },
    impact: { fontSize: 16, fontFamily: "Impact", fontWeight: "bold" },
    productImage: { width: 60, height: 40, objectFit: "cover", display: "flex" },
  });

  const headerCells = [
    "IMAGEN PRODUCTO METRO LINEAL ALTURA UNIDADES",
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
        <View style={styles.pageHeader}>
          <View style={styles.imageSection}>
            <Image style={styles.image} src={"/public/ladespenlogo.png"} />
          </View>
          <View style={styles.alquilerSection}>
            <View style={styles.alquilerInnerSection}>
              <Text style={styles.impact}>Presupuesto "La Despensita"</Text>
              <Text style={styles.impact}>Fecha {dayjs().format("DD/MM/YYYY")}</Text>
            </View>
          </View>
          <View style={styles.alquilerSection}>
            <View style={styles.alquilerInnerSection}>
              <Text style={styles.impact}>Productora {alquiler.values.productora}</Text>
              <Text style={styles.impact}>Proyecto {alquiler.values.proyecto}</Text>
              <Text style={styles.impact}>
                Alquiler {dayjs(alquiler.values.fechaInicio).format("DD/MM/YYYY")}
                {" - "}
                {dayjs(alquiler.values.fechaFin).format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            {headerCells.map((c, i, h) => {
              if (i + 1 === h.length)
                return (
                  <View key={`${c}-${i}`} style={{ ...styles.cell, ...styles.cellLast }}>
                    <Text>{c}</Text>
                  </View>
                );
              return (
                <View key={`${c}-${i}`} style={styles.cell}>
                  <Text>{c}</Text>
                </View>
              );
            })}
          </View>
          {Object.values(alquilerProductos.values.productos)
            .filter((ap) => ap.cantidad > 0)
            .map((ap, i, arr) => {
              const rowKey = `${ap.productoId}-${i}`;
              const product = productos.find((p) => p.id === ap.productoId);
              const productImageUrl = product?.images?.[0]?.url;
              console.log(
                "image URL:",
                productImageUrl,
              );
              if (i + 1 === arr.length) {
                return (
                  <View key={rowKey} style={{ ...styles.row, ...styles.rowLast }}>
                    <View style={styles.cell}>
                      <Text>last {ap.cantidad}</Text>
                    </View>
                    <View style={{ ...styles.cell, ...styles.cellLast }}>
                      <Text>last {ap.cantidad}</Text>
                    </View>
                  </View>
                );
              }

              return (
                <View key={rowKey} style={styles.row} id="AAAAA">
                  <View style={styles.cell}>
                    <Image
                      style={styles.productImage}
                      src={getJpegImageSource(productImageUrl)}
                    />
                  </View>
                  <View style={{ ...styles.cell, ...styles.cellLast }}>
                    <Text>last {ap.cantidad}</Text>
                  </View>
                </View>
              );
            })}
        </View>
      </Page>
    </Document>
  );
};
