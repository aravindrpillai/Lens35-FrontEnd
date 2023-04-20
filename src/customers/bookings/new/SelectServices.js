import * as React from "react";
import { Card, CardContent, CardMedia, Grid, IconButton, } from "@mui/material";
import Stack from "@mui/material/Stack";
import { BookingContext } from "../../../contexts/BookingContextProvider";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function SelectServices({ showEmployees }) {
  const {
    photographerCount, setPhotographerCount,
    videographerCount, setVideographerCount,
    droneCount, setDroneCount
  } = React.useContext(BookingContext)

  function handlePhotographerClick() {
    if (photographerCount < 1) {
      setPhotographerCount(1)
    }
  }

  function handleVideographerClick() {
    if (videographerCount < 1) {
      setVideographerCount(1)
    }
  }

  function handleDroneClick() {
    if (droneCount < 1) {
      setDroneCount(1)
    }
  }

  return (
    <>
      <Grid container spacing={2} sx={{ position: "relative " }}>
        <Grid item xs={12} md={12} lg={4}>
          <Card sx={{ height: 240 }} onClick={handlePhotographerClick}>
            <CardMedia component="img" height="150" image={"/img/still_camera.jpg"} />
            <CardContent>
              <Stack direction="row" justifyContent="space-around">
                <Typography gutterBottom variant="h6" component="div"> Photography </Typography>
              </Stack>
              {photographerCount > 0 && (
                <Stack direction="row" justifyContent="space-around" alignItems="center" >
                  <IconButton
                    onClick={() => setPhotographerCount(photographerCount - 1)}
                    disabled={photographerCount === 0}
                    sx={{ color: photographerCount > 0 ? "primary.main" : "text.disabled", "&:hover": { color: "primary.dark" } }} >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{photographerCount}</Typography>
                  <IconButton
                    onClick={() => setPhotographerCount(photographerCount + 1)}
                    disabled={photographerCount >= 3}
                    sx={{ color: photographerCount > 0 ? "primary.main" : "text.disabled", "&:hover": { color: "primary.dark" } }} >
                    <AddIcon />
                  </IconButton>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>
          <Card sx={{ height: 240 }} onClick={handleVideographerClick}>
            <CardMedia component="img" height="150" image={"/img/video_camera.jpg"}  />
            <CardContent>
              <Stack direction="row" justifyContent="space-around">
                <Typography gutterBottom variant="h6" component="div"> Videography </Typography>
              </Stack>
              {videographerCount > 0 && (
                <Stack direction="row" justifyContent="space-around" alignItems="center" >
                  <IconButton
                    onClick={() => setVideographerCount(videographerCount - 1)}
                    disabled={videographerCount === 0}
                    sx={{ color:  videographerCount > 0 ? "primary.main" : "text.disabled", "&:hover": { color: "primary.dark" } }} >
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{videographerCount}</Typography>
                  <IconButton
                    onClick={() => setVideographerCount(videographerCount + 1)}
                    disabled={videographerCount >= 3}
                    sx={{ color: videographerCount > 0 ? "primary.main" : "text.disabled", "&:hover": { color: "primary.dark" } }} >
                    <AddIcon />
                  </IconButton>
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>
          <Card sx={{ height: 240 }} onClick={handleDroneClick}>
              <CardMedia component="img" height="150" image={"/img/drone_camera.jpg"} />
              <CardContent>
                <Stack direction="row" justifyContent="space-around">
                  <Typography gutterBottom variant="h6" component="div">
                    Drone
                  </Typography>
                </Stack>
                {droneCount > 0 && (
                  <Stack direction="row" justifyContent="space-around" alignItems="center"  >
                    <IconButton
                      onClick={() => setDroneCount(droneCount <= 0 ? 0 : droneCount - 1)  }
                      disabled={droneCount === 0}
                      sx={{ color: droneCount > 0 ? "primary.main" : "text.disabled", "&:hover": { color: "primary.dark" } }} >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>{droneCount}</Typography>
                    <IconButton
                      onClick={() => setDroneCount(droneCount + 1 ) }
                      disabled={droneCount >= 3}
                      sx={{ color: droneCount > 0 ? "primary.main" : "text.disabled", "&:hover": { color: "primary.dark" } }} >
                      <AddIcon />
                    </IconButton>
                  </Stack>
                )}
              </CardContent>
          </Card>
        </Grid>


        {(photographerCount > 0 || videographerCount > 0) && (
          <Grid item xs={12} md={12} lg={12}>
            Select your favourite photographer/videographer from{" "}
            <Link onClick={showEmployees}>here</Link>.
            <br />
            The request will be published to other photographers only if they
            are unavailable.
          </Grid>
        )}
      </Grid>
    </>
  )
}
