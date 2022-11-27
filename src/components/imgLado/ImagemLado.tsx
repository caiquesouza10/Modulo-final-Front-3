import { Grid } from "@mui/material";

export const Imagemlado: React.FC = () => {
  return (
    <Grid
      sm={4}
      md={7}
      sx={{
        backgroundImage: "url(background.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};
