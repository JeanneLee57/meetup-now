interface ButtonProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: 'primary' | 'secondary';
  fullWidth?: boolean;
}

const Button = ({ label, variant, fullWidth = false, ...rest }: ButtonProp) => {
  const baseStyle = 'font-medium p-3 rounded-md transition-colors';
  const widthStyle = fullWidth ? 'w-full' : '';
  const variantStyle =
    variant === 'primary'
      ? 'bg-primary hover:bg-secondary'
      : 'bg-secondary hover:bg-primary';

  return (
    <button className={`${baseStyle} ${widthStyle} ${variantStyle}`} {...rest}>
      {label}
    </button>
  );
};

export default Button;
