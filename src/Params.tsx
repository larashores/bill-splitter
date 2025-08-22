const params = new URLSearchParams(window.location.search);

// --------------------------------- People table initial values ----------------------------------

const personNames = params.getAll("people.name");

const peopleRows = personNames.map((name) => ({ name }));

export const BlankPerson = { name: "" };
export const InitialPeople =
  peopleRows.length > 0 ? [...peopleRows, BlankPerson] : [BlankPerson];

// ---------------------------------- Items table initial values -----------------------------------

const itemNames = params.getAll("items.name");
const itemAmounts = params.getAll("items.amount");
const itemPeople = params.getAll("items.people");

const itemsNumRows = Math.max(
  itemNames.length,
  itemAmounts.length,
  itemPeople.length
);
const itemsRows = Array(itemsNumRows)
  .fill(null)
  .map((_, index) => ({
    name: itemNames[index] || "",
    amount: itemAmounts[index] || "",
    people: itemPeople[index] ? itemPeople[index].split(",") : [],
  }));

export const BlankItem = { name: "", amount: "", people: [] };
export const InitialItems =
  itemsRows.length > 0 ? [...itemsRows, BlankItem] : [BlankItem];

// ---------------------------------- Fees table initial values -----------------------------------

const feeNames = params.getAll("fees.name");
const feeAmounts = params.getAll("fees.amount");
const feeTypes = params.getAll("fees.type");

const feesNumRows = Math.max(
  feeNames.length,
  feeAmounts.length,
  feeTypes.length
);
const feesRows = Array(feesNumRows)
  .fill(null)
  .map((_, index) => ({
    name: feeNames[index] || "",
    amount: feeAmounts[index] || "",
    type: feeTypes[index] || "flat",
  }));

export const BlankFee = { name: "", amount: "", type: "flat" };
export const InitialFees =
  feesRows.length > 0
    ? [...feesRows, BlankFee]
    : [
        { name: "Tax", amount: "", type: "flat" },
        { name: "Tip", amount: "", type: "flat" },
        BlankFee,
      ];
