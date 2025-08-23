import { Share } from "./Share.tsx";
import { New } from "./New.tsx";

interface ActionsProps {
  people: Array<{ name: string }>;
  items: Array<{ name: string; amount: string; people: string[] }>;
  fees: Array<{ name: string; amount: string; type: string }>;
  onNewBill: () => void;
}

export function Actions(props: ActionsProps) {
  const hasContent =
    props.people.some((person) => person.name) ||
    props.items.some(
      (item) => item.name || item.amount || item.people.length > 0
    ) ||
    props.fees.some((fee) => fee.amount);

  if (hasContent) {
    return (
      <div id="actions">
        <Share people={props.people} items={props.items} fees={props.fees} />
        <New onClick={props.onNewBill} />
      </div>
    );
  }
}
