import { parentVariants, transition } from "@/animation/transition";
import useDB from "@/hooks/useDB";
import { Container, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import TextMask from "../TextMask";
import CardDate from "./CardDate";

/**
 * Text variant
 */
const textVariants = {
  hidden: {
    opacity: 0,
    y: "80%",
    skewY: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition,
  },
  exit: {
    opacity: 0,
  },
};

/**
 * Komponent tanggal
 *
 * @returns Reacr.ReactElement
 */
const EventDate = () => {
  const textHeader = "Series of Events Will Be Held";
  const { ceremony, reception } = useDB((db) => db.wedding);

  return (
    <Container sx={{ py: 15 }}>
      <Grid container spacing={5}>
        <Grid
          item
          xs={12}
          component={motion.div}
          variants={parentVariants}
          initial="hidden"
          whileInView="show"
          exit="exit"
          viewport={{ once: true }}
        >
          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
            {textHeader.split(" ").map((text, key) => (
              <TextMask key={key} variants={textVariants}>
                {text}
              </TextMask>
            ))}
          </Typography>

          <Typography variant="h2" sx={{ textAlign: "center", my: 3 }}>
            {ceremony.date.split(" ").map((text, key) => (
              <TextMask key={key} variants={textVariants}>
                {text}
              </TextMask>
            ))}
          </Typography>

          <Divider />
        </Grid>

        <Grid item md={6} xs={12}>
          <CardDate
            title="Wedding Ceremony"
            date={ceremony.date}
            time={ceremony.time}
            location={ceremony.location}
            address={ceremony.address}
            link={ceremony.gmaps.link}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <CardDate
            title="Wedding Reception"
            date={reception.date}
            time={reception.time}
            location={reception.location}
            address={reception.address}
            link={reception.gmaps.link}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDate;
