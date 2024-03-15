import * as React from "react";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SendIcon from "@mui/icons-material/Send";
import  Fingerprint  from "@mui/icons-material/Fingerprint";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

export default function ComboBox() {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
  return (
    <>
      <Stack spacing={10} direction="row">
        <Button variant="text" color="error">
          click
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<DeleteIcon />}
        >
          click
        </Button>
        <Button
          variant="outlined"
          onClick={() => alert("clicked")}
          size="small"
          endIcon={<SendIcon />}
        >
          click
        </Button>
        <Button>primary</Button>
        <Button href="#">Link</Button>
        <Button disabled>disabled</Button>
        <Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
>
  Upload file
  <VisuallyHiddenInput type="file" />
</Button>
      </Stack>
      <br />
      <Stack spacing={2} direction="row">
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="delete" disabled color="primary">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="shopping">
          <AddShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="shopping" color="secondary" size="large">
          <AlarmIcon />
        </IconButton>
        <IconButton aria-label="delete" size="small">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="delete" size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete" size="large">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="delete" size="large">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      <br />
      <Stack spacing={2} direction='row'>
        <IconButton aria-label="fingeprint">
            <Fingerprint/>
        </IconButton>
        <IconButton aria-label="fingeprint" color="success">
            <Fingerprint/>
        </IconButton>
      </Stack>



      

    </>
  );
}
