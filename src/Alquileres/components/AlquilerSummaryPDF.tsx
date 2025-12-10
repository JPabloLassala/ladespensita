import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { AlquilerFormType } from "../types";
import { ProductoEntity } from "@/Productos";
import dayjs from "dayjs";

export const AlquilerSummaryPDF = ({
  alquiler,
  productos,
}: {
  alquiler: AlquilerFormType;
  productos: ProductoEntity[];
}) => {
  Font.register({
    family: "Impact",
    fonts: [
      { src: "/fonts/Impact.ttf", fontWeight: "normal" },
      { src: "/fonts/Impact.ttf", fontWeight: "bold" },
    ],
  });
  const styles = StyleSheet.create({
    page: { padding: 40 },
    pageContainer: { display: "flex", flexDirection: "row", gap: 20 },
    imageSection: { flexGrow: 0 },
    image: { width: 50, aspectRatio: "1 / 1" },
    alquilerSection: { flexGrow: 1 },
    alquilerInnerSection: { display: "flex", flexDirection: "column", gap: 10 },
    impact: { fontSize: 16, fontFamily: "Impact", fontWeight: "bold" },
  });

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.pageContainer}>
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
      </Page>
    </Document>
  );
};
