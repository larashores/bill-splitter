interface EditProps {
  onClick: () => void;
}

export function Edit(props: EditProps) {
  return (
    <button onClick={props.onClick} id="edit">
      Edit Bill
    </button>
  );
}
