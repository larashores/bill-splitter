interface ShareProps {
  people: Array<{ name: string }>;
  items: Array<{ name: string; amount: string; people: string[] }>;
  fees: Array<{ name: string; amount: string; type: string }>;
}

export function Share(props: ShareProps) {
  function generateShareUrl() {
    const params = new URLSearchParams();

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
          title: "Bill Splitter",
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
