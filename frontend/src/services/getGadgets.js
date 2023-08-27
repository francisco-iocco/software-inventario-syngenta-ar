export default async function getGadgets({ barcode = "" } = {}) {
  let url = "http://localhost:4000/gadgets";
  if (barcode) url += `?barcode=${barcode}`;
  let gadgets = await fetch(url);
  gadgets = await gadgets.json();
  return gadgets;
}
