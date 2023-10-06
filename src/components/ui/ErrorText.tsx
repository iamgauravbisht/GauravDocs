type Props = {
  children: React.ReactNode;
};

export default function ErrorText({ children }: Props): JSX.Element {
  return <small className="text-red-600">{children}</small>;
}
