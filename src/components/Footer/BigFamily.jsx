import { transition } from "@/animation/transition";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import TextMask from "../TextMask";

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
 * Komponent keluarga besar untuk footer
 *
 * @param {obect} props
 * @returns
 */
const BigFamily = ({ title, fatherName, motherName }) => {
  const header = "Big Family of";
  const orangTua = `Mr. ${fatherName} & Mrs. ${motherName}`;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component="p"
          sx={{
            textAlign: "center",
            fontFamily: "Courgette",
            color: "background.paper",
          }}
        >
          {header.split(" ").map((text, key) => (
            <TextMask key={key} variants={textVariants}>
              {text}
            </TextMask>
          ))}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontFamily: "Courgette",
          }}
        >
          {title.split(" ").map((text, key) => (
            <TextMask key={key} variants={textVariants}>
              {text}
            </TextMask>
          ))}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {orangTua.split(" ").map((text, key) => (
            <TextMask key={key} variants={textVariants}>
              {text}
            </TextMask>
          ))}
        </Typography>
      </Grid>
    </Grid>
  );
};

/**
 * Prop types
 */
BigFamily.propTypes = {
  title: PropTypes.string.isRequired,
  fatherName: PropTypes.string.isRequired,
  motherName: PropTypes.string.isRequired,
};

export default BigFamily;
