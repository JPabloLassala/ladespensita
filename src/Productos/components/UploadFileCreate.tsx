import { faUpload, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Group, Image, Stack, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import classes from "../Css/Dropzone.module.css";
import { ProductoImage } from "../entities";

export const UploadFileCreate = ({
  file,
  onSetFile,
  onSetTmpURL,
  onResetFile,
  image,
}: {
  file: File | undefined;
  onSetFile: (file: FileWithPath | undefined) => void;
  onSetTmpURL: (url: string) => void;
  onResetFile?: () => void;
  image?: ProductoImage;
}) => {
  const theme = useMantineTheme();

  const preview = () => {
    if (!file && !image) return;

    let url: string = "";
    if (file) {
      url = URL.createObjectURL(file as File);
    } else if (image) {
      url = image.url;
    }

    return <Image fit="contain" h={200} src={url} />;
  };

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    onSetFile(acceptedFiles[0]);
    const url = URL.createObjectURL(acceptedFiles[0]);
    onSetTmpURL(url);
  };

  const handleClearFile = () => {
    onSetFile(undefined);
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
        {onResetFile && file && (
          <Button onClick={onResetFile} color="red">
            Volver a imagen anterior
          </Button>
        )}
      </Group>
    </Stack>
  );
};
