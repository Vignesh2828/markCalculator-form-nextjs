import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import {SpeedDialAction, TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/SaveAltOutlined";
import PrintIcon from "@mui/icons-material/PrintOutlined";
import ShareIcon from "@mui/icons-material/ShareOutlined";
import Backdrop from "@mui/material/Backdrop";
import Tooltip from "@mui/material/Tooltip";


interface FormValues {
  Name: string;
  Tamil: string;
  English: string;
  Maths: string;
  Science: string;
  Social: string;
  Total: string;
  Average: string;
  Grade: string;
}

export default function MarkCalculator() {
  const [tableData, setTableData] = useState<FormValues[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      Name: "",
      Tamil: "",
      English: "",
      Maths: "",
      Science: "",
      Social: "",
      Total: "",
      Average: "",
      Grade: "",
    },
  });

  // total calculation
  const calculateTotal = (marks: number[]) => {
    return marks.reduce((total, mark) => total + mark, 0).toString();
  };

  // calculate average here
  const calculateAverage = (marks: number[]) => {
    const total = calculateTotal(marks);
    const count = marks.length;
    return (
      count > 0 ? (parseFloat(total) / count).toFixed(2) : "0"
    ).toString();
  };

  //calculate grade here
  const calculateGrade = (average: number) => {
    if (average >= 90) return "A+";
    if (average >= 80) return "A";
    if (average >= 70) return "B";
    if (average >= 60) return "C";
    if (average >= 50) return "D";
    return "F";
  };

  //submit handler function
  const onSubmit = (data: FormValues) => {
    const marks = [
      parseInt(data.Tamil),
      parseInt(data.English),
      parseInt(data.Maths),
      parseInt(data.Science),
      parseInt(data.Social),
    ];
    const total = calculateTotal(marks);
    const average = calculateAverage(marks);
    const grade = calculateGrade(parseFloat(average));

    if (editingIndex !== null) {
      setAction("updated");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      const updatedData = [...tableData];
      updatedData[editingIndex] = {
        ...data,
        Total: total,
        Average: average,
        Grade: grade,
      };
      setTableData(updatedData);
      setEditingIndex(null);
    } else {
      setAction("addedd");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      setTableData([
        ...tableData,
        { ...data, Total: total, Average: average, Grade: grade },
      ]);
    }
    reset();
  };

  //handle delete function
  const onDelete = (index: number) => {
    setAction("deleted");
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };

  //handle update function
  const onUpdate = (index: number) => {
    setEditingIndex(index);
    const item = tableData[index];

    setValue("Name", item.Name);
    setValue("Tamil", item.Tamil);
    setValue("English", item.English);
    setValue("Maths", item.Maths);
    setValue("Science", item.Science);
    setValue("Social", item.Social);
  };
  
  let shareData = {
    title: "MDN",
    text: "Learn web development on MDN!",
    url: "https://developer.mozilla.org",
  } 

  //speed dial icons object
  const speedDialIcons = [
    { icon: <FileCopyIcon />, name: "Copy" },
    { icon: <SaveIcon />, name: "Save" },
    { icon: <PrintIcon onClick={() => window.print()} />, name: "Print" },
    { icon: <ShareIcon onClick={() => navigator.share(shareData)}/>, name: "Share" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div style={{ margin: "40px" }}>
        <FormControl>
          <div>
            {/* Name */}
            <Controller
              name="Name"
              control={control}
              rules={{
                required: "Name is required",
                maxLength: {
                  value: 25,
                  message: "Name Too long 20 letters only allowed",
                },
                pattern: {
                  value: /^[A-Za-z- ]+$/,
                  message: "Only characters allowed",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  color="secondary"
                  label="Name"
                  error={!!errors.Name}
                  placeholder="Enter your name"
                />
              )}
            />
            {<p style={{ color: "red" }}>{errors.Name?.message}</p>}
            <br />
          </div>
          <div>
            {/* Tamil */}
            <Controller
              name="Tamil"
              control={control}
              rules={{
                required: "Mark is required",
                max: {
                  value: 100,
                  message: "Mark should not be greater than 100",
                },
                min: {
                  value: 0,
                  message: "Mark should not be lesser than 0",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Only numbers allowed",
                },
              }}
              render={({ field }) => (
                <TextField
                  type="number"
                  {...field}
                  size="small"
                  color="secondary"
                  label="Tamil"
                  error={!!errors.Tamil}
                  placeholder="Tamil mark"
                />
              )}
            />
            <p style={{ color: "red" }}>{errors.Tamil?.message}</p>
            <br />
          </div>
          <div>
            {/* English */}
            <Controller
              name="English"
              control={control}
              rules={{
                required: "Mark is required",
                max: {
                  value: 100,
                  message: "Mark should not be greater than 100",
                },
                min: {
                  value: 0,
                  message: "Mark should not be lesser than 0",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Only numbers allowed",
                },
              }}
              render={({ field }) => (
                <TextField
                  type="number"
                  {...field}
                  size="small"
                  color="secondary"
                  label="English"
                  error={!!errors.English}
                  placeholder="English mark"
                />
              )}
            />
            <p style={{ color: "red" }}>{errors.English?.message}</p>
            <br />
          </div>
          <div>
            {/* Maths */}
            <Controller
              name="Maths"
              control={control}
              rules={{
                required: "Mark is required",
                max: {
                  value: 100,
                  message: "Mark should not be greater than 100",
                },
                min: {
                  value: 0,
                  message: "Mark should not be lesser than 0",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Only numbers allowed",
                },
              }}
              render={({ field }) => (
                <TextField
                  type="number"
                  {...field}
                  size="small"
                  color="secondary"
                  label="Maths"
                  error={!!errors.Maths}
                  placeholder="Maths mark"
                />
              )}
            />
            <p style={{ color: "red" }}>{errors.Maths?.message}</p>
            <br />
          </div>
          <div>
            {/* Science */}
            <Controller
              name="Science"
              control={control}
              rules={{
                required: "Mark is required",
                max: {
                  value: 100,
                  message: "Mark should not be greater than 100",
                },
                min: {
                  value: 0,
                  message: "Mark should not be lesser than 0",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Only numbers allowed",
                },
              }}
              render={({ field }) => (
                <TextField
                  type="number"
                  {...field}
                  size="small"
                  color="secondary"
                  label="Science"
                  error={!!errors.Science}
                  placeholder="Science mark"
                />
              )}
            />
            <p style={{ color: "red" }}>{errors.Science?.message}</p>
            <br />
          </div>
          <div>
            {/* Social */}
            <Controller
              name="Social"
              control={control}
              rules={{
                required: "Mark is required",
                max: {
                  value: 100,
                  message: "Mark should not be greater than 100",
                },
                min: {
                  value: 0,
                  message: "Mark should not be lesser than 0",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Only numbers allowed",
                },
              }}
              render={({ field }) => (
                <TextField
                  type="number"
                  {...field}
                  size="small"
                  color="secondary"
                  label="Social"
                  error={!!errors.Social}
                  placeholder="Social mark"
                />
              )}
            />
            <p style={{ color: "red" }}>{errors.Social?.message}</p>
            <br />
          </div>

          {/* submit */}
          <div>
          <Tooltip title="Submit">
            <Button
              variant="contained"
              color={editingIndex !== null ? "warning" : "success"}
              onClick={handleSubmit(onSubmit)}
            >
              {editingIndex !== null ? "Update" : "Submit"}
            </Button>
            </Tooltip>
            <Snackbar
              open={showAlert}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={2000}
              onClose={() => setShowAlert(false)}
              message={
                action === "addedd"
                  ? "Mark addedd successfully"
                  : action === "updated"
                  ? "Mark updated successfully"
                  : action === "deleted"
                  ? "Mark deleted successfully"
                  : null
              }
            />
          </div>
        </FormControl>
        <br />
        <br />

        {/* Table */}
        <Paper style={{ width: "100%" }} elevation={10}>
          <TableContainer>
            <Table aria-label="mark table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Tamil</TableCell>
                  <TableCell>English</TableCell>
                  <TableCell>Maths</TableCell>
                  <TableCell>Science</TableCell>
                  <TableCell>Social</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Average</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((item, index) => (
                  <TableRow>
                    <TableCell>{item.Name.toUpperCase()}</TableCell>
                    <TableCell>{item.Tamil}</TableCell>
                    <TableCell>{item.English}</TableCell>
                    <TableCell>{item.Maths}</TableCell>
                    <TableCell>{item.Science}</TableCell>
                    <TableCell>{item.Social}</TableCell>
                    <TableCell>{item.Total}</TableCell>
                    <TableCell>{item.Average}</TableCell>
                    <TableCell>{item.Grade}</TableCell>
                    <TableCell>
                      <Stack spacing={2} direction="row">
                        <Tooltip title="Delete">
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => onDelete(index)}
                        >
                          Delete
                        </Button>
                        </Tooltip>
                        <Tooltip title="Update">
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          onClick={() => onUpdate(index)}
                        >
                          Update
                        </Button>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="speedial sample"
          sx={{ position: "absolute", bottom: 16, right: 10 }}
          icon={<SpeedDialIcon />}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          open={open}
        >
          {speedDialIcons.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => setOpen(false)}
            />
          ))}
        </SpeedDial>
      </div>
    </Box>
  );
}
