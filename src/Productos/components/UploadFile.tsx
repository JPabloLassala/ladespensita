import { faUpload, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Group, Image, Stack, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import classes from "../Css/Dropzone.module.css";
import { ProductoImage } from "../entities";

export const UploadFile = ({
  file,
  onSetFile,
  image,
}: {
  file: File | undefined;
  onSetFile: (file: File) => void;
  image?: ProductoImage;
}) => {
  const theme = useMantineTheme();

  const preview = () => {
    if (!file && !image) return null;

    let url: string = "";
    if (image) {
      url = image.url;
    } else {
      url = URL.createObjectURL(file as File);
    }

    return <Image fit="contain" h={200} src={url} onLoad={() => URL.revokeObjectURL(url)} />;
  };

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    onSetFile(acceptedFiles[0]);
  };

  const handleClearFile = () => {
    onSetFile({} as File);
  };

  return (
    <Stack justify="center" align="center">
      <Group justify="center">
        <Dropzone
          onDrop={handleDrop}
          radius="md"
          accept={IMAGE_MIME_TYPE}
          h="15rem"
          maxFiles={1}
          className={classes.root}
        >
          <Dropzone.Accept>
            <FontAwesomeIcon icon={faUpload} size="2x" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <FontAwesomeIcon icon={faX} size="2x" />
          </Dropzone.Reject>
          <Dropzone.Idle>
            {(file || image) && preview()}
            {!file && !image && (
              <Stack justify="center" align="center" h="100%" miw="100%">
                <FontAwesomeIcon icon={faUpload} size="2x" color={theme.colors.blue[4]} />
                <Text size="xl" inline>
                  Subir Imagen
                </Text>
              </Stack>
            )}
          </Dropzone.Idle>
        </Dropzone>
        <Button onClick={handleClearFile}>Borrar imagen</Button>
      </Group>
    </Stack>
  );
};
