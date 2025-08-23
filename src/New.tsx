interface NewProps {
  onClick: () => void;
}

export function New(props: NewProps) {
  return (
    <button onClick={props.onClick} id="new">
      New Bill
    </button>
  );
}
