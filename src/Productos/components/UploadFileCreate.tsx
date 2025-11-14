import { faUpload, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image, Stack, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import type { ReactNode } from "react";

export const UploadFileCreate = ({
  file,
  onSetFile,
  onSetTmpURL,
  onResetFile,
  dirty,
  setDirty,
  error,
}: {
  file: File | undefined;
  dirty: boolean;
  onSetFile: (file: FileWithPath | undefined) => void;
  onSetTmpURL: (url: string) => void;
  onResetFile?: () => void;
  setDirty: (dirty: boolean) => void;
  error?: ReactNode;
}) => {
  const theme = useMantineTheme();
  const fallback = (
    <Stack component="div" justify="center" align="center" h="100%" miw="100%">
      <FontAwesomeIcon icon={faUpload} size="2x" color={theme.colors.blue[4]} />
      <Text size="xl" inline>
        Subir Imagen
      </Text>
    </Stack>
  );

  const preview = () => {
    if (!file) return fallback;
    if (dirty) {
      if (!file) return fallback;

      return (
        <Image
          fit="contain"
          h="100%"
          src={URL.createObjectURL(file as File)}
          onLoad={() => URL.revokeObjectURL(file.name)}
        />
      );
    }

    return fallback;
  };

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setDirty(true);
    onSetTmpURL(URL.createObjectURL(acceptedFiles[0]));
    onSetFile(acceptedFiles[0]);
  };

  const handleClearFile = () => {
    setDirty(false);
    onSetFile(undefined);
  };

  return (
    <Stack component="div" justify="center" align="center">
      <Stack component="div" justify="center" w="15rem">
        <Dropzone
          onDrop={handleDrop}
          radius="md"
          accept={IMAGE_MIME_TYPE}
          h="15rem"
          maxFiles={1}
          multiple={false}
          styles={{
            root: {
              borderStyle: "dashed",
              borderColor: error ? theme.colors.red[6] : undefined,
              padding: 0,
            },
            inner: { height: "100%" },
          }}
        >
          <Dropzone.Accept>
            <FontAwesomeIcon icon={faUpload} size="2x" />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <FontAwesomeIcon icon={faX} size="2x" />
          </Dropzone.Reject>
          <Dropzone.Idle>{preview()}</Dropzone.Idle>
        </Dropzone>
        {error && (
          <Text size="xs" c="red" ta="left">
            {error}
          </Text>
        )}
        <Button disabled={!file} onClick={handleClearFile}>
          Borrar imagen
        </Button>
        {onResetFile && file && (
          <Button onClick={onResetFile} color="red">
            Volver a imagen anterior
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
