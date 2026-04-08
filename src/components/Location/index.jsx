import useDB from "@/hooks/useDB";
import { Box, Container, Grid, Typography } from "@mui/material";

/**
 *
 * @returns React.ReactElement
 */
const Location = () => {
  const { ceremony, reception } = useDB((db) => db.wedding);
  return (
    <Box
      sx={{
        py: 15,
        backgroundColor: "text.secondary",
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 3, color: "background.paper", fontFamily: "Courgette" }}>
              Ceremony Location
            </Typography>
            <Box
              component="iframe"
              title="Ceremony Map"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={ceremony.gmaps.iframeSrc}
              sx={{
                width: "100%",
                height: 450,
                border: 0,
                borderColor: "divider",
                borderRadius: 1,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 3, color: "background.paper", fontFamily: "Courgette" }}>
              Reception Location
            </Typography>
            <Box
              component="iframe"
              title="Reception Map"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={reception.gmaps.iframeSrc}
              sx={{
                width: "100%",
                height: 450,
                border: 0,
                borderColor: "divider",
                borderRadius: 1,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Location;
