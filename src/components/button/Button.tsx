import Styles from "./button.module.scss";

type Varient =
  | "primary"
  | "primary-disabled"
  | "primary-danger"
  | "primary-danger-disabled"
  | "secondary"
  | "secondary-disabled"
  | "secondary-danger"
  | "secondary-danger-disabled";

type Props = {
  varient?: Varient;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  varient,
  className,
  children,
  onClick,
}: Props) {
  const buttonClass = (): string => {
    if (varient) {
      return Styles[varient];
    } else return "primary";
  };

  const returnClassName = (): string => {
    if (className) {
      return " " + className;
    } else return "";
  };
  return (
    <button className={buttonClass() + returnClassName()} onClick={onClick}>
      {children}
    </button>
  );
}
