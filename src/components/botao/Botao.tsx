import { Button } from "@mui/material";

type buttonType = "submit" | "button" | "reset";

interface IButtonProps {
  tipoBotao: buttonType;
  children: string;
  onClick?: () => void;
}

export const Botao: React.FC<IButtonProps> = ({tipoBotao, children, onClick}) => {
  return (
    <>
      <Button 
      sx={{ mt: 3, mb: 2 }}
      type={tipoBotao}
      onClick={onClick}
      variant="contained"
      fullWidth
      >
        {children}
      </Button>
    </>
  );
};
