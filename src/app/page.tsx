"use client";

import { ThemeProvider, Typography, Stack, Button, Box } from "@mui/material";
import { theme } from "./theme";
import { AspectRatio } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoEl = useRef<HTMLVideoElement>(null);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

  function requestPictureInPicture() {
    videoEl.current!.requestPictureInPicture();
    if (videoEl.current!.srcObject !== null) setBtnDisabled(true);
  }

  async function selectMediaStream() {
    try {
      const mediaStream: MediaStream =
        await navigator.mediaDevices.getDisplayMedia();

      videoEl.current!.srcObject = mediaStream;
      videoEl.current!.onloadedmetadata = () => videoEl.current!.play();
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  }

  useEffect(() => {
    selectMediaStream();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        sx={{ height: "100vh", bgcolor: "primary.main", pb: "10rem" }}
      >
        <Typography variant="h1">Picture-in-Picture App</Typography>
        <Box
          sx={{
            color: "secondary.main",
            my: "2rem",
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          Se você possuí somente um monitor, esse App é perfeito para você!
          Facilite sua vida assistindo tutoriais de programação e desenhando
          interfaces.
        </Box>
        <Box sx={{ color: "secondary.main", my: "2rem", fontSize: "24px" }}>
          Clique no botão para ativar o modo picture-in-picture e assista videos
          enquanto navega pela web.
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          endIcon={<AspectRatio />}
          sx={{ mb: "2rem" }}
          onClick={requestPictureInPicture}
          disabled={btnDisabled}
        >
          Ativar Picture-In-Picture!
        </Button>
        <video ref={videoEl} controls height={360} width={640}></video>
      </Stack>
    </ThemeProvider>
  );
}
