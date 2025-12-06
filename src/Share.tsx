interface ShareProps {
  people: Array<{ name: string }>;
  items: Array<{ name: string; amount: string; people: string[] }>;
  fees: Array<{ name: string; amount: string; type: string }>;
}

function generateTitle(people: Array<{ name: string }>) {
  const names = people.map((person) => person.name).filter((name) => name);
  if (names.length == 0) {
    return "Bill Splitter";
  } else if (names.length == 2) {
    return `${names[0]} and ${names[1]}'s Bill`;
  } else if (names.length <= 3) {
    const pieces = [];
    for (const name of names) {
      pieces.push(name);
    }
    if (pieces.length >= 3) {
      pieces[pieces.length - 1] = "and " + pieces[pieces.length - 1];
    }
    return pieces.join(", ") + "'s Bill";
  } else {
    return `${names[0]}, ${names[1]}... and ${names[names.length - 1]}'s Bill`;
  }
}

export function Share(props: ShareProps) {
  function generateShareUrl() {
    const params = new URLSearchParams();

    // Indicate this is a shared bill
    params.append("share", "true");

    // Add people
    props.people.forEach((person) => {
      if (person.name) {
        params.append("people.name", person.name);
      }
    });

    // Add items
    props.items.forEach((item) => {
      if (item.name || item.amount || item.people.length > 0) {
        params.append("items.name", item.name);
        params.append("items.amount", item.amount);
        params.append("items.people", item.people.join(","));
      }
    });

    // Add fees
    props.fees.forEach((fee) => {
      if (fee.name || fee.amount) {
        params.append("fees.name", fee.name);
        params.append("fees.amount", fee.amount);
        params.append("fees.type", fee.type);
      }
    });

    return `${window.location.origin}${
      window.location.pathname
    }?${params.toString()}`;
  }

  function handleShare() {
    const url = generateShareUrl();
    if (navigator.share) {
      navigator
        .share({
          title: generateTitle(props.people),
          url: url,
        })
        .catch(console.error);
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("Share link copied to clipboard!");
        })
        .catch(console.error);
    }
  }

  return (
    <button onClick={handleShare} id="share">
      Share Bill
    </button>
  );
}
