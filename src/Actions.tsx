import { Edit } from "./Edit.tsx";
import { New } from "./New.tsx";
import { Share } from "./Share.tsx";

interface ActionsProps {
  share?: boolean;
  people: Array<{ name: string }>;
  items: Array<{ name: string; amount: string; people: string[] }>;
  fees: Array<{ name: string; amount: string; type: string }>;
  onNewBill: () => void;
  onEditBill: () => void;
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
        {props.share ? <Edit onClick={props.onEditBill} /> : null}
      </div>
    );
  }
}
