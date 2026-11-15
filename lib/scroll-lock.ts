// Page scroll lock shared by the menu and the enquiry sheet. Counted, so when one
// opens over the other the page stays locked until both have closed.
let locks = 0;
let previousOverflow = "";

export function lockScroll(): () => void {
  if (locks === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  locks += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks === 0) document.body.style.overflow = previousOverflow;
  };
}
