import "./input.scss";

type Props = {
  varient?: string;
  className?: string;
  children?: React.ReactNode;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  varient,
  className,
  children,
  type,
  value,
  onChange,
}: Props) {
  const returnVarient = () => {
    if (varient) {
      return varient;
    }
  };

  const returnClassName = (): string => {
    if (className) {
      return " " + className;
    } else return "";
  };

  return (
    <input
      type={type}
      className={returnVarient() + returnClassName()}
      onChange={onChange}
      value={value}
    >
      {children}
    </input>
  );
}
