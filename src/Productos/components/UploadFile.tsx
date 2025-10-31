import { faUpload, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Group, Image, Stack, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import classes from "../Css/Dropzone.module.css";
import { useState } from "react";

export const UploadFile = () => {
  const theme = useMantineTheme();
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const preview = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);

    return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  const handleClearFile = () => {
    setFiles([]);
  };

  return (
    <Stack id="AAAAAA" w="30%" justify="center" align="center">
      <Group justify="center">
        <Dropzone
          onDrop={setFiles}
          radius="md"
          accept={IMAGE_MIME_TYPE}
          w="100%"
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
            {!!preview.length && preview}
            {!preview.length && (
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
