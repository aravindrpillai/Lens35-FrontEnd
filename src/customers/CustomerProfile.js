import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Content from "../Components/Content";
import { Box, Button, Grid, TextField } from "@material-ui/core";
import SummaryCard from "../Components/SummaryCard";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { useState } from "react";
import { useEffect } from "react";
import CustomerTheme from "./CustomerTheme";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80%"
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "80%"
  }
}));


export const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    return (
        <React.Fragment>
          <center>
          {selectedFile && <Box component="img" src={preview} sx={{ height: 233, width: 350, maxHeight: { xs: 233, md: 167 }, maxWidth: { xs: 350, md: 250 } }} />}
          <br/><hr/><br/>
            <Button variant="contained" color="primary" component="label"> Upload
              <input hidden accept="image/*" multiple type="file" onChange={onSelectFile}/>
            </Button> &nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="primary" component="label"> Remove </Button>
            
            
            </center>
        </React.Fragment>
    )

}


function ProfileForm(){
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      
      <TextField
          error
          id="standard-error-helper-text"
          label="Full Name"
          value="Margrette Disuzza"
          helperText="Incorrect entry."
        />
        <TextField
          error
          id="standard-error-helper-text"
          label="Email ID"
          value="margrette.disuzza@yahoo.com"
          helperText="Incorrect entry."
        />

       
        <TextField
          error={false}
          label="Mobile Number"
          id="standard-error-helper-text"
          value="+91-9447020535"
          helperText=""
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
          <Select value={"male"} labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
          </Select>
        <FormHelperText>Some important helper text</FormHelperText>
      </FormControl>
      
    </form>
    )
}

export default function CustomerProfile() {

  return (
    <CustomerTheme>
    <Content>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={4}>
            <SummaryCard title={"Profile Picture"} component={<ImageUpload />} />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <SummaryCard title={"Primary Info"} component={<ProfileForm />} />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <SummaryCard title={"Work Locations"} component={<ProfileForm />} />
          </Grid>
          
        </Grid>
   </Content>
   </CustomerTheme>
  );
}
