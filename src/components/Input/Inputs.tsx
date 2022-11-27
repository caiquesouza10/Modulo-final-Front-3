import TextField from "@mui/material/TextField";
import { InputName } from '../../page/cadastro/Cadastrar';

interface InputProps {
  type?: string;
  label: Label;
  name: InputName;
  onChange: Function;
  value: string;
}

export type Label = 'Nome' | 'E-mail' | 'Senha' | 'Repete Senha';

const Input: React.FC<InputProps> = ({ type, label, name, onChange, value }) => {
  
  return (
    <>
      <TextField
        value={value}
        type={type}
        label={label}
        variant="outlined"
        required
        fullWidth
        sx={{mt:3}}
        name={name}
        onChange={(ev) => onChange(name, ev.target.value)}
      />
    </>
  );
};

export default Input;