import { parentVariants, transition } from "@/animation/transition";
import useDB from "@/hooks/useDB";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import TextMask from "../TextMask";
import BigFamily from "./BigFamily";

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
 * Text variant
 */
const dividerVariants = {
  hidden: {
    scaleX: 0,
    originX: 0.5,
  },
  show: {
    scaleX: 1,
    originX: 0.5,
    transition,
  },
  exit: {
    opacity: 0,
  },
};

/**
 * Footer komponen
 */
const Footer = () => {
  const { groom, bride } = useDB((db) => db.wedding.couple);
  const doaRestu =
    "Your prayers and blessings are a very meaningful gift to us.";
  const berbahagia = "The Happy Couple";

  return (
    <Box
      component={motion.div}
      variants={parentVariants}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: true }}
      py={18}
    >
      <Container>
        <Grid
          container
          spacing={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", fontFamily: "Courgette" }}
            >
              {doaRestu.split(" ").map((text, key) => (
                <TextMask key={key} variants={textVariants}>
                  {text}
                </TextMask>
              ))}
            </Typography>
          </Grid>

          <Grid item xs={12} mb={5}>
            <Divider
              sx={{ my: 5 }}
              component={motion.div}
              variants={dividerVariants}
            >
              <FavoriteTwoToneIcon sx={{ fontSize: 50 }} />
            </Divider>

            <Typography
              variant="h2"
              sx={{ textAlign: "center", fontFamily: "Courgette" }}
            >
              {berbahagia.split(" ").map((text, key) => (
                <TextMask key={key} variants={textVariants}>
                  {text}
                </TextMask>
              ))}
            </Typography>
          </Grid>

          {/* Groom */}
          <Grid item md={6} xs={12}>
            <BigFamily
              title="Groom"
              fatherName={groom.parents.father}
              motherName={groom.parents.mother}
            />
          </Grid>

          {/* Bride */}
          <Grid item md={6} xs={12} sx={{ mt: { md: 0, xs: 5 } }}>
            <BigFamily
              title="Bride"
              fatherName={bride.parents.father}
              motherName={bride.parents.mother}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
